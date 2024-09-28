import React, { useState } from "react";
import { FaTh, FaBook, FaUsers } from "react-icons/fa"; 
import { IoSettingsSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

function SideBar({ activeItem, onItemClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 right-4 z-50 bg-[#f5bc42] p-2 rounded-md text-white"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      <div
        className={`Sidebar w-64 h-full bg-[#696969] text-white fixed transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block hidden`}
      >
        <div className="pt-10">
          {["المصفوفات", "الصلاحيات", "الموظفين", "تعديل المظهر"].map((item) => (
            <div
              key={item}
              className={`flex items-center justify-around p-4 text-lg font-bold cursor-pointer ${
                activeItem === item
                  ? "bg-white text-[#525353] rounded-r-3xl"
                  : ""
              }`}
              onClick={() => {
                onItemClick(item);
                toggleSidebar(); // أغلق الشريط الجانبي عند النقر
              }}
            >
              {item}
              {item === "المصفوفات" && <FaTh className="text-[#f5bc42]" />}
              {item === "الصلاحيات" && <FaBook className="text-[#f5bc42]" />}
              {item === "الموظفين" && <FaUsers className="text-[#f5bc42]" />}
              {item === "تعديل المظهر" && <IoSettingsSharp className="text-[#f5bc42]" />}
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export default SideBar;
