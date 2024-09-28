import React from "react";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { FaAlignRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function SubjectForm() {
  const navigation = useNavigate();

  const handleSave = () => {
    navigation("/home"); 
  };
  return (
    <div className="flex" style={{ fontFamily: "cursive" }}>
 
    

    
      <div className="ml-64 p-8 w-full max-w-5xl">
        <h1 className=" text-right text-3xl font-semibold text-gray-800   bg-[#B5B5B6] p-5 rounded-t-xl  " style={{ fontFamily: "cursive" }}>
          إضافة مادة جديدة  
       
        </h1>

        {/* قسم تفاصيل المادة */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* الحقل */}
            <div className="col-span-1">
              <Label htmlFor="issuer" value="الحقل" className="text-xl font-semibold"/>
              <TextInput id="issuer" type="text" sizing="sm" className="mt-2" />
            </div>

            {/* رقم المادة*/}
            <div className="col-span-1">
              <Label htmlFor="matrix-name" value="رقم المادة"  className="text-xl font-semibold"/>
              <TextInput id="matrix-name" type="text" sizing="sm" className="mt-2" />
            </div>

           

           
            {/* موضوع المادة*/}
            <div className="col-span-2">
              <Label htmlFor="notes" value="موضوع المادة" className="text-xl font-semibold" />
              <TextInput id="notes" type="text" sizing="lg" className="mt-2" />
            </div>
      {/* نص المادة*/}
            <div className="col-span-2">
              <Label htmlFor="notes" value="نص المادة"  className="text-xl font-semibold"/>
              <Textarea id="interpretation" required rows={4} className="mt-2" />
            </div>
          </div>
     
          <div className="text-right grid grid-cols-1 gap-6">
            {/* حدود التفويض*/}
            <div className="col-span-2">
              <Label htmlFor="term" value="المصطلح" className="text-xl font-semibold" />
              <TextInput id="term" type="text" sizing="sm" className="mt-2" />
            </div>

            {/* ملاحظات*/}
            <div className="col-span-2">
              <Label htmlFor="interpretation" value="ملاحظات"  className="text-xl font-semibold"/>
              <Textarea id="interpretation" required rows={4} className="mt-2" />
            </div>
      

        </div>

   

       

        </div>
           {/* زر حفظ */}
           <div className="mt-8 text-right justify-center flex">
            <Button type="submit" className="bg-[#6B7280]  hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-500 transform hover:scale-105 w-32" onClick={handleSave}>
              حفظ
            </Button>
            </div>
      </div>
    </div>
  );
}
