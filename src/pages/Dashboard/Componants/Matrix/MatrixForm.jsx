/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import db from "../../../../config/firebase"; // Ensure firebase is properly configured
import { addDoc, collection } from "firebase/firestore";

export default function MatrixForm() {
  const [definitions, setDefinitions] = useState([
    { term: "", interpretation: "" },
  ]);
  const [companyName, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [intro, setIntro] = useState("");
  const [notes, setNotes] = useState("");

  const navigation = useNavigate();

  const handleSave = async () => {
    const data = {
      title: title,
      companyName: companyName,
      releaseDate: releaseDate,
      updateDate: updateDate,
      intro: intro,
      notes: notes,
      definitions: definitions.map((def) => ({
        term: def.term,
        interpretation: def.interpretation,
      })),
    };

    try {
      await addDoc(collection(db, "matrix"), data); // Replace 'yourCollectionName' with your Firestore collection
      alert("تم حفظ البيانات بنجاح");
      navigation("/home");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleAddDefinition = () => {
    setDefinitions([...definitions, { term: "", interpretation: "" }]);
  };

  const handleDefinitionChange = (index, field, value) => {
    const newDefinitions = [...definitions];
    newDefinitions[index][field] = value;
    setDefinitions(newDefinitions);
  };

  return (
    <div
      className="flex flex-col items-center p-4"
      style={{ fontFamily: "cursive" }}
    >
      <div className="w-full max-w-5xl p-4 md:p-8">
        <h1
          className="text-right text-2xl md:text-3xl font-semibold text-gray-800 bg-[#B5B5B6] p-4 md:p-5 rounded-t-xl"
          style={{ fontFamily: "cursive" }}
        >
          إضافة مصفوفة جديدة
        </h1>

        {/* قسم تفاصيل المصفوفة */}
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
        <div className="text-right grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* الجهة المنشئة */}
            <div className="xs:col-span-2 md:col-span-1 w-full">
              <Label
                htmlFor="issuer"
                value="الجهة المُنشئة"
                className="text-lg md:text-xl font-semibold"
              />
              <TextInput
                id="issuer"
                type="text"
                sizing="sm"
                className="mt-2 w-full"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            {/* اسم المصفوفة */}
            <div className="xs:col-span-2 md:col-span-1 w-full">
              <Label
                htmlFor="matrix-name"
                value="اسم المصفوفة"
                className="text-lg md:text-xl font-semibold"
              />
              <TextInput
                id="matrix-name"
                type="text"
                sizing="sm"
                className="mt-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* تاريخ التعديل */}
            <div className="xs:col-span-2 md:col-span-1 w-full">
              <Label
                htmlFor="modification-date"
                value="تاريخ التعديل"
                className="text-lg md:text-xl font-semibold"
              />
              <TextInput
                id="modification-date"
                type="date"
                className="mt-2 w-full"
                value={updateDate}
                onChange={(e) => setUpdateDate(e.target.value)}
              />
            </div>

            {/* تاريخ الإصدار */}
            <div className="xs:col-span-2 md:col-span-1 w-full">
              <Label
                htmlFor="release-date"
                value="تاريخ الإصدار"
                className="text-lg md:text-xl font-semibold"
              />
              <TextInput
                id="release-date"
                type="date"
                className="mt-2 w-full"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </div>

            {/* المقدمة */}
            <div className="col-span-2 w-full">
              <Label
                htmlFor="introduction"
                value="المقدمة"
                className="text-lg md:text-xl font-semibold"
              />
              <TextInput
                id="introduction"
                type="text"
                sizing="lg"
                className="mt-2 w-full"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
              />
            </div>

            {/* الملاحظات */}
            <div className="col-span-2 w-full">
              <Label
                htmlFor="notes"
                value="ملاحظات"
                className="text-lg md:text-xl font-semibold"
              />
              <TextInput
                id="notes"
                type="text"
                sizing="lg"
                className="mt-2 w-full"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* قسم التعريفات */}
        <h2
          className="text-right text-2xl md:text-2xl font-semibold text-gray-800 bg-[#B5B5B6] p-4 md:p-5 rounded-t-xl mt-6 md:mt-9"
          style={{ fontFamily: "cursive" }}
        >
          التعريفات
        </h2>

        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
          {definitions.map((definition, index) => (
            <div
              key={index}
              className="text-right grid grid-cols-1 gap-4 mb-4 w-full"
            >
              {/* المصطلح */}
              <div className="col-span-2 w-full">
                <Label
                  htmlFor={`term-${index}`}
                  value="المصطلح"
                  className="text-lg md:text-xl font-semibold"
                />
                <TextInput
                  id={`term-${index}`}
                  type="text"
                  sizing="sm"
                  className="mt-2 w-full"
                  value={definition.term}
                  onChange={(e) =>
                    handleDefinitionChange(index, "term", e.target.value)
                  }
                />
              </div>

              {/* التفسير */}
              <div className="col-span-2 w-full">
                <Label
                  htmlFor={`interpretation-${index}`}
                  value="التفسير"
                  className="text-lg md:text-xl font-semibold"
                />
                <Textarea
                  id={`interpretation-${index}`}
                  required
                  rows={4}
                  className="mt-2 w-full"
                  value={definition.interpretation}
                  onChange={(e) =>
                    handleDefinitionChange(
                      index,
                      "interpretation",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}

          {/* زر لإضافة تعريف جديد */}
          <div className="mt-4 text-right">
            <Button onClick={handleAddDefinition} className="bg-gray-700">
              إضافة تعريف جديد
            </Button>
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
