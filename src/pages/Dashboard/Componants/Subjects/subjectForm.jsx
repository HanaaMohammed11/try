/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { Button, Label, Textarea, TextInput, Select } from "flowbite-react";
// import { useNavigate } from "react-router-dom";
// import db from "../../../../config/firebase";
// import { addDoc, collection, onSnapshot } from "firebase/firestore";

// export default function SubjectForm() {
//   const navigate = useNavigate();
//   const [subjectNum, setSubjectNum] = useState("");
//   const [subjectField, setSubjectField] = useState("");
//   const [subjectTitle, setSubjectTitle] = useState("");
//   const [subjectContent, setSubjectContent] = useState("");
//   const [relatedMatrix, setRelatedMatrix] = useState("");
//   const [emp1, setEmp1] = useState("");
//   const [emp2, setEmp2] = useState("");
//   const [notes, setNotes] = useState("");
//   const [matrix, setMatrix] = useState([]);
//   const [employees, setEmployees] = useState([]);

//   const handleSave = async () => {
//     const data = {
//       subjectNum,
//       subjectField,
//       subjectTitle,
//       subjectContent,
//       relatedMatrix,
//       emp1,
//       emp2,
//       notes,
//     };

//     try {
//       await addDoc(collection(db, "subjects"), data); // Assuming 'subjects' is your collection name
//       alert("تم حفظ البيانات بنجاح");
//       navigate("/home");
//     } catch (error) {
//       console.error("Error adding document: ", error);
//     }
//   };

//   useEffect(() => {
//     const usersCollectionRef = collection(db, "matrix");

//     const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
//       const Matrixs = [];
//       snapshot.forEach((doc) => {
//         Matrixs.push({ id: doc.id, ...doc.data() });
//       });
//       setMatrix(Matrixs);
//       // setFilteredMatrix(Matrixs);
//     });

//     return () => unsubscribe();
//   }, []);
//   useEffect(() => {
//     const usersCollectionRef = collection(db, "employees");

//     const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
//       const epmloyees = [];
//       snapshot.forEach((doc) => {
//         epmloyees.push({ id: doc.id, ...doc.data() });
//       });
//       setEmployees(epmloyees);
//       // setFilteredMatrix(Matrixs);
//     });

//     return () => unsubscribe();
//   }, []);
//   return (
//     <div className="flex" style={{ fontFamily: "cursive" }}>
//       <div className="ml-64 p-8 w-full max-w-5xl">
//         <h1
//           className="text-right text-3xl font-semibold text-gray-800 bg-[#B5B5B6] p-5 rounded-t-xl"
//           style={{ fontFamily: "cursive" }}
//         >
//           إضافة مادة جديدة
//         </h1>

//         {/* Form Section */}
//         <div className="bg-white p-8 rounded-lg shadow-md">
//           <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Subject Field */}
//             <div className="col-span-1">
//               <Label
//                 htmlFor="subjectField"
//                 value="الحقل"
//                 className="text-xl font-semibold"
//               />
//               <TextInput
//                 id="subjectField"
//                 type="text"
//                 sizing="sm"
//                 className="mt-2"
//                 value={subjectField}
//                 onChange={(e) => setSubjectField(e.target.value)}
//               />
//             </div>

//             {/* Subject Number */}
//             <div className="col-span-1">
//               <Label
//                 htmlFor="subjectNum"
//                 value="رقم المادة"
//                 className="text-xl font-semibold"
//               />
//               <TextInput
//                 id="subjectNum"
//                 type="text"
//                 sizing="sm"
//                 className="mt-2"
//                 value={subjectNum}
//                 onChange={(e) => setSubjectNum(e.target.value)}
//               />
//             </div>

//             {/* Subject Title */}
//             <div className="col-span-2">
//               <Label
//                 htmlFor="subjectTitle"
//                 value="موضوع المادة"
//                 className="text-xl font-semibold"
//               />
//               <TextInput
//                 id="subjectTitle"
//                 type="text"
//                 sizing="lg"
//                 className="mt-2"
//                 value={subjectTitle}
//                 onChange={(e) => setSubjectTitle(e.target.value)}
//               />
//             </div>

