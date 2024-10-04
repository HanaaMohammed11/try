/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import SubjectForm from "./subjectForm";
import { SubjctCard } from "./SubjectCard";

export default function SubjectList() {
  const [showMatrixForm, setShowMatrixForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 


  const handleClick = () => {
    setShowMatrixForm(!showMatrixForm);
  };
  return (
    <div className=" p-9">
      <div className="flex justify-between w-full">
      <div
  className="text-lg font-bold mx-5 text-white "
  style={{
    backgroundImage: `url("./src/assets/WhatsApp_Image_2024-10-01_at_8.39.17_AM-removebg-preview.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "79px",
          width: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          cursor: "pointer",
          textAlign: "center",
  }}
  onClick={handleClick}
>اضافة مادة </div>
          <div className='search flex justify-center mt-9'>
        <input
          type="text"
          placeholder='بحث عن مادة'
          className="w-96 rounded-full text-right"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term state on change
        />
      </div>
      </div>

      {showMatrixForm ? <SubjectForm /> : <SubjctCard />}
    </div>
  );
}
