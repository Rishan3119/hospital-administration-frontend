import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import AHNavbar from './AHNavbar'
import RFooter from './RFooter'


export default function UpdateProfileD() {
  const [username, setusername] = useState('')
  const [email, setEmail] = useState('')
  const [Phone, setPhone] = useState('')
  const [image, setImage] = useState('')
  const [ci, setCi] = useState('')  // Holds the current image URL
  const [loading, setLoading] = useState(false)

  const baseUrl = localStorage.getItem('baseUrl')
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    async function fetchdata() {
      try {
        const res2 = await axios.get(
          `${baseUrl}/api/v1/auth/alluser`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              'Authorization': `Token ${token}`,
            },
          }
        );
        console.log("API response:", res2.data);
        if (res2.data.Status === 200) {
          setusername(res2.data.user.username)
          setEmail(res2.data.user.email)
          setPhone(res2.data.user.phone)
          setCi(`${baseUrl}${res2.data.user.image}`);  // Ensure the full URL for the current image
        } else {
          console.log(res2);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [baseUrl, token, id]);

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
        username: username,
        email: email,
        image: image,
        phone: Phone
    };

    try {
        const response = await axios.put(`${baseUrl}/api/v1/auth/updateuser/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${token}`
            }
        });
        if (response.data.status === 200) {
            setLoading(false);
            toast.success("User Updated Successfully!", {
                autoClose: 1500,
                position: 'top-right',
                onClose: () => {
                    navigate('/AH');
                }
            });
        } else {
            setLoading(false);
            console.log("error1");
            toast.error("Fill the required Fields", {
                autoClose: 1500,
                position: "top-right",
            });
        }
    } catch (err) {
        setLoading(false);
        console.log(err);
    }
}

  return (
    <div className='bg-gray-50'>
      <AHNavbar />
      <section className=' bg-gray-100 min-h-screen flex items-center justify-center'>
        {/* login container */}
        <div className='signup  bg-gray-100 mt-[100px] flex rounded-2xl shadow-lg p-5'> 
          {/* form */}
          <div className=' signup px-16'>
          <div className='flex items-center gap-3'>
                  <img src={ci} alt="Current profile" className='w-[50px] -ml-[50px] h-[50px]  rounded-full' />
            <h2 className='font-bold text-2xl text-[#002D74]'>Update Your Profile</h2>

              </div>

            <form action="" className='flex flex-col'>
              <label htmlFor="First Name" className='mt-6 mb-2 font-bold text-xl '>Username</label>
              <input 
                className='p-2 rounded-xl ' 
                value={username} 
                name='First Name' 
                placeholder='Enter your Username' 
                type="text" 
                onChange={(e) => setusername(e.target.value)} 
              />
              <label htmlFor="email" className='mt-6 mb-2 font-bold text-xl '>Email</label>
              <input 
                className='p-2 rounded-xl '
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                name='email' 
                placeholder='Enter your Email' 
                type="text" 
              />
            

              <label htmlFor="phone" className='mt-6 mb-2 font-bold text-xl '>Phone</label>
              <input 
                className='p-2 rounded-xl '
                value={Phone} 
                onChange={(e) => setPhone(e.target.value)} 
                name='phone' 
                placeholder='Enter your mobile Number' 
                type="text" 
              />
              

              <div className='flex justify-between items-center gap-4'>
                <label className='text-gray-400 font-bold' htmlFor="image">Image:</label>
                <input 
                  className='p-2 mt-4 rounded-xl' 
                  type="file" 
                  onChange={(e) => setImage(e.target.files[0])} 
                  name='image' 
                  id='image' 
                />
              </div>

              

              <button 
                onClick={(e) => { e.preventDefault(); handleSubmit() }} 
                className='bg-[#002D74] rounded-xl text-white py-2 mt-3 hover:scale-105 duration-300 hover:bg-[#3f649f] font-bold'>
                {
                  loading ? (
                    <span className='block w-[16px] h-[16px] border-2 border-b-0 border-white mt-[4px] mb-[4px] rounded-full m-auto animate-spin'></span>
                  ) : (
                    "Update"
                  )
                }
              </button>
            </form>
          </div>
        </div>
      </section>
      <RFooter />
    </div>
  )
}
