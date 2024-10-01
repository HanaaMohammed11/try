import React, { useEffect, useState } from "react";
import { Button, Label, Textarea, TextInput, Select } from "flowbite-react"; // Import Select from Flowbite
import { useNavigate, useLocation } from "react-router-dom";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import db from "../../../../config/firebase";

export default function SubjectEditForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const subject = location.state?.subject || {};
  const [matrix, setMatrix] = useState([]);
  const [subjectData, setSubjectData] = useState({
    subjectNum: subject.subjectNum || "",
    subjectField: subject.subjectField || "",
    subjectTitle: subject.subjectTitle || "",
    subjectContent: subject.subjectContent || "",
    relatedMatrix: subject.relatedMatrix || "",
    emp1: subject.emp1 || "",
    emp2: subject.emp2 || "",
    notes: subject.notes || "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSubjectData({ ...subjectData, [id]: value });
  };

  const handleSave = async () => {
    const matrixRef = doc(db, "subjects", subject.id); // Reference to the document to be updated

    try {
      // Update document in Firestore
      await updateDoc(matrixRef, subjectData);

      // Navigate back to the dashboard or any other desired route after saving
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };

  useEffect(() => {
    const usersCollectionRef = collection(db, "matrix");

    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const Matrixs = [];
      snapshot.forEach((doc) => {
        Matrixs.push({ id: doc.id, ...doc.data() });
      });
      setMatrix(Matrixs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex" style={{ fontFamily: "cursive" }}>
      <div className="ml-64 p-8 w-full max-w-5xl">
        <h1
          className="text-right text-3xl font-semibold text-gray-800 bg-[#B5B5B6] p-5 rounded-t-xl"
          style={{ fontFamily: "cursive" }}
        >
          تعديل المادة
        </h1>

        {/* قسم تفاصيل المادة */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* الحقل */}
            <div className="col-span-1">
              <Label
                htmlFor="subjectField"
                value="الحقل"
                className="text-xl font-semibold"
              />
              <TextInput
                id="subjectField"
                type="text"
                sizing="sm"
                className="mt-2"
                value={subjectData.subjectField}
                onChange={handleInputChange}
              />
            </div>

            {/* رقم المادة*/}
            <div className="col-span-1">
              <Label
                htmlFor="subjectNum"
                value="رقم المادة"
                className="text-xl font-semibold"
              />
              <TextInput
                id="subjectNum"
                type="text"
                sizing="sm"
                className="mt-2"
                value={subjectData.subjectNum}
                onChange={handleInputChange}
              />
            </div>

            {/* موضوع المادة*/}
            <div className="col-span-2">
              <Label
                htmlFor="subjectTitle"
                value="موضوع المادة"
                className="text-xl font-semibold"
              />
              <TextInput
                id="subjectTitle"
                type="text"
                sizing="lg"
                className="mt-2"
                value={subjectData.subjectTitle}
                onChange={handleInputChange}
              />
            </div>

            {/* نص المادة */}
            <div className="col-span-2">
              <Label
                htmlFor="subjectContent"
                value="نص المادة"
                className="text-xl font-semibold"
              />
              <Textarea
                id="subjectContent"
                required
                rows={4}
                className="mt-2"
                value={subjectData.subjectContent}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="text-right grid grid-cols-1 gap-6">
            {/* المصفوفة المتعلقة */}
            <div className="col-span-2">
              <Label
                htmlFor="relatedMatrix"
                value="المصفوفة المتعلقة"
                className="text-xl font-semibold"
              />
              <Select
                id="relatedMatrix"
                className="mt-2"
                defaultValue={subject.relatedMatrix}
                value={subject.relatedMatrix}
                onChange={handleInputChange}
              >
                {matrix.map((matrixItem) => (
                  <option key={matrixItem.id} value={matrixItem.id}>
                    {matrixItem.title}
                    {/* Assuming the matrix name field */}
                  </option>
                ))}
              </Select>
            </div>

            {/* ملاحظات */}
            <div className="col-span-2">
              <Label
                htmlFor="notes"
                value="ملاحظات"
                className="text-xl font-semibold"
              />
              <Textarea
                id="notes"
                required
                rows={4}
                className="mt-2"
                value={subjectData.notes}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* زر حفظ */}
        <div className="mt-8 text-right justify-center flex">
          <Button
            type="submit"
            className="bg-[#6B7280] hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-500 transform hover:scale-105 w-32"
            onClick={handleSave}
          >
            حفظ
          </Button>
        </div>
      </div>
    </div>
  );
}
