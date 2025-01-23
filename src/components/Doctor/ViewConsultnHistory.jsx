import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DNavbar from './DNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import DFooter from './DFooter';

export default function ViewConsultnHistory() {
  const [input, setInput] = useState('');
  const [appointment, setAppointment] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [count, setCount] = useState(0);

  const navigate = useNavigate()
  
  const baseUrl = localStorage.getItem('baseUrl');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchdata() {
      try {
        // Fetch appointments data
        const res1 = await axios.get(`${baseUrl}/api/v1/hospital/AllAppoDoctor`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
          params: {
            'patient_id': input,
          }
        });

        if (res1.data.status === 200) {
          setAppointment(res1.data.data);
        }

        // Fetch department data
        const response = await axios.get(`${baseUrl}/api/v1/hospital/department`, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        if (response.data.status === 200) {
          setDepartments(response.data.data);
        }

        // Fetch patients data
        const res = await axios.get(`${baseUrl}/api/v1/hospital/patients`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          }
        });

        if (res.data.status === 200) {
          setPatients(res.data.data);
        }

        // Fetch doctors data
        const res2 = await axios.get(`${baseUrl}/api/v1/hospital/users`, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${token}`,
          },
        });

        if (res2.data.status === 200) {
          setDoctors(res2.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [baseUrl, token, input, count]);

  const handleViewPrescription = (id) => {
    navigate(`/viewPr/${id}`);
  };

  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  const completedAppointments = appointment.filter(itm => itm.is_status === true);

  return (
    <div className='bg-gray-50'>
      <DNavbar />
      <section className='py-[200px] mb-[100px] bg-gray-50   sm:px-[30px] xm:px-[50px]'>
        <div className='-mt-[50px]'>

          {completedAppointments.length === 0 ? (
            <div>
                <h1 className='text-3xl text-center font-bold'>View Consultant History</h1>
            <p className="text-center mt-10 text-xl text-red-600">No  history available!!</p>
            </div>
          ) : (
            <>
             <div className='  mt-[50px] md:overflow-x-auto overflow-y-auto items-center -mb-[170px]  lg:px-[10px] px-[100px] '>
                
                  <div className=' '>
                  <h1 className='font-bold text-[#102039] sm:text-2xl xm:text-xl text-3xl text-center -mb-[50px]'>Consultation History</h1>
                    <table className='table-auto  w-max mt-[70px] p-3 border-collapse border-2 border-gray-300 m-auto'>
                      <thead className='bg-gray-50 border-b-2 border-gray-200'>
                        <tr>
                          <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Appointment ID</th>
                          <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Patient</th>
                          <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Doctor</th>
                          <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Department</th>
                          <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Date</th>
                          <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Status</th>
                          <th className='p-3 border-r-2 border border-gray-300 text-sm font-bold tracking-wide'>Prescription</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedAppointments.map(itm => (
                          <tr className='p-3' key={itm.id}>
                            <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                              {itm.id}
                            </td>
                            <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                              {patients.find(item => item.id === itm.patient)?.Name}
                            </td>
                            <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                              {doctors.find(item => item.id === itm.doctor)?.username}
                            </td>
                            <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                              {departments.find(item => item.id === itm.department)?.department}
                            </td>
                            <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                              {formatDate(itm.date)}
                            </td>
                            <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                                  <h1 className='text-green-600 font-bold'>Completed</h1>
                            </td>
                            <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                            <button onClick={() => handleViewPrescription(itm.patient)} className='bg-blue-500 rounded-lg px-2 text-white font-bold py-1'>Prescription</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>



             </div>
            </>
          )}
        </div>
      </section>
      <DFooter/>
    </div>
  );
}
