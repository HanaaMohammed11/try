import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from '../../../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import  storage  from '../../../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc } from 'firebase/firestore';
export default function Topbanner() {

  const [topBannerUrl, setTopBannerUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const changeLanguage = () => {
    // وظيفة لتغيير اللغة
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const topBannerDoc = await getDoc(doc(db, 'banners', 'topBanner'));
        const logoDoc = await getDoc(doc(db, 'banners', 'logo'));

        if (topBannerDoc.exists()) {
          setTopBannerUrl(topBannerDoc.data().imageUrl);
        }
     
        if (logoDoc.exists()) {
          setLogoUrl(logoDoc.data().imageUrl);
        }
      } catch (error) {
        console.error('حدث خطأ أثناء جلب الصور:', error);
      }
    };

    fetchImages();
  }, []);
  return (
    <div 
      className="Topbaner w-full h-56 bg-cover bg-center"
      style={{ backgroundImage: `url(${topBannerUrl})` }} 
    >
      <div className='w-48 ml-auto pr-9 pt-9 logo'>
        <Link to="/home">
          <img src={logoUrl} alt="Logo" />  {/* عرض الشعار */}
        </Link>
        {/* <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('ar')}>عربي</button> */}
      </div>
    </div>
  );
}
