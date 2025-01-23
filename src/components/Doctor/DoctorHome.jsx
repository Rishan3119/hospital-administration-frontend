import React, { useEffect, useState } from "react";
import DNavbar from "./DNavbar";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import axios from "axios";
import DFooter from "./DFooter";

export default function DoctorHome() {
  const [appointment, setAppointment] = useState([]);
  const [patient, setPatient] = useState([]);
  const [viewHistory, setViewHistory] = useState([]);

  const baseUrl = localStorage.getItem('baseUrl');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchdata() {
      try {
        // Fetch appointments data
        const res1 = await axios.get(`${baseUrl}/api/v1/hospital/AllAppoDoctor`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });
        if (res1.data.status === 200) {
          setAppointment(res1.data.data);
        }

        // Fetch completed consultation histories
        const res2 = await axios.get(`${baseUrl}/api/v1/hospital/AllAppoDoctor`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });
        if (res2.data.status === 200) {
          // Filter for histories with is_status === true
          const completedHistories = res2.data.data.filter(item => item.is_status === true);
          setViewHistory(completedHistories);
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchdata();
  }, [baseUrl, token]);

  const navigate = useNavigate();

  return (
    <div className="bg-gray-50">
      <DNavbar />

      <div className="py-[150px]  flex flex-wrap lg:gap-8 lg:px-[100px] md:px-[60px]  justify-between px-[400px] ">
        <div className="">
          <div
            className="w-[280px] px-[50px] py-[50px] flex justify-between cursor-pointer hover:bg-orange-300 text-gray-50 h-[150px] bg-orange-500 rounded-lg flex-wrap-reverse xm:px-[10px] xm:py-[60px]"
            onClick={() => {
              navigate(`/addPresc`);
            }}
          >
            <div className="flex justify-between">
              <div className="">
                {patient.length === 0 ? "" : (
                  <h1 className="text-3xl font-bold">{patient.length}</h1>
                )}
                <p className="text-xl font-bold">Add Prescription</p>
              </div>

              <div className="">
                <i className="fa-solid fa-circle-plus text-4xl font-bold"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div></div>
          <div
            className="w-[290px] px-[30px] py-[50px] flex justify-between cursor-pointer hover:bg-blue-400 text-gray-50 h-[150px] bg-blue-600 rounded-lg xm:px-[10px] flex-wrap-reverse xm:py-[60px]"
            onClick={() => {
              navigate(`/ViewAppo`);
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

        <div className="">
          <div></div>
          <div
            className="w-[290px] px-[30px] py-[50px] flex justify-between cursor-pointer hover:bg-blue-400 text-gray-50 h-[150px] bg-blue-600 rounded-lg xm:px-[10px] mt-10 flex-wrap-reverse xm:py-[60px]"
            onClick={() => {
              navigate(`/viewHistory`);
            }}
          >
            <div className="">
              {viewHistory.length === 0 ? (
                <h1 className="text-3xl font-bold">0</h1>
              ) : (
                <h1 className="text-3xl font-bold">{viewHistory.length}</h1>
              )}
              <p className="text-xl font-bold">View History</p>
            </div>
            <div className="  rounded-full text-center  px-4 py-2 bg-white">
              <i className="fa-solid fa-calendar-days font-bold text-3xl text-blue-600"></i>
            </div>
          </div>
        </div>
      </div>

      <DFooter/>
    </div>
  );
}
