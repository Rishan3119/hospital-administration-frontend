import React, { useEffect, useState } from "react";
import AHNavbar from "./AHNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RFooter from "./RFooter";
import { toast } from "react-toastify";

export default function AdminHome() {
  const [dep, setdep] = useState([]);
  const [input, setInput] = useState("");
  const [patient, setPatient] = useState([]);
  const [count, setCount] = useState(0);
  const [appointment, setAppointment] = useState([]);

  const navigate = useNavigate();

  const baseUrl = localStorage.getItem("baseUrl");
  const token = localStorage.getItem("token");

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/api/v1/hospital/DeleteDep/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.data.status === 200) {
        setCount(id);
        console.log(response);
        toast.success(" Deleted Successfully !", {
          autoClose: 1000,
          position: "top-right",
          onClose: () => {
            navigate("/AH");
          },
        });
      } else {
        console.log("error1");
        toast.error("Error", {
          autoClose: 2000,
          position: "top-right",
        });
      }
    } catch (err) {
      console.log("error2", err);
      toast.error("Error", {
        autoClose: 2000,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    async function fetchdata() {
      try {
        const response = await axios.get(
          `${baseUrl}/api/v1/hospital/department`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Token ${token}`,
            },
            params: {
              department: input,
            },
          }
        );
        if (response.data.status === 200) {
          console.log(input);
          console.log(response);
          setdep(response.data.data);
        } else {
          console.log(response);
        }
        const res1 = await axios.get(`${baseUrl}/api/v1/hospital/AllAppo`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        if (res1.data.status === 200) {
          console.log(res1);
          setAppointment(res1.data.data);
        } else {
          console.log(res1);
        }
        const response2 = await axios.get(
          `${baseUrl}/api/v1/hospital/patients`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        if (response.data.status === 200) {
          console.log(response2);
          setPatient(response2.data.data);
        } else {
          console.log(response2);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [baseUrl, token, input, count]);

  return (
    <>
      <AHNavbar />

      <section className="bg-gray-50">
        <div className="py-[150px] flex flex-wrap lg:gap-8 lg:px-[100px] md:px-[60px]  justify-between px-[400px] ">
          <div className="">
            <div>
              <button className="bg-gray-800 rounded-lg hover:bg-gray-600 px-2 py-1 mb-2 text-white font-bold">
                <a href="/addPatient">Add Patients</a>{" "}
                <i className="fa-solid fa-circle-plus ml-1"></i>
              </button>
            </div>
            <div
              className="w-[280px] px-[50px] py-[50px] flex justify-between cursor-pointer  hover:bg-orange-300 text-gray-50 h-[150px] bg-orange-500 rounded-lg flex-wrap-reverse xm:px-[10px] xm:py-[60px]"
              onClick={() => {
                navigate(`/allPatients`);
              }}
            >
              <div className="">
                {patient.length === 0 ? (
                  <h1 className="text-3xl font-bold">0</h1>
                ) : (
                  <h1 className="text-3xl font-bold">{patient.length}</h1>
                )}
                <p className="text-xl font-bold">Patients</p>
              </div>

              <div className=" px-4 py-2  rounded-full text-center  bg-white">
                <i className="fa-regular fa-user text-3xl text-green-500 font-bold"></i>
              </div>
            </div>
          </div>

          <div className="">
            <div>
              <button className="bg-blue-800  hover:bg-blue-600 rounded-lg px-2 py-1 mb-2 text-white font-bold">
                <a href="/appointment">Book Appointment</a>
              </button>
            </div>
            <div
              className="w-[290px] px-[30px] py-[50px] flex justify-between cursor-pointer hover:bg-blue-400 text-gray-50 h-[150px] bg-blue-600 rounded-lg xm:px-[10px] flex-wrap-reverse xm:py-[60px]"
              onClick={() => {
                navigate(`/allAppointment`);
              }}
            >
              <div className="">
                {appointment.length === 0 ? (
                  <h1 className="text-3xl font-bold">0</h1>
                ) : (
                  <h1 className="text-3xl font-bold">{appointment.length}</h1>
                )}
                <p className="text-xl font-bold">Appointments</p>
              </div>
              <div className="  rounded-full text-center  px-4 py-2 bg-white">
                <i className="fa-solid fa-calendar-days font-bold text-3xl text-blue-600"></i>
              </div>
            </div>
          </div>
        </div>

        <div className=" overflow-y-auto -mt-[50px]">
          <h1 className="font-bold text-[#102039] text-3xl text-center ">
            {" "}
            Department
          </h1>
          <div className="flex sm:block  sm:justify-center   justify-between  items-center px-[250px]   md:ml-[0] lg:px-[20px] mt-[50px] mb-[-45px]">
            <div className="sm:mb-4">
              <button className="bg-gray-800 hover:bg-gray-600 rounded-lg px-2 py-1  text-white font-bold">
                <a href="/AddDep">
                  Add Department{" "}
                  <i className="fa-solid fa-circle-plus ml-1"></i>
                </a>
              </button>
            </div>
            <div className="flex gap-2">
              <label htmlFor="department" className="font-semibold text-xl">
                Search:
              </label>
              <input
                type="text"
                id="department"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                placeholder="Search Department"
                className="border-2 border-blue-500 rounded    bg-gray-100 px-2 "
              />
            </div>
          </div>

          <div className="px-[250px] lg:px-[20px] xm:text-center   max-h-screen flex-wrap gap-8 flex justify-between items-center mb-[40px]">
            {dep.map((item) => {
              return (
                <div
                  className=" w-[300px] flex flex-col justify-center items-center gap-2 max-h-screen hover:scale-105 cursor-pointer duration-300  mt-[60px] bg-[#102039] rounded-lg text-white  p-4"
                  key={item.id}
                >
                  <img
                    className="w-[150px] h-[120px]"
                    src={item.image}
                    alt=""
                  />
                  <h1 className="text-2xl font-bold">{item.department}</h1>
                  <div className="flex items-center gap-12  mt-3">
                    <button
                      className="bg-blue-600 hover:bg-blue-500 rounded-lg px-2 py-1 font-bold"
                      onClick={() => {
                        navigate(`/SDep/${item.id}`);
                      }}
                    >
                      See More
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(item.id);
                      }}
                      className="bg-red-600 rounded-lg px-2 py-1 font-bold hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <RFooter />
    </>
  );
}
