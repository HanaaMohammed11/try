import React, { useState } from 'react'
import AdminUserCard from './AdminUserCard'
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import MatrixForm from '../Matrix/MatrixForm';
import UserForm from './AddUserForm';

export default function AdminUsers() {
    
  const navigation = useNavigate();
  const Edit = () => {
    navigation("/adduser"); 
  };
  const [showuserForm, setShowuserForm] = useState(false); 

  const handleClick = () => {
    setShowuserForm(!showuserForm);
  };
  return (
    <div className=' p-9' >
 <div className="flex justify-between w-full">
      <IoMdAdd
        className="bg-[#f5bc42] text-white text-6xl p-5 rounded-full"
        onClick={handleClick} 
      />
        <input type="text" name="" id="" className="text-right rounded-full  "  placeholder="بحث عن موظف"/>
    </div>

    <div>      {showuserForm ? <UserForm/> :<AdminUserCard/>} </div>


        
    </div>
  )
}
