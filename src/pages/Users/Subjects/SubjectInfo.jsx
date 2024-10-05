/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import Topbanner from "../../Home/componants/banner/Topbanner";
import Bottombanner from "../../Home/componants/banner/Bottombanner";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import db from "../../../config/firebase";

export default function SubjectInfo() {
  const location = useLocation();
  const navigate = useNavigate();

  const [subject, setSubject] = useState(null);
  const [employees, setEmployees] = useState([]);
  const clickedSubject = location.state?.subject;

  // جلب بيانات المادة
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!clickedSubject) {
          console.error("No subject data found in location state");
          return;
        }

        // جلب بيانات الموظفين
        const employeesSnapshot = await getDocs(collection(db, "employees"));
        const employeesList = employeesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEmployees(employeesList);

        // هنا يمكنك القيام بأي جلب آخر للبيانات إذا كان لديك حقول إضافية
        setSubject(clickedSubject);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [clickedSubject]);

  if (!subject || employees.length === 0) {
    return <div>جاري التحميل...</div>; // يمكنك وضع رسالة تحميل مؤقتة حتى جلب البيانات
  }

  // العثور على الموظفين من مجموعة employees بناءً على الـ employeeId من subject
  const emp1 = employees.find(
    (emp) => emp.employeeId === clickedSubject.emp1Id
  );
  const emp2 = employees.find(
    (emp) => emp.employeeId === clickedSubject.emp2Id
  );

  return (
    <div>
      <Topbanner />
      <div className="min-h-screen bg-gray-100 justify-center flex items-center">
        <Card className="w-[1200px] ">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            {/* الجدول */}
            <div className="mt-4 w-full">
              <table className="min-w-full text-right border-collapse table-fixed">
                <tbody className="text-gray-700">
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2">
                      {subject.subjectNum || "غير متاح"}
                    </td>
                    <td className="px-4 py-2 font-bold w-1/2">: رقم المادة</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2">
                      {subject.subjectTitle || "غير متاح"}
                    </td>
                    <td className="px-4 py-2 font-bold w-1/2">
                      : موضوع المادة
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      {subject.subjectContent || "غير متاح"}
                    </td>
                    <td className="px-4 py-2 font-bold w-1/2">: نص المادة</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2">
                      {subject.emp1.employeeName || "غير متاح"} -{" "}
                      {subject.emp1.jobTitle || "غير متاح"}{" "}
                    </td>
                    <td className="px-4 py-2 font-bold w-1/2">
                      : الموظف المفوض - المسمى الوظيفي
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2">
                      {/* {emp2?.employeeName || "غير متاح"} -{" "}
                      {emp2?.role || "غير متاح"} */}
                    </td>
                    <td className="px-4 py-2 font-bold w-1/2">
                      :الموظفين المشتركين - نوع الاشتراك
                    </td>
                  </tr>
                  {subject.sharedEmployees.length > 0 ? (
                    subject.sharedEmployees.map((emp) => {
                      const user = employees.find(
                        (empl) => empl.employeeId === emp.empId
                      );
                      console.log("Found user:", user); // Add this to see if it finds the employee
                      return (
                        <tr
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            if (user) {
                              navigate("/userinfo", { state: { user } });
                            } else {
                              console.log(
                                "No user found for empId:",
                                emp.empId
                              );
                            }
                          }}
                          key={emp.empId}
                        >
                          <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                            {emp.role}
                          </td>
                          <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                            {user
                              ? user.employeeName
                              : `Employee ID: ${emp.empId}`}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-4 py-2 text-center">
                        لا توجد مواد مرتبطة
                      </td>
                    </tr>
                  )}
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2">
                      {subject.negotiationLimit}
                    </td>
                    <td className="px-4 py-2 font-bold w-1/2">
                      : حدود التفاوض
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      {subject.notes || "غير متاح"}
                    </td>
                    <td className="px-4 py-2 font-bold w-1/2">: ملاحظات</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
      <Bottombanner />
    </div>
  );
}
