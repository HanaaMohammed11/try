import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../../config/firebase';

function UserCardItem({ user }) {
  return (
    <Card className="w-80 transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105">
  <div className="flex flex-col items-center pb-10">
    <img
      alt={`${user.employeeName} image`}
      src={user.profileImage}
      className="mb-3 h-24 w-24 rounded-full object-cover shadow-lg"
    />
    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.employeeName}</h5>
    <span className="text-sm text-gray-500 dark:text-gray-400">{user.jobTitle}</span>
    <span className="text-sm text-gray-500 dark:text-gray-400">{user.department}</span>

    <div className="mt-4 flex space-x-3 lg:mt-6">
      <a
        href="/userinfo"
        className="inline-flex items-center rounded-lg bg-slate-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
      >
        التفاصيل
      </a>
    </div>
  </div>
</Card>

  );
}

export default function UserCard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'employees');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
        console.log(users)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-wrap gap-9 p-9 justify-center ">
      {users.length > 0 ? (
        users.map((user) => <UserCardItem key={user.id} user={user} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
