import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Utilizar ReactDOM.createRoot para renderizar el componente principal en el contenedor con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  // Envolver el componente App con React.StrictMode para activar el modo estricto, que es una herramienta útil para identificar y corregir problemas potenciales en tu código de React
  <React.StrictMode>
    <App /> {/* Renderizar el componente App */}
  </React.StrictMode>,
) 

