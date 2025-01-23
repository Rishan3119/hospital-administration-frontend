import React, { useState } from 'react'
import RFooter from './RFooter';
import AHNavbar from './AHNavbar';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddDepartment() {
    const [loading,setLoading] = useState(false)
    const[dep,setDep] = useState('')
    const[desc,setdesc] = useState('')
    const[image,setImage] = useState('')
    const baseUrl = localStorage.getItem("baseUrl");
    const token = localStorage.getItem("token");
   
    const navigate = useNavigate()

    const handleSubmit = async()=>{
        setLoading(true)
        const data={
            department:dep,
            desc:desc,
            image:image
        }
        try {
            const response = await axios.post(`${baseUrl}/api/v1/hospital/addDep`,data,{
              headers:{
                'Content-Type':'multipart/form-data',
                'Authorization':`Token ${token}`
              }
            });
            if(response.data.status===200){
              console.log(response)
              setLoading(false)
              toast.success("Department Added Successfully!",{
                autoClose:1500,
                position:'top-right',
                onClose: ()=>{
                  navigate('/AH')
                }
              });
            }
            else{
                setLoading(false)
              console.log("error1")
              toast.error("Fill the required Fields",{
                autoClose:1500,
                position: "top-right",
              })
            }
            
          } catch (err) {
            setLoading(false)
            console.log("error2",err)
            toast.error("Error",{
              autoClose:2000,
              position: "top-right",
            })
          }
        
    }
  return (
    <div>
      <AHNavbar/>
      <section className='py-[150px] bg-gray-50 px-[230px] overflow-y-auto lg:px-[180px] md:px-[140px] sm:px-[30px] xm:px-[50px]'>
        <h1 className='text-4xl font-bold text-blue-800'>Add Department</h1>
        <form action="">
            {/* first row */}
            <div className='flex lg:gap-4 flex-wrap justify-between items-center mt-10'>
                <div className='flex flex-col'>
                <label htmlFor="DepartmentName"  className='font-bold text-xl '>Department name</label>
                <input type="text" id='DepartmentName' value={dep} onChange={(e)=>setDep(e.target.value)}  placeholder='Department Name' className='mt-2 w-[500px] xm:w-[250px] bg-gray-50 py-1 px-3 rounded border border-blue-400 lg:mb-4' required  />
                </div>
                <div className='flex flex-col'>
                <label htmlFor="image"  className='font-bold text-xl'>Image</label>
                <input  type="file" id='image'  onChange={(e)=>{setImage(e.target.files[0])}} name='image'   className='mt-2 w-[500px] xm:w-[250px] bg-gray-50 py-1 px-3 rounded ' required  />
                </div>
            </div>

            {/* Description field */}
            <div className='mt-10 flex flex-col'>
                <label htmlFor="Description" value="Description" className='font-bold text-xl'>Description</label>
                <textarea name="Description" value={desc} onChange={(e)=>{setdesc(e.target.value)}} id="Description" cols="10" rows="4" className='mt-2  bg-gray-50 xm:w-[250px] py-1 px-3 rounded border border-blue-400' placeholder='Description' required></textarea>
            </div>

            <button onClick={(e)=>{e.preventDefault(); handleSubmit()}} type='submit' className='w-full  mt-8 p-2 font-bold rounded-lg bg-blue-900 xm:w-[250px] hover:bg-blue-700 text-white '> 
            {
            loading?(<span className='block w-[16px] h-[16px] border-2 border-b-0 border-white mt-[4px] mb-[4px] rounded-full m-auto animate-spin'></span>):("Add Department")
          }
            </button>

        </form>

      </section>
      <RFooter/>
    </div>
  )
}
