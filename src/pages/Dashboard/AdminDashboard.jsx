/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SideBar from "./SideBar";
import MatrixForm from "./Componants/Matrix/MatrixForm";
import MatrixList from "./Componants/Matrix/MatrixList";
import EditTheme from "./Componants/EditTheme";
import AdminUserCard from "./Componants/users/AdminUserCard";
import AdminUsers from "./Componants/users/AdminUsers";
import SubjectList from "./Componants/Subjects/SubjectList";
import AddAccounts from "./Componants/Addaccunts";

function AdminDashboard() {
    const [activeItem, setActiveItem] = useState("المصفوفات");

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    const renderComponent = () => {
        const components = {
            "المصفوفات": <MatrixList />,
            "تعديل المظهر": <EditTheme />,
            "الموظفين": <AdminUsers />,
            "الصلاحيات": <SubjectList />,
            "اضافة مستخدم": <AddAccounts />
        };

        return components[activeItem] || null; // Fallback to null if no match found
    };

    return (
        <div className="flex flex-row-reverse min-h-screen bg-gray-100">
            <div className="lg:w-64">
                <SideBar activeItem={activeItem} onItemClick={handleItemClick} />
            </div>

            <div className="flex-grow">
                {renderComponent()}
            </div>
        </div>
    );
}

export default AdminDashboard;
