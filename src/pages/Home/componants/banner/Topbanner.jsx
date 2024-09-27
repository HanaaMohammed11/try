import React from 'react'

export default function Topbanner() {
  return (
      <div 
        className="Topbaner w-full h-44 bg-cover bg-center"
        style={{ backgroundImage: `url('../src/assets/blurred-gradient-background-golden-colors-smooth-gradation_263779-1439.avif')` }}
      >
       <div className='w-48  ml-auto pr-9 pt-9'>
        <img src="./src/assets/logo.png" alt="" />
      </div>
      </div>
  )
}
