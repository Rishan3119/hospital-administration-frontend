import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AHNavbar from './AHNavbar';
import RFooter from './RFooter';

const Appointment = () => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    
    
    const [selectedPatient, setSelectedPatient] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');

    const navigate = useNavigate();
    const baseUrl = localStorage.getItem('baseUrl');
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch departments
                const departmentResponse = await axios.get(`${baseUrl}/api/v1/hospital/department`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (departmentResponse.data.status === 200) {
                    setDepartments(departmentResponse.data.data);
                } else {
                    console.log(departmentResponse);
                }

                // Fetch patients
                const patientResponse = await axios.get(`${baseUrl}/api/v1/hospital/patients`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`,
                    },
                });
                if (patientResponse.data.status === 200) {
                    setPatients(patientResponse.data.data);
                } else {
                    console.log(patientResponse);
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [baseUrl, token]);

    const fetchDoctors = async (departmentId) => {
        try {
            const doctorResponse = await axios.get(`${baseUrl}/api/v1/hospital/users`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}`,
                },
                params: { 'department_id': departmentId },
            });
            if (doctorResponse.data.status === 200) {
                setDoctors(doctorResponse.data.data);
            } else {
                console.log(doctorResponse);
                setDoctors([]); // Clear doctors if no data is returned
            }
        } catch (error) {
            console.log(error);
            setDoctors([]); // Clear doctors on error
        }
    };

    const handleDepartmentChange = (e) => {
        const departmentId = e.target.value;
        setSelectedDepartment(departmentId);
        setSelectedDoctor(''); // Reset selected doctor when department changes
        fetchDoctors(departmentId); // Fetch doctors based on selected department
    };

    const handleSubmit = async () => {
        setLoading(true);
        const data = {
            patient_id: selectedPatient,
            doctor_id: selectedDoctor,
            department_id: selectedDepartment,
        };

        try {
            const response = await axios.post(`${baseUrl}/api/v1/hospital/bookA`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            if (response.data.status === 200) {
                setLoading(false);
                toast.success(response.data.message, { autoClose: 1500 });
                navigate('/AH');
            } else {
                setLoading(false);
                toast.error(response.data.message, { autoClose: 1500 });
            }
        } catch (error) {
            console.error('Error booking appointment', error);
            setLoading(false);
            toast.error("Error booking appointment", { autoClose: 1500 });
        }
    };

    return (
        <div className="book-appointment">
            <AHNavbar />

            <div className='py-[150px] bg-gray-50 px-[230px] overflow-y-auto lg:px-[180px] md:px-[140px] sm:px-[30px] xm:px-[50px]'>
                <h1 className="text-4xl font-bold text-blue-700">Book Appointment</h1>
                <form className="mt-[60px]">
                    <div className='flex lg:gap-4 flex-wrap justify-between items-center mt-10'>
                        <div className="flex flex-col">
                            <label htmlFor="patient" className="font-bold text-xl">Select Patient</label>
                            <select
                                id="patient"
                                className='mt-2 bg-gray-50 w-[500px] xm:w-[250px] py-1 px-3 rounded border border-blue-400'
                                value={selectedPatient}
                                onChange={(e) => setSelectedPatient(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Patient</option>
                                {patients.map(patient => (
                                    <option key={patient.id} value={patient.id}>{patient.id}-{patient.Name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className=" flex flex-col">
                        <label htmlFor="department" className="font-bold text-xl">Select Department</label>
                        <select
                            id="department"
                            className='mt-2 bg-gray-50 w-[500px] xm:w-[250px] py-1 px-3 rounded border border-blue-400'
                            value={selectedDepartment}
                            onChange={handleDepartmentChange}
                            required
                        >
                            <option value="" disabled>Select Department</option>
                            {departments.map(department => (
                                <option key={department.id} value={department.id}>{department.department}</option>
                            ))}
                        </select>
                    </div>
                        
                    </div>
                    
                    <div className="flex mt-10 flex-col">
                            <label htmlFor="doctor" className="font-bold text-xl">Select Doctor</label>
                            <select
                                id="doctor"
                                className='mt-2 bg-gray-50 w-[500px] xm:w-[250px] py-1 px-3 rounded border border-blue-400'
                                value={selectedDoctor}
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select Doctor</option>
                                {doctors.length === 0 ? (
                                    <option value="" disabled>No doctors available</option>
                                ) : (
                                    doctors.map(doctor => (
                                        <option key={doctor.id} value={doctor.id}>{doctor.username}</option>
                                    ))
                                )}
                            </select>
                        </div>
                    
                    <button
                        onClick={(e) => { e.preventDefault(); handleSubmit(); }}
                        type='submit'
                        className='w-full mt-10 p-2 font-bold rounded-lg bg-blue-700 xm:w-[250px] hover:bg-blue-500 text-white'
                    >
                        {
                            loading ? (
                                <span className='block w-[16px] h-[16px] border-2 border-b-0 border-white mt-[4px] mb-[4px] rounded-full m-auto animate-spin'></span>
                            ) : ("Book Appointment")
                        }
                    </button>
                </form>
            </div>
            <RFooter />
        </div>
    );
};

export default Appointment;
