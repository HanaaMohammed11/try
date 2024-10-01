/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaTh, FaBook, FaUsers } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import db, { auth } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
function SideBar({ activeItem, onItemClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const usersCollection = collection(db, "users");
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  // Form submission handler
  const handleRegister = (values, { setSubmitting }) => {
    const { email, password, firstName, lastName } = values;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Handle successful registration
        const user = userCredential.user;
        console.log("User registered:", user);
        await addDoc(usersCollection, {
          firstname: firstName,
          lastname: lastName,
          email: email,
          ID: user.uid,
          accountType: "employee",
          profilePic: "",
          pass:password
        });

        localStorage.setItem("id", user.uid);
        // Close modal or redirect to another page
        setOpenModal(false);
      })
      .catch((error) => {
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error registering user:", errorCode, errorMessage);
      })
      .finally(() => {
        setSubmitting(false); // Set form as not submitting after request finishes
      });
  };
  return (
    <>
      <button
        className="lg:hidden fixed top-4 right-4 z-50 bg-[#f5bc42] p-2 rounded-md text-white"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      <div
        className={`Sidebar w-64 h-full bg-[#696969] text-white fixed transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block hidden`}
      >
        <div className="pt-10">
          {["المصفوفات", "الصلاحيات", "الموظفين", "تعديل المظهر"].map(
            (item) => (
              <div
                key={item}
                className={`flex items-center justify-around p-4 text-lg font-bold cursor-pointer ${
                  activeItem === item
                    ? "bg-white text-[#525353] rounded-r-3xl"
                    : ""
                }`}
                onClick={() => {
                  onItemClick(item);
                  toggleSidebar(); // أغلق الشريط الجانبي عند النقر
                }}
              >
                {item}
                {item === "المصفوفات" && <FaTh className="text-[#f5bc42]" />}
                {item === "الصلاحيات" && <FaBook className="text-[#f5bc42]" />}
                {item === "الموظفين" && <FaUsers className="text-[#f5bc42]" />}
                {item === "تعديل المظهر" && (
                  <IoSettingsSharp className="text-[#f5bc42]" />
                )}
              </div>
            )
          )}
          <button
            onClick={() => {
              setOpenModal(true);
            }}
            className="text-lg font-bold mx-5"
            color={"transparent"}
          >
            إنشاء حساب موظف
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
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

                  {/* First Name Field */}
                  <div>
                    <div className="mb-2 block">
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

                  {/* Last Name Field */}
                  <div>
                    <div className="mb-2 block">
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

                  {/* Email Field */}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="البريد الإلكترونى" />
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

                  {/* Password Field */}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="الرمز السرى" />
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

                  {/* Submit Button */}
                  <div className="w-full">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Registering..." : "Register"}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SideBar;
