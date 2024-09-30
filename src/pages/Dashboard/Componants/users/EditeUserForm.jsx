import React, { useEffect, useState } from "react";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditUserForm({ employeeId }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    employeeName: "",
    employeeId: "",
    hireDate: "",
    jobGrade: "",
    department: "",
    officeNumber: "",
    jobTitle: "",
    phoneNumber: "",
    currentOffice: "",
    proxyEmployeeName: "",
    proxyEmployeeId: "",
    proxyHireDate: "",
    proxyJobGrade: "",
    proxyDepartment: "",
    proxyOfficeNumber: "",
    proxyJobTitle: "",
    proxyPhoneNumber: "",
    proxyCurrentOffice: "",
    subscriptionType: "",
    profileImage: "",
    proxyProfileImage: "",
  });

  useEffect(() => {
    const employeeData = location.state?.employee; // Assume employee data is passed via state
    if (employeeData) {
      setUser({
        employeeName: employeeData.employeeName,
        employeeId: employeeData.employeeId,
        hireDate: employeeData.hireDate,
        jobGrade: employeeData.jobGrade,
        department: employeeData.department,
        officeNumber: employeeData.officeNumber,
        jobTitle: employeeData.jobTitle,
        phoneNumber: employeeData.phoneNumber,
        currentOffice: employeeData.currentOffice,
        profileImage: employeeData.profileImage || '',
      });
    }
  }, [location.state]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "employees", employeeId));
      if (userDoc.exists()) {
        setUser(userDoc.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchUserData();
  }, [employeeId]);

  // دالة لتغيير حالة المستخدم
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  // دالة للحفظ
  const handleSave = async () => {
    try {
      const db = getFirestore();

      // رفع صورة الموظف
      const employeeImage = document.getElementById("upload-file").files[0];
      if (employeeImage) {
        const storage = getStorage();
        const storageRef = ref(storage, `employees/${user.employeeId}/profile.jpg`);
        await uploadBytes(storageRef, employeeImage);
        const imageURL = await getDownloadURL(storageRef);
        user.profileImage = imageURL; // تحديث الصورة في الكائن user
      }

      // رفع صورة الموظف البديل
      const proxyEmployeeImage = document.getElementById("upload-proxy-file").files[0];
      if (proxyEmployeeImage) {
        const storage = getStorage();
        const storageRef = ref(storage, `employees/${user.proxyEmployeeId}/profile.jpg`);
        await uploadBytes(storageRef, proxyEmployeeImage);
        const proxyImageURL = await getDownloadURL(storageRef);
        user.proxyProfileImage = proxyImageURL; // تحديث الصورة في الكائن user
      }

      // حفظ البيانات في Firestore
      await setDoc(doc(db, "employees", user.employeeId), user);

      // توجيه المستخدم إلى الصفحة الرئيسية
      navigate("/home");
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  // دالة لعرض صورة الموظف عند اختيارها
  const handleEmployeeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUser((prevUser) => ({ ...prevUser, profileImage: imageURL })); // تحديث حالة الصورة
    }
  };

  // دالة لعرض صورة الموظف البديل عند اختيارها
  const handleProxyEmployeeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUser((prevUser) => ({ ...prevUser, proxyProfileImage: imageURL })); // تحديث حالة الصورة
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100" style={{ fontFamily: "cursive" }}>
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
              <FileInput id="upload-file" className="hidden" onChange={handleEmployeeImageChange} />
              <div className="flex items-center justify-center h-full w-full">
                {user.profileImage ? (
                  <img src={user.profileImage} alt="Employee Profile" className="h-full w-full rounded-full object-cover" />
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
            <p className="text-center mt-2 text-xl text-gray-500 font-semibold">صورة الموظف</p>
          </div>

          <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="اسم الموظف" id="employeeName" value={user.employeeName} onChange={handleChange} />
            <FormField label="الرقم الوظيفي" id="employeeId" value={user.employeeId} onChange={handleChange} />
            <FormField label="تاريخ التعيين" id="hireDate" type="date" value={user.hireDate} onChange={handleChange} />
            <FormField label="الدرجة الوظيفية" id="jobGrade" value={user.jobGrade} onChange={handleChange} />
            <FormField label="الادارة الدائرة - القسم" id="department" value={user.department} onChange={handleChange} />
            <FormField label="رقم المكتب" id="officeNumber" value={user.officeNumber} onChange={handleChange} />
            <FormField label="المسمى الوظيفي" id="jobTitle" value={user.jobTitle} onChange={handleChange} />
            <FormField label="رقم الهاتف" id="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
            <FormField label="المبني والمكتب المتواجد به" id="currentOffice" value={user.currentOffice} onChange={handleChange} />
          </div>
        </div>

        <h2 className="text-right text-2xl font-semibold text-gray-800 bg-[#B5B5B6] p-5 rounded-t-xl mt-9">
          الموظف الذى ينوب عنه
        </h2>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col items-center mb-6">
            <Label
              htmlFor="upload-proxy-file"
              className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              <FileInput id="upload-proxy-file" className="hidden" onChange={handleProxyEmployeeImageChange} />
              <div className="flex items-center justify-center h-full w-full">
                {user.proxyProfileImage ? (
                  <img src={user.proxyProfileImage} alt="Proxy Employee Profile" className="h-full w-full rounded-full object-cover" />
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
            <p className="text-center mt-2 text-xl text-gray-500 font-semibold">صورة الموظف البديل</p>
          </div>

          <div className="text-right grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="اسم الموظف البديل" id="proxyEmployeeName" value={user.proxyEmployeeName} onChange={handleChange} />
            <FormField label="الرقم الوظيفي البديل" id="proxyEmployeeId" value={user.proxyEmployeeId} onChange={handleChange} />
            <FormField label="تاريخ تعيين البديل" id="proxyHireDate" type="date" value={user.proxyHireDate} onChange={handleChange} />
            <FormField label="الدرجة الوظيفية البديلة" id="proxyJobGrade" value={user.proxyJobGrade} onChange={handleChange} />
            <FormField label="الادارة الدائرة - القسم البديل" id="proxyDepartment" value={user.proxyDepartment} onChange={handleChange} />
            <FormField label="رقم المكتب البديل" id="proxyOfficeNumber" value={user.proxyOfficeNumber} onChange={handleChange} />
            <FormField label="المسمى الوظيفي البديل" id="proxyJobTitle" value={user.proxyJobTitle} onChange={handleChange} />
            <FormField label="رقم الهاتف البديل" id="proxyPhoneNumber" value={user.proxyPhoneNumber} onChange={handleChange} />
            <FormField label="المبني والمكتب البديل" id="proxyCurrentOffice" value={user.proxyCurrentOffice} onChange={handleChange} />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSave}>حفظ</Button>
        </div>
      </div>
    </div>
  );
}

// مكون لحقول النموذج
const FormField = ({ label, id, value, onChange, type = "text" }) => (
  <div>
    <Label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </Label>
    <TextInput id={id} type={type} value={value} onChange={onChange} className="mt-1" />
  </div>
);
