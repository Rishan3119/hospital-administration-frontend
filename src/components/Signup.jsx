import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SDoctor from '../images/SDoctor.jpeg'
import Footer from './Footer';
import HomeNav from './HomeNav';

export default function Signup() {
  const [departments, setDepartments] = useState([]);
  const [username, setUsername] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [selectedDep, setSelectedDep] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const baseUrl = localStorage.getItem('baseUrl');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;

  const validateForm = () => {
    const newErrors = {};

    if (!username || !nameRegex.test(username)) {
      newErrors.username = '*Username must contain only letters and be at least 2 characters long';
    }


    if (!email || !emailRegex.test(email)) {
      newErrors.email = '*Enter a valid email';
    }

    if (!phone || !phoneRegex.test(phone)) {
      newErrors.phone = '*Phone number must contain 10 digits';
    }

    if (!selectedDep) {
      newErrors.selectedDep = '*Please select a department';
    }

    if (!image) {
      newErrors.image = '*Please upload an image';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/hospital/department`, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        if (response.data.status === 200) {
          setDepartments(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [baseUrl, token]);

  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    setLoading(true);
    const data = {
      email: email,
      username: username,
      last_name: lastName,
      phone: phone,
      image: image,
      department: selectedDep,
      role: 'Doctor',
    };

    try {
      const response = await axios.post(`${baseUrl}/api/v1/auth/signup`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.status === 200) {
        toast.success("Doctor Registered Successfully", {
          autoClose: 1500,
          position: "top-right",
          onClose: () => {
            navigate('/login');
          },
        });
      } else if (response.data.status === 400 && response.data.message === "Email already exists") {
        toast.error("Email already exists", {
          autoClose: 1500,
          position: 'top-right',
        });
      } else {
        toast.error("Error", {
          autoClose: 1500,
          position: "top-right",
        });
      }
    } catch (err) {
      console.log( err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-50'>
      <HomeNav />
      <section className='bg-gray-100 min-h-screen flex py-[50px] items-center  justify-center'>
        <div className='signup bg-gray-100 mt-[100px] flex rounded-2xl shadow-lg  p-5'>

          <div className='signup px-16'>
            <h2 className='font-bold text-2xl text-[#002D74]'>Doctor Registration</h2>
            <p className='text-sm mt-4 text-[#002D74]'>New Doctor, easily Register</p>
            <form className='flex flex-col'>
              <input
                className='p-2 mt-6 rounded-xl'
                value={username}
                placeholder='Enter your First Name'
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}

              <input
                className='p-2 mt-6 rounded-xl'
                value={lastName}
                placeholder='Enter your Last Name'
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />

              <input
                className='p-2 mt-6 rounded-xl'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your Email'
                type="text"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

              <input
                className='p-2 mt-6 rounded-xl'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Enter your mobile Number'
                type="text"
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}

              <select
                id="doctor"
                className="p-2 mt-6 rounded-xl"
                value={selectedDep}
                onChange={(e) => setSelectedDep(e.target.value)}
              >
                <option value="" disabled>Select Department</option>
                {departments.map(itm => (
                  <option key={itm.id} value={itm.id}>{itm.department}</option>
                ))}
              </select>
              {errors.selectedDep && <span className="text-red-500 text-sm">{errors.selectedDep}</span>}

              <div className='flex items-center gap-4'>
                <label className='text-gray-400 font-bold' htmlFor="image">Image:</label>
                <input
                  className='p-2 mt-4 rounded-xl'
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  id='image'
                />
              </div>
              {errors.image && <span className="text-red-500 text-sm">{errors.image}</span>}

              <button
                onClick={(e) => { e.preventDefault(); handleSubmit(); }}
                className='bg-[#002D74] rounded-xl text-white py-2 mt-3 hover:scale-105 duration-300 hover:bg-[#3f649f] font-bold'
              >
                {loading ? (
                  <span className='block w-[16px] h-[16px] border-2 border-b-0 border-white mt-[4px] mb-[4px] rounded-full m-auto animate-spin'></span>
                ) : ("Register")}
              </button>
            </form>

            <div>
              <hr className='mt-5 mb-3 border-1 border-[#002D74]' />
              <p>Already have an Account? <a className='text-[#002D74] font-bold hover:text-blue-600' href="/login">Login</a></p>
            </div>

          </div>

          {/* image */}
          <div className='loginImg max-h-screen w-[300px]'>
            <img  className=' rounded-2xl h-[85%] mt-10 ' src={SDoctor} alt="" />
          </div>
        </div>
        
      </section>
      <Footer />
    </div>
  );
}
