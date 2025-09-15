// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEye, FaPrint, FaFilePdf } from "react-icons/fa";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// export default function SalaryReports() {
//   const [reports, setReports] = useState([]);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/api/calculations/salaryreports`
//       );
//       setReports(res.data);
//     } catch (err) {
//       console.error("Error fetching Salary Reports", err);
//     }
//   };

//   const fetchReportById = async (id) => {
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_API_BASE_URL}/api/calculations/salaryreports/employee/${id}`
//       );
//       setSelectedReport(res.data[0]); // taking first record for employee
//       setIsModalOpen(true);
//     } catch (err) {
//       console.error("Error fetching Salary Report details", err);
//     }
//   };

//   const downloadPdf = (report) => {
//     const doc = new jsPDF();
//     doc.text("Salary Report", 14, 15);

//     doc.autoTable({
//       startY: 25,
//       head: [["Field", "Value"]],
//       body: [
//         ["Employee ID", report.employeeId],
//         ["Year", report.year],
//         ["Month", report.month],
//         ["Working Days", report.workingDays],
//         ["Gross Salary", report.grossSalary],
//         ["Net Salary", report.netSalary],
//         ["Total Deductions", report.totalDeductions],
//         ["OT Payment", report.totalOTPayment],
//         ["Generated On", new Date(report.generatedOn).toLocaleString()],
//       ],
//     });

//     doc.save(`SalaryReport_${report.employeeId}_${report.month}_${report.year}.pdf`);
//   };

//   const printReport = (report) => {
//     const printContent = `
//       <h2>Salary Report</h2>
//       <p><b>Employee ID:</b> ${report.employeeId}</p>
//       <p><b>Year:</b> ${report.year}</p>
//       <p><b>Month:</b> ${report.month}</p>
//       <p><b>Working Days:</b> ${report.workingDays}</p>
//       <p><b>Gross Salary:</b> ${report.grossSalary}</p>
//       <p><b>Net Salary:</b> ${report.netSalary}</p>
//       <p><b>Total Deductions:</b> ${report.totalDeductions}</p>
//       <p><b>OT Payment:</b> ${report.totalOTPayment}</p>
//       <p><b>Generated On:</b> ${new Date(report.generatedOn).toLocaleString()}</p>
//     `;
//     const printWindow = window.open("", "", "height=600,width=800");
//     printWindow.document.write("<html><body>");
//     printWindow.document.write(printContent);
//     printWindow.document.write("</body></html>");
//     printWindow.document.close();
//     printWindow.print();
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800">Salary Reports</h1>
//             <p className="text-sm text-gray-500 mt-1">
//               View, print, and download salary reports.
//             </p>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="hidden sm:block bg-white shadow rounded-lg overflow-hidden">
//           <div className="w-full overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Salary</th>
//                   <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-100">
//                 {reports.length > 0 ? (
//                   reports.map((report) => (
//                     <tr key={report.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 text-sm text-gray-700">{report.id}</td>
//                       <td className="px-6 py-4 text-sm text-gray-800">{report.employeeId}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600">{report.year}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600">{report.month}</td>
//                       <td className="px-6 py-4 text-sm text-gray-600">{report.netSalary}</td>
//                       <td className="px-6 py-4 text-center text-sm">
//                         <div className="inline-flex items-center gap-2">
//                           <button
//                             aria-label={`view-${report.id}`}
//                             onClick={() => fetchReportById(report.employeeId)}
//                             className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
//                           >
//                             <FaEye />
//                           </button>
//                           <button
//                             aria-label={`print-${report.id}`}
//                             onClick={() => printReport(report)}
//                             className="p-2 rounded-md text-green-600 hover:bg-green-50 transition"
//                           >
//                             <FaPrint />
//                           </button>
//                           <button
//                             aria-label={`pdf-${report.id}`}
//                             onClick={() => downloadPdf(report)}
//                             className="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
//                           >
//                             <FaFilePdf />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
//                       No Salary Reports found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Modal */}
//         {isModalOpen && selectedReport && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//               <h2 className="text-xl font-bold mb-4">Salary Report Details</h2>
//               <p><b>Employee ID:</b> {selectedReport.employeeId}</p>
//               <p><b>Year:</b> {selectedReport.year}</p>
//               <p><b>Month:</b> {selectedReport.month}</p>
//               <p><b>Gross Salary:</b> {selectedReport.grossSalary}</p>
//               <p><b>Net Salary:</b> {selectedReport.netSalary}</p>
//               <p><b>Deductions:</b> {selectedReport.totalDeductions}</p>
//               <p><b>OT Payment:</b> {selectedReport.totalOTPayment}</p>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }









