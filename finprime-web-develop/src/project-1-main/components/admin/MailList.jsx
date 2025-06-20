import { useState, useEffect } from "react";
import SideNavbar from "../adminregister/SideNavbar";

const MailList = () => {
  const [emailList, setEmailList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [emailsPerPage] = useState(12); // Set to 5 emails per page
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [fetchError, setFetchError] = useState(null); // Error state
  const [isPaginationLoading, setIsPaginationLoading] = useState(false); // Pagination loading state

  useEffect(() => {
    const fetchEmails = async () => {
      setIsLoading(true); // Show loading indicator when fetching data
      try {
        const response = await fetch("https://finprimeconsulting.com/api/mails");
        console.log("Response status:", response.status); // Log response status for debugging
        if (!response.ok) {
          throw new Error(`Error fetching email list: ${response.status}`);
        }
        const data = await response.json();
        console.log("Received data:", data); // Log the response data for debugging

        // Ensure emailList is always an array
        setEmailList(Array.isArray(data) ? data : []);
        setIsLoading(false); // Set loading to false after data is fetched
        setIsPaginationLoading(false); // Allow pagination after data is fetched
      } catch (error) {
        setFetchError(`Error fetching email list: ${error.message}`);
        setIsLoading(false);
        setIsPaginationLoading(false); // Allow pagination even if there's an error
        console.error("Error:", error); // Log the error for debugging
      }
    };

    fetchEmails();
  }, [activePage]); // Fetch emails when activePage changes

  // Logic to determine the current emails to display based on the active page
  const lastEmailIndex = activePage * emailsPerPage;
  const firstEmailIndex = lastEmailIndex - emailsPerPage;
  const currentEmails = emailList.slice(firstEmailIndex, lastEmailIndex);

  // Pagination logic for emails
  const totalPages = emailList.length > 0 ? Math.ceil(emailList.length / emailsPerPage) : 1;

  const handlePageChange = (pageNumber) => {
    if (!isPaginationLoading) {
      setActivePage(pageNumber);
      setIsPaginationLoading(true); // Disable pagination buttons during loading
    }
  };

  const handlePrevPage = () => {
    if (activePage > 1 && !isPaginationLoading) {
      setActivePage(activePage - 1);
      setIsPaginationLoading(true);
    }
  };

  const handleNextPage = () => {
    if (activePage < totalPages && !isPaginationLoading) {
      setActivePage(activePage + 1);
      setIsPaginationLoading(true);
    }
  };

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="container mx-auto mt-10 py-20 pr-10 overflow-y-auto w-full">
        <h2 className="text-2xl font-bold mb-4">Email List</h2>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : fetchError ? (
          <div className="text-center text-red-500">{fetchError}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-brandDark">
              <thead>
                <tr className="bg-brandDark text-white">
                  <th className="border border-brandDark px-4 py-2">ID</th>
                  <th className="border border-brandDark px-4 py-2">Name</th>
                  <th className="border border-brandDark px-4 py-2">Company</th>
                  <th className="border border-brandDark px-4 py-2">Email</th>
                  <th className="border border-brandDark px-4 py-2">Mobile</th>
                  <th className="border border-brandDark px-4 py-2">Sent At</th>
                </tr>
              </thead>
              <tbody>
                {currentEmails.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No emails available</td>
                  </tr>
                ) : (
                  currentEmails.map((email) => (
                    <tr key={email.id} className="hover:bg-gray-100 text-center">
                      <td className="border border-brandDark px-4 py-2">{email.id}</td>
                      <td className="border border-brandDark px-4 py-2">{email.name}</td>
                      <td className="border border-brandDark px-4 py-2">{email.company}</td>
                      <td className="border border-brandDark px-4 py-2">{email.email}</td>
                      <td className="border border-brandDark px-4 py-2">{email.mobile}</td>
                      <td className="border border-brandDark px-4 py-2">
                        {email.created_at ? new Date(email.created_at).toLocaleString() : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Email Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            className={`px-4 py-2 bg-gray-300 rounded-l-md ${activePage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={activePage === 1}
          >
            {"<"}
          </button>
          {/* Page Numbers for Emails */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 ${activePage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className={`px-4 py-2 bg-gray-300 rounded-r-md ${activePage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={activePage === totalPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailList;