import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import i18next from 'i18next'
import Ar_Lang from "./Locals/Ar/Common.json"
import En_Lang from "./Locals/En/Common.json"
import { I18nextProvider } from 'react-i18next'

i18next.init({
 
  interpolation: {
    escapeValue: false 
  },
  resources:{
    en:{
      global:En_Lang,
    },
    ar:{
global:Ar_Lang
    }
  } ,
  Lng:"ar"
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
    <App />
    </I18nextProvider>
  </StrictMode>,
)
