import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import Topbanner from "./../../../Home/componants/banner/Topbanner";
import Bottombanner from "./../../../Home/componants/banner/Bottombanner";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

export default function Proxyemployeeinfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user; 
  console.log(user);

  const [proxyEmployees, setProxyEmployees] = useState(user.proxyEmployees || []);

const handleDeleteProxyEmployee = async (proxyEmployeeId) => {
  try {
    const db = getFirestore();

    const employeeDocRef = doc(db, "employees", user.id);

    if (!proxyEmployeeId) {
      console.error("proxyEmployeeId غير موجود!");
      return;
    }

    const updatedProxyEmployees = proxyEmployees.filter(
      (proxyEmployee) => proxyEmployee.proxyEmployeeId !== proxyEmployeeId
    );

    await updateDoc(employeeDocRef, {
      proxyEmployees: updatedProxyEmployees,
    });
    setProxyEmployees(updatedProxyEmployees);

    console.log("تم حذف الموظف البديل بنجاح");
  } catch (error) {
    console.error("خطأ أثناء حذف الموظف البديل:", error);
  }
};


  const handleEdit = () => {
    navigate("/editproxy", { state: { user } }); 
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
                    <td className="px-4 py-2">
                      {user.employeeName || user.proxyEmployeeName}
                    </td>
                    <td className="px-4 py-2 font-bold">: اسم الموظف</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2">
                      {user.employeeId || user.proxyEmployeeId}
                    </td>
                    <td className="px-4 py-2 font-bold">: الرقم الوظيفي</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      {user.hiringDate || user.proxyhiredate}
                    </td>
                    <td className="px-4 py-2 font-bold">: تاريخ التعيين</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2">
                      {user.jobGrade || user.proxyjobgrade}
                    </td>
                    <td className="px-4 py-2 font-bold">: الدرجة الوظيفية</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      {user.department || user.proxydepartment}
                    </td>
                    <td className="px-4 py-2 font-bold">: الإدارة/القسم</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2">
                      {user.officeNumber || user.proxyofficenumber}
                    </td>
                    <td className="px-4 py-2 font-bold">: رقم المكتب</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      {user.jobTitle || user.proxyjobtitle}
                    </td>
                    <td className="px-4 py-2 font-bold">: المسمى الوظيفي</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2">
                      {user.phoneNumber || user.proxyphonenumber}
                    </td>
                    <td className="px-4 py-2 font-bold">: رقم الهاتف</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      {user.currentOffice || user.proxycurrentoffice}
                    </td>
                    <td className="px-4 py-2 font-bold">: المبنى/المكتب</td>
                  </tr>
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
                onClick={() => handleDeleteProxyEmployee(user.proxyEmployeeId)}
                className="bg-red-600 hover:bg-red-700"
              >
                حذف الموظف البديل
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <Bottombanner />
    </div>
  );
}
