import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AHNavbar from './AHNavbar';  
import Footer from './Footer';  
import { useNavigate } from 'react-router-dom';

export default function AllPatients() {
    const [patientData, setPatientData] = useState([]);
    const [input,setInput] = useState('')
    const [count,setCount] = useState(0)

    const navigate = useNavigate()

    const baseUrl = localStorage.getItem('baseUrl');
    const token = localStorage.getItem('token');

    useEffect(()=>{
        async function fetchdata(){
          try {
            const response = await axios.get(`${baseUrl}/api/v1/hospital/patients`,{
              headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`,
              },
              params:{
                'patient_id':input
              }
            })
            if(response.data.status === 200){
              console.log(input)
              console.log(response)
              setPatientData(response.data.data)
            }
            else{
              console.log(response)
            }
            
          } catch (error) {
            console.log(error)
          }
        }
        fetchdata()
      },[baseUrl,token,input,count])

      const handleDelete=async(id)=>{
        try {
          const response = await axios.delete(`${baseUrl}/api/v1/hospital/deleteP/${id}`,{
            headers:{
              'Content-Type':'application/json',
              'Authorization':`Token ${token}`
            }
          });
          if(response.data.status===200){
            setCount(id)
            console.log(response)
            toast.success("Patient Deleted Successfully !",{
              autoClose:1000,
              position:'top-right',
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

    
    return (
        <div>
            <AHNavbar />
            <section className='py-[200px] bg-gray-50  lg:px-[180px] md:px-[140px] sm:px-[30px] xm:px-[50px]'>
            <div className='  -mt-[50px]'>
          <h1 className='font-bold text-[#102039] text-3xl text-center ' > Patients Information</h1>
            
                <div className='flex sm:block  sm:justify-center   justify-between  items-center px-[300px]   md:ml-[0] lg:px-[20px] mt-[50px] mb-[-45px]'>
                <div className='sm:mb-4'>
                <button className='bg-gray-800 hover:bg-gray-600 rounded-lg px-2 py-1  text-white font-bold'><a href='/addPatient'>Add Patient</a></button>
                </div>
                <div className='flex gap-2'>
                  <label htmlFor="Patient" className='font-semibold text-xl'>Search:</label>
                  <input type="text" id='Patient' value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Search Patient' className='border-2 border-blue-500 rounded    bg-gray-100 px-2 ' />
                </div>
                </div>
                {patientData.length === 0 ?(
                    <div className='text-2xl font-bold mt-[100px] text-center text-red-500'>No Patients To Display!!</div>
                ):(
                    <>
                    
                    
            <div className='lg:overflow-x-auto lg:px-[20px] px-[250px] '>
                <table className='table-auto min-w-full mt-[70px]  p-3 border-collapse border-2 border-gray-300 m-auto'>
                    <thead className='bg-gray-50 border-b-2 border-gray-200'>
                        <tr>
                        <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Patient ID</th>
                            <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Patient Name</th>
                            <th className='p-3  border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Email</th>
                            <th className='p-3  border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Phone</th>
                            <th className='p-3  border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Gender</th>
                            <th className='p-3  border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Address</th>
                            <th className='p-3  border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Action</th>
                        </tr>
                    </thead>
                        <tbody>
                            {patientData.map((itm) => (
                                 <tr className='p-3' key={itm.id}>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{itm.id}</td>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{itm.Name}</td>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{itm.Email}</td>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{itm.Phone}</td>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{itm.Gender}</td>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{itm.Address}</td>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'><i onClick={(e)=>{e.preventDefault();handleDelete(itm.id)}} className="fa-solid fa-trash hover:scale-110 duration-300 text-red-700 text-xl cursor-pointer hover:text-red-500"></i></td>
                                </tr>
                                ))}
                        </tbody>
                </table>                    
            </div>
                    
                    </>
                )
            }
        </div>
            </section>
            <Footer />
        </div>
    );
}
