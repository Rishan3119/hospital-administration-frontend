import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PNavbar from './PNavbar';
import PFooter from './PFooter';

export default function AllPr() {

  const { id } = useParams(); 

  const [patients, setPatients] = useState([]);
  
  const [doctors, setDoctors] = useState([]);
  const[medicines,setMedicines] = useState([])
  const [departments,setDepartments] = useState([])

  const [prescription, setPrescription] = useState([]);
  const baseUrl = localStorage.getItem('baseUrl');
  const token = localStorage.getItem('token');


  useEffect(() => {
    async function fetchdata() {
      try {
        
        const response = await axios.get(
          `${baseUrl}/api/v1/hospital/department`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.status === 200) {
          console.log(response);
          setDepartments(response.data.data);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [baseUrl, token]);
  useEffect(()=>{
    async function fetchdata(){
      try {
        const resM = await axios.get(`${baseUrl}/api/v1/hospital/viewmedicine`,{
          headers:{
            "Content-Type":'application/json',
            'Authorization': `Token ${token}`,
          }
        });
        if (resM.data.status === 200) {
          console.log(resM);
          setMedicines(resM.data.data);
        } else {
          console.log(resM);
        }
        
      } catch (error) {
        console.log(error)
      }
    }  
    fetchdata()
  },[baseUrl,token])

  useEffect(() => {
    async function fetchData() {
      try {
        const patientResponse = await axios.get(`${baseUrl}/api/v1/hospital/patients`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          }
        });
        setPatients(patientResponse.data.data);


        const doctorResponse = await axios.get(`${baseUrl}/api/v1/hospital/users`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`,
          }
        });
        setDoctors(doctorResponse.data.data);

        const prescriptionResponse = await axios.get(`${baseUrl}/api/v1/hospital/viewPr`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
          params: {
            patient_id: id, 
          },
        });

        if (prescriptionResponse.data.status === 200) {
          setPrescription(prescriptionResponse.data.data);
        } else {
          setPrescription([]); // Clear prescriptions if none found
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [baseUrl, token, id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='bg-gray-50'>
      <PNavbar/>
      <div className='py-[150px] sm:overflow-x-auto'>
        
        {<h1  className='font-bold text-[#102039] text-3xl sm:text-2xl xm:text-xl text-center'>
           All Prescription History 
        </h1>}
            
        {prescription.length === 0 ? (
          <p className='text-center mt-10 text-xl text-red-600'>No prescriptions available </p>
        ) : (
          <table className='table-auto  w-max mt-[70px] p-3 border-collapse border-2 border-gray-300 m-auto'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr>
              <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Patient Id</th>
                <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Patient</th>
                <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Doctor</th>
                <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Department</th>
                <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Medicine and Consumption Time</th>
                <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Created At</th>
              </tr>
            </thead>
            <tbody>
              {prescription.map(item => (
                <tr key={item.id}>
                   <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                    {patients.find(p => p.id === item.patient)?.id}
                  </td>
                  <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                    {patients.find(p => p.id === item.patient)?.Name}
                  </td>
                  <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                    {doctors.find(d => d.id === item.doctor)?.username}
                  </td>
                  <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                  {departments.find(dep => dep.id === item.dep)?.department }
                  </td>
                  
                  
                  <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                  {
                          medicines.map((itm)=>{
                            if(itm.prescription==item.id){
                              return(
                                <h1 key={itm.id}> {itm.medicine_name}-{itm.consumption_time}</h1>
                              )
                            }
                            
                            
                          })
                        }
                  </td>
                  
                  <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                    {formatDate(item.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <PFooter/>
    </div>
  );
}
