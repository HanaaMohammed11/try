/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import SideBar from "./SideBar";
import MatrixForm from "./Componants/Matrix/MatrixForm";
import MatrixList from "./Componants/Matrix/MatrixList";
import EditTheme from "./Componants/EditTheme";
import AdminUserCard from "./Componants/users/AdminUserCard";
import AdminUsers from "./Componants/users/AdminUsers";
import SubjectList from "./Componants/Subjects/SubjectList";

function AdminDashboard() {
  const [activeItem, setActiveItem] = useState("المصفوفات");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="flex flex-row-reverse min-h-screen bg-gray-100">
      <div className="w-64">
        <SideBar activeItem={activeItem} onItemClick={handleItemClick} />
      </div>

      <div className="flex-grow   ">
        {activeItem === "المصفوفات" && <MatrixList />}
        {activeItem === "تعديل المظهر" && <EditTheme />}
        {activeItem === "الموظفين" && <AdminUsers />}
        {activeItem === "الصلاحيات" && <SubjectList />}
      </div>
    </div>
  );
}

export default AdminDashboard;
