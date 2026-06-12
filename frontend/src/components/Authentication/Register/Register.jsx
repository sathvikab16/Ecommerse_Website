import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[27%] h-full border border-mauve-300 rounded p-5">
        <div className='text-center mb-3'>
          <h2 className='text-3xl  font-semibold '>Register</h2>
        </div>
        <form action="">
          <div className='flex flex-col gap-2'>
            <label className='text-xs font-sans' htmlFor="">Name <span className='text-[red]'>*</span> </label>
            <input type="name" name="name" id="name" required placeholder='Enter your name' className='text-gray-500 w-full h-10 p-3 outline-0 border border-gray-200  text-xs rounded' />
            
            <label className='text-xs font-sans' htmlFor="">Email <span className='text-[red]'>*</span> </label>
            <input type="email" name="email" id="email" required placeholder='Enter your Email'  className='text-gray-500 w-full  h-10 p-3 outline-0 border border-gray-200 rounded  text-xs' />
            
            <label className='text-xs font-sans' htmlFor="">Password <span className='text-[red]'>*</span> </label>
            <input type="password" name="password" id="password" required placeholder='Enter Strong Password' className='text-gray-500 w-full h-10 p-3 outline-0 border border-gray-200  text-xs rounded'  />
            
            <label className='text-xs font-sans' htmlFor="">Mobile Number <span className='text-[red]'>*</span> </label>
            <input type="mobilenumber" name="number" id="number" required placeholder='Enter Mobile number' className='text-gray-500 w-full h-10 p-3 outline-0 border border-gray-200  text-xs rounded' />
          </div>
        </form>

        <div className=' flex justify-center items-center mt-3'>
          <button className='bg-rose-500 cursor-pointer text-white w-full h-9 mt-2 rounded hover:bg-rose-400'>Sign up</button>
        </div>
        <div className='flex justify-center items-center mt-2'>
          <p className='text-xs font-sans'>Already have an account? <Link to="/signin"><span className=' text-blue-600 '>Sing in</span></Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register
