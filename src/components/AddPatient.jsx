import React, { useState } from "react";
import AHNavbar from "./AHNavbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import RFooter from "./RFooter";

export default function AddPatient() {
  const [loading, setLoading] = useState(false);
  const [PName, setPName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [Gender, setGender] = useState("");
  const navigate = useNavigate();

  const baseUrl = localStorage.getItem("baseUrl");
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      Name: PName,
      Email: Email,
      Phone: Phone,
      Address: Address,
      Gender: Gender,
    };
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/hospital/addPatient`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      if (response.data.status === 200) {
        console.log(response);
        setLoading(false);
        toast.success("Patient Added Successfully!", {
          autoClose: 1500,
          position: "top-right",
          onClose: () => {
            navigate("/appointment");
          },
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
      console.log("error2", err);
      toast.error("Error", {
        autoClose: 2000,
        position: "top-right",
      });
    }
  };
  return (
    <div>
      <AHNavbar />
      <section className="py-[150px] bg-gray-50 px-[230px] overflow-y-auto lg:px-[180px] md:px-[140px] sm:px-[30px] xm:px-[50px]">
        <h1 className="text-4xl font-bold text-green-800">Add Patient</h1>
        <form action="">
          {/* first row */}
          <div className="flex lg:gap-4 flex-wrap justify-between items-center mt-10">
            <div className="flex flex-col">
              <label htmlFor="PatientName" className="font-bold text-xl ">
                Patient name
              </label>
              <input
                type="text"
                id="PatientName"
                value={PName}
                onChange={(e) => setPName(e.target.value)}
                placeholder="Patient Name"
                className="mt-2 w-[500px] xm:w-[250px] bg-gray-50 py-1 px-3 rounded border border-blue-400 lg:mb-4"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Email" className="font-bold text-xl">
                Email
              </label>
              <input
                type="text"
                id="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="mt-2 w-[500px] xm:w-[250px] bg-gray-50 py-1 px-3 rounded border border-blue-400"
                required
              />
            </div>
          </div>

          {/* second row */}
          <div className="flex flex-wrap lg:gap-4 justify-between items-center mt-10">
            <div className="flex flex-col lg:-mt-4">
              <label htmlFor="Phone" className="font-bold text-xl ">
                Phone
              </label>
              <input
                type="text"
                id="Phone"
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone Number"
                className="mt-2 w-[500px] xm:w-[250px] bg-gray-50 py-1 px-3 rounded border border-blue-400 lg:mb-4"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender" className="font-bold text-xl">
                Gender
              </label>
              <select
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-2 bg-gray-50 w-[500px] xm:w-[250px] py-1 px-3 rounded border border-blue-400"
                name=""
                id=""
              >
                <option hidden disabled value="">
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* address field */}
          <div className="mt-10 flex flex-col">
            <label
              htmlFor="Address"
              value="Address"
              className="font-bold text-xl"
            >
              Address
            </label>
            <textarea
              name="Address"
              id="Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              cols="10"
              rows="4"
              className="mt-2  bg-gray-50 xm:w-[250px] py-1 px-3 rounded border border-blue-400"
              placeholder="Address"
              required
            ></textarea>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            type="submit"
            className="w-full  mt-8 p-2 font-bold rounded-lg bg-green-900 xm:w-[250px] hover:bg-green-700 text-white "
          >
            {loading ? (
              <span className="block w-[16px] h-[16px] border-2 border-b-0 border-white mt-[4px] mb-[4px] rounded-full m-auto animate-spin"></span>
            ) : (
              "Add Patient"
            )}
          </button>
        </form>
      </section>
      <RFooter />
    </div>
  );
}
