
export function generateFunction (start, end, func){
    let data = []
    for(let i = start; i < end; i++){
        switch(func){
            case 0:
            data.push({
                x : i,
                y : -1 * Math.pow(i,2)
            })
            break;

            case 1:
            data.push({
                x : i * 10,
                y : -10 * Math.sin(i/Math.PI) 
            })
            break;
        }              
    }
    return data;
  }
  