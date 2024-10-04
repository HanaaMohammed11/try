import React, { useEffect, useState, useRef } from "react";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditProxyrForm() {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    proxyEmployeeName: "",
    proxyEmployeeId: "",
    proxyHireDate: "",
    proxyJobGrade: "",
    proxyDepartment: "",
    proxyOfficeNumber: "",
    proxyJobTitle: "",
    proxyPhoneNumber: "",
    proxyCurrentOffice: "",
    proxyProfileImage: "",
  });

  const proxyemployeeFileRef = useRef(null);

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

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const db = getFirestore();
      let updatedUserData = { ...userData };

      const proxyemployeeImage = proxyemployeeFileRef.current?.files[0];
      if (proxyemployeeImage) {
        const storage = getStorage();
        const storageRef = ref(
          storage,
          `employees/${userData.proxyEmployeeId}/profile.jpg`
        );
        await uploadBytes(storageRef, proxyemployeeImage);
        const imageURL = await getDownloadURL(storageRef);
        updatedUserData.proxyProfileImage = imageURL;
      }

      const userId = userData.id; // Ensure the ID is being sent
      await setDoc(doc(db, "proxyEmployees", userId), updatedUserData); // Update the correct collection

      navigate("/proxyemployeeinfo");
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("An error occurred while saving the data. Please try again.");
    }
  };

  const handleEmployeeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUserData((prevUser) => ({ ...prevUser, proxyProfileImage: imageURL }));
    }
  };

  const fields = [
    { id: "proxyEmployeeName", label: "اسم الموظف" },
    { id: "proxyEmployeeId", label: "رقم الموظف" },
    { id: "proxyHireDate", label: "تاريخ التوظيف" },
    { id: "proxyJobGrade", label: "الدرجة الوظيفية" },
    { id: "proxyDepartment", label: "القسم" },
    { id: "proxyOfficeNumber", label: "رقم المكتب" },
    { id: "proxyJobTitle", label: "المسمى الوظيفي" },
    { id: "proxyPhoneNumber", label: "رقم الهاتف" },
    { id: "proxyCurrentOffice", label: "المكتب الحالي" },
  ];

  return (
    <div>
      <form onSubmit={handleSave}>
        {fields.map((field) => (
          <div key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <TextInput
              id={field.id}
              value={userData[field.id]}
              onChange={handleChange}
            />
          </div>
        ))}
        <FileInput ref={proxyemployeeFileRef} onChange={handleEmployeeImageChange} />
        <Button type="submit">حفظ</Button>
      </form>
    </div>
  );
}
