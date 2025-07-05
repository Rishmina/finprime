import { useState, useEffect } from "react";
import SideNavbar from "../adminregister/SideNavbar";

const MailList2 = () => {
  const [mails, setMails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [mailsPerPage] = useState(12); // Set to 5 mails per page
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [loadingPagination, setLoadingPagination] = useState(false); // New state for pagination loading

  useEffect(() => {
    const fetchMails = async () => {
      setLoading(true); // Show loading indicator when fetching data
      try {
        const response = await fetch("https://finprimeconsulting.com/api/subscribers");
        console.log("Response status:", response.status); // Log response status for debugging
        if (!response.ok) {
          throw new Error(`Error fetching mail list: ${response.status}`);
        }
        const data = await response.json();
        console.log("Received data:", data); // Log the response data for debugging

        // Ensure mails is always an array
        setMails(Array.isArray(data) ? data : []);
        setLoading(false); // Set loading to false after data is fetched
        setLoadingPagination(false); // Allow pagination after data is fetched
      } catch (error) {
        setError(`Error fetching mail list: ${error.message}`);
        setLoading(false);
        setLoadingPagination(false); // Allow pagination even if there's an error
        console.error("Error:", error); // Log the error for debugging
      }
    };

    fetchMails();
  }, [currentPage]); // Fetch mails when currentPage changes

  // Logic to determine the current mails to display based on the current page
  const indexOfLastMail = currentPage * mailsPerPage;
  const indexOfFirstMail = indexOfLastMail - mailsPerPage;
  const currentMails = mails.slice(indexOfFirstMail, indexOfLastMail);

  // Pagination logic for mails
  const totalMailsPages = mails.length > 0 ? Math.ceil(mails.length / mailsPerPage) : 1;

  const handlePageChange = (pageNumber) => {
    if (!loadingPagination) {
      setCurrentPage(pageNumber);
      setLoadingPagination(true); // Disable pagination buttons during loading
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1 && !loadingPagination) {
      setCurrentPage(currentPage - 1);
      setLoadingPagination(true);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalMailsPages && !loadingPagination) {
      setCurrentPage(currentPage + 1);
      setLoadingPagination(true);
    }
  };

  return (
    <div className="flex h-screen">
      <SideNavbar />
      <div className="container mx-auto mt-10 py-20 pr-10 overflow-y-auto w-full">
        <h2 className="text-2xl font-bold mb-4">Mail List</h2>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-brandDark">
              <thead>
                <tr className="bg-brandDark text-white">
                  <th className="border border-brandDark px-4 py-2">ID</th>
                  <th className="border border-brandDark px-4 py-2">Name</th>
                  <th className="border border-brandDark px-4 py-2">Email</th>
                  <th className="border border-brandDark px-4 py-2">Sent At</th>
                </tr>
              </thead>
              <tbody>
                {currentMails.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">No mails available</td>
                  </tr>
                ) : (
                  currentMails.map((mail) => (
                    <tr key={mail.id} className="hover:bg-gray-100 text-center">
                      <td className="border border-brandDark px-4 py-2">{mail.id}</td>
                      <td className="border border-brandDark px-4 py-2">{mail.name}</td>
                      <td className="border border-brandDark px-4 py-2">{mail.email}</td>
                      <td className="border border-brandDark px-4 py-2">
                        {new Date(mail.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Mail Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            className={`px-4 py-2 bg-gray-300 rounded-l-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
          {/* Page Numbers for Mails */}
          {Array.from({ length: totalMailsPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            className={`px-4 py-2 bg-gray-300 rounded-r-md ${currentPage === totalMailsPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === totalMailsPages}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailList2;