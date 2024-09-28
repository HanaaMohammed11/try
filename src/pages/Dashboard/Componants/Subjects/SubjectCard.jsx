import { Button, Card } from "flowbite-react";
import { div } from "framer-motion/client";

export function SubjctCard() {
  return (
    <div className="flex-col  pt-9">
    <Card className=" text-right  w-full ">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
اسم المادة(الحقل)
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
رقم المادة      </p>
<div className=" flex space-x-3 ">
      <Button
          href="/editsubject"
         

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
    </Card>
    <Card className=" text-right  w-full  mt-6">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
اسم المادة(الحقل)
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
رقم المادة      </p>
<div className=" flex space-x-3 ">
      <Button
          href="/editsubject"
         

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
    </Card>
    <Card className=" text-right  w-full  mt-6">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
اسم المادة(الحقل)
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
رقم المادة      </p>
<div className=" flex space-x-3 ">
      <Button
          href="/editsubjectr"
         

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
    </Card>
    <Card className=" text-right  w-full mt-6 ">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
اسم المادة(الحقل)
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
رقم المادة      </p>
<div className=" flex space-x-3 ">
      <Button
          href="/editsubject"
         

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
    </Card>
    

    </div>
  );
}