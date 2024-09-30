import React, { useState, useEffect } from 'react';
import db from '../../../config/firebase';import { storage } from '../../../config/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import Topbanner from '../../Home/componants/banner/Topbanner';
import Bottombanner from '../../Home/componants/banner/Bottombanner';

const EditTheme = () => {
  const [topBanner, setTopBanner] = useState(null);
  const [bottomBanner, setBottomBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const [topBannerUrl, setTopBannerUrl] = useState('');
  const [bottomBannerUrl, setBottomBannerUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const unsubscribeTopBanner = onSnapshot(doc(db, 'banners', 'topBanner'), (doc) => {
      if (doc.exists()) {
        setTopBannerUrl(doc.data().imageUrl);
      }
    });

    const unsubscribeBottomBanner = onSnapshot(doc(db, 'banners', 'bottomBanner'), (doc) => {
      if (doc.exists()) {
        setBottomBannerUrl(doc.data().imageUrl);
      }
    });

    const unsubscribeLogo = onSnapshot(doc(db, 'banners', 'logo'), (doc) => {
      if (doc.exists()) {
        setLogoUrl(doc.data().imageUrl);
      }
    });

    return () => {
      unsubscribeTopBanner();
      unsubscribeBottomBanner();
      unsubscribeLogo();
    };
  }, []);

  const deleteOldImage = async (oldUrl) => {
    if (oldUrl) {
      const imageRef = ref(storage, oldUrl);
      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.error('حدث خطأ أثناء حذف الصورة القديمة:', error);
      }
    }
  };

  const handleImageUpload = async (file, storagePath, oldUrl) => {
    try {
      await deleteOldImage(oldUrl);

      const imageRef = ref(storage, storagePath);
      await uploadBytes(imageRef, file); 
      const imageUrl = await getDownloadURL(imageRef); 
      await setDoc(doc(db, 'banners', storagePath), { imageUrl }); 
    } catch (error) {
      console.error('حدث خطأ أثناء رفع الصورة:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (topBanner) await handleImageUpload(topBanner, 'topBanner', topBannerUrl);
      if (bottomBanner) await handleImageUpload(bottomBanner, 'bottomBanner', bottomBannerUrl);
      if (logo) await handleImageUpload(logo, 'logo', logoUrl);
      alert('تم الحفظ بنجاح');
    } catch (error) {
      alert('حدث خطأ أثناء الحفظ، يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div>
      <Topbanner topBannerUrl={topBannerUrl} logoUrl={logoUrl} />

      <h1>رفع الصور</h1>
      <label>
        اختر البانر العلوي:
        <input type="file" onChange={(e) => setTopBanner(e.target.files[0])} />
      </label>
      <br />
      <label>
        اختر البانر السفلي:
        <input type="file" onChange={(e) => setBottomBanner(e.target.files[0])} />
      </label>
      <br />
      <label>
        اختر الشعار:
        <input type="file" onChange={(e) => setLogo(e.target.files[0])} />
      </label>
      <br />
      <button onClick={handleSave}>حفظ</button>

      {/* عرض مكونات البانرات والشعار مع الصور المخزنة */}
      <Bottombanner bottomBannerUrl={bottomBannerUrl} />
    </div>
  );
};

export default EditTheme;
