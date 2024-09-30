import React from 'react';
import { Link } from 'react-router-dom';

export default function Topbanner({ topBannerUrl, logoUrl }) {
  const changeLanguage = () => {
    // وظيفة لتغيير اللغة
  };

  return (
    <div 
      className="Topbaner w-full h-44 bg-cover bg-center"
      style={{ backgroundImage: `url(${topBannerUrl})` }}  // عرض صورة البانر العلوي
    >
      <div className='w-48 ml-auto pr-9 pt-9 logo'>
        <Link to="/home">
          <img src={logoUrl} alt="Logo" />  {/* عرض الشعار */}
        </Link>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('ar')}>عربي</button>
      </div>
    </div>
  );
}
