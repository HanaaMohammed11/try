import React from 'react'
import { Card } from 'flowbite-react';
import Topbanner from '../../Home/componants/banner/Topbanner';
import Bottombanner from '../../Home/componants/banner/Bottombanner';

export default function MatrixInfo() {
  return (
    <div>
      <Topbanner/>
      <div className='min-h-screen bg-gray-100 justify-center flex items-center'> 
        <Card className="w-[900px] h-auto transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105">
          <div className="flex justify-end px-4 pt-4"></div>
          <div className="flex flex-col items-center pb-10">
            {/* الجدول */}
            <div className="mt-4 w-full">
              <table className="min-w-full text-right border-collapse">
                <tbody className="text-gray-700">
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">مصفوفة العمليات</td>
                    <td className="px-4 py-2 font-bold">: اسم المصفوفة</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">01/01/2021</td>
                    <td className="px-4 py-2 font-bold">: تاريخ الإصدار</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">15/05/2023</td>
                    <td className="px-4 py-2 font-bold">: تاريخ التعديل</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">إدارة التخطيط</td>
                    <td className="px-4 py-2 font-bold">: الجهة التي أصدرتها</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">مقدمة تفصيلية عن المصفوفة</td>
                    <td className="px-4 py-2 font-bold">: مقدمة</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">التعريفات المستخدمة في المصفوفة</td>
                    <td className="px-4 py-2 font-bold">: التعريفات</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">مدير، مسؤول، مشرف</td>
                    <td className="px-4 py-2 font-bold">: الصلاحيات التابعة لها</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="px-4 py-2 break-words w-1/2 overflow-hidden">يرجى مراجعة التحديثات بشكل دوري</td>
                    <td className="px-4 py-2 font-bold">: ملاحظات</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
      <Bottombanner/>
    </div>
  );
}
