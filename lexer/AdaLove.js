export function sliceCode(code){
    
    if(!code || typeof code !== 'string'){
        return [];
    }

    let rowsCode=[]
    let start = 0 

    for(let ite=0; ite<=code.length; ite++){
        if(code[ite] === '\n' || code[ite] === '\r'){
            rowsCode.push(code.slice(start,ite))
            start = ite + 1
        }
    }

    if(start < code.length){
        rowsCode.push(code.slice(start))
    }

    rowsCode = rowsCode.filter(line => line.trim() !=='')

    return rowsCode
}