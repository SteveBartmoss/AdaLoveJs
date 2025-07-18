export class LexerStates {

    stateZero(char, iterador, swap) {

        const letters = /([aA-zZ])/;
        const numbers = /([0-9])/;
        const operators = /([+=\-*/!])/;
        const text = /(['"])/;
        const operatorsAccess = /([:\.])/;
        const operatorsSet = /([\{\}\[\]\(\)])/

        if (letters.test(char)) {
            swap += char
            iterador++
            return {    
                state: 1
            }
        }
        else if (numbers.test(char)) {
            swap += char
            iterador++
            return {
                
                state: 2
            }
        }
        else if (operators.test(char)) {
            swap += char,
            iterador++

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
            iterador++
            return {
                state: 4
            }
        }
        else if (operatorsAccess.test(char)) {
            iterador++
            return {
                token: {typeToken: 'OperatorAcces', character: char,}, 
                state: 0
            }
        }
        else if (operatorsSet.test(char)) {
            iterador++
            return {
                token: {typeToken: 'OperatorSet', character: char,}, 
                state: 0
            }
        }
        else if (char == ' ') {
            iterador++
            return {
                token: {typeToken: 'Espacio', character: char,},
                state: 0
            }
        }
        else {
            iterador++
        }

    }
}