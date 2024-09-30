import React from 'react';

export default function Bottombanner({ bottomBannerUrl }) {
  return (
    <div 
      className="BottomBaner h-44 bg-cover bg-center" 
      style={{ 
        backgroundImage: `url(${bottomBannerUrl})`  // عرض صورة البانر السفلي
      }}
    >
      {/* محتويات الشريط السفلي إذا كانت موجودة */}
    </div>
  );
}
