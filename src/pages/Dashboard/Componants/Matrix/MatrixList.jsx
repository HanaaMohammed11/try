"use client";

import { IoMdAdd } from "react-icons/io";


import MatrixForm from "./MatrixForm";
import MatrixCard from "./MatrixCard";
import { useState } from "react";
export default function MatrixList() {

  const [showMatrixForm, setShowMatrixForm] = useState(false); 

  const handleClick = () => {
    setShowMatrixForm(!showMatrixForm);
  };
  return (
    <>
    <div className="flex justify-between p-9">
    
    <div className="flex justify-between w-full">
      <IoMdAdd
        className="bg-[#f5bc42] text-white text-6xl p-5 rounded-full"
        onClick={handleClick} 
      />
        <input type="text" name="" id="" className="text-right rounded-full  "  placeholder="بحث عن مصفوفه" />
    </div>


    </div>
  
     


      {showMatrixForm ? <MatrixForm/> : <MatrixCard/>
}
    </>
  );
}

