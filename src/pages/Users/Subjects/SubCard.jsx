import { collection, getDocs } from "firebase/firestore";
import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import db from "../../../config/firebase";
import { useNavigate } from "react-router-dom";

export function SubCard({ searchTerm }) {
  const [matrixItems, setMatrixItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getSubjects = async () => {
      const querySnapshot = await getDocs(collection(db, "subjects"));
      const subjectsList = querySnapshot.docs.map((doc) => ({
        id: doc.id, 
        ...doc.data()
      }));
      setMatrixItems(subjectsList);
    };

    getSubjects();
  }, []);


  // Filter subjects based on search term
  const filteredSubjects = matrixItems.filter(item => 
    item.subjectTitle.toLowerCase().includes(searchTerm.toLowerCase()) // Filter based on title
  );

  return (
    <div className="flex flex-wrap justify-center gap-9 p-9">
      {filteredSubjects.map((item) => (
        <Card
          key={item.id}
          className="max-w-sm text-center w-full h-80 transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105"
        >
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.subjectTitle}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-bold text-gray-800 dark:text-gray-200">{item.relatedMatrix.companyName}</span> 
            <span> - {item.subjectNum}</span>
          </p>
          <div className="flex justify-center">
            <Button className="bg-[#64748B] w-32 mt-8"  onClick={() => {
                          navigate("/subjectInfo", { state: { subject } });
                        }} >
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