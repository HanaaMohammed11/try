import { Button, Label, Modal, TextInput } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import emailjs from "emailjs-com";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db from "../../../config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";

emailjs.init("vRSobHxRYCwqKML2w");

export default function AddAccounts() {
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]);
  const usersCollection = collection(db, "users");
  const auth = getAuth();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("الاسم الأول مطلوب"),
    lastName: Yup.string().required("الاسم الأخير مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .min(6, "يجب أن يكون الرمز السري 6 أحرف على الأقل")
      .required("الرمز السري مطلوب"),
  });

  const handleRegister = async (values, { setSubmitting }) => {
    const { email, password, firstName, lastName } = values;

    try {
      setError("");
      setSubmitting(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("تم تسجيل المستخدم:", user);

      const docRef = await addDoc(usersCollection, {
        firstname: firstName,
        lastname: lastName,
        email: email,
        id: user.uid,
        accountType: "employee",
        password: password,
      });

      console.log("User added to Firestore with ID:", docRef.id);

      await emailjs.send("service_1go7kvh", "template_wcch0ap", {
        to_Email: email,
        from_name: "CorGov",
        reply_to: email,
        User_Email: email,
        User_passwords: password,
      });

      console.log("تم إرسال البريد الإلكتروني بنجاح!");
    } catch (error) {
      console.error("Error during registration:", error);
      setError("حدث خطأ أثناء تسجيل المستخدم.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("accountType", "==", "employee")
        );
        const querySnapshot = await getDocs(q);
        const employeeList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmployees(employeeList);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <div className=" sm:mx-0 flex justify-center items-center">
      <div
        onClick={() => setOpenModal(true)}
        className="text-lg font-bold sm:mx-5 text-white m-9"
        style={{
          backgroundImage: `url("./src/assets/WhatsApp_Image_2024-10-01_at_8.39.17_AM-removebg-preview.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "79px",
          width: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          cursor: "pointer",
          textAlign: "center",
        }}
      >
        إنشاء حساب مستخدم
      </div>
      </div>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <Modal.Header title="إنشاء حساب موظف" />
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    إنشاء حساب موظف
                  </h3>

                  {error && <div className="text-red-500">{error}</div>}

                  <div>
                    <div className="mb-2 block text-right">
                      <Label htmlFor="firstName" value="الاسم الأول" />
                    </div>
                    <Field
                      name="firstName"
                      type="text"
                      as={TextInput}
                      id="firstName"
                      placeholder="الاسم الأول"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <div className="mb-2 block text-right">
                      <Label htmlFor="lastName" value="الاسم الأخير" />
                    </div>
                    <Field
                      name="lastName"
                      type="text"
                      as={TextInput}
                      id="lastName"
                      placeholder="الاسم الأخير"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <div className="mb-2 block text-right">
                      <Label htmlFor="email" value="البريد الإلكتروني للمستخدم" />
                    </div>
                    <Field
                      name="email"
                      type="email"
                      as={TextInput}
                      id="email"
                      placeholder="name@company.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <div className="mb-2 block text-right">
                      <Label htmlFor="password" value="الرمز السري" />
                    </div>
                    <Field
                      name="password"
                      type="password"
                      as={TextInput}
                      id="password"
                      placeholder="••••••••"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="w-full">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "جاري التسجيل..." : "تسجيل"}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="w-[90%] mx-auto h-auto bg-white p-4 rounded-lg shadow-lg mt-10 xs:overflow-x-auto sm:overflow-x-visible">
          <table className="table-auto w-full max-w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">كلمة المرور</th>
                <th className="px-4 py-2">البريد الإلكتروني</th>
                <th className="px-4 py-2">الاسم</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id} className="border-t">
                    <td className="px-4 py-2">{employee.password}</td>
                    <td className="px-4 py-2 overflow-hidden">{employee.email}</td>
                    <td className="px-4 py-2">
                    {employee.firstname} {employee.lastname}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-2 text-center">
                    لا يوجد مستخدمين
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
