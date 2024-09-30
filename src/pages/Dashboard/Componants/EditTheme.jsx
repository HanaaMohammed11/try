import React, { useState, useEffect } from 'react';
import db from '../../../config/firebase';
import { storage } from '../../../config/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import Topbanner from '../../Home/componants/banner/Topbanner';
import Bottombanner from '../../Home/componants/banner/Bottombanner';
import { FileInput, Label } from "flowbite-react";
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
    <div className='min-h-screen flex flex-col justify-between'>
      <Topbanner topBannerUrl={topBannerUrl} logoUrl={logoUrl} />

      <div className='flex gap-5 justify-center  w-full'>
        <Label htmlFor="top-banner" className="flex h-64 w-96 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg className="mb-4 h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">اضغط لتحميل الصور</span>
            </p>
            <p className="text-xs text-gray-500">صورة البانر العلوي</p>
            {topBannerUrl && <img src={topBannerUrl} alt="Top Banner" className="mt-2 h-32 w-full object-cover" />}
          </div>
          <input id="top-banner" type="file" className="hidden" onChange={(e) => setTopBanner(e.target.files[0])} />
        </Label>

        <Label htmlFor="bottom-banner" className="flex h-64 w-96 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg className="mb-4 h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">اضغط لتحميل الصور</span>
            </p>
            <p className="text-xs text-gray-500">صورة البانر السفلي</p>
            {bottomBannerUrl && <img src={bottomBannerUrl} alt="Bottom Banner" className="mt-2 h-32 w-full object-cover" />}
          </div>
          <input id="bottom-banner" type="file" className="hidden" onChange={(e) => setBottomBanner(e.target.files[0])} />
        </Label>

        <Label htmlFor="logo" className="flex h-64 w-96 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg className="mb-4 h-4 w-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">اضغط لتحميل الصور</span>
            </p>
            <p className="text-xs text-gray-500">صورة الشعار</p>
            {logoUrl && <img src={logoUrl} alt="Logo" className="mt-2 h-32 w-full object-cover" />}
          </div>
          <input id="logo" type="file" className="hidden" onChange={(e) => setLogo(e.target.files[0])} />
        </Label>
      </div>

<div className='flex justify-center'>
<button onClick={handleSave} className='bg-gray-600 text-white py-2 px-4 rounded w-44'>
        حفظ
      </button>
</div>
    
      <Bottombanner bottomBannerUrl={bottomBannerUrl} />
    </div>
  );
};

export default EditTheme;
