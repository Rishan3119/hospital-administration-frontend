import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import DFooter from './DFooter';
import DNavbar from './DNavbar';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const baseUrl = localStorage.getItem('baseUrl');
  const token = localStorage.getItem('token');

  
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateForm = () => {
    const newErrors = {};

   if (!passwordRegex.test(newPassword)) {
      newErrors.newPassword = 'Password must contain at least 8 characters, including letters, numbers, and special characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const data = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    try {
      const response = await axios.put(`${baseUrl}/api/v1/auth/changePass`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (response.data.status === 200) {
        toast.success(response.data.message, { autoClose: 1500 });
        navigate('/DH');
      } else {
        toast.error(response.data.message || "Failed to change password", { autoClose: 3000, position: "top-right" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.", { autoClose: 3000, position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-50'>
      <DNavbar />
      <section className='bg-gray-100 min-h-screen flex items-center justify-center'>
        <div className='signup bg-gray-100 flex rounded-2xl shadow-lg p-5'>
          <div className='signup px-16'>
            <h2 className='font-bold text-2xl text-[#002D74]'>Change Password</h2>
            <form className='flex flex-col gap-4' onSubmit={(e) => e.preventDefault()}>
              <input
                className='p-2 mt-8 rounded-xl'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                name='oldPassword'
                placeholder='Enter your old password'
                type='password'
                required
              />

              <input
                className='p-2 mt-4 rounded-xl'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                name='newPassword'
                placeholder='Enter your new password'
                required
              />
              {errors.newPassword && <span className="text-red-500 w-[50%] text-sm">{errors.newPassword}</span>}

              <button
                onClick={handleSubmit}
                className='bg-[#002D74] rounded-xl text-white py-2 mt-3 hover:scale-105 duration-300 hover:bg-[#3f649f] font-bold'
                disabled={loading}
              >
                {loading ? (
                  <span className='block w-[16px] h-[16px] border-2 border-b-0 border-white rounded-full m-auto animate-spin'></span>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
            <div>
              <hr className='mt-5 mb-3 border-1 border-[#002D74]' />
            </div>
          </div>
        </div>
      </section>
      <DFooter />
    </div>
  );
}
