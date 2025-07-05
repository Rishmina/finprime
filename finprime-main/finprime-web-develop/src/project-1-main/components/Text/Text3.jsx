
import React from 'react';

const Text3 = () => {
  const serData = [
    { id: 1, title: "Accounting Services in Dubai" },
    { id: 2, title: "Best Accounting Companies in Dubai" },
    { id: 3, title: "Outsourcing Companies in Dubai" },
    { id: 4, title: "ICV Audit" },
    { id: 5, title: "Internal Audit Service" },
    { id: 6, title: "VAT Services in UAE" },
    { id: 7, title: "Corporate Tax Services in UAE" },
    { id: 8, title: "Approved Auditors in UAE" },
    { id: 9, title: "Accounting for Small Business" },
    { id: 10, title: "Certified Internal Auditors" },
    { id: 11, title: "Audit Report" },
    { id: 12, title: "Audit Services in UAE" },
    { id: 13, title: "Accounting and Bookkeeping" },
    { id: 14, title: "Chartered Accountants Dubai" },
    { id: 15, title: "Accounting and Bookkeeping Services in UAE" },
    { id: 16, title: "Business Consultants in Dubai" },
    { id: 17, title: "Company Formations" },
    { id: 18, title: "AML Services in Dubai" },
    { id: 19, title: "Auditing and Bookkeeping" },
    { id: 20, title: "Best Auditing Services in Dubai" }
];

 

  return (
    <div 
   >
      <div className='flex items-center justify-center  '>
        {serData.map((id, index) => (
          <div 
          
          key={id.id} className='flex items-center  text-white text-[1px]  '>
            <h6 className=' lg:mx-2 select-none'>{id.title}</h6>
            {index < serData.length - 1 && <span className='hidden sm:inline select-none'>|</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Text3;

