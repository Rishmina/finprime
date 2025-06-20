import React, { useEffect, useState } from 'react';
import SideNavbar from '../adminregister/SideNavbar';

const FormSubmissionsList = () => {
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [submissionsPerPage] = useState(7); // Set the number of items per page

  // Fetch form submissions from the backend
  useEffect(() => {
    fetch('https://finprimeconsulting.com/api/form-submissions')  // Replace with your actual backend URL
      .then((response) => response.json())
      .then((data) => setFormSubmissions(data))
      .catch((error) => console.error('Error fetching submissions:', error));
  }, []);

  // Logic to determine the current submissions to display based on the current page
  const indexOfLastSubmission = currentPage * submissionsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
  const currentSubmissions = formSubmissions.slice(indexOfFirstSubmission, indexOfLastSubmission);

  // Pagination logic
  const totalPages = Math.ceil(formSubmissions.length / submissionsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='flex h-screen'> 
      <SideNavbar/>
      <div className=" mx-auto mt-16 py-20 pr-10 pl-10 overflow-y-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Survices Form Submissions</h2>
        <table className="w-full table-auto border-collapse border border-brandBlue ">
          <thead>
            <tr className='bg-brandBlue text-white'> 
              <th className="border border-brandBlue px-4 py-2">ID</th>
              <th className="border border-brandBlue px-4 py-2">Company Name</th>
              <th className="border border-brandBlue px-4 py-2">First Name</th>
              <th className="border border-brandBlue px-4 py-2">Last Name</th>
              <th className="border border-brandBlue px-4 py-2">Email</th>
              <th className="border border-brandBlue px-4 py-2">Phone</th>
              <th className="border border-brandBlue px-4 py-2">Service</th>
              <th className="border border-brandBlue px-4 py-2">Sub-Service</th>
              <th className="border border-brandBlue px-4 py-2">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {currentSubmissions.length === 0 ? (
              <tr>
                <td colSpan="9" className="border-b px-4 py-2 text-center">No submissions available</td>
              </tr>
            ) : (
              currentSubmissions.map((submission) => (
                <tr key={submission.id} className='text-center'>
                  <td className="border border-brandBlue px-4 py-2">{submission.id}</td>
                  <td className="border border-brandBlue px-4 py-2">{submission.companyName}</td>
                  <td className="border border-brandBlue px-4 py-2">{submission.firstName}</td>
                  <td className="border border-brandBlue px-4 py-2">{submission.lastName}</td>
                  <td className="border border-brandBlue px-4 py-2">{submission.email}</td>
                  <td className="border border-brandBlue px-4 py-2">{submission.phone}</td>
                  <td className="border border-brandBlue px-4 py-2">{submission.service}</td>
                  <td className="border border-brandBlue px-4 py-2">{submission.subService}</td>
                  <td className="border border-brandBlue px-4 py-2">{new Date(submission.submitted_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 bg-gray-300 rounded-l-md"
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-gray-300 rounded-r-md"
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormSubmissionsList;