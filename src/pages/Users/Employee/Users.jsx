"use client";

import Topbanner from "../../Home/componants/banner/Topbanner";
import Bottombanner from "../../Home/componants/banner/Bottombanner";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../../../config/firebase";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const navigation = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // حفظ مصطلح البحث
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, "employees");

    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setUsersData(users);
    });

    return () => unsubscribe();
  }, []);

  // تصفية المستخدمين بناءً على مصطلح البحث
  const filteredUsers = usersData.filter((user) =>
    user.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <input
          type="text"
          placeholder='بحث عن موظفين'
          className="w-96 rounded-full text-right"
          value={searchTerm} // ربط مصطلح البحث مع الحقل
          onChange={(e) => setSearchTerm(e.target.value)} // تحديث مصطلح البحث عند الكتابة
        />
      </div>

      {/* User Cards section */}
      <div className="flex flex-wrap gap-9 p-9">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Bottom banner always at the bottom */}
      <div className='mt-auto'>
        <Bottombanner />
      </div>
    </div>
  );
}
