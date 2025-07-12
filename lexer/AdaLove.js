const operators=/([+=\-*/!])/
const operatorsSet=/([\{\}\[\]\(\)])/ 
const letters=/([aA-zZ])/;
const operatorsAccess=/([:\.])/
const numbers=/([0-9])/
const operetorsIntervals=/([<>])/
const text=/(['"])/

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
    let tabs=0

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
                else if(text.test(char)){
                    swap+=char
                    iterador++
                    estado=4
                }
                else if(operatorsAccess.test(char)){
                    listTokens.push({
                        typeToken: 'OperatorAcces',
                        character: char,
                        ident: tabs,
                    })
                    estado=0
                    iterador++
                }
                else if(operatorsSet.test(char)){
                    listTokens.push({
                        typeToken: 'OperatorSet',
                        character: char,
                        ident: tabs,
                    })
                    estado=0
                    iterador++
                }
                else if(char == ' '){
                    listTokens.push({
                        typeToken: 'Espacio',
                        character: char,
                        ident: tabs,
                    })
                    estado=0
                    iterador++
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
                }else if(operatorsAccess.test(char)){
                    listTokens.push({
                        typeToken: 'Letters',
                        character: swap,
                        ident: tabs,
                    })
                    swap=''
                    estado=0
                }else{
                    listTokens.push({
                        typeToken: 'Letters',
                        character: swap,
                        ident: tabs,
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
                }else if(char==='.'){
                    swap+=char
                    iterador++
                    estado=2
                }else{
                    listTokens.push({
                        typeToken: 'Numbers',
                        character: swap,
                        ident: tabs,
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
                        character: swap,
                        ident: tabs,
                    })
                    swap=''
                    estado=0
                }
                break
            case 4:
                if(text.test(char)){
                    swap+=char
                    iterador++
                    listTokens.push({
                        typeToken: 'String',
                        character: swap,
                        ident: tabs,
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
                    estado=7
                }else{
                    listTokens.push({
                        typeToken: 'Operator',
                        character: swap,
                        ident: tabs,
                    })
                    swap=''
                    estado=0
                }
                break
            case 6:
                if(char==='\n'){
                    listTokens.push({
                        typeToken: 'Comment',
                        character: swap,
                        ident: tabs,
                    })
                    swap=''
                    estado=0
                }else{
                    swap+=char
                    iterador++
                    estado=6
                }
                break  
            case 7:
                if(char==='*'&&code[iterador+1]==='/'){
                    swap += char + '/'
                    listTokens.push({
                        typeToken: 'Comment',
                        character: swap,
                        ident: tabs,
                    })
                    swap=''
                    iterador+=2
                    estado=0
                }else{
                    swap+=char
                    iterador++
                    estado=7
                }
                break
        }

    }

    if(swap !==''){
        switch(estado){
            case 1:
                listTokens.push({
                    typeToken: 'Letters',
                    character: swap,
                    ident: tabs,
                })
                break
            case 2:
                listTokens.push({
                    typeToken: 'Numbers',
                    character: swap,
                    ident: tabs,
                })
                break
            case 3:
                listTokens.push({
                    typeToken: 'Operator',
                    character: swap,
                    ident: tabs,
                })
                break
            case 4: 
                listTokens.push({
                    typeToken: 'String',
                    character: swap,
                    ident: tabs,
                })
                break
        }
    }

    return listTokens
}