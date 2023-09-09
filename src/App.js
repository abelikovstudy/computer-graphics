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
    <canvas ref={ref} width="1000" height="1000" style={{ border: "5px"}} >
    </canvas>
  );
});


function App() {
  const [currentFunction, setCurrentFunction] = useState(0)
  const [start, setStart] = useState(-10)
  const [end, setEnd] = useState(10)
  const [clearing, setClearing] = useState(false)
  const [isError, setIsError] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const graphRef = useRef(null)
  const windowRef = useRef()
  const clearGraph = () => {
    const ctx = graphRef.current.getContext("2d")
    ctx.clearRect(0,0,1000,1000)
    setClearing(!clearing)
  }
  const drawGraph = () => {
    clearGraph()
    const ctx = graphRef.current.getContext("2d")
    ctx.strokeStyle = "red";
    ctx.beginPath(); 
    generateFunction(Math.min(start,end),Math.max(start,end),currentFunction).forEach((el) => {
      ctx.lineTo(el.x + 500, el.y  + 500); 
    
    })
    ctx.stroke(); 
  }
  useEffect(() => {
    const ctx = graphRef.current.getContext("2d")
    ctx.strokeStyle = "black";
    ctx.beginPath()
    ctx.moveTo(1000 / 2, 0)
    ctx.lineTo(1000 / 2, 1000)

    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, 1000 / 2)
    ctx.lineTo(1000, 1000 / 2)
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
    console.table(windowSize)
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
