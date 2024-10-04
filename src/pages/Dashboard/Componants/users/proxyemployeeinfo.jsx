import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import Topbanner from "./../../../Home/componants/banner/Topbanner";
import Bottombanner from "./../../../Home/componants/banner/Bottombanner";
import { getFirestore, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

export default function Proxyemployeeinfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;
  const mainUserId = location.state.mainUser;


  console.log(mainUserId);



  const [proxyEmployees, setProxyEmployees] = useState(user.proxyEmployees || []);

  const handleDeleteProxyEmployee = async (proxyEmployeeId) => {
    try {
      const db = getFirestore();

      // Ensure proxyEmployeeId is provided
      if (!proxyEmployeeId) {
        console.error("proxyEmployeeId غير موجود!");
        return;
      }

      // 1. Delete the document from the proxyEmployees collection
      const proxyEmployeeDocRef = doc(db, "proxyEmployees", proxyEmployeeId);


      await deleteDoc(proxyEmployeeDocRef);
      console.log(`م حذف وثيقة الموظف البديل بنجاح من مجموعة proxyEmployees`);

      // 2. Fetch the current user's employees document from the employees collection
      const employeeDocRef = doc(db, "employees", mainUserId);
      const employeeDocSnap = await getDoc(employeeDocRef);

      if (employeeDocSnap.exists()) {
        // Get the proxyEmployeesIds array from the document
        const employeeData = employeeDocSnap.data();
        const proxyEmployeesIds = employeeData.proxyEmployeeIds || [];

        // 3. Filter out the deleted employee's ID from the proxyEmployeesIds array
        const updatedProxyEmployeesIds = proxyEmployeesIds.filter(
          (id) => id !== proxyEmployeeId
        );

        // 4. Update the Firestore document with the updated proxyEmployeesIds array
        await updateDoc(employeeDocRef, {
          proxyEmployeeIds: updatedProxyEmployeesIds,
        });

        console.log("تم تحديث قائمة الموظفين البدلاء بنجاح في مجموعة employees");

        // Optional: Update the local state if needed
        setProxyEmployees(updatedProxyEmployeesIds);

      } else {
        console.log("لا يوجد مستند للموظف في مجموعة employees");
      }
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
              src={user.profileImage || user.proxyProfileImage}
              className="mb-3 rounded-full shadow-lg  w-60 h-60"
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
                      {user.hiringDate || user.proxyHireDate}
                    </td>
                    <td className="px-4 py-2 font-bold">: تاريخ التعيين</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2">
                      {user.jobGrade || user.proxyJobGrade}
                    </td>
                    <td className="px-4 py-2 font-bold">: الدرجة الوظيفية</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      {user.department || user.proxyDepartment}
                    </td>
                    <td className="px-4 py-2 font-bold">: الإدارة/القسم</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2">
                      {user.officeNumber || user.proxyOfficeNumber}
                    </td>
                    <td className="px-4 py-2 font-bold">: رقم المكتب</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      {user.jobTitle || user.proxyJobTitle}
                    </td>
                    <td className="px-4 py-2 font-bold">: المسمى الوظيفي</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2">
                      {user.phoneNumber || user.proxyPhoneNumber}
                    </td>
                    <td className="px-4 py-2 font-bold">: رقم الهاتف</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      {user.currentOffice || user.proxyCurrentOffice}
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
                onClick={() => handleDeleteProxyEmployee(user.id)}
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