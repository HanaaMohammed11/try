/* eslint-disable no-unused-vars */
import React from "react";
import { Card } from "flowbite-react";
import Topbanner from "../../Home/componants/banner/Topbanner";
import Bottombanner from "../../Home/componants/banner/Bottombanner";
import { useLocation } from "react-router-dom";

export default function SubjectInfo() {
  const location = useLocation();
  const subject = location.state.subject; // Get user data from state

  return (
    <div>
      <Topbanner />
      <div className="min-h-screen bg-gray-100 justify-center flex items-center">
        <Card className="w-[1200px]  transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            {/* الجدول */}
            <div className="mt-4 w-full">
              <table className="min-w-full text-right border-collapse table-fixed">
                <tbody className="text-gray-700">
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2">
                      {subject.subjectNum}
                    </td>
                    <td className="px-4 py-2 font-bold w-1/2">: رقم المادة</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2">
                      {subject.subjectTitle}
                    </td>
                    <td className="px-4 py-2 font-bold w-1/2">
                      : موضوع المادة
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      {subject.subjectContent}
                    </td>
                    <td className="px-4 py-2 font-bold w-1/2">: نص المادة</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2">
                      أكرم - مدير المفاوضات
                    </td>
                    <td className="px-4 py-2 font-bold w-1/2">
                      : الموظف المفوض - المسمى الوظيفي
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2">
                      علي - مساعد مدير المفاوضات
                    </td>
                    <td className="px-4 py-2 font-bold w-1/2">
                      : الموظف الذي ينوب عنه - المسمى الوظيفي
                    </td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2">
                      حتى 500,000 ريال
                    </td>
                    <td className="px-4 py-2 font-bold w-1/2">
                      : حدود التفاوض
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">
                      {subject.notes}
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
