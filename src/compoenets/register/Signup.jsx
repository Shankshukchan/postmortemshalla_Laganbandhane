import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_REGISTER_URL;
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  FullName: yup
    .string()
    .required("Full Name is required")
    .min(2, "Full Name must be at least 2 characters"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
 


const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [imageFile, setImageFile] = React.useState(null);

  async function handleData(data) {
    try {
      const formData = new FormData();
      formData.append('FullName', data.FullName);
      formData.append('email', data.email);
      formData.append('password', data.password);
      if (imageFile) {
        formData.append('profileImage', imageFile);
      }
      const res = await axios.post(apiUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data && res.data.success) {
        await swal('Success', 'User registered successfully!', 'success');
        navigate('/login');
      } else {
        await swal('Error', 'Registration failed. Please try again.', 'error');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === 'User already registered') {
        await swal('User Exists', 'User already exists!', 'warning');
        navigate('/login');
      } else {
        await swal('Error', 'Registration failed. Please try again.', 'error');
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
              <h1 className="text-[#6E1E1E] text-3xl font-bold mb-6 ">Register</h1>
              <input
                className="w-full p-2 mb-1 text[#6E1E1E] border-1 rounded-md border-[#6E1E1E] outline-none focus:bg-gray-300"
                placeholder="Full Name"
                type="text"
                name="FullName"
                {...register("FullName")}
              />
              <div className="mb-2 mt-2">
                <label className="block text-sm font-medium">Profile Image</label>
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  onChange={e => setImageFile(e.target.files[0])}
                  className="mt-1 w-full border rounded px-2 py-1"
                />
              </div>
              {errors.FullName && (
                <p className="text-red-500 text-xs mb-4">{errors.FullName.message}</p>
              )}
            </div>
            <div>
              <input
                className="w-full p-2 mb-1 text[#6E1E1E] border-1 rounded-md border-[#6E1E1E] outline-none focus:bg-gray-300"
                type="email"
                name="email"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mb-4">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                className="w-full p-2 mb-1 text[#6E1E1E] border-1 rounded-md border-[#6E1E1E] outline-none focus:bg-gray-300"
                type="password"
                name="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mb-4">{errors.password.message}</p>
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
              <p className="text-red-500 text-xs mb-4">{errors.confirmPassword.message}</p>
            )}
            <div>
              <input
                className="w-full bg-[#6E1E1E] hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded hover:cursor-pointer"
                type="submit"
                name="submit"
                value="Register"
                defaultValue="Register"
              />
            </div>
            <p className=" flex gap-2 text-[12px] text-right font-bold text-[#6E1E1E] hover:text-[#D4AF37] hover:text-shadow-[_1px_1px_rgb(110_30_30_/_1)] hover:text-shadow-[_-1px_-1px_rgb(110_30_30_/_1)]">
              <p >Already have an account? </p>
              <Link to="/login" className=" hover:text-[#D4AF37] hover:text-shadow-[_1px_1px_rgb(110_30_30_/_1)] hover:text-shadow-[_-1px_-1px_rgb(110_30_30_/_1)]">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup
