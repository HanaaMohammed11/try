import React, { useState } from "react";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore"; // Firestore
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase Storage

export default function UserForm() {
  const navigation = useNavigate();
  const [employeeImageURL, setEmployeeImageURL] = useState(null); // عرض صورة الموظف
  const [proxyEmployees, setProxyEmployees] = useState([{ imageURL: null }]); // Array of proxy employees

  // دالة لحفظ بيانات الموظف
  const handleSave = async () => {
    try {
      // Collect employee data
      const employeeData = {
        employeeName: document.getElementById("employee-name").value,
        employeeId: document.getElementById("employee-id").value,
        hireDate: document.getElementById("hire-date").value,
        jobGrade: document.getElementById("job-grade").value,
        department: document.getElementById("department").value,
        officeNumber: document.getElementById("office-number").value,
        jobTitle: document.getElementById("job-title").value,
        phoneNumber: document.getElementById("phone-number").value,
        currentOffice: document.getElementById("current-office").value,
      };
  
      // Log employee data for debugging
      console.log("Employee Data:", employeeData);
  
      const storage = getStorage();
  
      // Upload employee image
      const employeeImage = document.getElementById("upload-file").files[0];
      if (employeeImage) {
        const storageRef = ref(storage, `employees/${employeeData.employeeId}/profile.jpg`);
        await uploadBytes(storageRef, employeeImage);
        const imageURL = await getDownloadURL(storageRef);
        employeeData.profileImage = imageURL;
      }
  
      // Save proxy employee images and data
      employeeData.proxyEmployees = await Promise.all(
        proxyEmployees.map(async (proxyEmployee, index) => {
          const proxyEmployeeData = {
            proxyEmployeeName: document.getElementById(`proxy-employee-name-${index}`).value,
            proxyEmployeeId: document.getElementById(`proxy-employee-id-${index}`).value,
            proxyhiredate: document.getElementById(`proxy-hire-date-${index}`).value,
            proxyjobgrade: document.getElementById(`proxy-job-grade-${index}`).value,
            proxydepartment: document.getElementById(`proxy-department-${index}`).value,
            proxyofficenumber: document.getElementById(`proxy-office-number-${index}`).value,
            proxyjobtitle: document.getElementById(`proxy-job-title-${index}`).value,
            proxycurrentoffice: document.getElementById(`proxy-current-office-${index}`).value,
            proxyphonenumber: document.getElementById(`proxy-phone-number-${index}`).value,
          };
  
          const proxyEmployeeImage = document.getElementById(`upload-file-proxy-${index}`).files[0];
          if (proxyEmployeeImage) {
            const storageRef = ref(storage, `employees/${proxyEmployeeData.proxyEmployeeId}/profile.jpg`);
            await uploadBytes(storageRef, proxyEmployeeImage);
            const proxyImageURL = await getDownloadURL(storageRef);
            proxyEmployeeData.proxyProfileImage = proxyImageURL;
          }
  
          return proxyEmployeeData;
        })
      );
  
      const db = getFirestore();
      
      // Use addDoc to add the employee data to the collection
      const docRef = await addDoc(collection(db, "employees"), employeeData);
      console.log("Document written with ID: ", docRef.id);
  
      // Navigate to the home page
      navigation("/home");
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };
  
  // Handle proxy employee image change
  const handleProxyEmployeeImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      const updatedProxyEmployees = [...proxyEmployees];
      updatedProxyEmployees[index].imageURL = imageURL;
      setProxyEmployees(updatedProxyEmployees);
    }
  };

  // Add new proxy employee section
  const addProxyEmployee = () => {
    setProxyEmployees([...proxyEmployees, { imageURL: null }]);
  };

  return (
    <div className="flex" style={{ fontFamily: "cursive" }}>
      <div className="ml-64 p-8 w-full max-w-5xl">
        <h1 className="text-right text-3xl font-semibold text-gray-800 bg-[#B5B5B6] p-5 rounded-t-xl">
          إضافة بيانات موظف
        </h1>

        {/* Employee Details Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          {/* Upload Section */}
          <div className="flex flex-col items-center mb-6">
            <Label
              htmlFor="upload-file"
              className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              <FileInput id="upload-file" className="hidden" />
              {employeeImageURL ? (
                <img src={employeeImageURL} alt="Employee" className="rounded-full h-full w-full" />
              ) : (
                <div className="flex items-center justify-center h-full w-full">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                </div>
              )}
            </Label>
            <p className="text-center mt-2 text-xl text-gray-500 font-semibold">صورة الموظف</p>
          </div>

          {/* Form Fields */}
          <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="اسم الموظف" id="employee-name" />
            <FormField label="الرقم الوظيفي" id="employee-id" />
            <FormField label="تاريخ التعيين" id="hire-date" type="date" />
            <FormField label="الدرجة الوظيفية" id="job-grade" />
            <FormField label="الادارة الدائرة - القسم" id="department" />
            <FormField label="رقم المكتب" id="office-number" />
            <FormField label="المسمى الوظيفي" id="job-title" />
            <FormField label="رقم الهاتف" id="phone-number" />
            <FormField label="المبني والمكتب المتواجد به" id="current-office" />
          </div>
        </div>

        {/* Proxy Employee Section */}
        <h2 className="text-right text-2xl font-semibold text-gray-800 bg-[#B5B5B6] p-5 rounded-t-xl mt-9">
          الموظف الذى ينوب عنه
        </h2>

        {proxyEmployees.map((proxyEmployee, index) => (
          <div className="bg-white p-8 rounded-lg shadow-md mb-6" key={index}>
            {/* Upload Section for Proxy */}
            <div className="flex flex-col items-center mb-6">
              <Label
                htmlFor={`upload-file-proxy-${index}`}
                className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
              >
                <FileInput id={`upload-file-proxy-${index}`} className="hidden" onChange={(e) => handleProxyEmployeeImageChange(index, e)} />
                {proxyEmployee.imageURL ? (
                  <img src={proxyEmployee.imageURL} alt="Proxy Employee" className="rounded-full h-full w-full" />
                ) : (
                  <div className="flex items-center justify-center h-full w-full">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                  </div>
                )}
              </Label>
              <p className="text-center mt-2 text-xl text-gray-500 font-semibold">صورة الموظف</p>
            </div>

            {/* Form Fields for Proxy Employee */}
            <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="اسم الموظف" id={`proxy-employee-name-${index}`} />
              <FormField label="الرقم الوظيفي" id={`proxy-employee-id-${index}`} />
              <FormField label="تاريخ التعيين" id={`proxy-hire-date-${index}`} type="date" />
              <FormField label="الدرجة الوظيفية" id={`proxy-job-grade-${index}`} />
              <FormField label="الادارة الدائرة - القسم" id={`proxy-department-${index}`} />
              <FormField label="رقم المكتب" id={`proxy-office-number-${index}`} />
              <FormField label="المسمى الوظيفي" id={`proxy-job-title-${index}`} />
              <FormField label="المبني والمكتب المتواجد به" id={`proxy-current-office-${index}`} />
              <FormField label="رقم الهاتف" id={`proxy-phone-number-${index}`} />
            </div>
          </div>
        ))}

        {/* Button to Add More Proxy Employees */}
        <Button className="my-5" onClick={addProxyEmployee}>إضافة موظف آخر</Button>

        {/* Save Button */}
        <Button className="my-5" onClick={handleSave}>حفظ</Button>
      </div>
    </div>
  );
}

// Helper component for rendering input fields
const FormField = ({ label, id, type = "text" }) => (
  <div>
    <Label htmlFor={id} className="mb-2 block">
      {label}
    </Label>
    <TextInput id={id} type={type} required />
  </div>
);
