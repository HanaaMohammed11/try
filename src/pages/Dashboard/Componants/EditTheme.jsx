import React, { useState, useEffect } from 'react';
import db from '../../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import  storage  from '../../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc } from 'firebase/firestore';
import Topbanner from '../../Home/componants/banner/Topbanner';
import Bottombanner from '../../Home/componants/banner/Bottombanner';

const EditTheme = () => {
  const [topBanner, setTopBanner] = useState(null);
  const [bottomBanner, setBottomBanner] = useState(null);
  const [logo, setLogo] = useState(null);
  const [topBannerUrl, setTopBannerUrl] = useState('');
  const [bottomBannerUrl, setBottomBannerUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  // دالة لجلب روابط الصور من Firestore عند تحميل الصفحة
  const fetchBannerUrls = async () => {
    try {
      // جلب البانر العلوي
      const topBannerDoc = await getDoc(doc(db, 'banners', 'topBanner'));
      if (topBannerDoc.exists()) {
        setTopBannerUrl(topBannerDoc.data().imageUrl);
      }

      // جلب البانر السفلي
      const bottomBannerDoc = await getDoc(doc(db, 'banners', 'bottomBanner'));
      if (bottomBannerDoc.exists()) {
        setBottomBannerUrl(bottomBannerDoc.data().imageUrl);
      }

      // جلب الشعار
      const logoDoc = await getDoc(doc(db, 'banners', 'logo'));
      if (logoDoc.exists()) {
        setLogoUrl(logoDoc.data().imageUrl);
      }
    } catch (error) {
      console.error('حدث خطأ أثناء جلب البيانات:', error);
    }
  };

  // استخدام useEffect لجلب روابط الصور عند تحميل المكون
  useEffect(() => {
    fetchBannerUrls();
  }, []);

  // دالة لرفع الصور إلى Firebase Storage وحفظ الرابط في Firestore
  const handleImageUpload = async (file, setUrlState, storagePath) => {
    try {
      const imageRef = ref(storage, storagePath);
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);
      setUrlState(imageUrl);
      await setDoc(doc(db, 'banners', storagePath), { imageUrl });
    } catch (error) {
      console.error('حدث خطأ أثناء رفع الصورة:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (topBanner) await handleImageUpload(topBanner, setTopBannerUrl, 'topBanner');
      if (bottomBanner) await handleImageUpload(bottomBanner, setBottomBannerUrl, 'bottomBanner');
      if (logo) await handleImageUpload(logo, setLogoUrl, 'logo');
      alert('تم الحفظ بنجاح');
    } catch (error) {
      alert('حدث خطأ أثناء الحفظ، يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div>
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
      <Topbanner topBannerUrl={topBannerUrl} logoUrl={logoUrl} />
      <Bottombanner bottomBannerUrl={bottomBannerUrl} />
    </div>
  );
};

export default EditTheme;
