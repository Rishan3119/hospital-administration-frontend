import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AHNavbar from './AHNavbar';  
import Footer from './Footer';  

export default function AllAppointments() {
    const [input,setInput] = useState('')
    const [appointment, setAppointment] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [count,setCount] = useState(0)

    const baseUrl = localStorage.getItem('baseUrl');
    const token = localStorage.getItem('token');

    useEffect(()=>{
        async function fetchdata(){
          try {
            const res1 = await axios.get(`${baseUrl}/api/v1/hospital/AllAppo`,{
              headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`,
              },
              params:{
                'patient_id':input,
              }
            })
            if(res1.data.status === 200){
              console.log(input)
              console.log(res1)
              setAppointment(res1.data.data)
            }
            else{
              console.log(res1)
            }
            const response = await axios.get(`${baseUrl}/api/v1/hospital/department`,{
                headers:{
                  'Content-Type':'multipart/form-data',
                }
              });
              if(response.data.status === 200){
                console.log(input)
                console.log(response)
                setDepartments(response.data.data)
              }
              else{
                console.log(response)
              }
              const res = await axios.get(`${baseUrl}/api/v1/hospital/patients`,{
                  headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${token}`,
                  },
                });
                if(res.data.status === 200){
                  console.log(input)
                  console.log(res)
                  setPatients(res.data.data)
                }
                else{
                  console.log(res)
                }
                const res2 = await axios.get(`${baseUrl}/api/v1/hospital/users`,{
                  headers:{
                    'Content-Type':'multipart/form-data',
                    'Authorization':`Token ${token}`,
                  },
                });
                if(res2.data.status === 200){
                  console.log(input)
                  console.log(res2)
                  setDoctors(res2.data.data)
                }
                else{
                  console.log(res2)
                }
            
            
          } catch (error) {
            console.log(error)
          }
        }
        fetchdata()
      },[baseUrl,token,input,count])


      const handleDelete=async(id)=>{
        try {
          const response = await axios.delete(`${baseUrl}/api/v1/hospital/deleteAppo/${id}`,{
            headers:{
              'Content-Type':'application/json',
              'Authorization':`Token ${token}`
            }
          });
          if(response.data.status===200){
            setCount(id)
            console.log(response)
            toast.success("appointment Deleted Successfully !",{
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

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    
    return (
        <div>
            <AHNavbar />
            <section className='py-[200px] bg-gray-50  lg:px-[180px] md:px-[140px] sm:px-[30px] xm:px-[50px]'>
            <div className='  -mt-[50px]'>
          <h1 className='font-bold text-[#102039] text-3xl text-center ' > Appointment History</h1>
            
                <div className='flex sm:block  sm:justify-center   justify-between  items-center px-[300px]   md:ml-[0] lg:px-[20px] mt-[50px] mb-[-45px]'>
                <div className='sm:mb-4'>
                <button className='bg-gray-800 hover:bg-gray-600 rounded-lg px-2 py-1  text-white font-bold'><a href='/appointment'>Book Appointment</a></button>
                </div>
                <div className='flex gap-2'>
                  <label htmlFor="appointment" className='font-semibold text-xl'>Search:</label>
                  <input type="text" id='appointment' value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Search appointment using patient Id' className='border-2 border-blue-500 rounded w-[280px]   bg-gray-100 px-2 ' />
                </div>
                </div>
                {appointment.length === 0 ?(
                    <div className='text-2xl font-bold mt-[100px] text-center text-red-500'>No Appointments Booked!!</div>
                ):(
                    <>
                    
            <div className='lg:overflow-x-auto lg:px-[20px] px-[250px] '>
                <table className='table-auto w-max mt-[70px]  p-3 border-collapse border-2 border-gray-300 m-auto'>
                    <thead className='bg-gray-50 border-b-2 border-gray-200'>
                        <tr>
                        <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Appointment ID</th>
                        <th className='p-3  border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Patient</th>
                            <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Doctor</th>
                            <th className='p-3  border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Department</th>
                            <th className='p-3  border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Token Number</th>
                            <th className='p-3  border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Date</th>
                            <th className='p-3  border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Status</th>
                            <th className='p-3  border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Action</th>
                        </tr>
                    </thead>
                        <tbody>
                            
                                 {
                                    appointment.map((itm)=>{
                                        return(
                                    <tr className='p-3' key={itm.id}>
                                        <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                                        {itm.id}
                                    </td>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                                    {patients.find(item=>item.id===itm.patient)?.Name}
                                    </td>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                                        {doctors.find(item=>item.id===itm.doctor)?.username}
                                    </td>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                                    {departments.find(item=>item.id===itm.department)?.department}
                                    </td>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{itm.token_number}</td>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{formatDate(itm.date)}</td>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                                    {
                                        itm.is_status === false ? (
                                            <h1 className='font-bold text-orange-400'>Pending</h1>
                                        ) : (
                                            <h1 className='font-bold text-green-500'>Consulted</h1>
                                        )
                                    }
                                    </td>
                                    <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'><i className="fa-solid fa-trash hover:scale-110 duration-300 text-red-700 text-xl cursor-pointer hover:text-red-500" onClick={(e)=>{e.preventDefault();handleDelete(itm.id)}}></i></td>
                                </tr>

                                        )
                                    })
                                    
                                }
                                
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
