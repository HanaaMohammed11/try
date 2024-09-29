/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Label, Textarea, TextInput, Select } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import db from "../../../../config/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function SubjectForm() {
  const navigate = useNavigate();
  const [subjectNum, setSubjectNum] = useState("");
  const [subjectField, setSubjectField] = useState("");
  const [subjectTitle, setSubjectTitle] = useState("");
  const [subjectContent, setSubjectContent] = useState("");
  const [relatedMatrix, setRelatedMatrix] = useState("");
  const [emp1, setEmp1] = useState("");
  const [emp2, setEmp2] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = async () => {
    const data = {
      subjectNum,
      subjectField,
      subjectTitle,
      subjectContent,
      relatedMatrix,
      emp1,
      emp2,
      notes,
    };

    try {
      await addDoc(collection(db, "subjects"), data); // Assuming 'subjects' is your collection name
      alert("تم حفظ البيانات بنجاح");
      navigate("/home");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="flex" style={{ fontFamily: "cursive" }}>
      <div className="ml-64 p-8 w-full max-w-5xl">
        <h1
          className="text-right text-3xl font-semibold text-gray-800 bg-[#B5B5B6] p-5 rounded-t-xl"
          style={{ fontFamily: "cursive" }}
        >
          إضافة مادة جديدة
        </h1>

        {/* Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject Field */}
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
                value={subjectField}
                onChange={(e) => setSubjectField(e.target.value)}
              />
            </div>

            {/* Subject Number */}
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
                value={subjectNum}
                onChange={(e) => setSubjectNum(e.target.value)}
              />
            </div>

            {/* Subject Title */}
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
                value={subjectTitle}
                onChange={(e) => setSubjectTitle(e.target.value)}
              />
            </div>

            {/* Subject Content */}
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
                value={subjectContent}
                onChange={(e) => setSubjectContent(e.target.value)}
              />
            </div>
          </div>

          <div className="text-right grid grid-cols-1 gap-6">
            {/* Related Matrix */}
            <div className="col-span-2 pt-8">
              <Label
                htmlFor="relatedMatrix"
                value="المصفوفة التابعة لها"
                className="text-xl font-semibold"
              />
              <Select
                id="relatedMatrix"
                className="mt-2"
                value={relatedMatrix}
                onChange={(e) => setRelatedMatrix(e.target.value)}
              >
                <option value="matrix1">المصفوفة 1</option>
                <option value="matrix2">المصفوفة 2</option>
                <option value="matrix3">المصفوفة 3</option>
              </Select>
            </div>

            {/* Assigned Employee */}
            <div className="col-span-2 pt-8">
              <Label
                htmlFor="emp1"
                value="الموظف التابع لها"
                className="text-xl font-semibold"
              />
              <Select
                id="emp1"
                className="mt-2"
                value={emp1}
                onChange={(e) => setEmp1(e.target.value)}
              >
                <option value="employee1">الموظف 1</option>
                <option value="employee2">الموظف 2</option>
                <option value="employee3">الموظف 3</option>
              </Select>
            </div>

            {/* Delegate Employee */}
            <div className="col-span-2 pt-8">
              <Label
                htmlFor="emp2"
                value="الموظف المشترك معه"
                className="text-xl font-semibold"
              />
              <Select
                id="emp2"
                className="mt-2"
                value={emp2}
                onChange={(e) => setEmp2(e.target.value)}
              >
                <option value="employee1">الموظف 1</option>
                <option value="employee2">الموظف 2</option>
                <option value="employee3">الموظف 3</option>
              </Select>
            </div>

            {/* Notes */}
            <div className="col-span-2 pt-8">
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
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
