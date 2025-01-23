import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RecentPr() {
  const [prescriptions, setPrescription] = useState([]);
  const[medicines,setMedicines] = useState([])
  const [input, setInput] = useState('');
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false);
  const [count,setCount] = useState(0)

  
  const baseUrl = localStorage.getItem('baseUrl');
  const token = localStorage.getItem('token');

  const navigate = useNavigate()

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
        // Fetch departments
        const departmentResponse = await axios.get(`${baseUrl}/api/v1/hospital/department`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (departmentResponse.data.status === 200) {
            console.log(departmentResponse.data)
          setDepartments(departmentResponse.data.data);
        }

        // Fetch patients
        const patientResponse = await axios.get(`${baseUrl}/api/v1/hospital/patients`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          }
        });
        if (patientResponse.data.status === 200) {
          setPatients(patientResponse.data.data);
        }

        // Fetch doctors
        const doctorResponse = await axios.get(`${baseUrl}/api/v1/hospital/users`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });
        if (doctorResponse.data.status === 200) {
          setDoctors(doctorResponse.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [baseUrl, token,count]);

  useEffect(() => {
    async function fetchPrescriptions() {
      try {
        const prescriptionResponse = await axios.get(`${baseUrl}/api/v1/hospital/viewPrP`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
          params: {
            'patient_id': input,
          },
        });

        if (prescriptionResponse.data.status === 200) {
          // Sort prescriptions by date (most recent first)
          const sortedPrescriptions = prescriptionResponse.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setPrescription(sortedPrescriptions);
          console.log(prescriptionResponse)
          setNoResults(sortedPrescriptions.length === 0);
        } else {
          setPrescription([]);
          setNoResults(true);
        }
      } catch (error) {
        console.error(error);
        setNoResults(true);
      }
    }

    fetchPrescriptions();
  }, [baseUrl, token, input,count]);

  const handleViewPrescription = (id) => {
    navigate(`/allprhistory/${id}`);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleMarKP = async (id) => {
    setLoading(true);
    try {
        const response2 = await axios.put(`${baseUrl}/api/v1/hospital/statusUP/${id}`,{}, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        if (response2.data.status === 200) {
           console.log("Success")
           setCount(id)
        } else {
            console.log("Error while marking as completed");
        }
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className='bg-gray-50'>
      <section className='  bg-gray-50'>

        {/* Search Input */}
        <div className='mt-10 lg:px-[10px]'>
          <div className='flex justify-between items-center 2xl:px-[200px] xl:px-[100px] gap-5 flex-wrap lg:px-[30px]  px-[320px]'>
            <h2 className='font-bold text-2xl text-center xm:text-[20px] '>Recently Submitted Prescriptions</h2>
            <div className='flex gap-2'>
              <label className='font-semibold text-xl' htmlFor="prescription">Search</label>
              <input
                type='text'
                placeholder='Search by Patient ID'
                value={input}
                id='prescription'
                onChange={(e) => setInput(e.target.value)}
                className='border-2 border-blue-500 rounded w-max bg-gray-100 px-2'
              />
            </div>
          </div>

          {/* Display "No History Found" if no prescriptions */}
          {noResults && (
            <div className="mt-[50px] text-center text-xl text-red-500">
              No prescription found.
            </div>
          )}

          {/* Display Recently Submitted Prescriptions */}
          {!noResults && prescriptions.length > 0 && (
            
                <table className='table-auto  w-max mt-[50px] p-3 border-collapse border-2 border-gray-300 m-auto'>
                  <thead className='bg-gray-50'>
                    <tr>
                    <th className='p-2 border'>Patient Id</th>
                      <th className='p-2 border'>Patient</th>
                      <th className='p-2 border'>Doctor</th>
                      <th className='p-2 border'>Department</th>
                      <th className='p-2 border'>Medicine and Consumption Time</th>
                      <th className='p-2 border'>Date</th>
                      <th className='p-2 border'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescriptions.map((item) => (
                      <tr key={item.id}>
                       <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{patients.find(p => p.id === item.patient)?.id}</td>

                        <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{patients.find(p => p.id === item.patient)?.Name}</td>
                        <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{doctors.find(d => d.id === item.doctor)?.username}</td>
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

                        <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>{formatDate(item.date)}</td>
                        <td className='p-3 border-collapse border-2 border-gray-300 text-center bg-gray-200'>
                        {item.is_status === false ? (
                          <button
                            className='bg-blue-500 text-white px-3 py-1 rounded-lg'
                            onClick={() => handleMarKP(item.id)}  // Pass itm.id here
                          >
                            Mark
                          </button>
                        ) : (
                          <button
                            className='bg-green-500 text-white px-2 py-1 rounded-lg'
                            onClick={() => handleViewPrescription(item.patient)}
                          >
                            View History
                          </button>
                        )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
           
          )}
        </div>

      </section>
    </div>
  );
}
