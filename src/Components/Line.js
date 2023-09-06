import React, {useState, useEffect, useRef, forwardRef} from "react"

function Graph(graphRef){


    return(
        <div>
            <canvas ref={graphRef} width="500" height="500" style={{ border: "1px"}} >
            </canvas>
        </div>
    )
}

export default forwardRef(Graph);