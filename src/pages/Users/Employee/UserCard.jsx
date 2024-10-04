import React from 'react';
import { Card } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function UserCardItem({ user }) {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate('/userinfo', { state: { user } });
  };

  return (
    <Card className="w-80 transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105">
      <div className="flex flex-col items-center pb-10">
        <img
          alt=""
          src={user.profileImage}
          className="mb-3 h-24 w-24 rounded-full object-cover shadow-lg"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.employeeName}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{user.jobTitle}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{user.department}</span>

        <div className="mt-4 flex space-x-3 lg:mt-6">
          <button
            onClick={handleDetailsClick}
            className="inline-flex items-center rounded-lg bg-slate-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800"
          >
            التفاصيل
          </button>
        </div>
      </div>
    </Card>
  );
}

export default UserCardItem;
