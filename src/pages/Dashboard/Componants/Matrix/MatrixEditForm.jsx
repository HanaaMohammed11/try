/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../../../config/firebase";

export default function MatrixEditForm() {
  const location = useLocation();
  const navigate = useNavigate(); // <-- useNavigate hook
  const matrix = location.state?.matrix; // Access the passed matrix data

  // State to manage form input values
  const [matrixData, setMatrixData] = useState({
    title: matrix.title || "",
    companyName: matrix.companyName || "",
    updateDate: matrix.updateDate || "",
    releaseDate: matrix.releaseDate || "",
    intro: matrix.intro || "",
    notes: matrix.notes || "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setMatrixData({ ...matrixData, [id]: value });
  };

  const handleSave = async () => {
    const matrixRef = doc(db, "matrix", matrix.id); // Reference to the document to be updated

    try {
      // Update document in Firestore
      await updateDoc(matrixRef, matrixData);

      // Navigate back to the dashboard or any other desired route after saving
      navigate("/dashboard"); // <-- Correctly use navigate here
    } catch (error) {
      console.error("Error updating matrix:", error);
    }
  };

  return (
    <div className="flex h-full bg-slate-100" style={{ fontFamily: "cursive" }}>
      <div className="ml-64 p-8 w-full max-w-5xl">
        <h1 className="text-right text-3xl font-semibold text-gray-800 bg-[#B5B5B6] p-5 rounded-t-xl">
          تعديل المصفوفة
        </h1>
        {/* Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* الجهة المنشئة */}
            <div className="col-span-1">
              <Label htmlFor="issuer" value="الجهة المُنشئة" />
              <TextInput
                id="issuer"
                type="text"
                value={matrixData.companyName}
                onChange={handleInputChange}
              />
            </div>
            {/* اسم المصفوفة */}
            <div className="col-span-1">
              <Label htmlFor="title" value="اسم المصفوفة" />
              <TextInput
                id="title"
                type="text"
                value={matrixData.title}
                onChange={handleInputChange}
              />
            </div>
            {/* باقي الحقول */}
            {/* تاريخ التعديل */}
            <div className="col-span-1">
              <Label htmlFor="modificationDate" value="تاريخ التعديل" />
              <TextInput
                id="modificationDate"
                type="date"
                value={matrixData.updateDate}
                onChange={handleInputChange}
              />
            </div>
            {/* تاريخ الإصدار */}
            <div className="col-span-1">
              <Label htmlFor="releaseDate" value="تاريخ الإصدار" />
              <TextInput
                id="releaseDate"
                type="date"
                value={matrixData.releaseDate}
                onChange={handleInputChange}
              />
            </div>
            {/* المقدمة */}
            <div className="col-span-2">
              <Label htmlFor="introduction" value="المقدمة" />
              <TextInput
                id="introduction"
                type="text"
                value={matrixData.intro}
                onChange={handleInputChange}
              />
            </div>
            {/* الملاحظات */}
            <div className="col-span-2">
              <Label htmlFor="notes" value="ملاحظات" />
              <TextInput
                id="notes"
                type="text"
                value={matrixData.notes}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 text-right flex justify-center">
          <Button className="bg-[#6B7280]" onClick={handleSave}>
            حفظ
          </Button>
        </div>
      </div>
    </div>
  );
}
