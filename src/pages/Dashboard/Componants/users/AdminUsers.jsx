import React, { useEffect, useState } from 'react';
import AdminUserCard from './AdminUserCard';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserForm from './AddUserForm';
import { getFirestore, collection, getDocs } from "firebase/firestore"; 

export default function AdminUsers() {
  const navigation = useNavigate();
  const [showuserForm, setShowuserForm] = useState(false);
  const [usersData, setUsersData] = useState([]); 

  const fetchUsers = async () => {
    const db = getFirestore();
    const usersCollection = collection(db, 'employees');
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => doc.data());
    setUsersData(userList);
  };

  useEffect(() => {
    fetchUsers(); 
  }, [showuserForm]);

  const handleClick = () => {
    setShowuserForm(!showuserForm);
  };

  return (
    <div className='p-9'>
      <div className="flex justify-between w-full">
        <IoMdAdd
          className="bg-[#f5bc42] text-white text-6xl p-5 rounded-full"
          onClick={handleClick} 
        />
        <input type="text" name="" id="" className="text-right rounded-full" placeholder="بحث عن موظف" />
      </div>
      
      <div>
        {showuserForm ? <UserForm /> : usersData.map(user => <AdminUserCard key={user.employeeId} user={user} />)}
      </div>
    </div>
  );
}
