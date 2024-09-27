import React from "react";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function EditUserForm() {
  const navigation = useNavigate();

  const handleSave = () => {
    navigation("/home");
  };

  return (
    <div className="flex min-h-screen bg-gray-100" style={{ fontFamily: "cursive" }}>
      <div className="ml-64 p-8 w-full max-w-5xl">
        <h1 className="text-right text-3xl font-semibold text-gray-800  bg-[#B5B5B6]  p-5 rounded-t-xl">
تعديل بيانات الموظف
        </h1>

        {/* قسم تفاصيل الموظف */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* Upload Section */}
          <div className="flex flex-col items-center mb-6">
            <Label
              htmlFor="upload-file"
              className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              <FileInput id="upload-file" className="hidden" />
              <div className="flex items-center justify-center h-full w-full">
                <svg
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
              </div>
            </Label>
            <p className="text-center mt-2 text-xl text-gray-500  font-semibold">صورة الموظف</p>
          </div>

          <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* باقي الحقول */}
            <FormField label="اسم الموظف" id="employee-name" />
            <FormField label="الرقم الوظيفي" id="employee-id" />
            <FormField label="تاريخ التعيين" id="hire-date" type="date" />
            <FormField label="الدرجة الوظيفية" id="job-grade" />
            <FormField label="الادارة الدائرة - القسم" id="department" />
            <FormField label="رقم المكتب" id="office-number" />
            <FormField label="المسمى الوظيفي" id="job-title" />
            <FormField label="رقم الهاتف" id="phone-number" />
            <FormField label="المبني والمكتب المتواجد به" id="current-office" />
          </div>
        </div>

        {/* قسم التعريفات */}
        <h2 className="text-right text-2xl font-semibold text-gray-800  bg-[#B5B5B6]  p-5 rounded-t-xl mt-9">
          الموظف الذى ينوب عنه
        </h2>

        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* Upload Section for Proxy */}
          <div className="flex flex-col items-center mb-6">
          <Label
              htmlFor="upload-file"
              className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              <FileInput id="upload-file" className="hidden" />
              <div className="flex items-center justify-center h-full w-full">
                <svg
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
              </div>
            </Label>
            <p className="text-center mt-2 text-lg text-gray-500   font-semibold">صورة الموظف الذي ينوب عنه</p>
          </div>

          <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-6 ">
            {/* باقي الحقول للموظف الذي ينوب عنه */}
            <FormField label="اسم الموظف" id="employee-name" />
            <FormField label="الرقم الوظيفي" id="employee-id" />
            <FormField label="تاريخ التعيين" id="hire-date" type="date" />
            <FormField label="الدرجة الوظيفية" id="job-grade" />
            <FormField label="الادارة الدائرة - القسم" id="department" />
            <FormField label="رقم المكتب" id="office-number" />
            <FormField label="المسمى الوظيفي" id="job-title" />
            <FormField label="رقم الهاتف" id="phone-number" />
            <FormField label="المبني والمكتب المتواجد به" id="current-office" />
          </div>

       
        </div>
           {/* زر حفظ */}
           <div className="mt-8 text-right flex justify-center ">
            <Button
              type="submit"
              className="bg-[#696969] hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-500 transform hover:scale-105 w-32"
              onClick={handleSave}
            >
              حفظ
            </Button>
          </div>
      </div>
    </div>
  );
}

const FormField = ({ label, id, type = "text" }) => (
  <div className="col-span-1">
    <Label htmlFor={id} value={label} className="text-xl font-semibold" />
    <TextInput id={id} type={type} sizing="sm" className="mt-2" />
  </div>
);