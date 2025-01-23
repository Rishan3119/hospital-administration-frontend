import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import DNavbar from './DNavbar';
import DFooter from './DFooter';

export default function ADDSinglePres() {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input,setInput] = useState('')
    const [count,setCount] = useState(0)

    const [medicineSuggestions, setMedicineSuggestions] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState('');
    const [selectedPatient, setSelectedPatient] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDep, setSelectedDep] = useState('');
    const [medicines, setMedicines] = useState([{ medicineName: '', consumptionTime: '' }]);

    const navigate = useNavigate();
    const { id } = useParams();

    const baseUrl = localStorage.getItem('baseUrl');
    const token = localStorage.getItem('token');

    useEffect(()=>{
        async function fetchdata(){
          try {
            const res1 = await axios.get(`${baseUrl}/api/v1/hospital/AllAppoDoctor`,{
              headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${token}`,
              },params: {
                'appointment_id': id, 
              },
            })
            if(res1.data.status === 200){
              console.log(input)
              console.log(res1.data.data)
              setAppointments(res1.data.data)
              setSelectedAppointment(res1.data.data[0].id)
              setSelectedDep(res1.data.data[0].department)
              setSelectedDoctor(res1.data.data[0].doctor)
              setSelectedPatient(res1.data.data[0].patient)
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
                  }
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
                const resM = await axios.get(`${baseUrl}/api/v1/hospital/medicine`,{
                  headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Token ${token}`,
                  }
                });
                if(resM.data.status === 200){
                  console.log(input)
                  console.log(resM)
                  setMedicineSuggestions(resM.data.data)
                }
                else{
                  console.log(resM)
                }
            
            
          } catch (error) {
            console.log(error)
          }
        }
        fetchdata()
      },[baseUrl,token,input,count])

    const handleAddMedicine = () => {
        setMedicines([...medicines, { medicineName: '', consumptionTime: '' }]);
    };

    const handleRemoveMedicine = (index) => {
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    const handleMedicineChange = (index, field, value) => {
        const updatedMedicines = [...medicines];
        updatedMedicines[index][field] = value;
        setMedicines(updatedMedicines);
    };

    const handleSubmit = async (e) => {
      setLoading(true);
  
      const data = {
          appointment_id: selectedAppointment,
          patient_id: selectedPatient,
          doctor_id: selectedDoctor,
          medicine:medicines,
          department_id: selectedDep,
      };
  
      try {
          const response = await axios.post(`${baseUrl}/api/v1/hospital/addPresc`, data, {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${token}`,
              },
          });
          const response2 = await axios.put(`${baseUrl}/api/v1/hospital/statusU/${id}`, data, {
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
  
          if (response.data.status === 200) {
              toast.success('Prescription added successfully!', { autoClose: 1500 });
              navigate('/DH');
          } else {
              toast.error(response.data.message, { autoClose: 1500 });
          }
      } catch (error) {
          console.error('Error adding prescription', error);
          toast.error('Error adding prescription', { autoClose: 1500 });
      } finally {
          setLoading(false);
      }
  };

    return (
        <div className="add-prescription">
            <DNavbar />
            <div className="py-[150px] bg-gray-50 lg:px-[120px] sm:px-[50px] px-[230px] overflow-y-auto">
                <h1 className="text-4xl font-bold text-blue-700">Add Prescription</h1>
                <form className="mt-[60px]">
                    <div className="flex flex-wrap justify-between items-center">
                        {/* Select Appointment */}
                        <div className="flex flex-col w-[500px] mb-6">
                            <label className="font-bold text-xl">Select Appointment</label>
                            <select
                                value={selectedAppointment}
                                onChange={(e) => setSelectedAppointment(e.target.value)}
                                className="bg-gray-50 py-2 px-3 rounded border border-blue-400 mt-2"
                                required
                            >
                                <option value="">Select Appointment</option>
                                {appointments.map((appointment) => (
                                    <option key={appointment.id} value={appointment.id}>
                                        {appointment.id} - {new Date(appointment.date).toLocaleDateString()}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Select Patient */}
                        <div className="flex flex-col w-[500px] mb-6">
                            <label className="font-bold text-xl">Select Patient</label>
                            <select
                                value={selectedPatient}
                                onChange={(e) => setSelectedPatient(e.target.value)}
                                className="bg-gray-50 py-2 px-3 rounded border border-blue-400 mt-2"
                                required
                            >
                                <option value="">Select Patient</option>
                                {patients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>{patient.Name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-between items-center">
                        {/* Select Doctor */}
                        <div className="flex flex-col w-[500px] mb-6">
                        <label htmlFor="doctor" className="font-bold text-xl">Select Doctor</label>
              <select
                id="doctor"
                className="mt-2    bg-gray-50 py-2 px-3 rounded border border-blue-400"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                required
              >
                {appointments.map(doctor => (
                  <option key={doctor.id} value={doctors.find(d => d.id === doctor.doctor)?.id}>{doctors.find(d => d.id === doctor.doctor)?.username}</option>
                ))}
              </select>
                        </div>

                        {/* Select Department */}
                        <div className="flex flex-col w-[500px] mb-6">
                        <label htmlFor="doctor" className="font-bold text-xl">Select Department</label>
                            <select
                                id="doctor"
                                className="mt-2    bg-gray-50 py-2 px-3 rounded border border-blue-400"
                                value={selectedDep}
                                onChange={(e) => setSelectedDep(e.target.value)}
                                required
                            >
                                {appointments.map(itm => (
                                <option selected key={itm.id} value={departments.find(item => item.id === itm.department)?.id}> {departments.find(item => item.id === itm.department)?.department }</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <h2 className="font-bold text-2xl mt-6">Medicines</h2>
                    {medicines.map((medicine, index) => (
                        <div key={index} className="flex items-center space-x-4 mt-4">
                            <input
                                type="text"
                                placeholder="Medicine Name"
                                value={medicine.medicineName}
                                onChange={(e) => handleMedicineChange(index, 'medicineName', e.target.value)}
                                className="bg-gray-50 py-2 px-3 rounded border border-blue-400 w-[250px]"
                                list="medicine-suggestions"
                            />
                            <datalist id="medicine-suggestions">
                                {medicineSuggestions.map((suggestion) => (
                                    <option key={suggestion.id} value={suggestion.medicine_name} />
                                ))}
                            </datalist>

                            <select
                                value={medicine.consumptionTime}
                                onChange={(e) => handleMedicineChange(index, 'consumptionTime', e.target.value)}
                                className="bg-gray-50 py-2 px-3 rounded border border-blue-400 w-[200px]"
                            >
                                <option value="">Select Time</option>
                                <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Evening">Evening</option>
                                <option value="Night">Night</option>
                                <option value="Morning,Afternoon,Night">Morning,Afternoon,Night</option>
                                <option value="Morning,Night">Morning,Night</option>
                            </select>

                            <button
                                type="button"
                                className="text-red-600 font-bold"
                                onClick={() => handleRemoveMedicine(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddMedicine}
                        className="mt-4 p-2 font-bold text-blue-700"
                    >
                        + Add Medicine
                    </button>

                    <button
                        type="submit"
                        className="w-full mt-10 p-2 font-bold rounded-lg bg-blue-700 hover:bg-blue-500 text-white"
                        onClick={(e) => { e.preventDefault(); handleSubmit(); }}
                    >
                        {loading ? <span className="loading-spinner">Loading...</span> : "Add Prescription"}
                    </button>
                </form>
            </div>
            <DFooter />
        </div>
    );
}
