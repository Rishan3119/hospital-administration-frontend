import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DNavbar from './DNavbar';
import DFooter from './DFooter';

export default function ALLPrHistory() {

  const { id } = useParams(); 

  const [patients, setPatients] = useState([]);
  const [SPatient,setSpatient] = useState([]);
  
  const [doctors, setDoctors] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const baseUrl = localStorage.getItem('baseUrl');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchdata() {
      try {
        const res2 = await axios.get(
          `${baseUrl}/api/v1/hospital/Spatient/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Token ${token}`,
            },
          }
        );
        console.log("API response:", res2.data);
        if (res2.data.status === 200) {
          console.log(res2);
          setSpatient(res2.data.data);
        } else {
          console.log(res2);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [baseUrl, token]);

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
      <DNavbar/>
      <div className='py-[150px] sm:overflow-x-auto'>
        
        {<h1  className='font-bold text-[#102039] text-3xl sm:text-2xl xm:text-xl text-center'>
          Prescription History of {SPatient.Name}
        </h1>}
            
        {prescription.length === 0 ? (
          <p className='text-center mt-10 text-xl text-red-600'>No prescription available for this patient!</p>
        ) : (
          <table className='table-auto  w-max mt-[70px] p-3 border-collapse border-2 border-gray-300 m-auto'>
            <thead className='bg-gray-50 border-b-2 border-gray-200'>
              <tr>
                <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Patient</th>
                <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Doctor</th>
                <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Medicine</th>
                <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Consumption Time</th>
                <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Created At</th>
              </tr>
            </thead>
            <tbody>
              {prescription.map(itm => (
                <tr key={itm.id}>
                  <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                    {patients.find(p => p.id === itm.patient)?.Name}
                  </td>
                  <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                    {doctors.find(d => d.id === itm.doctor)?.username}
                  </td>
                  <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                    {itm.medicine_name}
                  </td>
                  <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                    {itm.consumption_time}
                  </td>
                  <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                    {formatDate(itm.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <DFooter/>
    </div>
  );
}
