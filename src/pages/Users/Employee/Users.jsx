"use client";

import Topbanner from "../../Home/componants/banner/Topbanner";
import Bottombanner from "../../Home/componants/banner/Bottombanner";
import UserCard from "./UserCard";

export default function Users() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      {/* Top banner with centered title */}
      <div className="relative flex justify-center items-center text-center">
        <Topbanner />
        <h1 className="absolute top-16 text-6xl font-semibold text-gray-700" style={{ fontFamily: "cursive" }}>
          الموظفين
        </h1>
      </div>

      {/* Search bar */}
      <div className='search flex justify-center mt-9'>
        <input type="text" placeholder='بحث عن موظفين' className="w-96 rounded-full text-right" />
      </div>

      {/* User Cards section */}
      <div className="flex-grow">
        <UserCard />
      </div>

      {/* Bottom banner always at the bottom */}
      <div className='mt-auto'>
        <Bottombanner />
      </div>

    </div>
  );
}
