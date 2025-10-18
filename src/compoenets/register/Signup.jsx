import { useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
const apiUrl = import.meta.env.VITE_REGISTER_URL;
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../../LanguageContext";

// schema will be constructed with translations inside the component

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useContext(LanguageContext);

  const schema = yup.object().shape({
    FullName: yup.string().required(t.requiredFullName).min(2, t.minFullName),
    email: yup.string().email(t.enterValidEmail).required(t.requiredEmail),
    password: yup.string().min(6, t.minPassword).required(t.requiredPassword),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], t.passwordsMustMatch)
      .required(t.confirmPasswordRequired),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleData(data) {
    try {
      const res = await axios.post(apiUrl, {
        FullName: data.FullName,
        email: data.email,
        password: data.password,
      });
      if (res.data && res.data.success) {
        await swal(t.signupSuccessTitle, t.signupSuccessText, "success");
        navigate("/login");
      } else {
        await swal(t.signupErrorTitle, t.signupErrorTryAgain, "error");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "User already registered"
      ) {
        await swal(t.signupUserExistsTitle, t.signupUserExistsText, "warning");
        navigate("/login");
      } else {
        await swal(t.signupErrorTitle, t.signupErrorTryAgain, "error");
      }
    }
  }

  return (
    <>
      <div className="h-[100%] w-[100%] flex justify-around items-center ">
        <div className="h-[50%] w-[25%] hidden lg:block">
          <img
            src="images/Untitled_design-removebg-preview.png"
            alt=""
            className="h-[auto] w-[auto] "
          />
        </div>
        <div className="  p-[5rem]   rounded-3xl shadow-2xl flex justify-center items-center text-center">
          <form onSubmit={handleSubmit(handleData)}>
            <div>
              <img
                src="images/Untitled_design-removebg-preview.png"
                alt=""
                className="h-[70px] w-[70px] mb-4 lg:hidden mx-auto"
              />
              <h1 className="text-[#6E1E1E] text-3xl font-bold mb-6 ">
                {t.registerTitle}
              </h1>
              <input
                className="w-full p-2 mb-1 text[#6E1E1E] border-1 rounded-md border-[#6E1E1E] outline-none focus:bg-gray-300"
                placeholder={t.name}
                type="text"
                name="FullName"
                {...register("FullName")}
              />
              {/* Profile image upload removed */}
              {errors.FullName && (
                <p className="text-red-500 text-xs mb-4">
                  {errors.FullName.message}
                </p>
              )}
            </div>
            <div>
              <input
                className="w-full p-2 mb-1 text[#6E1E1E] border-1 rounded-md border-[#6E1E1E] outline-none focus:bg-gray-300"
                type="email"
                name="email"
                placeholder={t.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mb-4">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <input
                className="w-full p-2 mb-1 text[#6E1E1E] border-1 rounded-md border-[#6E1E1E] outline-none focus:bg-gray-300"
                type="password"
                name="password"
                placeholder={t.password || "Password"}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mb-4">
                  {errors.password.message}
                </p>
              )}
            </div>
            <input
              className="w-full p-2 mb-1 text[#6E1E1E] border-1 rounded-md border-[#6E1E1E] outline-none focus:bg-gray-300"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mb-4">
                {errors.confirmPassword.message}
              </p>
            )}
            <div>
              <input
                className="w-full bg-[#6E1E1E] hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded hover:cursor-pointer"
                type="submit"
                name="submit"
                value={t.registerTitle}
                defaultValue={t.registerTitle}
              />
            </div>
            <p className=" flex gap-2 text-[12px] text-right font-bold text-[#6E1E1E] hover:text-[#D4AF37]">
              <p>{t.newTo} </p>
              <Link to="/login" className=" hover:text-[#D4AF37]">
                {t.loginTitle}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
