
export function generateFunction (start, end, func, width, height, setOffset){
    let data = []
    for(let i = start; i < end; i+= 0.1){
        switch(func){
            case 0:
            setOffset({
                x : 0,
                y : (height / 2)
            })
            data.push({
                x : i * (width / 3),
                y : -1 * (height / 2) * Math.pow(i,2) + (height / 2)
            })
            break;

            case 1:  
            setOffset({
                x : 0,
                y : 0
            })
            let dx = end - start
            let yVals = []
            for(let i = start; i < end; i += 1){
                yVals.push(Math.sin(i / Math.PI))
            }
            let dy = Math.max(yVals) - Math.min(yVals)
            data.push({
                x : i * (width / dx) * 2,
                y : -1 * (height / 2) * Math.sin(i/Math.PI) 
            })
            break;
        }              
    }
    return data;
  }
  