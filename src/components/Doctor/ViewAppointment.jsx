import React, { useEffect, useState } from 'react';
import DNavbar from './DNavbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DFooter from './DFooter';

export default function ViewAppointment() {
  const [input, setInput] = useState('');
  const [appointment, setAppointment] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  const baseUrl = localStorage.getItem('baseUrl');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchdata() {
      try {
        const res1 = await axios.get(`${baseUrl}/api/v1/hospital/AllAppoDoctor`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
          params: {
            'patient_id': input,
          },
        });
        if (res1.data.status === 200) {
          setAppointment(res1.data.data);
        } else {
          setAppointment([]); // Clear appointments if no data is returned
        }

        const response = await axios.get(`${baseUrl}/api/v1/hospital/department`, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        if (response.data.status === 200) {
          setDepartments(response.data.data);
        }

        const res = await axios.get(`${baseUrl}/api/v1/hospital/patients`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          }
        });
        if (res.data.status === 200) {
          setPatients(res.data.data);
        }

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <DNavbar />

      <section className='py-[200px] bg-gray-50 lg:px-[180px] md:px-[140px] sm:px-[30px] xm:px-[50px]'>
        <div className='-mt-[50px]'>
          <h1 className='font-bold text-[#102039] text-3xl text-center'>Appointment Details</h1>

          <div className='flex sm:block sm:justify-center justify-between items-center px-[300px] md:ml-[0] lg:px-[20px] mt-[50px] mb-[-45px]'>
            <div className='flex gap-2'>
              <label htmlFor="appointment" className='font-semibold text-xl'>Search:</label>
              <input
                type="text"
                id='appointment'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Search with Patient ID'
                className='border-2 border-blue-500 rounded w-max bg-gray-100 px-2'
              />
            </div>
          </div>

          {input && appointment.length === 0 ? (
            <div className='text-2xl font-bold mt-[100px] text-center text-red-500'>
              No appointments available for this patient.
            </div>
          ) : appointment.length === 0 ? (
            <div className='text-2xl font-bold mt-[100px] text-center text-red-500'>
              No Appointments Today!!
            </div>
          ) : (
            <>
              <div className='lg:overflow-x-auto lg:px-[20px] xl:overflow-x-auto px-[220px]'>
                <table className='table-auto w-max mt-[70px] p-3 border-collapse border-2 border-gray-300 m-auto'>
                  <thead className='bg-gray-50 border-b-2 border-gray-200'>
                    <tr>
                      <th className='p-3 border-r-2 border-gray-300 text-sm font-bold tracking-wide'>Appointment ID</th>
                      <th className='p-3 border-r-2 border-gray-300 text-sm font-bold tracking-wide'>Patient</th>
                      <th className='p-3 border-r-2 border-gray-300 text-sm font-bold tracking-wide'>Doctor</th>
                      <th className='p-3 border-r-2 border-gray-300 text-sm font-bold tracking-wide'>Department</th>
                      <th className='p-3 border-r-2 border-gray-300 text-sm font-bold tracking-wide'>Token Number</th>
                      <th className='p-3 border-r-2 border-gray-300 text-sm font-bold tracking-wide'>Date</th>
                      <th className='p-3 border-r-2 border-gray-300 text-sm font-bold tracking-wide'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointment.map((itm) => (
                      <tr className='p-3' key={itm.id}>
                        <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{itm.id}</td>
                        <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                          {patients.find(item => item.id === itm.patient)?.Name}
                        </td>
                        <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                          {doctors.find(item => item.id === itm.doctor)?.username}
                        </td>
                        <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                          {departments.find(item => item.id === itm.department)?.department}
                        </td>
                        <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{itm.token_number}</td>
                        <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{formatDate(itm.date)}</td>
                        <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                          <div className='flex flex-wrap justify-center items-center gap-3'>
                            {itm.is_status === false ? (
                              <div className='flex flex-wrap gap-3'>
                                <button onClick={() => navigate(`/addPresc/${itm.id}`)} className='bg-blue-600 px-2 py-1 hover:bg-blue-500 font-bold rounded-lg text-white'>Consult</button>
                                <button className='bg-green-600 px-2 py-1 hover:bg-green-500 font-bold rounded-lg text-white'><a href={`/UAppo/${itm.id}`}>Reassign</a></button>
                                <button className='bg-blue-800 px-2 py-1 hover:bg-blue-700 font-bold rounded-lg text-white'><a href={`/allprhistoryD/${itm.patient}`}>Prescription</a></button>
                              </div>
                            ) : (
                              <h1 className='font-bold text-xl  text-green-600'>Consulted</h1>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>
      <DFooter />
    </div>
  );
}
