import React from "react";
import { FaTh, FaBook, FaUsers} from "react-icons/fa"; // استيراد الأيقونات المطلوبة
import { IoSettingsSharp } from "react-icons/io5";
function SideBar({ activeItem, onItemClick }) {
  return (
    <div className="Sidebar w-64 h-full bg-[#696969] text-white fixed">
      <div className="pt-10">
        {/* المصفوفات */}
        <div
          className={`flex items-center justify-around p-4 text-lg font-bold cursor-pointer ${
            activeItem === "المصفوفات" ? "bg-white text-[#525353] rounded-r-3xl" : ""
          }`}
          onClick={() => onItemClick("المصفوفات")}
        >
         
          المصفوفات
          <FaTh className="text-[#f5bc42]" /> {/* أيقونة للمصفوفات */}
        </div>

        {/* المواد */}
        <div
          className={`flex items-center justify-around p-4 text-lg font-bold cursor-pointer ${
            activeItem === "الصلاحيات" ? "bg-white text-[#525353] rounded-r-3xl" : ""
          }`}
          onClick={() => onItemClick("الصلاحيات")}
        >
        
          الصلاحيات
          <FaBook className="text-[#f5bc42]" /> {/* أيقونة للمواد */}
        </div>

        {/* الموظفين */}
        <div
          className={`flex items-center justify-around p-4 text-lg font-bold cursor-pointer ${
            activeItem === "الموظفين" ? "bg-white text-[#525353] rounded-r-3xl" : ""
          }`}
          onClick={() => onItemClick("الموظفين")}
        >
        
          الموظفين
          <FaUsers className="text-[#f5bc42]" /> {/* أيقونة للموظفين */}
        </div>
        <div
          className={`flex items-center justify-around p-4 text-lg font-bold cursor-pointer ${
            activeItem === "تعديل المظهر" ? "bg-white text-[#525353] rounded-r-3xl" : ""
          }`}
          onClick={() => onItemClick("تعديل المظهر")}
        >
        
تعديل المظهر          <IoSettingsSharp className="text-[#f5bc42]" /> {/* أيقونة للموظفين */}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
