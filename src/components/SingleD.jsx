import React, { useEffect, useState } from 'react'
import AHNavbar from './AHNavbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import RFooter from './RFooter'
import { toast } from 'react-toastify'

export default function SingleD() {
    const baseUrl = localStorage.getItem('baseUrl')
  const token = localStorage.getItem('token')
  const [count,setCount] = useState(0)
  const navigate = useNavigate()
  
  const [obj,setObj] = useState({})

  const {id} = useParams()


  const handleDelete=async(id)=>{
    try {
      const response = await axios.delete(`${baseUrl}/api/v1/hospital/DeleteDep/${id}`,{
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Token ${token}`
        }
      });
      if(response.data.status===200){
        setCount(id)
        console.log(response)
        toast.success(" Deleted Successfully !",{
          autoClose:1000,
          position:'top-right',
          onClose: ()=>{
            navigate('/AH')
          }
        });
      }
      else{
        console.log("error1")
        toast.error("Error",{
          autoClose:2000,
          position: "top-right",
        })
      }
      
    } catch (err) {
      console.log("error2",err)
      toast.error("Error",{
        autoClose:2000,
        position: "top-right",
      })
    }
  }
  

  useEffect(()=>{
    async function fetchdata(){
      try{
        const res = await axios.get(`${baseUrl}/api/v1/hospital/SDep/${id}`,{
          headers:{
            'Content-Type':'multipart/form-data',
            'Authorization':`Token ${token}`,
          }, 
        });
        if(res.data.status===200){
          
          console.log(res)
          setObj(res.data.data)
          
        } 
        else{
          console.log(res)
        }
        
      } catch (err) {
        console.log("error2",err)
      }
    }
    fetchdata();
  },[token,baseUrl,id,count])
  return (
    <div>
        <AHNavbar/>

        <section className='py-[100px] bg-gray-50'>
            <div className='  m-auto  px-[50px]'>
            <h1 className='text-3xl font-bold mb-5 mt-10 text-center'>Department Details</h1>
          <div className='w-[500px] max-h-screen m-auto sm:w-[350px] xm:-ml-[30px]  mt-[60px] bg-[#102039] rounded-lg text-white  p-4'>
            <div className='flex gap-2 sm:flex-wrap-reverse px-[20px] py-2'>
                <div>
                    <h1 className='text-2xl font-bold mb-3'>{obj.department}</h1>
                    <p className=''>{obj.desc}</p>
                </div>
                 
                <img className='w-[100px] h-[120px] sm:w-[200px] sm:mb-3 ' src={obj.image} alt="" />
               
            </div>
            <div className='flex items-center gap-3 px-[20px] mt-3'>
                <button className='bg-blue-600 hover:bg-blue-500 rounded-lg px-2 py-1 font-bold'><a href={`/UDep/${id}`}>Update</a></button>
                <button onClick={(e)=>{e.preventDefault();handleDelete(id)}} className='bg-red-600 hover:bg-red-500 rounded-lg px-2 py-1 font-bold'>Delete</button>
            </div>

          </div>
          </div>
        </section>

        <RFooter/>
    </div>
  )
}
