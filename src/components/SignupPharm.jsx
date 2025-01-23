import React, { useState } from 'react'
import maleP from '../images/phrmcy.jpg'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import HomeNav from './HomeNav'
export default function SignupPharm() {
  const [username,setusername] = useState('')
  const [LastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [errors, setErrors] = useState({});
  const [Phone,setPhone] = useState('')
  const [image,setImage] = useState('')
  const [loading,setLoading] = useState(false)

  const baseUrl = localStorage.getItem('baseUrl')
  const navigate = useNavigate()

  const nameRegex = /^[A-Za-z]{2,}$/; 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const phoneRegex = /^[0-9]{10}$/; 

  const validateForm = () => {
    const newErrors = {};

    if (!username || !nameRegex.test(username)) {
      newErrors.username = '*Username  must contain only letters and be at least 2 characters long';
    }


    if (!email || !emailRegex.test(email)) {
      newErrors.email = '*Enter a valid email';
    }

    if (!Phone || !phoneRegex.test(Phone)) {
      newErrors.Phone = '*Phone number must contain 10 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit=async ()=>{
    if (!validateForm()) {
      return; 
    }
    setLoading(true)
    const data={
      email:email,
      username:username,
      last_name:LastName,
      phone:Phone,
      image:image,
      role:'Pharmacist'
    }
    try {
      const response = await axios.post(`${baseUrl}/api/v1/auth/signupP`,data,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      });
      if(response.data.status===200){
        console.log(response);
        setLoading(false)
        toast.success("pharmacist Registered Succesfully",{
          autoClose:1500,
          position: "top-right",
          onClose: ()=>{
            navigate('/login')
          },
        })
      }else if (response.data.status === 400 && response.data.message === "Email already exists") {
        setLoading(false);
        toast.error("Email already exists", {
          autoClose: 1500,
          position: 'top-right',
        });
      } 
      else{
        toast.error("Error",{
          autoClose:1500,
          position: "top-right",
        })
      }
    } catch (err) {
      console.log("error2",err)
      toast.error("Error",{
        autoClose:1500,
        position: "top-right",
      })
    }
  }
  return (
    <div className='bg-gray-50'>
       <HomeNav/>
     <section className=' bg-gray-100 min-h-screen flex items-center  justify-center'>
        {/* login container */}
        <div className='signup bg-gray-100 mt-[100px] flex rounded-2xl shadow-lg  p-5'> 
          {/* form */}
          <div className='signup px-16'>
            <h2 className='font-bold text-2xl text-[#002D74]'>Pharmacist Registration</h2>
            <p className='text-sm mt-4 text-[#002D74]'>New Pharmacist, easily Register</p>

            <form action="" className='flex flex-col'>
            <input className={`p-2 mt-6 rounded-xl ${errors.username ? 'border-red-500' : ''}`} value={username} name='First Name' placeholder='Enter your Username' type="text" onChange={(e)=>setusername(e.target.value)} />
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}

            <input className='p-2 mt-6 rounded-xl' value={LastName} name='Last Name' placeholder='Enter your Last Name' type="text" onChange={(e)=>setLastName(e.target.value)} />

              <input className={`p-2 mt-6 rounded-xl ${errors.email ? 'border-red-500' : ''}`} value={email} onChange={(e)=>setEmail(e.target.value)} name='email' placeholder='Enter your Email' type="text" />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

              <input  className={`p-2 mt-6 rounded-xl ${errors.Phone ? 'border-red-500' : ''}`} value={Phone} onChange={(e)=>setPhone(e.target.value)} name='phone' placeholder='Enter your mobile Number' type="text" />
              {errors.Phone && <span className="text-red-500 text-sm">{errors.Phone}</span>}
              
                <div className='flex justify-between items-center gap-4'>
                  <label className='text-gray-400 font-bold' htmlFor="image">Image:</label>
                  <input className='p-2 mt-4 rounded-xl' type="file" onChange={(e)=>setImage(e.target.files[0])} name='image' id='image'  />
                </div>
               

              <button onClick={(e)=>{e.preventDefault();handleSubmit()}} className='bg-[#002D74] rounded-xl text-white py-2 mt-3 hover:scale-105 duration-300 hover:bg-[#3f649f] font-bold'>
              {
                loading?(<span className='block w-[16px] h-[16px] border-2 border-b-0 border-white mt-[4px] mb-[4px] rounded-full m-auto animate-spin'></span>):("Register")
              }
              </button>
            </form>

            <div>
              <hr className='mt-5 mb-3  border-1 border-[#002D74]' />
              <p>Already have an Account? <a className='text-[#002D74] font-bold hover:text-blue-600' href="/login">Login</a></p>
            </div>
          </div>

          {/* image */}
          <div className='loginImg max-h-screen w-[300px]'>
            <img  className=' rounded-2xl h-[85%] mt-10 ' src={maleP} alt="" />
          </div>
        </div>

      </section>
        <Footer/>
    </div>
  )
}
