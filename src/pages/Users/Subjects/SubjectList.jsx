import React, { useState } from 'react';
import Topbanner from '../../Home/componants/banner/Topbanner';
import Bottombanner from '../../Home/componants/banner/Bottombanner';
import { SubCard } from './SubCard';

export default function SubjectsLists() {
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term

  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      {/* Top banner with centered title */}
      <div className="relative flex justify-center items-center text-center">
        <Topbanner />
        <h1 className="absolute top-16 text-6xl font-semibold text-gray-700" style={{ fontFamily: "cursive" }}>
          الصلاحيات
        </h1>
      </div>

      {/* Input search section */}
      <div className='search flex justify-center mt-9'>
        <input
          type="text"
          placeholder='بحث عن مادة'
          className="w-96 rounded-full text-right"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term state on change
        />
      </div>

      {/* Main content section */}
      <div className='flex-grow'>
        <SubCard searchTerm={searchTerm} /> {/* Pass the search term to SubCard */}
      </div>

      {/* Bottom banner always at the bottom */}
      <div className='mt-auto'>
        <Bottombanner />
      </div>
    </div>
  );
}