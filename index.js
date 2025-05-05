import { processCode, sliceCode } from "./lexer/AdaLove.js"

const rawCode = `import React from 'react';\n import './App.css';\n function App() {\n return (\n <div className="App">\n <header className="App-header">\n <h1>¡Hola, React!</h1>\n <p>Bienvenido a tu nueva aplicación creada con Create React App.</p>\n </header>\n </div>\n );\n }\n export default App;\n `
const codeTest = 'const persona = { nombre: "Juan" }\n persona.edad = 30; //Añadiendo la propiedad "edad" en tiempo de ejecucion# \n console.log(persona); //nombre: "Juan", edad: 30# \n'

const test = '1+1aaaa/pp/*=-+"hola"'

const listTokens = sliceCode(rawCode)

function reader(element,index,array){
    console.log(processCode(element))
}

listTokens.forEach(reader)

//console.log(sliceCode(codeTest))
//console.log(listTokens.length)
//console.log(processCode(listTokens))

//console.log(processCode('const persona = { nombre: "Juan" }\n'))

//console.log(processCode(test))

//console.log(sliceCode(rawCode))
