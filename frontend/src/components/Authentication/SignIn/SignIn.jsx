// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useState } from 'react'
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// function SignIn() {
//     const [showPassword, setShowPassword] = useState(false);
//     return (
//         <div className="flex justify-center items-center min-h-screen  ">
//             <div className=" w-[27%] h-full  border border-mauve-300 rounded p-5">
//                 <h5 className='text-3xl font-semibold text-center'>Sign In</h5>

//                 <form action="">
//                     <div className=' flex flex-col  mt-8 gap-2'>
//                         <input type="email" name="email" id="email" placeholder='Enter your Email' className='text-gray-500 w-full h-10 p-3 outline-0 border border-gray-200 rounded' />
//                         <div className='relative'>

//                             <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder='Enter your Password' className=' text-gray-500 w-full h-10 p-3 pr-10 outline-0 border border-gray-200 rounded' />
//                             <span onClick={() => setShowPassword(!showPassword)} className='absolute cursor-pointer right-3 top-3 text-gray-400 ' >
//                                 {showPassword ? <FiEye size={15} /> : <FiEyeOff size={15}  />}

//                             </span>
//                         </div>
//                     </div>
//                 </form>
//                 <div className='flex justify-end items-center mt-2'>
//                     <p className='text-xs text-blue-600 underline underline-offset-2 cursor-pointer'>Forgot Password ?</p>
//                 </div>
//                 <div>
//                     <button className="bg-rose-500 cursor-pointer text-white w-full h-9 mt-2 rounded">
//                         Sign In
//                     </button>
//                 </div>

//                 <div className='mt-3 text-xs flex flex-row justify-center items-center'>
//                     <p>Dont have an Account? <Link to="/register"> <span className='text-blue-600 cursor-pointer'>Register here</span></Link></p>
//                 </div>
//             </div>
//         </div>
//     )
    
// }

// export default SignIn

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi';
// import API from "../../api/axios";
import API from "../../../api/axios";
import { toast } from "react-toastify";

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", formData);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", formData.username);

            toast.success("Login Successful ✅");

            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 1000);

        } catch (error) {
            toast.error("Invalid Credentials ❌");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[27%] border rounded p-5">
                <h5 className='text-3xl font-semibold text-center'>Sign In</h5>

                <form onSubmit={handleLogin}>
                    <div className='flex flex-col mt-8 gap-2'>

                        <input
                            type="text"
                            name="username"
                            placeholder='Username'
                            onChange={handleChange}
                            className='w-full h-10 p-3 border rounded outline-0 '
                        />

                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder='Password'
                                onChange={handleChange}
                                className='w-full h-10 p-3 pr-10 border outline-0 rounded'
                            />

                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute cursor-pointer right-3 top-3'
                            >
                                {showPassword ? <FiEye /> : <FiEyeOff />}
                            </span>
                        </div>

                    </div>

                    <button className="bg-rose-500 text-white w-full h-9 mt-4 rounded cursor-pointer">
                        Sign In
                    </button>
                </form>

                <div className='mt-3 text-xs text-center'>
                    <p>
                        Dont have an Account?
                        <Link to="/register">
                            <span className='text-blue-600 ml-1'>Register here</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn;