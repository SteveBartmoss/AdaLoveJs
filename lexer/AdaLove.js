const operators=/([+=\-*/!])/
const operatorsSet=/([\{\}\[\]\(\)])/ 
const letters=/([aA-zZ])/;
const operatorsAccess=/([:\.])/
const numbers=/([0-9])/
const operetorsIntervals=/([<>])/
const coments=/(['"])/

export function sliceCode(code){
    
    if(!code || typeof code !== 'string'){
        return [];
    }

    let rowsCode=[]
    let start = 0 

    for(let ite=0; ite<=code.length; ite++){
        if(code[ite] === '\n' || code[ite] === '\r'){
            rowsCode.push(code.slice(start,ite)+'\n')
            start = ite + 1
        }
    }

    if(start < code.length){
        rowsCode.push(code.slice(start)+'\n')
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
                    if(char==='/'){
                        swap+=char
                        iterador++
                        estado=5
                    }else{
                        swap+=char
                        iterador++
                        estado=3
                    }
                }
                else if(coments.test(char)){
                    swap+=char
                    iterador++
                    estado=4
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
            case 4:
                if(coments.test(char)){
                    swap+=char
                    iterador++
                    estado=0
                    listTokens.push({
                        typeToken: 'String',
                        character: swap
                    })
                    swap=''
                    estado=0
                }else{
                    swap+=char
                    iterador++
                    estado=4
                }
                break
            case 5: 
                if(char==='/'){
                    swap+=char
                    iterador++
                    estado=6
                }else if(char==='*'){
                    swap+=char
                    iterador++
                    estado=6
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

    if(swap !==''){
        switch(estado){
            case 1:
                listTokens.push({
                    typeToken: 'Letters',
                    character: swap
                })
                break
            case 2:
                listTokens.push({
                    typeToken: 'Numbers',
                    character: swap
                })
                break
            case 3:
                listTokens.push({
                    typeToken: 'Operator',
                    character: swap
                })
                break
            case 4: 
                listTokens.push({
                    typeToken: 'String',
                    character: swap
                })
                break
        }
    }

    return listTokens
}