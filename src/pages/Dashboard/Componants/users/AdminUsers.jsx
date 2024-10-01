/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AdminUserCard from "./AdminUserCard";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserForm from "./AddUserForm";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import db from "../../../../config/firebase";

export default function AdminUsers() {
  const navigation = useNavigate();
  const [showuserForm, setShowuserForm] = useState(false);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, "employees");

    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setUsersData(users);
      // setFilteredMatrix(Matrixs);
    });

    return () => unsubscribe();
  }, [showuserForm]);

  const handleClick = () => {
    setShowuserForm(!showuserForm);
  };

  return (
    <div className="p-9">
      <div className="flex justify-between w-full">
        <IoMdAdd
          className="bg-[#f5bc42] text-white text-6xl p-5 rounded-full"
          onClick={handleClick}
        />
        <input
          type="text"
          name=""
          id=""
          className="text-right rounded-full"
          placeholder="بحث عن موظف"
        />
      </div>

      <div>
        {showuserForm ? (
          <UserForm />
        ) : (
          usersData.map((user) => <AdminUserCard key={user.id} user={user} />)
        )}
      </div>
    </div>
  );
}
