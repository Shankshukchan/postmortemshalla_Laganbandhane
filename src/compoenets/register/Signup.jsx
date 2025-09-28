import React from 'react'

const Signup = () => {
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
    <form>
      <div>
        <img
          src="images/Untitled_design-removebg-preview.png"
          alt=""
          className="h-[70px] w-[70px] mb-4 lg:hidden mx-auto"
        />
        <h1 className="text-[#6E1E1E] text-3xl font-bold mb-6 ">Register</h1>
        <input
          className="w-full p-2 mb-6 text[#6E1E1E] border-1 rounded-md border-[#6E1E1E] outline-none focus:bg-gray-300"
          placeholder="Full Name"
          type="text"
          name="FullName"
          required=""
        />
      </div>
      <div>
        <input
          className="w-full p-2 mb-6 text[#6E1E1E] border-1 rounded-md border-[#6E1E1E] outline-none focus:bg-gray-300"
          type="email"
          name="email"
          placeholder="Email"
          required=""
        />
      </div>
      <div>
        <input
          className="w-full p-2 mb-6 text[#6E1E1E] border-1 rounded-md border-[#6E1E1E] outline-none focus:bg-gray-300"
          type="password"
          name="password"
          placeholder="password"
          required=""
        />
      </div>
      <input
        className="w-full p-2 mb-6 text[#6E1E1E] border-1 rounded-md border-[#6E1E1E] outline-none focus:bg-gray-300"
        type="password"
        name="confirm_password"
        placeholder="confirm_Password"
        required=""
      />
      <div>
        <input
          className="w-full bg-[#6E1E1E] hover:bg-pink-700 text-white font-bold py-2 px-4 mb-6 rounded hover:cursor-pointer"
          type="submit"
          name="submit"
          value="Register"
          defaultValue="Register"
        />
      </div>
      <p className="text-[12px] text-right font-bold text-[#6E1E1E] hover:text-[#D4AF37] hover:text-shadow-[_1px_1px_rgb(110_30_30_/_1)] hover:text-shadow-[_-1px_-1px_rgb(110_30_30_/_1)]">
        <a href="">Already have an account? </a>
        <a href="" className=" hover:text-[#D4AF37] hover:text-shadow-[_1px_1px_rgb(110_30_30_/_1)] hover:text-shadow-[_-1px_-1px_rgb(110_30_30_/_1)]">
          Login
        </a>
      </p>
    </form>
  </div>
</div>
</>
  )
}

export default Signup