//             {/* Subject Content */}
//             <div className="col-span-2">
//               <Label
//                 htmlFor="subjectContent"
//                 value="نص المادة"
//                 className="text-xl font-semibold"
//               />
//               <Textarea
//                 id="subjectContent"
//                 required
//                 rows={4}
//                 className="mt-2"
//                 value={subjectContent}
//                 onChange={(e) => setSubjectContent(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="text-right grid grid-cols-1 gap-6">
//             {/* Related Matrix */}
//             <div className="col-span-2 pt-8">
//               <Label
//                 htmlFor="relatedMatrix"
//                 value="المصفوفة التابعة لها"
//                 className="text-xl font-semibold"
//               />
//               <Select
//                 id="relatedMatrix"
//                 className="mt-2"
//                 value={relatedMatrix}
//                 onChange={(e) => setRelatedMatrix(e.target.value)}
//               >
//                 {/* <option value="matrix1">المصفوفة 1</option>
//                 <option value="matrix2">المصفوفة 2</option>
//                 <option value="matrix3">المصفوفة 3</option> */}
//                 {matrix.map((item, index) => (
//                   <option key={index} value={item.title}>
//                     {item.title}
//                   </option>
//                 ))}
//               </Select>
//             </div>

//             {/* Assigned Employee */}
//             <div className="col-span-2 pt-8">
//               <Label
//                 htmlFor="emp1"
//                 value="الموظف التابع لها"
//                 className="text-xl font-semibold"
//               />
//               <Select
//                 id="emp1"
//                 className="mt-2"
//                 value={emp1}
//                 onChange={(e) => setEmp1(e.target.value)}
//               >
//                 {/* <option value="employee1">الموظف 1</option>
//                 <option value="employee2">الموظف 2</option>
//                 <option value="employee3">الموظف 3</option> */}
//                 {employees.map((item, index) => (
//                   <option key={index} value={item.employeeId}>
//                     {item.employeeName}
//                   </option>
//                 ))}
//               </Select>
//             </div>

//             {/* Delegate Employee */}
//             <div className="col-span-2 pt-8">
//               <Label
//                 htmlFor="emp2"
//                 value="الموظف المشترك معه"
//                 className="text-xl font-semibold"
//               />
//               <Select
//                 id="emp2"
//                 className="mt-2"
//                 value={emp2}
//                 onChange={(e) => setEmp2(e.target.value)}
//               >
//                 {/* <option value="employee1">الموظف 1</option>
//                 <option value="employee2">الموظف 2</option>
//                 <option value="employee3">الموظف 3</option> */}
//                 {employees.map((item, index) => (
//                   <option key={index} value={item.employeeId}>
//                     {item.employeeName}
//                   </option>
//                 ))}
//               </Select>
//             </div>

