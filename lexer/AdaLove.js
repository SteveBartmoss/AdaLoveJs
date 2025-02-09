const operators=/([+=\-*/!])/
const operatorsSet=/([\{\}\[\]\(\)])/ 
const letters=/([aA-zZ])/;
const operatorsAccess=/([:\.])/
const numbers=/([0-9])/
const operetorsIntervals=/([<>])/

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

export function processCode(code){

    let listTokens=[]
    let estado=0
    let iterador=0
    let swap='' 

    while(iterador < code.length){

        const char = code[iterador];

        switch(estado){
            case 0: 
                if(letters.test(char)){
                    swap+=char
                    iterador++
                    estado=1      
                }
                else if(numbers.test(char)){
                    swap+=char
                    iterador++
                    estado=2
                }
                else if(operators.test(char)){
                    swap+=char
                    iterador++
                    estado=3
                }
                else{
                    iterador++
                }
                break

            case 1:
                if(letters.test(char)){
                    swap+=char
                    iterador++
                    estado=1
                }else{
                    listTokens.push({
                        typeToken: 'Letters',
                        character: swap
                    })
                    swap=''
                    estado=0
                }
                break

            case 2: 
                if(numbers.test(char)){
                    swap+=char
                    iterador++
                    estado=2
                }else{
                    listTokens.push({
                        typeToken: 'Numbers',
                        character: swap
                    })
                    swap=''
                    estado=0
                }
                break
            case 3:
                if(operators.test(char)){
                    swap+=code[iterador]
                    iterador++
                    estado=3
                }else{
                    listTokens.push({
                        typeToken: 'Operator',
                        character: swap
                    })
                    swap=''
                    estado=0
                }
                break
        }
    }

    return listTokens
}