import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaDownload, FaPrint, FaFilter, FaSearch } from "react-icons/fa";

export default function SalaryReports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalaryReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchTerm, filterYear, filterMonth]);

  const fetchSalaryReports = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/calculations/salaryreports`);
      setReports(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching salary reports", err);
      setLoading(false);
    }
  };

  const filterReports = () => {
    let result = reports;

    if (searchTerm) {
      result = result.filter(report => 
        report.employeeId.toString().includes(searchTerm) ||
        (report.Employe && (
          (report.Employe.firstName && report.Employe.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (report.Employe.lastName && report.Employe.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
        ))
      );
    }

    if (filterYear) {
      result = result.filter(report => report.year.toString() === filterYear);
    }

    if (filterMonth) {
      result = result.filter(report => report.month.toString() === filterMonth);
    }

    setFilteredReports(result);
  };

  const viewReportDetails = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const downloadReport = (report) => {
    // In a real implementation, this would generate a PDF
    console.log("Downloading report:", report);
    alert(`Download functionality would be implemented for report ${report.id}`);
  };

  const printReport = (report) => {
    // In a real implementation, this would print the report
    console.log("Printing report:", report);
    alert(`Print functionality would be implemented for report ${report.id}`);
  };

  const formatMonth = (month) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[month - 1] || month;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Generate years for filter (current year and previous 5 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Salary Reports</h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage employee salary reports.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by employee ID or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                value={filterYear}
                onChange={(e) => setFilterYear(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Months</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={month} value={month}>{formatMonth(month)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        {loading ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-gray-500">Loading salary reports...</p>
          </div>
        ) : (
          <>
            {/* Table for medium+ screens */}
            <div className="hidden sm:block bg-white shadow rounded-lg overflow-hidden">
              <div className="w-full overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated On</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReports.length > 0 ? (
                      filteredReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">#{report.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {report.Employe ? `${report.Employe.firstName} ${report.Employe.lastName}` : `Employee ${report.employeeId}`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatMonth(report.month)} {report.year}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatCurrency(report.grossSalary)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            {formatCurrency(report.netSalary)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(report.generatedOn).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                            <div className="inline-flex items-center gap-2">
                              <button
                                aria-label={`view-${report.id}`}
                                onClick={() => viewReportDetails(report)}
                                className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
                              >
                                <FaEye />
                              </button>
                              <button
                                aria-label={`download-${report.id}`}
                                onClick={() => downloadReport(report)}
                                className="p-2 rounded-md text-green-600 hover:bg-green-50 transition"
                              >
                                <FaDownload />
                              </button>
                              <button
                                aria-label={`print-${report.id}`}
                                onClick={() => printReport(report)}
                                className="p-2 rounded-md text-gray-600 hover:bg-gray-50 transition"
                              >
                                <FaPrint />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-8 text-center text-sm text-gray-500">
                          No salary reports found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card list for small screens */}
            <div className="sm:hidden space-y-4">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white shadow-sm rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          {report.Employe ? `${report.Employe.firstName} ${report.Employe.lastName}` : `Employee ${report.employeeId}`}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">ID: #{report.id}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          aria-label={`view-${report.id}`}
                          onClick={() => viewReportDetails(report)}
                          className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
                        >
                          <FaEye />
                        </button>
                        <button
                          aria-label={`download-${report.id}`}
                          onClick={() => downloadReport(report)}
                          className="p-2 rounded-md text-green-600 hover:bg-green-50 transition"
                        >
                          <FaDownload />
                        </button>
                        <button
                          aria-label={`print-${report.id}`}
                          onClick={() => printReport(report)}
                          className="p-2 rounded-md text-gray-600 hover:bg-gray-50 transition"
                        >
                          <FaPrint />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Period:</span> {formatMonth(report.month)} {report.year}
                      </div>
                      <div>
                        <span className="font-medium">Gross:</span> {formatCurrency(report.grossSalary)}
                      </div>
                      <div>
                        <span className="font-medium">Net:</span> <span className="text-green-600">{formatCurrency(report.netSalary)}</span>
                      </div>
                      <div>
                        <span className="font-medium">Generated:</span> {new Date(report.generatedOn).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white shadow-sm rounded-lg p-6 text-center text-gray-500">
                  No salary reports found
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Report Details Modal */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Salary Report Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Employee Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Employee ID:</span> {selectedReport.employeeId}</p>
                  <p><span className="font-medium">Name:</span> {selectedReport.Employe ? `${selectedReport.Employe.firstName} ${selectedReport.Employe.lastName}` : 'N/A'}</p>
                  <p><span className="font-medium">Period:</span> {formatMonth(selectedReport.month)} {selectedReport.year}</p>
                  <p><span className="font-medium">Generated On:</span> {new Date(selectedReport.generatedOn).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Salary Summary</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Gross Salary:</span> {formatCurrency(selectedReport.grossSalary)}</p>
                  <p><span className="font-medium">Total Deductions:</span> {formatCurrency(selectedReport.totalDeductions)}</p>
                  <p><span className="font-medium">Net Salary:</span> <span className="font-semibold text-green-600">{formatCurrency(selectedReport.netSalary)}</span></p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Earnings</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Wages:</span> {formatCurrency(selectedReport.wages)}</p>
                  <p><span className="font-medium">KPI Allowance:</span> {formatCurrency(selectedReport.kPIAllowance)}</p>
                  <p><span className="font-medium">Incentives:</span> {formatCurrency(selectedReport.incentives)}</p>
                  <p><span className="font-medium">Bonus:</span> {formatCurrency(selectedReport.bonus)}</p>
                  <p><span className="font-medium">OT1 Payment:</span> {formatCurrency(selectedReport.oT1Payment)}</p>
                  <p><span className="font-medium">OT2 Payment:</span> {formatCurrency(selectedReport.oT2Payment)}</p>
                  <p><span className="font-medium">Total OT Payment:</span> {formatCurrency(selectedReport.totalOTPayment)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Deductions & Contributions</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Salary Advances:</span> {formatCurrency(selectedReport.salaryAdvances)}</p>
                  <p><span className="font-medium">Loans:</span> {formatCurrency(selectedReport.loans)}</p>
                  <p><span className="font-medium">Other Deductions:</span> {formatCurrency(selectedReport.otherDeductions)}</p>
                  <p><span className="font-medium">EPF Employee:</span> {formatCurrency(selectedReport.ePF1)}</p>
                  <p><span className="font-medium">EPF Employer:</span> {formatCurrency(selectedReport.ePF2)}</p>
                  <p><span className="font-medium">ETF:</span> {formatCurrency(selectedReport.eTF)}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Attendance Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p><span className="font-medium">Working Days:</span> {selectedReport.workingDays}</p>
                </div>
                <div>
                  <p><span className="font-medium">Leave Days:</span> {selectedReport.leaveDays}</p>
                </div>
                <div>
                  <p><span className="font-medium">Half Days:</span> {selectedReport.halfDays}</p>
                </div>
                <div>
                  <p><span className="font-medium">No Pay Days:</span> {selectedReport.noPayDays}</p>
                </div>
                <div>
                  <p><span className="font-medium">OT1 Hours:</span> {selectedReport.oT1Hours}</p>
                </div>
                <div>
                  <p><span className="font-medium">OT2 Hours:</span> {selectedReport.oT2Hours}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => downloadReport(selectedReport)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
              >
                <FaDownload /> Download PDF
              </button>
              <button
                onClick={() => printReport(selectedReport)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
              >
                <FaPrint /> Print
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-lg shadow-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}