//             {/* Notes */}
//             <div className="col-span-2 pt-8">
//               <Label
//                 htmlFor="notes"
//                 value="ملاحظات"
//                 className="text-xl font-semibold"
//               />
//               <Textarea
//                 id="notes"
//                 required
//                 rows={4}
//                 className="mt-2"
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="mt-8 text-right justify-center flex">
//           <Button
//             type="submit"
//             className="bg-[#6B7280] hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-500 transform hover:scale-105 w-32"
//             onClick={handleSave}
//           >
//             حفظ
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Button, Label, Textarea, TextInput, Select } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import db from "../../../../config/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export default function SubjectForm() {
  const navigate = useNavigate();
  const [subjectNum, setSubjectNum] = useState("");
  const [subjectField, setSubjectField] = useState("");
  const [subjectTitle, setSubjectTitle] = useState("");
  const [subjectContent, setSubjectContent] = useState("");
  const [relatedMatrix, setRelatedMatrix] = useState({});
  const [emp1, setEmp1] = useState("");
  const [notes, setNotes] = useState("");
  const [matrix, setMatrix] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [sharedEmployees, setSharedEmployees] = useState([
    { empId: "", role: "" },
  ]);

  const handleSave = async () => {
    const data = {
      subjectNum,
      subjectField,
      subjectTitle, // Subject title to push into the matrix
      subjectContent,
      relatedMatrix, // Make sure this holds the matrix document's ID
      emp1,
      sharedEmployees,
      notes,
    };

    try {
      // Add the new subject document to the "subjects" collection
      const subjectRef = await addDoc(collection(db, "subjects"), data);
      alert("تم حفظ البيانات بنجاح");

      // Get the matrix document reference (make sure relatedMatrix is the document ID, not title)
      const matrixDocRef = doc(db, "matrix", relatedMatrix.id);

      // Check if the matrix document exists
      const matrixDocSnapshot = await getDoc(matrixDocRef);
      if (matrixDocSnapshot.exists()) {
        // Update the matrix document's "subjects" field by adding the subject title to the array
        await updateDoc(matrixDocRef, {
          subjects: arrayUnion(data.subjectTitle),
          MainEmployees: arrayUnion(emp1.employeeId), // Push the subject title into the "subjects" array
        });

        navigate("/home");
      } else {
        alert("The specified matrix does not exist.");
      }
    } catch (error) {
      console.error("Error adding or updating document: ", error);
    }
  };

  const handleAddSharedEmployee = () => {
    setSharedEmployees([...sharedEmployees, { empId: "", role: "" }]);
  };

  const handleSharedEmployeeChange = (index, field, value) => {
    const updatedEmployees = sharedEmployees.map((employee, i) =>
      i === index ? { ...employee, [field]: value } : employee
    );
    setSharedEmployees(updatedEmployees);
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

  useEffect(() => {
    const usersCollectionRef = collection(db, "employees");
    const unsubscribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const epmloyees = [];
      snapshot.forEach((doc) => {
        epmloyees.push({ id: doc.id, ...doc.data() });
      });
      setEmployees(epmloyees);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex" style={{ fontFamily: "cursive" }}>
      <div className="ml-64 p-8 w-full max-w-5xl">
        <h1 className="text-right text-3xl font-semibold text-gray-800 bg-[#B5B5B6] p-5 rounded-t-xl">
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
                value={relatedMatrix.title || ""}
                onChange={(e) => {
                  const selectedMatrix = matrix.find(
                    (item) => item.title === e.target.value
                  );
                  setRelatedMatrix({
                    ...selectedMatrix,
                  });
                }}
              >
                {matrix.map((item) => (
                  <option key={item.id} value={item.title}>
                    {item.title}
                  </option>
                ))}
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
                value={emp1.employeeId || ""}
                onChange={(e) => {
                  const selectedEmp = employees.find(
                    (item) => item.employeeId === e.target.value
                  );
                  setEmp1({
                    ...selectedEmp,
                  });
                }}
              >
                {employees.map((item, index) => (
                  <option key={index} value={item.employeeId}>
                    {item.employeeName}
                  </option>
                ))}
              </Select>
            </div>

            {/* Shared Employees */}
            <div className=" pt-8">
              <Label
                value="الموظفون المشتركون"
                className="text-xl font-semibold"
              />
              {sharedEmployees.map((sharedEmp, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <Label
                    htmlFor={`sharedRole${index}`}
                    value="الدور"
                    className="text-xl font-semibold mt-4"
                  />
                  <Select
                    id={`sharedRole${index}`}
                    className="mt-2 w-32"
                    value={sharedEmp.role} // Use the role from the shared employee state
                    onChange={(e) =>
                      handleSharedEmployeeChange(index, "role", e.target.value)
                    }
                  >
                    {/* Add your roles here */}
                    <option value="مجتمعين">مجتمعين</option>
                    <option value="منفردين">منفردين</option>
                    {/* Add more roles as needed */}
                  </Select>
                  <Select
                    value={sharedEmp.empId}
                    onChange={(e) =>
                      handleSharedEmployeeChange(index, "empId", e.target.value)
                    }
                    className="mt-2"
                  >
                    {employees.map((item) => (
                      <option key={item.id} value={item.employeeId}>
                        {item.employeeName}
                      </option>
                    ))}
                  </Select>
                </div>
              ))}
              <Button
                className="bg-[#6B7280] hover:bg-blue-700 mt-4"
                onClick={handleAddSharedEmployee}
              >
                إضافة موظف مشترك
              </Button>
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
