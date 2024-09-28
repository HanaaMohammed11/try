// import { Button, Label, TextInput } from "flowbite-react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from 'react-router-dom';
// import { useState } from "react";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import "./FormStyle.css"; // Assuming you have a CSS file

// export default function Form() {
//     const validationSchema = Yup.object().shape({
//         email: Yup.string().email("بريد إلكتروني غير صالح").required("البريد الإلكتروني مطلوب"),
//         password: Yup.string().min(6, "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل").required("كلمة المرور مطلوبة"),
//     });

//     const { register, handleSubmit, formState: { errors } } = useForm({
//         resolver: yupResolver(validationSchema)
//     });

//     const [loading, setLoading] = useState(false); // To manage the loader state
//     const nav = useNavigate();

//     // Simulate loading effect before navigating to the home page
//     function save() {
//         setLoading(true);
//         setTimeout(() => {
//             nav('/home'); // إعادة التوجيه بعد انتهاء التحميل
//         }, 2000);
//     }

//     return (
//         <div className="form-container">
//             {/* Background Video */}
//             {/* <video autoPlay muted loop className="background-video">
//                 <source src="..\src\assets\تصميم بدون عنوان.mp4" type="video/mp4" />
//                 Your browser does not support the video tag.
//             </video> */}

//             {/* Form Section */}

//             <div className="form-overlay justify-center flex items-center">

//             {/* <div>                        <img src="..\src\assets\Signing a contract-rafiki.svg" alt=""  width={"400px"} />
//             </div> */}
//                 <form onSubmit={handleSubmit(save)}>

//                     <div className="flex w-[500px] flex-col gap-4   p-10 rounded-lg">
//  <img src="..\src\assets\m.png" alt=""  width={"50%"} className="-mt-20 m-auto"/>

//                         <div className="">

//                             <div className="mb-2 block text-right text-yellow-50">
//                                 <Label htmlFor="email1" value="البريد الالكتروني" className="text-white"/>
//                             </div>
//                             <TextInput
//                                 {...register("email")}
//                                 id="email1"
//                                 type="text"
//                                 aria-placeholder="name@.com"
//                                 className="text-right"
//                                 required
//                             />
//                             {errors.email && <p className="text-red-600 text-right">{errors.email.message}</p>}
//                         </div>

//                         <div>
//                             <div className="mb-2 block text-right">
//                                 <Label htmlFor="password1" value="كلمة المرور" className="text-white" />
//                             </div>
//                             <TextInput
//                                 {...register("password")}
//                                 id="password1"
//                                 type="password"
//                                 required
//                             />
//                             {errors.password && <p className="text-red-600 text-right">{errors.password.message}</p>}
//                         </div>

//                         <Button type="submit" style={{ backgroundColor: "#1B8895" ,marginTop:20}}>

//                             {loading ? (
//                             <div className="loader-container">
//                                 <div className="spinner"></div>
//                             </div>
//                         ):"تسجيل"}
//                         </Button>

//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

import { Button, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "./loder";
import "./FormStyle.css";

export default function Form() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("بريد إلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .min(6, "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل")
      .required("كلمة المرور مطلوبة"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  function save() {
    setLoading(true);
    setTimeout(() => {
      nav("/home");
    }, 2000);
  }

  return (
    <div className="form-container">
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
                    value="البريد الالكتروني"
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
                    value="كلمة المرور"
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

              <Button
                type="submit"
                style={{ backgroundColor: "#1B8895", marginTop: 20 }}
              >
                تسجيل
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
