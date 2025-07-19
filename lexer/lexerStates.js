export class LexerStates {

    stateZero(char, swap) {

        const letters = /([aA-zZ])/;
        const numbers = /([0-9])/;
        const operators = /([+=\-*/!])/;
        const text = /(['"])/;
        const operatorsAccess = /([:\.])/;
        const operatorsSet = /([\{\}\[\]\(\)])/;

        if (letters.test(char)) {
            swap += char
            return {
                state: 1
            }
        }
        else if (numbers.test(char)) {
            swap += char
            return {
                state: 2
            }
        }
        else if (operators.test(char)) {
            swap += char

            if (char === '/') {
                return {
                    state: 5
                }
            } else {
                return {
                    state: 3
                }
            }
        }
        else if (text.test(char)) {
            swap += char
            return {
                state: 4
            }
        }
        else if (operatorsAccess.test(char)) {
            return {
                token: { typeToken: 'OperatorAcces', character: char, },
                state: 0
            }
        }
        else if (operatorsSet.test(char)) {
            return {
                token: { typeToken: 'OperatorSet', character: char, },
                state: 0
            }
        }
        else if (char == ' ') {
            return {
                token: { typeToken: 'Espacio', character: char, },
                state: 0
            }
        }

    }

    stateOne() {
        const letters = /([aA-zZ])/;
        
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
    }
}