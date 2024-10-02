import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import Topbanner from "./../../../Home/componants/banner/Topbanner";
import Bottombanner from "./../../../Home/componants/banner/Bottombanner";
import { getFirestore, doc, deleteDoc, getDoc } from "firebase/firestore";

export default function AdminUserInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user; 
  console.log(user);

  const handleEdit = () => {
    navigate("/edituser", { state: { user } }); 
  };
  console.log(user);

  const handleDelete = async () => {
    const db = getFirestore();
    try {
      await deleteDoc(doc(db, "employees", user.id));
      console.log(`Deleted user with ID: ${user.id}`);
      navigate("/home");
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert("فشل حذف المستخدم. حاول مرة أخرى.");
    }
  };

  

  const handleCardClick = (proxyEmployee) => {
    navigate(`/proxyemployeeinfo`, { state: { user: proxyEmployee } });
  };
  
  return (
    <div>
      <Topbanner />
      <div className="min-h-screen bg-gray-100 justify-center flex items-center">
        <Card className="w-[900px] h-auto my-12">
          <div className="flex flex-col items-center pb-10">
            <img
              alt="User Avatar"
              height="300"
              src={user.profileImage || user.proxyProfileImage}
              width="300"
              className="mb-3 rounded-full shadow-lg"
            />
            <div className="mt-4 w-full">
            <table className="min-w-full text-right border-collapse">
  <tbody className="text-gray-700">
    <tr>
      <td className="px-4 py-2">{user.employeeName || user.proxyEmployeeName}</td>
      <td className="px-4 py-2 font-bold">: اسم الموظف</td>
    </tr>
    <tr className="bg-gray-100">
      <td className="px-4 py-2">{user.employeeId || user.proxyEmployeeId}</td>
      <td className="px-4 py-2 font-bold">: الرقم الوظيفي</td>
    </tr>
    <tr>
      <td className="px-4 py-2">{user.hiringDate || user.proxyhiredate}</td>
      <td className="px-4 py-2 font-bold">: تاريخ التعيين</td>
    </tr>
    <tr className="bg-gray-100">
      <td className="px-4 py-2">{user.jobGrade || user.proxyjobgrade}</td>
      <td className="px-4 py-2 font-bold">: الدرجة الوظيفية</td>
    </tr>
    <tr>
      <td className="px-4 py-2">{user.department || user.proxydepartment}</td>
      <td className="px-4 py-2 font-bold">: الإدارة/القسم</td>
    </tr>
    <tr className="bg-gray-100">
      <td className="px-4 py-2">{user.officeNumber || user.proxyofficenumber}</td>
      <td className="px-4 py-2 font-bold">: رقم المكتب</td>
    </tr>
    <tr>
      <td className="px-4 py-2">{user.jobTitle || user.proxyjobtitle}</td>
      <td className="px-4 py-2 font-bold">: المسمى الوظيفي</td>
    </tr>
    <tr className="bg-gray-100">
      <td className="px-4 py-2">{user.phoneNumber || user.proxyphonenumber}</td>
      <td className="px-4 py-2 font-bold">: رقم الهاتف</td>
    </tr>
    <tr>
      <td className="px-4 py-2">{user.currentOffice || user.proxycurrentoffice}</td>
      <td className="px-4 py-2 font-bold">: المبنى/المكتب</td>
    </tr>
    <tr className="bg-gray-100">
      <td className="px-4 py-2 break-words w-1/2 overflow-hidden">{user.permissions}</td>
      <td className="px-4 py-2 font-bold">: الصلاحيات</td>
    </tr>
    <tr>
      <td className="px-4 py-2 break-words w-1/2 overflow-hidden">{user.proxyEmployeeName}</td>
      <td className="px-4 py-2 font-bold">: الموظف الذي ينوب عنه</td>
    </tr>

    {/* إضافة الموظفين البدلاء في نفس الجدول */}
    {user.proxyEmployees && user.proxyEmployees.length > 0 ? (
      user.proxyEmployees.map((proxyEmployee, index) => (
        <React.Fragment key={index}>
          <tr className={index % 2 === 0 ? "bg-gray-100" : ""}  onClick={() => handleCardClick(proxyEmployee)}>
            
            <td className="px-4 py-2">{proxyEmployee.proxyEmployeeName}</td>
            
            <td className="px-4 py-2 font-bold">: اسم الموظف النائب</td>
        
          </tr>
          <tr className={index % 2 === 0 ? "bg-gray-100" : ""}  onClick={() => handleCardClick(proxyEmployee)}>
            <td className="px-4 py-2">{proxyEmployee.proxyphonenumber}</td>
            <td className="px-4 py-2 font-bold">: رقم الهاتف</td>
            
          </tr>
      
          
        </React.Fragment>
      ))
    ) : (
      <tr>
        <td className="px-4 py-2" colSpan="2">
          لا يوجد موظفين ينوبون عن هذا الموظف.
        </td>
      </tr>
    )}
  </tbody>
</table>

            </div>
            <div className="mt-6 flex space-x-4">
              <Button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700"
              >
                تعديل
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                حذف
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <Bottombanner />
    </div>
  );
}
