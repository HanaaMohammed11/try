import React, { useEffect, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import db, { auth } from '../../../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import  storage  from '../../../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
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
  // logout function
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("id");
      // dispatch(resetUser());
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
  return (
    <div 
      className="Topbaner w-full h-56 bg-cover bg-center"
      style={{ backgroundImage: `url(${topBannerUrl})` }} 
    >
  <div className="flex justify-between w-full items-center"> 
    <button className="block ml-8 font-semibold text-xl" onClick={handleLogout}>تسجيل الخروج</button>   
      <div className='w-48 ml-auto pr-9 pt-9 logo'>
        <Link to="/home">
          <img src={logoUrl} alt="Logo" />  {/* عرض الشعار */}
        </Link>
        {/* <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('ar')}>عربي</button> */}
      </div>

     
       
      
    </div>
    </div>
  );
}
        {/* <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('ar')}>عربي</button> */}