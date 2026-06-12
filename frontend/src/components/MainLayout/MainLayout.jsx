import React from 'react'
import HeaderSection from '../Header/HeaderSection'
import { Outlet } from 'react-router-dom'
import FooterSection from '../FooterSection/FooterSection'

function MainLaout() {
  return (
    <div className='flex flex-col'>
        <HeaderSection/>

        <div className='flex-grow'>
            <Outlet/>
        </div>
        <FooterSection/>
    </div>
  )
}

export default MainLaout
