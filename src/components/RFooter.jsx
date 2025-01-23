import React from 'react';

export default function RFooter() {
  return (
    <footer className="foot sm:px-[10px] sm:py-[130px]   bg-gray-200 shadow px-[180px] text-[#1F2B7B] py-[50px]">
      <div id='about' className="container sm:-mt-[70px]  mx-auto ">
        <div className="f-all flex flex-wrap justify-between ">
          
          {/* Contact Us Section */}
          <div className='c-f'>
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <ul className="space-y-2">
              <li>Address: 123 Health St., Wellness City</li>
              <li>Email: contact@hospitaladmin.com</li>
              <li>Phone: +1 234 567 890</li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className='q-f'>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="/AH" className="hover:underline">Home</a></li>
              <li><a href="/allAppointments" className="hover:underline">Appointments</a></li>
              <li><a href="/allPatients" className="hover:underline">Patients</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className='f-f'>
            <h2 className="text-lg font-bold mb-4">Follow Us</h2>
            <ul className="flex flex-wrap gap-10">
              <li>
                <a href="#" className="hover:text-blue-500">
                  <i className="bx bxl-facebook text-3xl"></i>
                </a>
              </li>
              <li>
                <a href="#" className="">
                  <i className="bx bxl-twitter hover:text-blue-300 text-blue-400 text-3xl"></i>
                </a>
              </li>
              <li>
                <a href="#" className="">
                  <i className="bx bxl-linkedin text-3xl hover:text-blue-500 text-blue-600"></i>
                </a>
              </li>
              <li>
                <a href="#" className="">
                <i class='bx bxl-instagram text-3xl hover:text-pink-300 text-pink-400' ></i>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>&copy; {new Date().getFullYear()} Hospital Admin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
