/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaTh, FaBook, FaUsers } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

function SideBar({ activeItem, onItemClick }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const items = [
        { name: "المصفوفات", icon: <FaTh className="text-[#f5bc42]" /> },
        { name: "الصلاحيات", icon: <FaBook className="text-[#f5bc42]" /> },
        { name: "الموظفين", icon: <FaUsers className="text-[#f5bc42]" /> },
        { name: "تعديل المظهر", icon: <IoSettingsSharp className="text-[#f5bc42]" /> },
        { name: "اضافة مستخدم", icon: <IoSettingsSharp className="text-[#f5bc42]" /> },
    ];

    return (
        <>
            <button
                className="lg:hidden fixed top-4 right-4 z-50 bg-[#f5bc42] p-2 rounded-md text-white"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <FiMenu size={24} />
            </button>

            <div
                className={`Sidebar w-64 h-full bg-[#696969] text-white fixed transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:block hidden`}
            >
                <div className="pt-10">
                    {items.map(({ name, icon }) => (
                        <div
                            key={name}
                            className={`flex items-center justify-around p-4 text-lg font-bold cursor-pointer ${
                                activeItem === name ? "bg-white text-[#525353] rounded-r-3xl" : ""
                            }`}
                            onClick={() => {
                                onItemClick(name);
                                toggleSidebar(); // Close the sidebar on click
                            }}
                            aria-label={`Navigate to ${name}`}
                        >
                            {name}
                            {icon}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SideBar;
