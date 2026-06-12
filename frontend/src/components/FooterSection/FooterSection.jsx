import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

function FooterSection() {
  return (
    <div className='bg-gray-300 px-8 py-3 flex justify-between items-center'>
      <h1 className='text-xs text-gray-500'>www.e-commers.com</h1>
        <div className='cursor-pointer flex justify-between items-center gap-1'>
            <FaFacebook size={20} className='text-blue-600'/>
            <FaTwitter size={20} className='text-gray-500'/>
            <FaInstagram size={20} className='text-pink-600'/>
            <FaYoutube size={20} className='text-red-500'/>
        </div>
    </div>
    
  )
}

export default FooterSection
