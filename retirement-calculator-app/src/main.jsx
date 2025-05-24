import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navbar from './components/shared/Navbar.jsx'
import Footer from './components/shared/Footer.jsx'
import InputComponent from './components/shared/InputComponent.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    {/* <App /> */}
    <Footer />
    <InputComponent />
  </StrictMode>,
)
