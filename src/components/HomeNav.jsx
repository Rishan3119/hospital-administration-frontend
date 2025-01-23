import React, { useState } from 'react'
import { Link } from 'react-scroll'

export default function HomeNav() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Function to toggle sidebar
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

  return (
    <div>
        <div className='nav-bar'>
        <nav className={`navbar fixed  bg-gray-50 shadow w-full flex justify-between  items-center px-[100px] transition-all duration-500 ${isSidebarOpen ? 'h-[200px]' : 'h-[100px]'}`}>
        <div className='logo flex items-center gap-4'>
              <i className='bx bx-plus-medical text-4xl text-blue-700 border-l-8 border-b-4 border-black rounded-full p-2'></i>
              <h1 className='text-2xl text-[#212529] font-bold'>Hospital Administration</h1>
          </div>
  
        {/* Desktop Navigation */}
        <div className="icons flex gap-[50px] font-semibold ml-[200px]  md:flex">
          <span id="close" className="hidden cursor-pointer mt-[10px] text-red-600">X</span>
          <a href="/" className="hover:text-blue-500 text-xl text-[#102039]">HOME</a>
          <a href="/signup" className="hover:text-blue-500 text-xl text-[#102039]">DOCTOR</a>
          <a href="/signupP" className="hover:text-blue-500 text-xl text-[#102039]">PHARMACIST</a>
          <Link to="about" smooth={true} duration={500} className="cursor-pointer text-xl text-[#102039] hover:text-blue-500">ABOUT US</Link>
        </div>
  
        {/* Menu icon for mobile */}
        <div className="menu hidden" onClick={toggleSidebar}>
          <i className="bx bx-menu text-blue-500 text-4xl font-semibold cursor-pointer"></i>
        </div>
        </nav>
  
        <div className={`fixed top-0 right-0 w-[200px] xm:w-[150px] max-h-screen bg-gray-200 shadow-lg transform transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col  p-4">
            <span className="self-end text-xl cursor-pointer" onClick={toggleSidebar}>X</span>
            <div className='flex flex-col gap-2'>
              <a href="/" className=" hover:text-blue-500 text-[#102039]">HOME</a>
              <a href="/signup" className="hover:text-blue-500 text-[#102039]">DOCTOR</a>
              <a href="/signupP" className="hover:text-blue-500 text-[#102039]">PHARMACIST</a>
              <Link to="about" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500 text-[#102039] ">ABOUT US</Link>
            </div>
          </div>
        </div>
    </div>
      
    </div>
  )
}
