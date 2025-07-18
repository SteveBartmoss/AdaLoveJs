export class Lexer {

    constructor() {
        this.listCode = []
        this.tabs = 0
    }

    processCode(code) {

        const operators = /([+=\-*/!])/
        const operatorsSet = /([\{\}\[\]\(\)])/
        const letters = /([aA-zZ])/;
        const operatorsAccess = /([:\.])/
        const numbers = /([0-9])/
        const operetorsIntervals = /([<>])/
        const text = /(['"])/
        
        let listTokens = []
        let estado = 0
        let iterador = 0
        let swap = ''

        while (iterador < code.length) {

            const char = code[iterador];

            switch (estado) {
                case 0:
                    if (letters.test(char)) {
                        swap += char
                        iterador++
                        estado = 1
                    }
                    else if (numbers.test(char)) {
                        swap += char
                        iterador++
                        estado = 2
                    }
                    else if (operators.test(char)) {
                        swap += char
                        iterador++
                        char === '/' ? estado = 5 : estado = 3
                    }
                    else if (text.test(char)) {
                        swap += char
                        iterador++
                        estado = 4
                    }
                    else if (operatorsAccess.test(char)) {
                        listTokens.push({
                            typeToken: 'OperatorAcces',
                            character: char,
                        })
                        estado = 0
                        iterador++
                    }
                    else if (operatorsSet.test(char)) {
                        
                        listTokens.push({
                            typeToken: 'OperatorSet',
                            character: char,
                        })
                        estado = 0
                        iterador++
                    }
                    else if (char == ' ') {
                        listTokens.push({
                            typeToken: 'Espacio',
                            character: char,
                        })
                        estado = 0
                        iterador++
                    }
                    else {
                        iterador++
                    }
                    break

                case 1:
                    if (letters.test(char)) {
                        swap += char
                        iterador++
                        estado = 1
                    } else if (operatorsAccess.test(char)) {
                        listTokens.push({
                            typeToken: 'Letters',
                            character: swap,
                        })
                        swap = ''
                        estado = 0
                    } else {
                        listTokens.push({
                            typeToken: 'Letters',
                            character: swap,
                        })
                        swap = ''
                        estado = 0
                    }
                    break

                case 2:
                    if (numbers.test(char)) {
                        swap += char
                        iterador++
                        estado = 2
                    } else if (char === '.') {
                        swap += char
                        iterador++
                        estado = 2
                    } else {
                        listTokens.push({
                            typeToken: 'Numbers',
                            character: swap,
                        })
                        swap = ''
                        estado = 0
                    }
                    break
                case 3:
                    if (operators.test(char)) {
                        swap += code[iterador]
                        iterador++
                        estado = 3
                    } else {
                        listTokens.push({
                            typeToken: 'Operator',
                            character: swap,
                        })
                        swap = ''
                        estado = 0
                    }
                    break
                case 4:
                    if (text.test(char)) {
                        swap += char
                        iterador++
                        listTokens.push({
                            typeToken: 'String',
                            character: swap,
                        })
                        swap = ''
                        estado = 0
                    } else {
                        swap += char
                        iterador++
                        estado = 4
                    }
                    break
                case 5:
                    if (char === '/') {
                        swap += char
                        iterador++
                        estado = 6
                    } else if (char === '*') {
                        swap += char
                        iterador++
                        estado = 7
                    } else {
                        listTokens.push({
                            typeToken: 'Operator',
                            character: swap,
                        })
                        swap = ''
                        estado = 0
                    }
                    break
                case 6:
                    if (char === '\n') {
                        listTokens.push({
                            typeToken: 'Comment',
                            character: swap,
                        })
                        swap = ''
                        estado = 0
                    } else {
                        swap += char
                        iterador++
                        estado = 6
                    }
                    break
                case 7:
                    if (char === '*' && code[iterador + 1] === '/') {
                        swap += char + '/'
                        listTokens.push({
                            typeToken: 'Comment',
                            character: swap,
                        })
                        swap = ''
                        iterador += 2
                        estado = 0
                    } else {
                        swap += char
                        iterador++
                        estado = 7
                    }
                    break
            }
        }

        if (swap !== '') {
            switch (estado) {
                case 1:
                    listTokens.push({
                        typeToken: 'Letters',
                        character: swap,
                    })
                    break
                case 2:
                    listTokens.push({
                        typeToken: 'Numbers',
                        character: swap,
                    })
                    break
                case 3:
                    listTokens.push({
                        typeToken: 'Operator',
                        character: swap,
                    })
                    break
                case 4:
                    listTokens.push({
                        typeToken: 'String',
                        character: swap,
                    })
                    break
            }
        }

        return listTokens

    }

    scanner(code) {

        const openIdent = /([\{\[\(])/
        const closeIdent = /([\}\]\)])/

        if (!code || typeof code !== 'string') {
            return [];
        }

        let start = 0
        let swap = 0

        for (let ite = 0; ite <= code.length; ite++) {
            if (code[ite] === '\n' || code[ite] === '\r') {
                

                if(closeIdent.test(code[ite-1])){
                    this.tabs--
                }

                this.listCode.push({ tokens: this.processCode(code.slice(start, ite) + '\n'), ident: this.tabs})
                start = ite + 1

                if(openIdent.test(code[ite-1])){
                    this.tabs++
                }
            }
        }

    }

}