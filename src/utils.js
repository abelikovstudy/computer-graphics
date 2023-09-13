
export function generateFunction (start, end, func, width, height, setOffset){
    let data = []
    for(let i = start; i < end; i+= 0.1){
        switch(func){
            case 0:
            let dX = width / Math.abs(end - start) 
            let dY = height / Math.max(Math.pow(start,2),Math.pow(end,2))

            setOffset({
                x : dX * Math.abs(start),
                y : height / 2
            })
            data.push({
                x : i * dX + (dX * Math.abs(start)),
                y :  dY * Math.pow(i,2) * -1+ height/2
            })
            break;

            case 1:  
            
            let dx = width / Math.abs(end - start) 
            let yVals = []
            for(let i = start; i < end; i += 1){
                yVals.push(Math.sin(i / Math.PI))
            }
            let dy = height / Math.max(yVals)
            
            setOffset({
                x : dx * Math.abs(start),
                y : 0
            })
            data.push({
                x : i * dx + (dx * Math.abs(start)),
                y : -1 * (height / 2) * Math.sin(i/Math.PI) 
            })
            break;
        }              
    }
    return data;
  }
  