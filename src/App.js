import Select from 'react-select'
import './App.css';
import React, {useState, useEffect, useRef, forwardRef} from "react"
import {generateFunction} from './utils'

const options = [
  { value: 0, label: 'y = x^2' },
  { value: 1, label: 'y = sin(x)' },
];

const Graph = forwardRef((props, ref) => {
  return(
    <canvas ref={ref} width="1500" height="960" style={{ border: "5px"}} className='graph-canvas'>
    </canvas>
  );
});


function App() {
  const [currentFunction, setCurrentFunction] = useState(0)
  const [start, setStart] = useState(-10)
  const [end, setEnd] = useState(10)
  const [clearing, setClearing] = useState(false)
  const [isError, setIsError] = useState(false)
  const [offset, setOffset] = useState({
    x : 0,
    y : 0
  })
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const graphRef = useRef(null)
  const windowRef = useRef()
  const clearGraph = () => {
    const ctx = graphRef.current.getContext("2d")
    ctx.clearRect(0,0,windowSize.width * 2,windowSize.height * 2)
    setClearing(!clearing)
  }
  const drawGraph = () => {
    clearGraph()
    const ctx = graphRef.current.getContext("2d")
    ctx.width = windowSize.width;
    ctx.height = windowSize.height;
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.beginPath(); 
    generateFunction(Math.min(start,end),Math.max(start,end),currentFunction, ctx.width, ctx.height, setOffset).forEach((el) => {
      ctx.lineTo(el.x + (windowSize.width / 2), el.y   + (windowSize.height / 2)); 
    
    })
    ctx.stroke();
    ctx.lineWidth = 1; 
  }
  useEffect(() => {
    const ctx = graphRef.current.getContext("2d")
    ctx.strokeStyle = "black";
    ctx.beginPath()
    ctx.moveTo((windowSize.width / 2) + offset.x, 0)
    ctx.lineTo((windowSize.width / 2) + offset.x, windowSize.height)

    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, (windowSize.height / 2) + offset.y)
    ctx.lineTo(windowSize.width, (windowSize.height / 2) + offset.y)
    ctx.stroke()
  },[clearing])

  useEffect(() => {
    if(start > end){
      setIsError(true)
      clearGraph()
    }
    else{
      setIsError(false)
      drawGraph()
    }
  },[currentFunction,start,end])
  useEffect(() => {
    function handleResize() {
      if(windowRef.current){
        clearTimeout(windowRef.current);
      }
      windowRef.current = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 500);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  },[])

  useEffect(() => {
    clearGraph()
    drawGraph()
  },[windowSize])
  return (
    <div className="App">
        <Graph ref={graphRef} className="graph"/>
        <div className="userPanel">
          <Select options={options} onChange={(e) => setCurrentFunction(e.value)} defaultValue={options[0]}/>
          <input name='start' onChange={(e) => setStart(e.target.value)} value={start} maxLength={4} size={8}/>
          <input name='end'onChange={(e) => setEnd(e.target.value)} value={end} maxLength={4} size={8}/>
          {isError ?     
          <div className='error-box'>
            <span className='error-text'>Начало интервала не может быть больше конца.</span>
          </div> : null}
        </div>       
    </div>
  );
}

export default App;
