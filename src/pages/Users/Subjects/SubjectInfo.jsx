import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import Topbanner from "../../Home/componants/banner/Topbanner";
import Bottombanner from "../../Home/componants/banner/Bottombanner";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../config/firebase";
import { useTranslation } from "react-i18next";

export default function SubjectInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("global");

  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const [subject, setSubject] = useState(null);
  const [employees, setEmployees] = useState([]);
  const clickedSubject = location.state?.subject;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!clickedSubject) {
          console.error("No subject data found in location state");
          return;
        }

        const employeesSnapshot = await getDocs(collection(db, "employees"));
        const employeesList = employeesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEmployees(employeesList);
        setSubject(clickedSubject);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [clickedSubject]);

  if (!subject || employees.length === 0) {
    return <div>جاري التحميل...</div>;
  }

  const emp1 = employees.find(
    (emp) => emp.employeeId === clickedSubject.emp1Id
  );
  const emp2 = employees.find(
    (emp) => emp.employeeId === clickedSubject.emp2Id
  );

  return (
    <div>
      <Topbanner />
      <div className="min-h-screen bg-gray-100 justify-center flex items-center" dir={direction}>
        <Card className="w-[1200px]">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            <div className="mt-4 w-full">
              <table className="min-w-full  border-collapse table-fixed">
                <tbody className="text-gray-700">
                  <tr>
                   
                    <td className="px-4 py-2 font-bold w-1/2">
                      {t("subjectInfo.subjectNumber")}
                    </td>
                    <td className="px-4 py-2 break-words w-1/2">
                      {subject.subjectNum || "غير متاح"}
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    
                    <td className="px-4 py-2 font-bold w-1/2">
                      {t("subjectInfo.subjectTitle")}
                    </td>
                    <td className="px-4 py-2 break-words w-1/2">
                      {subject.subjectTitle || "غير متاح"}
                    </td>
                  </tr>
                  <tr>
                   
                    <td className="px-4 py-2 font-bold w-1/2">
                      {t("subjectInfo.subjectContent")}
                    </td>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      {subject.subjectContent || "غير متاح"}
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                   
                    <td className="px-4 py-2 font-bold w-1/2">
                      {t("subjectInfo.authorizedEmployee")}
                    </td>
                    <td className="px-4 py-2 break-words w-1/2">
                      {subject.emp1?.employeeName || "غير متاح"} -{" "}
                      {subject.emp1?.jobTitle || "غير متاح"}
                    </td>
                  </tr>
                  <tr>
                   
                    <td className="px-4 py-2 font-bold w-1/2">
                      {t("subjectInfo.sharedEmployees")}
                    </td>
                 
                  </tr>
                  {subject.sharedEmployees.length > 0 ? (
                    subject.sharedEmployees.map((emp) => {
                      const employee = employees.find(
                        (empl) => empl.employeeId === emp.empId
                      );
                      return (
                        <tr
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => {
                            navigate("/subjectInfo", { state: { subject } });
                          }}
                          key={emp.empId}
                        >
                        
                          <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                            {employee ? employee.employeeName : emp.empId}
                          </td>
                          <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                            {emp.role}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-4 py-2 text-center">
                        {t("subjectInfo.noRelatedSubjects")}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-gray-100">
                   
                    <td className="px-4 py-2 font-bold w-1/2">
                      {t("subjectInfo.negotiationLimit")}
                    </td>
                    <td className="px-4 py-2 break-words w-1/2">
                      {subject.negotiationLimit}
                    </td>
                  </tr>
                  <tr>
                   
                    <td className="px-4 py-2 font-bold w-1/2">
                      {t("subjectInfo.notes")}
                    </td>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      {subject.notes || "غير متاح"}
                    </td>
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
