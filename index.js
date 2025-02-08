import { sliceCode } from "./lexer/AdaLove.js"

const rawCode = `import React from 'react';\n import './App.css';\n function App() {\n return (\n <div className="App">\n <header className="App-header">\n <h1>¡Hola, React!</h1>\n <p>Bienvenido a tu nueva aplicación creada con Create React App.</p>\n </header>\n </div>\n );\n }\n export default App;\n `


console.log(sliceCode(rawCode))