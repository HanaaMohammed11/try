/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import Topbanner from "../../Home/componants/banner/Topbanner";
import Bottombanner from "../../Home/componants/banner/Bottombanner";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import db from "../../../config/firebase";

export default function MatrixInfo() {
  const location = useLocation();
  const navigate = useNavigate();
  const [relatedsubjects, setRelatedsubjectss] = useState([]);
  const matrix = location.state.item; // Get user data from state

  useEffect(() => {
    const usersCollectionRef = collection(db, "subjects");

    // Use the "in" operator to match any subjectTitle with titles in the matrix array
    if (matrix.subjects) {
      const q = query(
        usersCollectionRef,
        where("subjectTitle", "in", matrix.subjects) // Assuming matrix.subjects is an array of titles
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const subjects = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRelatedsubjectss(subjects);
        // setFilteredMatrix(Matrixs);
      });

      return () => unsubscribe();
    }
  }, [matrix]);

  return (
    <div>
      <Topbanner />
      <div className="min-h-screen bg-gray-100 justify-center flex items-center">
        <Card className="w-[900px] h-auto transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            {/* الجدول */}
            <div className="mt-4 w-full">
              <table className="min-w-full text-right border-collapse">
                <tbody className="text-gray-700">
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      {matrix.title}
                    </td>
                    <td className="px-4 py-2 font-bold">: اسم المصفوفة</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      {matrix.releaseDate}
                    </td>
                    <td className="px-4 py-2 font-bold">: تاريخ الإصدار</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      {matrix.updateDate}
                    </td>
                    <td className="px-4 py-2 font-bold">: تاريخ التعديل</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      {matrix.companyName}
                    </td>
                    <td className="px-4 py-2 font-bold">
                      : الجهة التي أصدرتها
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      {matrix.intro}
                    </td>
                    <td className="px-4 py-2 font-bold">: مقدمة</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      التعريفات المستخدمة في المصفوفة
                    </td>
                    <td className="px-4 py-2 font-bold">: التعريفات</td>
                  </tr>
                  {matrix.definitions.map((elem, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                        {elem.interpretation}
                      </td>
                      <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                        {elem.term}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      {/* مدير، مسؤول، مشرف */}
                    </td>
                    <td className="px-4 py-2 font-bold">
                      : الصلاحيات التابعة لها
                    </td>
                  </tr>
                  {relatedsubjects.length > 0 ? (
                    relatedsubjects.map((subject) => (
                      <tr
                        className="border cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          navigate("/subjectInfo", { state: { subject } });
                        }}
                        key={subject.id}
                      >
                        <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                          {subject.subjectTitle}
                        </td>
                        <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                          اسم المادة
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={2} className="px-4 py-2 text-center">
                        لا توجد مواد مرتبطة
                      </td>
                    </tr>
                  )}

                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      {matrix.notes}
                    </td>
                    <td className="px-4 py-2 font-bold">: ملاحظات</td>
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
