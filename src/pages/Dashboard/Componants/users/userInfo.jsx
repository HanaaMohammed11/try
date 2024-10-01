import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';
import Topbanner from './../../../Home/componants/banner/Topbanner';
import Bottombanner from './../../../Home/componants/banner/Bottombanner';
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

export default function AdminUserInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user; 

  const handleEdit = () => {
    navigate('/edituser', { state: { user } }); 
  };

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
    navigate(`/AdminUserInfo`, { state: { user: proxyEmployee } });
  };

  return (
    <div>
      <Topbanner />
      <div className="min-h-screen bg-gray-100 justify-center flex items-center">
        <Card className="w-[900px] h-auto transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105">
          <div className="flex flex-col items-center pb-10">
            <img
              alt="User Avatar"
              height="300"
              src={user.profileImage || './src/assets/default-profile.svg'}
              width="300"
              className="mb-3 rounded-full shadow-lg"
            />
            <div className="mt-4 w-full">
              <table className="min-w-full text-right border-collapse">
                <tbody className="text-gray-700">
                  <tr>
                    <td className="px-4 py-2">{user.employeeName}</td>
                    <td className="px-4 py-2 font-bold">: اسم الموظف</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2">{user.employeeId}</td>
                    <td className="px-4 py-2 font-bold">: الرقم الوظيفي</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">{user.hiringDate}</td>
                    <td className="px-4 py-2 font-bold">: تاريخ التعيين</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2">{user.jobGrade}</td>
                    <td className="px-4 py-2 font-bold">: الدرجة الوظيفية</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">{user.department}</td>
                    <td className="px-4 py-2 font-bold">: الإدارة/القسم</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2">{user.officeNumber}</td>
                    <td className="px-4 py-2 font-bold">: رقم المكتب</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">{user.jobTitle}</td>
                    <td className="px-4 py-2 font-bold">: المسمى الوظيفي</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2">{user.phoneNumber}</td>
                    <td className="px-4 py-2 font-bold">: رقم الهاتف</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">{user.currentOffice}</td>
                    <td className="px-4 py-2 font-bold">: المبنى/المكتب</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">{user.permissions}</td>
                    <td className="px-4 py-2 font-bold">: الصلاحيات</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-4">الموظفين الذين ينوبون عنه:</h3>
            <div className="space-y-4">
              {user.proxyEmployees && user.proxyEmployees.length > 0 ? (
                user.proxyEmployees.map((proxyEmployee, index) => (
                  <div key={index} className="p-4 bg-white rounded shadow-md">
                    <p><strong>اسم الموظف النائب:</strong> {proxyEmployee.proxyEmployeeName}</p>
                    <p><strong>الرقم الوظيفي:</strong> {proxyEmployee.proxyEmployeeId}</p>
                    <p><strong>الدرجة الوظيفية:</strong> {proxyEmployee.proxyjobgrade}</p>
                    <p><strong>رقم الهاتف:</strong> {proxyEmployee.proxyphonenumber}</p>
                    <Button
                      className="mt-2"
                      onClick={() => handleCardClick(proxyEmployee)}
                    >
                      عرض تفاصيل الموظف
                    </Button>
                  </div>
                ))
              ) : (
                <p>لا يوجد موظفين ينوبون عن هذا الموظف.</p>
              )}
            </div>

            <div className="mt-6 flex space-x-4">
              <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700">
                تعديل
              </Button>
              <Button onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
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
