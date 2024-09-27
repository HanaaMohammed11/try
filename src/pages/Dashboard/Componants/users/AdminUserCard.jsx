import { Button, Card } from 'flowbite-react'
import React from 'react'

export default function AdminUserCard() {
  return (
    <div className='flex flex-wrap gap-9 p-10 '>    <Card className="w-80">
    <div className="flex justify-end px-4 pt-4">
      {/* <Dropdown inline label="">
        <Dropdown.Item>
          <a
            href="#"
            className="block  text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Edit
          </a>
        </Dropdown.Item>
        <Dropdown.Item>
          <a
            href="#"
            className="block  text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Export Data
          </a>
        </Dropdown.Item>
        <Dropdown.Item>
          <a
            href="#"
            className="block  text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Delete
          </a>
        </Dropdown.Item>
      </Dropdown> */}
    </div>
    <div className="flex flex-col items-center pb-10">
      <img
        alt="Bonnie image"
        height="96"
        src="./src/assets/Signing a contract-rafiki.svg"
        width="96"
        className="mb-3 rounded-full shadow-lg"
      />
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">اكرم</h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">المسمي الوظيفي</span>
      <div className="mt-4 flex space-x-3 lg:mt-6">
        <Button
          href="/edituser"
          className="inline-flex items-center rounded-lg bg-slate-500  text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
     تعديل
        </Button>

        <Button
          href="#"
          className="inline-flex items-center rounded-lg bg-red-700  text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
حذف
        </Button>
   
      </div>
    </div>
   </Card> 
   <Card className="w-80">
    <div className="flex justify-end px-4 pt-4">
      {/* <Dropdown inline label="">
        <Dropdown.Item>
          <a
            href="#"
            className="block  text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Edit
          </a>
        </Dropdown.Item>
        <Dropdown.Item>
          <a
            href="#"
            className="block  text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Export Data
          </a>
        </Dropdown.Item>
        <Dropdown.Item>
          <a
            href="#"
            className="block  text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Delete
          </a>
        </Dropdown.Item>
      </Dropdown> */}
    </div>
    <div className="flex flex-col items-center pb-10">
      <img
        alt="Bonnie image"
        height="96"
        src="./src/assets/Signing a contract-rafiki.svg"
        width="96"
        className="mb-3 rounded-full shadow-lg"
      />
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">اكرم</h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">المسمي الوظيفي</span>
      <div className="mt-4 flex space-x-3 lg:mt-6">
      <Button
          href="/edituser"
          className="inline-flex items-center rounded-lg bg-slate-500  text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
     تعديل
        </Button>

        <Button
          href="#"
          className="inline-flex items-center rounded-lg bg-red-700   text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
حذف
        </Button>
   
      </div>
    </div>
   </Card> <Card className="w-80">
    <div className="flex justify-end px-4 pt-4">
      {/* <Dropdown inline label="">
        <Dropdown.Item>
          <a
            href="#"
            className="block  text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Edit
          </a>
        </Dropdown.Item>
        <Dropdown.Item>
          <a
            href="#"
            className="block  text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Export Data
          </a>
        </Dropdown.Item>
        <Dropdown.Item>
          <a
            href="#"
            className="block  text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Delete
          </a>
        </Dropdown.Item>
      </Dropdown> */}
    </div>
    <div className="flex flex-col items-center pb-10">
      <img
        alt="Bonnie image"
        height="96"
        src="./src/assets/Signing a contract-rafiki.svg"
        width="96"
        className="mb-3 rounded-full shadow-lg"
      />
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">اكرم</h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">المسمي الوظيفي</span>
      <div className="mt-4 flex space-x-3 lg:mt-6">
      <Button
          href="/edituser"
         

          className="inline-flex items-center rounded-lg bg-slate-500  text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
     تعديل
        </Button>

        <Button
          className="inline-flex items-center rounded-lg bg-red-700  text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
حذف
        </Button>
      </div>
    </div>
   </Card> </div>
  )
}
