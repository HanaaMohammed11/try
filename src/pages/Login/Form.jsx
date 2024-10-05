import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase"; 
import Loader from "./loder";
import "./FormStyle.css";
import { useTranslation } from "react-i18next";
import { TranslateContext } from "../../TranslateContext/TransContext";
import { div } from "framer-motion/client";

export default function Form() {
  const { t } = useTranslation("global");
  const { handleChangeLanguage } = useContext(TranslateContext); 

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("login.invalidEmail")) 
      .required(t("login.requiredEmail")), 
    password: Yup.string()
      .min(6, t("login.invalidPassword")) 
      .required(t("login.requiredPassword")), 
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const save = async (data) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("User signed in: ", userCredential.user);
      localStorage.setItem("id", auth.currentUser.uid);
      nav("/home");
    } catch (error) {
      setErrorMessage(t("login.loginError") + error.message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
            <div className="pt-4">
          <select
            onChange={(e) => handleChangeLanguage(e.target.value)}
            className="p-2  rounded-md bg-slate-400"
            defaultValue="ar"
          >
            <option value="en">English</option>
            <option value="ar">الغة العربية</option>
          </select></div>
    <div >

      {loading ? (
        <Loader />
      ) : (
        
        <div className="form-overlay justify-center flex items-center">
          <form onSubmit={handleSubmit(save)}>
            <div className="flex w-[500px] flex-col gap-4 p-20 rounded-lg">
              <img
                src="..\src\assets\logo.png"
                alt=""
                width={"100%"}
                className="-mt-20 m-auto"
              />
              <div className="">
                <div className="mb-2 block text-right text-yellow-50">
                  <Label
                    htmlFor="email1"
                    value={t("login.email")} 
                    className="text-white"
                  />
                </div>
                <TextInput
                  {...register("email")}
                  id="email1"
                  type="text"
                  aria-placeholder="name@.com"
                  className="text-right"
                  required
                />
                {errors.email && (
                  <p className="text-red-600 text-right">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="mb-2 block text-right">
                  <Label
                    htmlFor="password1"
                    value={t("login.password")} // Password label translation
                    className="text-white"
                  />
                </div>
                <TextInput
                  {...register("password")}
                  id="password1"
                  type="password"
                  required
                />
                {errors.password && (
                  <p className="text-red-600 text-right">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {errorMessage && (
                <p className="text-red-600 text-center">{errorMessage}</p>
              )}

              <Button
                type="submit"
                style={{ backgroundColor: "#1B8895", marginTop: 20 }}
              >
                {t("login.loginButton")} 
              </Button>
            </div>
          </form>
        </div>
      )}
    </div></div>
  );
}
