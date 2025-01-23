import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-scroll";
export default function PNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);

  const [user, setUser] = useState([]);

  const{id} = useParams()

  const baseUrl = localStorage.getItem("baseUrl");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchdata() {
      try {
        const res2 = await axios.get(
          `${baseUrl}/api/v1/hospital/users/pharm`,
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
          setUser(res2.data.data);
        } else {
          console.log(res2);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [baseUrl, token]);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleUserSidebar = () => {
    setIsUserSidebarOpen(!isUserSidebarOpen);
  };
  return (
    <div className="">
      <nav
        className={`navbar fixed  bg-gray-100 shadow w-full flex justify-between  items-center px-[100px] transition-all duration-500  ${
          isSidebarOpen   ? "h-[240px]" : "h-[100px]" 
        } ${isUserSidebarOpen?"h-[160px]":"h-[100px]"}`}
      >
        {
          user.map((item)=>{
            return(
              <div className="relative flex gap-2 items-center ms-10 " key={item.id}>
          <img
            className="w-[50px] h-[50px] cursor-pointer rounded-full"
            src={item.image}
            onClick={toggleUserSidebar}
            alt=""
          />
          <h1 className="text-2xl ml-2 font-bold">{item.username}</h1>
        </div>
            )
          })
          
        }

        {/* Desktop Navigation */}
        <div className="icons flex gap-[50px] font-semibold ml-[200px]  md:flex">
          <span
            id="close"
            className="hidden cursor-pointer mt-[10px] text-red-600"
          >
            X
          </span>
          <a href="/PH" className=" hover:text-blue-500 text-[#102039]">
              DASHBOARD
            </a>
            <a href="/allPr" className=" hover:text-blue-500 text-[#102039]">
              ALL PRESCRIPTION
            </a>
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer text-[#102039] hover:text-blue-500"
          >
            ABOUT US
          </Link>
          <button className="lBtn bg-red-700 text-white rounded-lg w-[100px] h-[30px] hover:bg-red-400 shadow-xl font-bold">
            <a href="/login">Logout</a>
          </button>
        </div>

        {/* Menu icon for mobile */}
        <div className="menu hidden" onClick={toggleSidebar}>
          <i className="bx bx-menu text-blue-500 text-4xl font-semibold cursor-pointer"></i>
        </div>
      </nav>

      <div
              className={`fixed top-0  w-[200px] rounded-lg shadow-lg bg-gray-200
                   p-4 transform transition-transform duration-300 ${
                isUserSidebarOpen ? "-translate-x-[10px]" : "-translate-x-[400px]" 
              }`}
            >
              <span
            className="float-right font-bold text-red-600 hover:text-red-400 self-end text-2xl  cursor-pointer"
            onClick={toggleUserSidebar}
          >
            X
          </span>
              <div className="flex flex-col text-center gap-4 mt-10">
                {
                  user.map((itm)=>{
                    return(
                      <a href={`/updateP/${itm.id}`} className="hover:text-blue-500 text-[#102039] font-semibold">
                   Profile
                </a>
                    )
                    
                  })
                }
                 <a href="/changepassP" className="hover:text-blue-500 text-[#102039] font-semibold">
                  Change Password
                </a>
              </div>
            </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 right-0 w-[200px] xm:w-[150px] max-h-screen bg-gray-200 shadow-lg transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col  p-4">
          <span
            className="self-end text-xl cursor-pointer"
            onClick={toggleSidebar}
          >
            X
          </span>
          <div className="flex flex-col gap-2">
            <a href="/PH" className=" hover:text-blue-500 text-[#102039]">
              DASHBOARD
            </a>
            <a href="/allPr" className=" hover:text-blue-500 text-[#102039]">
              ALL PRESCRIPTION
            </a>
            <Link
              to="about"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-blue-500 text-[#102039] "
            >
              
              ABOUT US
            </Link>
          </div>
          <button className="lBtn bg-red-700 md:h-[30px] text-white rounded-lg w-[100px] h-[30px] hover:bg-red-400 shadow-xl font-bold mt-4">
            <a href="/login">Logout</a>
          </button>
        </div>
      </div>
    </div>
  );
}
