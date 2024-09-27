import React from 'react';
import { Card } from 'flowbite-react';

const users = [
  { id: 1, name: 'اكرم', jobTitle: 'المسمي الوظيفي', imgSrc: './src/assets/Signing a contract-rafiki.svg' },
  { id: 2, name: 'اكرم', jobTitle: 'المسمي الوظيفي', imgSrc: './src/assets/Signing a contract-rafiki.svg' },
  { id: 3, name: 'اكرم', jobTitle: 'المسمي الوظيفي', imgSrc: './src/assets/Signing a contract-rafiki.svg' },
  { id: 4, name: 'اكرم', jobTitle: 'المسمي الوظيفي', imgSrc: 'https://i.pinimg.com/564x/6f/a5/47/6fa547241d136e41e1ee347a4ef6026d.jpg' },
  { id: 5, name: 'اكرم', jobTitle: 'المسمي الوظيفي', imgSrc: 'https://i.pinimg.com/564x/6f/a5/47/6fa547241d136e41e1ee347a4ef6026d.jpg' },
];

function UserCardItem({ user }) {
  return (
    <Card className="w-80 transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105">
      <div className="flex justify-end px-4 pt-4">

      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          alt={`${user.name} image`}
          height="96"
          src={user.imgSrc}
          width="96"
          className="mb-3 rounded-full shadow-lg"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{user.jobTitle}</span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <a
            href="#"
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
  return (
    <div className="flex flex-wrap gap-9 p-9 justify-center ">
      {users.map((user) => (
        <UserCardItem key={user.id} user={user} />
      ))}
    </div>
  );
}
