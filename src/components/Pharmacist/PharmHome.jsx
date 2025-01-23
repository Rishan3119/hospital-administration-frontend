import React from 'react';
import PNavbar from './PNavbar';
import RecentPr from './RecentPr';
import PFooter from './PFooter';

export default function PharmHome() {
 
  return (
    <div className='bg-gray-50'>
      <PNavbar />
      <div className='py-[180px] -mb-[50px] lg:px-[10px] lg:overflow-x-auto bg-gray-50 '>
        <h1 className='font-bold text-[#102039] text-3xl sm:text-2xl xm:text-xl text-center'>
          Prescription Details
        </h1>

        <div className=''>
          <RecentPr/>
          </div>
      </div>
      <PFooter/>
    </div>
  );
}
