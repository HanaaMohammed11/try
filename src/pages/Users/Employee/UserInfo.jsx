import React from 'react'
import { Card } from 'flowbite-react';
import Topbanner from '../../Home/componants/banner/Topbanner';
import Bottombanner from '../../Home/componants/banner/Bottombanner';
import { div } from 'framer-motion/client';

export default function UserInfo() {
  return (
    <div>
        <Topbanner/>
    <div className='min-h-screen bg-gray-100 justify-center flex items-center'> 
  
      <Card className="w-[900px] h-auto transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105">
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <img
            alt="User Avatar"
            height="200"
            src='https://i.pinimg.com/564x/6f/a5/47/6fa547241d136e41e1ee347a4ef6026d.jpg'
            width="200"
            className="mb-3 rounded-full shadow-lg"
          />
         

          {/* الجدول */}
          <div className="mt-4 w-full">
            <table className="min-w-full text-right border-collapse">
              <tbody className="text-gray-700">
                <tr>
              
                  <td className="px-4 py-2">أكرم</td>
                  <td className="px-4 py-2 font-bold">: اسم الموظف</td>
                </tr>
                <tr className="bg-gray-100">
           
                  <td className="px-4 py-2">123456</td>
                  <td className="px-4 py-2 font-bold">: الرقم الوظيفي</td>
                </tr>
                <tr>
          
                  <td className="px-4 py-2">12/01/2020</td>
                  <td className="px-4 py-2 font-bold">: تاريخ التعيين</td>
                </tr>
                <tr className="bg-gray-100">
             
                  <td className="px-4 py-2">الدرجة الثانية</td>
                  <td className="px-4 py-2 font-bold"> : الدرجة الوظيفية</td>
                </tr>
                <tr>
       
                  <td className="px-4 py-2">إدارة التقنية</td>
                  <td className="px-4 py-2 font-bold"> : الإدارة/القسم</td>
                </tr>
                <tr className="bg-gray-100">
           
                  <td className="px-4 py-2">B-123</td>
                  <td className="px-4 py-2 font-bold">: رقم المكتب</td>
                </tr>
                <tr>
             
                  <td className="px-4 py-2">مهندس نظم</td>
                  <td className="px-4 py-2 font-bold"> : المسمى الوظيفي</td>
                </tr>
                <tr className="bg-gray-100">
         

                  <td className="px-4 py-2">+123456789</td>
                  <td className="px-4 py-2 font-bold">: رقم الهاتف</td>
                </tr>
                <tr>
            
                  <td className="px-4 py-2">المبنى A - مكتب 305</td>
                  <td className="px-4 py-2 font-bold">: المبنى/المكتب</td>
                </tr>
                <tr className="bg-gray-100">
       
                  <td className="px-4 py-2 break-words w-1/2 overflow-hidden">مدير</td>
                  <td className="px-4 py-2 font-bold">: الصلاحيات</td>
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
