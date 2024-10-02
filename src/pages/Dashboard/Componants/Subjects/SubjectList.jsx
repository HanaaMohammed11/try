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
        <IoMdAdd
          className="bg-[#f5bc42] text-white text-6xl p-5 rounded-full"
          onClick={handleClick}
        />
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
