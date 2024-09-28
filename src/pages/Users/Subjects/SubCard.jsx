import { Button, Card } from "flowbite-react";

const matrixItems = [
  { id: 1, title: "(1) اسم المادة", organization: "المصفوفة أ", description: "رقم المادة" },
  { id: 2, title: "(2) اسم المادة", organization: "المصفوفة ب", description: "رقم المادة" },
  { id: 3, title: "(3) اسم المادة", organization: "المصفوفة ج", description: "رقم المادة" },
  { id: 4, title: "(4) اسم المادة", organization: "المصفوفة د", description: "رقم المادة" },
  { id: 5, title: "(5) اسم المادة", organization: "المصفوفة هـ", description: "رقم المادة" },
  { id: 6, title: "(6) اسم المادة", organization: "المصفوفة و", description: "رقم المادة" },
  { id: 7, title: "(7) اسم المادة", organization: "المصفوفة ز", description: "رقم المادة" },
  { id: 8, title: "(8) اسم المادة", organization: "المصفوفة ح", description: "رقم المادة" },
];

export function SubCard() {
  return (
    <div className="flex flex-wrap justify-center gap-9 p-9">
      {matrixItems.map((item) => (
        <Card
          key={item.id}
          className="max-w-sm text-center w-full h-80 transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105"
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold text-gray-800 dark:text-gray-200">{item.organization}</span> 
            <p>- {item.description}</p>
          </p>
          <div className="flex justify-center">
            <Button className="bg-[#64748B] w-32 mt-8" href="/subjectInfo">
              التفاصيل
              <svg
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
