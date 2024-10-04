import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import Topbanner from "./../../../Home/componants/banner/Topbanner";
import Bottombanner from "./../../../Home/componants/banner/Bottombanner";
import { getFirestore, doc, deleteDoc, getDoc } from "firebase/firestore";

export default function AdminUserInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state.user;
  const [proxyEmployees, setProxyEmployees] = useState([]);

  const db = getFirestore();






  useEffect(() => {


    const fetchProxyEmployees = async () => {
      try {

        // Array to store the matched employees
        const matchedEmployees = [];

        // Loop through the array of IDs and fetch each document by ID
        for (const id of user.proxyEmployeeIds) {
          const docRef = doc(db, "proxyEmployees", id); // Reference to the document by ID
          const docSnap = await getDoc(docRef); // Fetch the document

          if (docSnap.exists()) {
            // If the document exists, add it to the matched employees array
            matchedEmployees.push({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.log(`Document with ID: ${id} not found.`);
          }
        }

        // Update the state with the array of matched employees
        setProxyEmployees(matchedEmployees);

        console.log(matchedEmployees); // Debugging to see the fetched employees
      } catch (error) {
        console.error("Error fetching proxy employees: ", error);
      }
    };

    fetchProxyEmployees();
  }, [db, user.employeeId]);

  const handleEdit = () => {
    navigate("/edituser", { state: { user } });
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "employees", user.id));
      console.log(`Deleted user with ID: ${user.employeeId}`);
      navigate("/home");
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert("فشل حذف المستخدم. حاول مرة أخرى.");
    }
  };

  const handleCardClick = (proxyEmployee) => {
    navigate("/proxyemployeeinfo", { state: { user: proxyEmployee, mainUser: user.id } });
  };

  return (
    <div>
      <Topbanner />
      <div className="min-h-screen bg-gray-100 justify-center flex items-center">
        <Card className="w-[900px] h-auto my-12">
          <div className="flex flex-col items-center pb-10">
            <img
              alt="User Avatar"
              src={user.profileImage}
              className="mb-3 rounded-full shadow-lg w-60 h-60"
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
                    <td className="px-4 py-2">{user.hireDate}</td>
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
                    <td className="px-4 py-2 break-words">{user.currentOffice}</td>
                    <td className="px-4 py-2 font-bold">: المبنى/المكتب</td>
                  </tr>
<tr className="">           
  
   
        <td></td>
        <td className="px-4 py-8 pt-10 font-bold">
       <h1 className="text-xl">: الموظف الذي ينوب عنه</h1>

        </td>  

</tr>
                  {/* عرض الموظفين البدلاء */}
                  {proxyEmployees.length > 0 ? (
                    
                    proxyEmployees.map((proxyEmployee, index) => (
                      <React.Fragment key={index}>
                        <tr
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                          onClick={() => handleCardClick(proxyEmployee)}
                        >
                          <td className="px-4 py-2">{proxyEmployee.proxyEmployeeName}</td>
                          <td className="px-4 py-2 font-bold">: اسم الموظف النائب</td>
                        </tr>
                        <tr
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                          onClick={() => handleCardClick(proxyEmployee)}
                        >
                          <td className="px-4 py-2">{proxyEmployee.proxyPhoneNumber}</td>
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