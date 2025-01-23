import React, { useState } from 'react'
import login from '../images/login.jpg'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import Footer from './Footer'
import { Link } from 'react-scroll'
import HomeNav from './HomeNav'
export default function Login() {
  const [username,setusername] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const baseUrl = localStorage.getItem('baseUrl')


  const handleSubmit = async()=>{
    setLoading(true)
    const data={
      email:username,
      password:password
    }
    try {
      const response = await axios.post(`${baseUrl}api/v1/auth/login`,data,{
        headers:{
          'Content-Type':'application/json'
        }
      });
      if(response.data.status===200){
        setLoading(false)
        console.log(response)
        localStorage.setItem('token',response.data.token)
        if(response.data.is_admin===true){
          localStorage.setItem('admin','t')
          window.location.href='/AH'
        }
        else if(response.data.role==='Doctor'){
          localStorage.setItem('Doctor','t')
          window.location.href='/dH'
        }
        else if(response.data.role==='Pharmacist'){
          localStorage.setItem('Pharmacist','t')
          window.location.href='/PH'
        }
        else {
          // Handle other roles or redirect to a default page
          toast.error("Unauthorized role", {
            autoClose: 3000,
            position: "top-right",
          });
        }
      } 
      else{
        console.log(response)
        toast.error(response.data.message,{
          autoClose:3000,
          position: "top-right",
        })
        setLoading(false)
      }
    } catch (err) {
      console.log("error2",err)
      toast.error("Error",{
        autoClose:3000,
        position: "top-right",
      })
      setLoading(false)
    }
  }

  return (
    <div className='bg-gray-50'>
      <HomeNav/>

     <section className='bg-gray-100 -mb-[50px] min-h-screen flex items-center justify-center'>
        {/* login container */}
        <div className='signup bg-gray-100  flex rounded-2xl shadow-lg p-5'> 
          {/* form */}
          <div className='signup px-16'>
            <h2 className='font-bold text-2xl text-[#002D74]'>Login</h2>
            <p className='text-sm mt-4 text-[#002D74]'>If you already a member, easily log in</p>

            <form action="" className='flex flex-col gap-4'>
              <input className='p-2 mt-8 rounded-xl' value={username} onChange={(e)=>setusername(e.target.value)} name='email' placeholder='Enter your Username' type="text" />

              <input className='p-2 mt-4 rounded-xl' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name='password' placeholder='Enter your Password' />

              <button onClick={(e)=>{e.preventDefault();handleSubmit()}} className='bg-[#002D74] rounded-xl text-white py-2 mt-3 hover:scale-105 duration-300 hover:bg-[#3f649f] font-bold'>
              {
                loading?(<span className='block w-[16px] h-[16px] border-2 border-b-0 border-white mt-[4px] mb-[4px] rounded-full m-auto animate-spin'></span>):("Login")
              }
              </button>
            </form>

            <div>
              <hr className='mt-5 mb-3  border-1 border-[#002D74]' />
              <p>Don't have an Account? <a className='text-[#002D74] font-bold hover:text-blue-600' href="/signup">SignUp</a></p>
            </div>
          </div>

          {/* image */}
          <div className='loginImg max-h-screen w-[300px] '>
            <img  className='rounded-2xl h-[85%] mt-10' src={login} alt="" />
          </div>
        </div>

      </section>
      <Footer/>
    </div>
  )
}
