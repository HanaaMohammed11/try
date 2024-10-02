import React, { useEffect, useState, useRef } from "react";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom";
import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditUserForm() {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    employeeName: "",
    employeeId: "",
    hireDate: "",
    jobGrade: "",
    department: "",
    officeNumber: "",
    jobTitle: "",
    phoneNumber: "",
    currentOffice: "",
    profileImage: "",
  });

  const employeeFileRef = useRef(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
    } else {
      console.log("No user data provided!");
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const db = getFirestore();
      let updatedUserData = { ...userData };

      const employeeImage = employeeFileRef.current?.files[0];
      if (employeeImage) {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `employees/${userData.employeeId}/profile.jpg`
        );
        await uploadBytes(storageRef, employeeImage);
        const imageURL = await getDownloadURL(storageRef);
        updatedUserData.profileImage = imageURL;
      }

      const userId = userData.id; 
      await setDoc(doc(db, "employees", user.id), updatedUserData);

      navigate("/userinfo");
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("An error occurred while saving the data. Please try again.");
    }
  };

  console.log("Employee ID:", userData.employeeId);

  const handleEmployeeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUserData((prevUser) => ({ ...prevUser, profileImage: imageURL }));
    }
  };

  const fields = [
    { id: "employeeName", label: "اسم الموظف" },
    { id: "employeeId", label: "رقم الموظف" },
    { id: "hireDate", label: "تاريخ التوظيف" },
    { id: "jobGrade", label: "الدرجة الوظيفية" },
    { id: "department", label: "القسم" },
    { id: "officeNumber", label: "رقم المكتب" },
    { id: "jobTitle", label: "المسمى الوظيفي" },
    { id: "phoneNumber", label: "رقم الهاتف" },
    { id: "currentOffice", label: "المكتب الحالي" },
  ];

  return (
    <div
      className="flex min-h-screen bg-gray-100"
      style={{ fontFamily: "cursive" }}
    >
      <div className="ml-64 p-8 w-full max-w-5xl">
        <h1 className="text-right text-3xl font-semibold text-gray-800 bg-[#B5B5B6] p-5 rounded-t-xl">
          تعديل بيانات الموظف
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col items-center mb-6">
            <Label
              htmlFor="upload-file"
              className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              <FileInput
                id="upload-file"
                ref={employeeFileRef}
                className="hidden"
                onChange={handleEmployeeImageChange}
              />
              <div className="flex items-center justify-center h-full w-full">
                {userData.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt="Employee Profile"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
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
                )}
              </div>
            </Label>
            <p className="text-center mt-2 text-xl text-gray-500 font-semibold">
              صورة الموظف
            </p>
          </div>

          <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ id, label }) => (
              <FormField
                key={id}
                label={label}
                id={id}
                value={userData[id]}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>حفظ</Button>
        </div>
      </div>
    </div>
  );
}

const FormField = ({ label, id, value, onChange, type = "text" }) => (
  <div>
    <Label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </Label>
    <TextInput
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="mt-1"
    />
  </div>
);
