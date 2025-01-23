import React from 'react'
import admin from '../images/admin.png'
import doctor from '../images/doctor.png'
import p from '../images/pharmacist.png'
import Footer from './Footer'
import { Link } from 'react-scroll'
import HomeNav from './HomeNav'
export default function Home() {
  return (
    <div>
     <HomeNav/>

    <div  className='section-1 bg-top-right max-h-screen py-[200px] lg:px-[150px] md:py-[150px] md:px-[100px] sm:px-[50px] px-[250px] bg-blue-100'>
        <div className=''>
          <div className=''>
               <div className='headi max-h-screen xm:py-[20px] overflow-y-hidden'>
                    <h1 className='commit text-[30px] font-semibold text-blue-600 mb-4 sm:text-[20px] xm:text-[15px] '> COMMITTED TO SUCCESS</h1>
                    <h1 className='big text-[#102039] font-bold text-[70px] w-[60%] xm:text-[30x]'>WE CARE ABOUT YOUR <span className='text-[#1F2B7B]'>HEALTH</span></h1>
                    <p className='w-[50%] text-[#212025] mt-4 text-[18px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, omnis accusantium maxime culpa aliquid </p>
                    <button className='bg-blue-700 hover:bg-blue-400  px-10 py-2 font-bold text-white rounded-lg mt-4'><a href='/login'>Login</a></button>
               </div>
          </div>
        </div>
    </div>

    {/* <div className='users px-[180px] bg-gray-50 py-[80px] flex-wrap flex justify-between items-center '>
        <div className='mt-5 w-[200px]  max-h-screen text-center border-2 rounded-lg '>
            <div className='  border-b-2 bg-gray-400'>
                <img className='' src={admin} alt="" />
                </div>
           <div className='p-2'>
                <h1 className='mt-2 font-semibold'>Admin</h1>
                <button className='bg-blue-600 hover:bg-blue-400 text-white px-3 py-1 w-full rounded-lg mt-2'><a href='/login'>View</a></button>
           </div>
        </div>

        <div className='mt-5 w-[200px] max-h-screen text-center border-2 rounded-lg '>
            <div className='border-b-2 bg-gray-400'>
                <img className='h-[200px] ml-3' src={doctor} alt="" />
                </div>
           <div className='p-2'>
                <h1 className='mt-2 font-semibold'>Doctor</h1>
                <button className='bg-blue-600 hover:bg-blue-400 text-white px-3 py-1 w-full rounded-lg mt-2'><a href='/signup'>View</a></button>
           </div>
        </div>

        <div className='mt-5 w-[200px] max-h-screen text-center border-2 rounded-lg '>
            <div className='border-b-2 bg-gray-400'>
                <img className='' src={p} alt="" />
                </div>
           <div className='p-2'>
                <h1 className='mt-2 font-semibold'>Pharmacist</h1>
                <button className='bg-blue-600 hover:bg-blue-400 text-white px-3 py-1 w-full rounded-lg mt-2'><a href='/signupP'>View</a></button>
           </div>
        </div>
    </div> */}

    <Footer/>
    </div>
  )
}
