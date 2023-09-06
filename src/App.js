import './App.css';
import React, {useState, useEffect, useRef, forwardRef} from "react"

const Graph = forwardRef((props, ref) => {
  return(
    <canvas ref={ref} width="1000" height="1000" style={{ border: "5px"}} >
    </canvas>
  );
});



const generateSin = (start, end) => {
  let data = []
  for(let i = start; i < end; i++){
    data.push({
      x : i * 10,
      y : -10 * Math.sin(i/Math.PI) 
    })
  }
  return data;
}

const generateSquare = (start, end) => {
  let data = []
  for(let i = start; i < end; i++){
    data.push({
      x : i,
      y : -1 * Math.pow(i,2)
    })
  }
  return data;
}

function App() {
  console.log(generateSin(-10,10))
  const graphRef = useRef(null)
  const drawGraph = (data) => {
    const ctx = graphRef.current.getContext("2d")
    ctx.strokeStyle = "red";
    ctx.beginPath(); 
    generateSin(-200,100).forEach((el) => {
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
    },[])
  return (
    <div className="App">
        
        <Graph ref={graphRef} />       
        <button onClick={() => drawGraph()}>Press</button>
    </div>
  );
}

export default App;
