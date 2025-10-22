import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import { LanguageContext } from "../../LanguageContext";
const loginApiUrl = import.meta.env.VITE_USER_LOGIN;
const profileFetchUrl = import.meta.env.VITE_PROFILE_FETCH_URL;

// validation schema will be created inside the component to use translations (t)

const Login = () => {
  const { updateUserImage, setLoginState } = useContext(UserContext);
  const { t } = useContext(LanguageContext);

  // build schema with translated messages
  const schema = yup.object().shape({
    FullName: yup.string().required(t.requiredFullName).min(2, t.minFullName),
    email: yup
      .string()
      .email(t.enterValidEmail)
      .when("isAdminLogin", {
        is: true,
        then: (schema) => schema.notRequired(),
        otherwise: (schema) => schema.required(t.requiredEmail),
      }),
    password: yup.string().min(6, t.minPassword).required(t.requiredPassword),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  async function handleData(data) {
    // New: support admin login toggle via form field 'isAdminLogin'
    try {
      const isAdminLogin = data && data.isAdminLogin;
      if (isAdminLogin) {
        // Admin login endpoint
        const apiBase =
          (import.meta.env && import.meta.env.VITE_API_URL) ||
          "http://localhost:8000";
        const username =
          data.adminUsername || data.FullName || data.email || "LB@gmail.com";
        const res = await axios.post(`${apiBase}/api/admin/login`, {
          username,
          password: data.password,
        });
        if (res.data && res.data.success && res.data.token) {
          localStorage.setItem("token", res.data.token);
          // mark admin mode so Navbar can hide
          localStorage.setItem("isAdmin", "1");
          // clear user context/state
          try {
            localStorage.removeItem("user");
          } catch (e) {}
          setLoginState(false);
          swal({
            title: "Admin signed in",
            icon: "success",
            timer: 1200,
            buttons: false,
          });
          navigate("/admin-dashboard");
          return;
        }
        await swal(t.loginErrorTitle, t.loginErrorTryAgain, "error");
        return;
      }

      // Regular user login flow (existing behavior)
      const res = await axios.post(loginApiUrl, data);
      if (res.data && res.data.success) {
        // Store user data and token in localStorage (ensure correct keys)
        const userData = res.data.data || {};
        try {
          localStorage.setItem("user", JSON.stringify(userData));
        } catch (e) {
          // ignore storage errors
        }
        // Token (backend returns `token`)
        if (res.data.token) {
          try {
            localStorage.setItem("token", res.data.token);
          } catch (e) {}
        }
        // userId for fetching profile later
        const userId = userData._id || userData.id || userData.userId;
        if (userId) {
          try {
            localStorage.setItem("userId", userId);
          } catch (e) {}
        }
        // Save profile image path if returned by backend. If backend does not
        // return an image, prefer any previously stored `localStorage.userImage`
        // so the UI (Navbar/UserDashboard) can show the picture immediately.
        const profileImagePath = userData.profileImage || userData.image || "";
        try {
          if (profileImagePath) {
            // Delegate normalization + persistence to UserContext
            updateUserImage(profileImagePath);
          } else {
            // fallback to whatever was already stored locally (if any)
            const stored = localStorage.getItem("userImage");
            if (stored) updateUserImage(stored);
          }
        } catch (e) {}
        // Set login state in context
        setLoginState(true);
        swal({
          title: t.loginSuccessTitle,
          text: t.loginSuccessText,
          icon: "success",
          timer: 2000,
          buttons: false,
        });
        // Try to fetch latest profile immediately so UI updates without reload
        try {
          const token = localStorage.getItem("token");
          if (userId && profileFetchUrl) {
            try {
              const profileRes = await axios.get(
                `${profileFetchUrl}?userId=${userId}`,
                { headers: token ? { Authorization: `Bearer ${token}` } : {} }
              );
              if (
                profileRes &&
                profileRes.data &&
                profileRes.data.success &&
                profileRes.data.data
              ) {
                const profileImg =
                  profileRes.data.data.profileImage ||
                  profileRes.data.data.image ||
                  "";
                if (profileImg) updateUserImage(profileImg);
              }
            } catch (e) {
              // ignore profile fetch error — Home will fetch on mount or reload
            }
          }
        } catch (e) {}

        // Set a flag so Home can reload itself after navigation if needed
        try {
          localStorage.setItem("reloadAfterLogin", "1");
        } catch (e) {
          // ignore storage errors (e.g., private mode)
        }
        // Navigate to home so profile UI is visible
        navigate("/");
      } else {
        await swal(t.loginErrorTitle, t.loginErrorTryAgain, "error");
      }
    } catch (error) {
      // Handle common axios errors
      const errMsg = error?.response?.data?.message;
      if (errMsg === "Invalid email or password") {
        await swal(t.loginFailedTitle, t.loginInvalidCredentials, "warning");
      } else if (errMsg === "User not found, please register") {
        await swal(t.loginNotFoundTitle, t.loginNotFoundText, "info");
        navigate("/signup");
      } else {
        await swal(t.loginErrorTitle, t.loginErrorTryAgain, "error");
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
                {t.loginTitle}
              </h1>
              <input
                className="w-full p-2 mb-1 text[#6E1E1E] border-1 rounded-md border-[#6E1E1E] outline-none focus:bg-gray-300"
                placeholder={t.name}
                type="text"
                name="FullName"
                {...register("FullName")}
              />
              {errors.FullName && (
                <p className="text-red-500 text-xs mb-4">
                  {errors.FullName.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="isAdminLogin"
                {...register("isAdminLogin")}
              />
              <label htmlFor="isAdminLogin" className="text-sm">
                Admin login
              </label>
            </div>
            {/* Show adminUsername only when admin login is checked; hide email then */}

            {!watch("isAdminLogin") && (
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
            )}
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
            <p className="text-[12px] text-right font-bold text-[#6E1E1E] hover:text-[#D4AF37] hover:text-shadow-[_1px_1px_rgb(110_30_30_/_1)] hover:text-shadow-[_-1px_-1px_rgb(110_30_30_/_1)]">
              <Link to="/forgot-password">{t.forgotPassword}</Link>
            </p>
            <div>
              <input
                className="w-full bg-[#6E1E1E] hover:bg-[#D4AF37] border-1 border-[#6E1E1E] text-white  hover:text-[#6E1E1E] font-bold py-2 px-4 mb-6 rounded hover:cursor-pointer"
                type="submit"
                name="submit"
                value={t.loginTitle}
                defaultValue={t.loginTitle}
              />
            </div>
            <p className="text-[12px] text-right font-bold text-[#6E1E1E] flex gap-2">
              <span>{t.newTo} </span>
              <Link
                to="/signup"
                className=" hover:text-[#D4AF37] hover:text-shadow-[_1px_1px_rgb(110_30_30_/_1)] hover:text-shadow-[_-1px_-1px_rgb(110_30_30_/_1)]"
              >
                {t.signUp}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
