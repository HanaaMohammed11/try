/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { doc, updateDoc } from "firebase/firestore";
import db from "../../../../config/firebase";

export default function MatrixEditForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const matrix = location.state?.matrix;

  const [matrixData, setMatrixData] = useState({
    title: matrix.title || "",
    companyName: matrix.companyName || "",
    updateDate: matrix.updateDate || "",
    releaseDate: matrix.releaseDate || "",
    intro: matrix.intro || "",
    notes: matrix.notes || "",
    definitions: matrix.definitions || [{ term: "", interpretation: "" }],
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setMatrixData({ ...matrixData, [id]: value });
  };

  // Handle definition changes
  const handleDefinitionChange = (index, field, value) => {
    const updatedDefinitions = matrixData.definitions.map((def, i) =>
      i === index ? { ...def, [field]: value } : def
    );
    setMatrixData({ ...matrixData, definitions: updatedDefinitions });
  };

  // Add a new definition
  const handleAddDefinition = () => {
    setMatrixData({
      ...matrixData,
      definitions: [
        ...matrixData.definitions,
        { term: "", interpretation: "" },
      ],
    });
  };

  const handleSave = async () => {
    const matrixRef = doc(db, "matrix", matrix.id);

    try {
      await updateDoc(matrixRef, matrixData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating matrix:", error);
    }
  };

  return (
    <div
      className="flex h-full bg-slate-100 "
      style={{ fontFamily: "cursive" }}
    >
      <div className="mx-auto p-8 w-full max-w-5xl">
        <h1 className="text-right text-3xl font-semibold text-gray-800 bg-[#B5B5B6] p-5 rounded-t-xl">
          تعديل المصفوفة
        </h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="xs:col-span-2 md:col-span-1">
              <Label htmlFor="issuer" value="الجهة المُنشئة" />
              <TextInput
                id="companyName"
                type="text"
                value={matrixData.companyName}
                onChange={handleInputChange}
              />
            </div>
            <div className="xs:col-span-2 md:col-span-1">
              <Label htmlFor="title" value="اسم المصفوفة" />
              <TextInput
                id="title"
                type="text"
                value={matrixData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="xs:col-span-2 md:col-span-1">
              <Label htmlFor="modificationDate" value="تاريخ التعديل" />
              <TextInput
                id="updateDate"
                type="date"
                value={matrixData.updateDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="xs:col-span-2 md:col-span-1">
              <Label htmlFor="releaseDate" value="تاريخ الإصدار" />
              <TextInput
                id="releaseDate"
                type="date"
                value={matrixData.releaseDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="introduction" value="المقدمة" />
              <TextInput
                id="intro"
                type="text"
                value={matrixData.intro}
                onChange={handleInputChange}
              />
            </div>
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

          {/* Definitions Section */}
          <h2 className="text-right text-2xl md:text-2xl font-semibold text-gray-800 bg-[#B5B5B6] p-4 md:p-5 rounded-t-xl mt-6 md:mt-9">
            التعريفات
          </h2>

          <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
            {matrixData.definitions.map((definition, index) => (
              <div
                key={index}
                className="text-right grid grid-cols-1 gap-4 mb-4 w-full"
              >
                <div className="col-span-2 w-full">
                  <Label htmlFor={`term-${index}`} value="المصطلح" />
                  <TextInput
                    id={`term-${index}`}
                    type="text"
                    value={definition.term}
                    onChange={(e) =>
                      handleDefinitionChange(index, "term", e.target.value)
                    }
                  />
                </div>
                <div className="col-span-2 w-full">
                  <Label htmlFor={`interpretation-${index}`} value="التفسير" />
                  <Textarea
                    id={`interpretation-${index}`}
                    rows={4}
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

            <div className="mt-4 text-right">
              <Button onClick={handleAddDefinition} className="bg-gray-700">
                إضافة تعريف جديد
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-right flex justify-center">
          <Button className="bg-[#6B7280]" onClick={handleSave}>
            حفظ
          </Button>
        </div>
      </div>
    </div>
  );
}
