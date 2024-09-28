import React from 'react'
import { Link } from 'react-router-dom';


export default function Topbanner() {


  const changeLanguage= ()=> {

  };
  return (
      <div 
        className="Topbaner w-full h-44 bg-cover bg-center"
        style={{ backgroundImage: `url('../src/assets/blurred-gradient-background-golden-colors-smooth-gradation_263779-1439.avif')` }}
      >
       <div className='w-48  ml-auto pr-9 pt-9' >
       <Link to="/home">
      <img src="./src/assets/logo.png" alt="Logo" />
    </Link>
    <button onClick={() => changeLanguage('en')}>English</button>
    <button onClick={() => changeLanguage('ar')}>عربي</button>
      </div>
      </div>
  )
}
