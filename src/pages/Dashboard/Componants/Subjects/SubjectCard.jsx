/* eslint-disable no-unused-vars */
import { Button, Card } from "flowbite-react";
import { div } from "framer-motion/client";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import db from "../../../../config/firebase";
import React, { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SubjctCard() {
  const navigation = useNavigate();

  const [subjects, setSubjects] = useState([]);

  const deleteSubject = async (subjectId) => {
    const matrixRef = doc(db, "subjects", subjectId); // Reference to the document to be deleted

    try {
      await deleteDoc(matrixRef); // Delete document from Firestore
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };
  const Edit = (subjectItem) => {
    navigation("/editsubject", { state: { subject: subjectItem } });
  };
  useEffect(() => {
    const usersCollectionRef = collection(db, "subjects");

    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const subjects = [];
      snapshot.forEach((doc) => {
        subjects.push({ id: doc.id, ...doc.data() });
      });
      setSubjects(subjects);
      // setFilteredMatrix(Matrixs);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="flex-col  pt-9">
      {subjects.length > 0 ? (
        subjects.map((subject, index) => (
          <Card key={index} className="text-right w-full">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {subject.subjectTitle} ({subject.subjectField})
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              رقم المادة: {subject.subjectNum}
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  Edit(subject);
                }}
                className="inline-flex items-center rounded-lg bg-slate-500 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                تعديل
              </Button>

              <Button
                onClick={() => deleteSubject(subject.id)} // Assuming you will create handleDelete function for deletion
                className="inline-flex items-center rounded-lg bg-red-700 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                حذف
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <div className="p-4 text-center text-neutral-600 dark:text-neutral-400">
          لا توجد مواد
        </div>
      )}
    </div>
  );
}
