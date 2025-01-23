import React, { useEffect, useState } from 'react';
import RFooter from '../RFooter';
import DNavbar from './DNavbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import DFooter from './DFooter';

export default function UpdateAppointment() {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();
    const baseUrl = localStorage.getItem('baseUrl');
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchInitialData() {
            try {
                const departmentResponse = await axios.get(`${baseUrl}/api/v1/hospital/department`, {
                    headers: { 
                        'Content-Type':'application/json'
                    }
                });
                setDepartments(departmentResponse.data.data);

                const patientResponse = await axios.get(`${baseUrl}/api/v1/hospital/patients`, {
                    headers: { 'Authorization': `Token ${token}` }
                });
                setPatients(patientResponse.data.data);

                const appointmentResponse = await axios.get(`${baseUrl}/api/v1/hospital/SAppo/${id}`, {
                    headers: { 'Authorization': `Token ${token}` }
                });

                const appointmentData = appointmentResponse.data.data;
                setSelectedPatient(appointmentData.patient);
                setSelectedDepartment(appointmentData.department);
                fetchDoctors(appointmentData.department); // Fetch doctors for the initial department
                setSelectedDoctor(appointmentData.doctor);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        fetchInitialData();
    }, [baseUrl, token, id]);

    const fetchDoctors = async (departmentId) => {
        try {
            const doctorResponse = await axios.get(`${baseUrl}/api/v1/hospital/users`, {
                headers: { 'Authorization': `Token ${token}` },
                params: { 'department_id': departmentId }
            });
            setDoctors(doctorResponse.data.data);
        } catch (error) {
            console.error("Error fetching doctors", error);
            setDoctors([]);
        }
    };

    const handleDepartmentChange = (e) => {
        const departmentId = e.target.value;
        setSelectedDepartment(departmentId);
        setSelectedDoctor(''); // Clear selected doctor when department changes
        fetchDoctors(departmentId);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const data = {
            patient: selectedPatient,
            doctor: selectedDoctor,
            department: selectedDepartment
        };

        try {
            const response = await axios.put(`${baseUrl}/api/v1/hospital/UAppo/${id}`, data, {
                headers: { 'Authorization': `Token ${token}` }
            });
            setLoading(false);
            if (response.data.status === 200) {
                toast.success(response.data.message, { autoClose: 1500 });
                navigate('/ViewAppo');
            } else {
                toast.error(response.data.message, { autoClose: 1500 });
            }
        } catch (error) {
            console.error('Error updating appointment', error);
            setLoading(false);
            toast.error("Error updating appointment", { autoClose: 1500 });
        }
    };

    return (
        <div>
            <DNavbar />
            <div className='py-[150px] bg-gray-50 px-[230px] overflow-y-auto lg:px-[180px] md:px-[140px] sm:px-[30px] xm:px-[50px]'>
                <h1 className="text-4xl font-bold text-blue-700">Reassign Doctor</h1>
                <form className="mt-[60px]">
                    <div className='flex lg:gap-4 flex-wrap justify-between items-center mt-10'>
                        <div className="flex flex-col">
                            <label htmlFor="patient" className="font-bold text-xl">Select Patient</label>
                            <select id="patient" className='mt-2 bg-gray-50 w-[500px] xm:w-[250px] py-1 px-3 rounded border border-blue-400' 
                                value={selectedPatient} 
                                onChange={(e) => setSelectedPatient(e.target.value)} required>
                                <option value="" disabled>Select Patient</option>
                                {patients.map(patient => (
                                    <option key={patient.id} value={patient.id}>{patient.Name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="department" className="font-bold text-xl">Select Department</label>
                            <select id="department" className='mt-2 bg-gray-50 w-[500px] xm:w-[250px] py-1 px-3 rounded border border-blue-400' 
                                value={selectedDepartment} 
                                onChange={handleDepartmentChange} required>
                                <option value="" disabled>Select Department</option>
                                {departments.map(department => (
                                    <option key={department.id} value={department.id}>{department.department}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-col">
                        <label htmlFor="doctor" className="font-bold text-xl">Select Doctor</label>
                        <select id="doctor" className='mt-2 bg-gray-50 w-[500px] xm:w-[250px] py-1 px-3 rounded border border-blue-400' 
                            value={selectedDoctor} 
                            onChange={(e) => setSelectedDoctor(e.target.value)} required>
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
                    <button onClick={(e) => { e.preventDefault(); handleSubmit(); }} type='submit' 
                        className='w-full mt-10 p-2 font-bold rounded-lg bg-blue-700 xm:w-[250px] hover:bg-blue-500 text-white'>
                        {loading ? (
                            <span className='block w-[16px] h-[16px] border-2 border-b-0 border-white mt-[4px] mb-[4px] rounded-full m-auto animate-spin'></span>
                        ) : ("Reassign")}
                    </button>
                </form>
            </div>
            <DFooter />
        </div>
    );
}
