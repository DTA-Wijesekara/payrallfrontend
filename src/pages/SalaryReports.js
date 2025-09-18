// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEye, FaDownload, FaPrint, FaFilter, FaSearch } from "react-icons/fa";

// export default function SalaryReports() {
//   const [reports, setReports] = useState([]);
//   const [filteredReports, setFilteredReports] = useState([]);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterYear, setFilterYear] = useState("");
//   const [filterMonth, setFilterMonth] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchSalaryReports();
//   }, []);

//   useEffect(() => {
//     filterReports();
//   }, [reports, searchTerm, filterYear, filterMonth]);

//   const fetchSalaryReports = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/calculations/salaryreports`);
//       setReports(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching salary reports", err);
//       setLoading(false);
//     }
//   };

//   const filterReports = () => {
//     let result = reports;

//     if (searchTerm) {
//       result = result.filter(report => 
//         report.employeeId.toString().includes(searchTerm) ||
//         (report.Employe && (
//           (report.Employe.firstName && report.Employe.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (report.Employe.lastName && report.Employe.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
//         ))
//       );
//     }

//     if (filterYear) {
//       result = result.filter(report => report.year.toString() === filterYear);
//     }

//     if (filterMonth) {
//       result = result.filter(report => report.month.toString() === filterMonth);
//     }

//     setFilteredReports(result);
//   };

//   const viewReportDetails = (report) => {
//     setSelectedReport(report);
//     setIsModalOpen(true);
//   };

//   const downloadReport = (report) => {
//     // In a real implementation, this would generate a PDF
//     console.log("Downloading report:", report);
//     alert(`Download functionality would be implemented for report ${report.id}`);
//   };

//   const printReport = (report) => {
//     // In a real implementation, this would print the report
//     console.log("Printing report:", report);
//     alert(`Print functionality would be implemented for report ${report.id}`);
//   };

//   const formatMonth = (month) => {
//     const months = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
//     return months[month - 1] || month;
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(amount);
//   };

//   // Generate years for filter (current year and previous 5 years)
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Salary Reports</h1>
//             <p className="text-sm text-gray-500 mt-1">
//               View and manage employee salary reports.
//             </p>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <FaSearch className="text-gray-400" />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search by employee ID or name..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//               <select
//                 value={filterYear}
//                 onChange={(e) => setFilterYear(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 <option value="">All Years</option>
//                 {years.map(year => (
//                   <option key={year} value={year}>{year}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
//               <select
//                 value={filterMonth}
//                 onChange={(e) => setFilterMonth(e.target.value)}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 <option value="">All Months</option>
//                 {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
//                   <option key={month} value={month}>{formatMonth(month)}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Reports Table */}
//         {loading ? (
//           <div className="bg-white shadow rounded-lg p-8 text-center">
//             <p className="text-gray-500">Loading salary reports...</p>
//           </div>
//         ) : (
//           <>
//             {/* Table for medium+ screens */}
//             <div className="hidden sm:block bg-white shadow rounded-lg overflow-hidden">
//               <div className="w-full overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report ID</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
//                       {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Salary</th> */}
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated On</th>
//                       <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredReports.length > 0 ? (
//                       filteredReports.map((report) => (
//                         <tr key={report.id} className="hover:bg-gray-50">
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{report.id}</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                             <div className="text-sm font-medium text-gray-800">{report.employeeName}</div>
//                           <div className="text-xs text-gray-500 mt-1">Employee ID: {report.employeeNumber}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                             {formatMonth(report.month)} {report.year}
//                           </td>
//                           {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                             {formatCurrency(report.grossSalary)}
//                           </td> */}
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-600">
//                             {formatCurrency(report.netSalary)}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {new Date(report.generatedOn).toLocaleDateString()}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
//                             <div className="inline-flex items-center gap-2">
//                               <button
//                                 aria-label={`view-${report.id}`}
//                                 onClick={() => viewReportDetails(report)}
//                                 className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
//                               >
//                                 <FaEye />
//                               </button>
//                               <button
//                                 aria-label={`download-${report.id}`}
//                                 onClick={() => downloadReport(report)}
//                                 className="p-2 rounded-md text-green-600 hover:bg-green-50 transition"
//                               >
//                                 <FaDownload />
//                               </button>
//                               <button
//                                 aria-label={`print-${report.id}`}
//                                 onClick={() => printReport(report)}
//                                 className="p-2 rounded-md text-gray-600 hover:bg-gray-50 transition"
//                               >
//                                 <FaPrint />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="7" className="px-6 py-8 text-center text-sm text-gray-500">
//                           No salary reports found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Card list for small screens */}
//             <div className="sm:hidden space-y-4">
//               {filteredReports.length > 0 ? (
//                 filteredReports.map((report) => (
//                   <div
//                     key={report.id}
//                     className="bg-white shadow-sm rounded-lg p-4"
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div>
//                         <div className="text-sm font-medium text-gray-800">
//                           <div className="text-sm font-medium text-gray-800">Employee Name: {report.employeeName}</div>
//                           <div className="text-xs text-gray-500 mt-1">Employee ID: {report.employeeNumber}</div>
//                         </div>
//                         <div className="text-xs text-gray-500 mt-1">Report ID: {report.id}</div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           aria-label={`view-${report.id}`}
//                           onClick={() => viewReportDetails(report)}
//                           className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
//                         >
//                           <FaEye />
//                         </button>
//                         <button
//                           aria-label={`download-${report.id}`}
//                           onClick={() => downloadReport(report)}
//                           className="p-2 rounded-md text-green-600 hover:bg-green-50 transition"
//                         >
//                           <FaDownload />
//                         </button>
//                         <button
//                           aria-label={`print-${report.id}`}
//                           onClick={() => printReport(report)}
//                           className="p-2 rounded-md text-gray-600 hover:bg-gray-50 transition"
//                         >
//                           <FaPrint />
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-2 text-sm">
//                       <div>
//                         <span className="font-medium">Period:</span> {formatMonth(report.month)} {report.year}
//                       </div>
//                       <div>
//                         <span className="font-medium">Gross:</span> {formatCurrency(report.grossSalary)}
//                       </div>
//                       <div>
//                         <span className="font-medium">Net:</span> <span className="text-green-600">{formatCurrency(report.netSalary)}</span>
//                       </div>
//                       <div>
//                         <span className="font-medium">Generated:</span> {new Date(report.generatedOn).toLocaleDateString()}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="bg-white shadow-sm rounded-lg p-6 text-center text-gray-500">
//                   No salary reports found
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Report Details Modal */}
//       {isModalOpen && selectedReport && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">Salary Report Details</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Employee Information</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Report ID:</span> {selectedReport.id}</p>
//                   <p><span className="font-medium">Employee Number:</span> {selectedReport.employeeNumber}</p>
//                   <p><span className="font-medium">Employee Name:</span> {selectedReport.employeeName}</p>
//                   <p><span className="font-medium">Employee Category:</span> {selectedReport.categaryName}</p>
//                   <p><span className="font-medium">Employee Department:</span> {selectedReport.departmentName}</p>
//                   <p><span className="font-medium">Period:</span> {formatMonth(selectedReport.month)} {selectedReport.year}</p>
//                   <p><span className="font-medium">Period:</span> {new Date(selectedReport.fromDate).toLocaleDateString()} to {new Date(selectedReport.toDate).toLocaleDateString()}</p>
//                   <p><span className="font-medium">Generated On:</span> {new Date(selectedReport.generatedOn).toLocaleDateString()}</p>
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Salary Summary</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Gross Salary:</span> {formatCurrency(selectedReport.grossSalary)}</p>
//                   <p><span className="font-medium">Total Deductions:</span> {formatCurrency(selectedReport.totalDeductions)}</p>
//                   <p><span className="font-medium">Net Salary:</span> <span className="font-semibold text-green-600">{formatCurrency(selectedReport.netSalary)}</span></p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Earnings</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Wages:</span> {formatCurrency(selectedReport.wages)}</p>
//                   <p><span className="font-medium">KPI Allowance:</span> {formatCurrency(selectedReport.kpiAllowance)}</p>
//                   <p><span className="font-medium">Incentives:</span> {formatCurrency(selectedReport.incentives)}</p>
//                   <p><span className="font-medium">Bonus:</span> {formatCurrency(selectedReport.bonus)}</p>
//                   <p><span className="font-medium">Regular OT Payment:</span> {formatCurrency(selectedReport.ot1Payment)}</p>
//                   <p><span className="font-medium">Double OT Payment:</span> {formatCurrency(selectedReport.ot1Payment)}</p>
//                   <p><span className="font-medium">Total OT Payment:</span> {formatCurrency(selectedReport.totalOtPayment)}</p>
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Deductions & Contributions</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Salary Advances:</span> {formatCurrency(selectedReport.salaryAdvances)}</p>
//                   <p><span className="font-medium">Loans:</span> {formatCurrency(selectedReport.loans)}</p>
//                   <p><span className="font-medium">Other Deductions:</span> {formatCurrency(selectedReport.otherDeductions)}</p>
//                   <p><span className="font-medium">EPF 1:</span> {formatCurrency(selectedReport.epf1)}</p>
//                   <p><span className="font-medium">EPF 2:</span> {formatCurrency(selectedReport.epf2)}</p>
//                   <p><span className="font-medium">ETF:</span> {formatCurrency(selectedReport.etf)}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2 text-gray-800">Attendance Details</h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div>
//                   <p><span className="font-medium">Working Days:</span> {selectedReport.workingDays}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">Leave Days:</span> {selectedReport.leaveDays}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">Half Days:</span> {selectedReport.halfDays}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">No Pay Days:</span> {selectedReport.noPayDays}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">Regular OT Hours:</span> {selectedReport.ot1Hours}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">Double OT Hours:</span> {selectedReport.ot2Hours}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
//               <button
//                 onClick={() => downloadReport(selectedReport)}
//                 className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
//               >
//                 <FaDownload /> Download PDF
//               </button>
//               <button
//                 onClick={() => printReport(selectedReport)}
//                 className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
//               >
//                 <FaPrint /> Print
//               </button>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-lg shadow-sm transition"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }









import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaEye, FaDownload, FaPrint, FaFilter, FaSearch } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function SalaryReports() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const reportRef = useRef();

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

  const generatePDF = async (report) => {
    const input = reportRef.current;
    
    // Create a canvas from the report content
    const canvas = await html2canvas(input, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false
    });
    
    // Convert canvas to image data
    const imgData = canvas.toDataURL('image/png');
    
    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    // Initialize PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let heightLeft = imgHeight;
    let position = 0;
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    return pdf;
  };

  const downloadReport = async (report) => {
    try {
      setSelectedReport(report);
      
      // Wait a moment for the DOM to update
      setTimeout(async () => {
        const pdf = await generatePDF(report);
        pdf.save(`Salary_Report_${report.employeeName}_${formatMonth(report.month)}_${report.year}.pdf`);
      }, 500);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const printReport = async (report) => {
    try {
      setSelectedReport(report);
      
      // Wait a moment for the DOM to update
      setTimeout(async () => {
        const pdf = await generatePDF(report);
        
        // Open PDF in new window for printing
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const printWindow = window.open(pdfUrl);
        
        printWindow.onload = function() {
          printWindow.print();
        };
      }, 500);
    } catch (error) {
      console.error("Error printing report:", error);
      alert("Failed to print report. Please try again.");
    }
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
    }).format(amount || 0);
  };

  // Generate years for filter (current year and previous 5 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  // PDF Template Component
  const PDFTemplate = ({ report }) => (
    <div ref={reportRef} className="p-6 bg-white" style={{ width: '794px', minHeight: '1123px' }}>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Salary Report</h1>
        <p className="text-gray-600">{formatMonth(report.month)} {report.year}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">Employee Information</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Report ID:</span> {report.id}</p>
            <p><span className="font-medium">Employee Number:</span> {report.employeeNumber}</p>
            <p><span className="font-medium">Employee Name:</span> {report.employeeName}</p>
            <p><span className="font-medium">Category:</span> {report.categaryName}</p>
            <p><span className="font-medium">Department:</span> {report.departmentName}</p>
            <p><span className="font-medium">Period:</span> {formatMonth(report.month)} {report.year}</p>
            <p><span className="font-medium">Date Range:</span> {new Date(report.fromDate).toLocaleDateString()} to {new Date(report.toDate).toLocaleDateString()}</p>
            <p><span className="font-medium">Generated On:</span> {new Date(report.generatedOn).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">Salary Summary</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Gross Salary:</span> {formatCurrency(report.grossSalary)}</p>
            <p><span className="font-medium">Total Deductions:</span> {formatCurrency(report.totalDeductions)}</p>
            <p><span className="font-medium text-green-600">Net Salary:</span> {formatCurrency(report.netSalary)}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">Earnings</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Wages:</span> {formatCurrency(report.wages)}</p>
            <p><span className="font-medium">KPI Allowance:</span> {formatCurrency(report.kpiAllowance)}</p>
            <p><span className="font-medium">Incentives:</span> {formatCurrency(report.incentives)}</p>
            <p><span className="font-medium">Bonus:</span> {formatCurrency(report.bonus)}</p>
            {!report.isDaySalaryBased && (
              <>
                <p><span className="font-medium">Regular OT Payment:</span> {formatCurrency(report.ot1Payment)}</p>
                <p><span className="font-medium">Double OT Payment:</span> {formatCurrency(report.ot2Payment)}</p>
                <p><span className="font-medium">Total OT Payment:</span> {formatCurrency(report.totalOtPayment)}</p>
              </>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b pb-1">Deductions & Contributions</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Salary Advances:</span> {formatCurrency(report.salaryAdvances)}</p>
            <p><span className="font-medium">Loans:</span> {formatCurrency(report.loans)}</p>
            <p><span className="font-medium">Other Deductions:</span> {formatCurrency(report.otherDeductions)}</p>
            {!report.isDaySalaryBased && (
              <>
                <p><span className="font-medium">EPF Employee:</span> {formatCurrency(report.epf1)}</p>
                <p><span className="font-medium">EPF Employer:</span> {formatCurrency(report.epf2)}</p>
                <p><span className="font-medium">ETF:</span> {formatCurrency(report.etf)}</p>
                <p><span className="font-medium">Employee Contribution:</span> {formatCurrency(report.employeeContribution)}</p>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 border-b pb-1">Attendance Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p><span className="font-medium">Working Days:</span> {report.workingDays}</p>
          </div>
          <div>
            <p><span className="font-medium">Leave Days:</span> {report.leaveDays}</p>
          </div>
          <div>
            <p><span className="font-medium">Half Days:</span> {report.halfDays}</p>
          </div>
          <div>
            <p><span className="font-medium">No Pay Days:</span> {report.noPayDays}</p>
          </div>
          <div>
            <p><span className="font-medium">Regular OT Hours:</span> {report.ot1Hours}</p>
          </div>
          <div>
            <p><span className="font-medium">Double OT Hours:</span> {report.ot2Hours}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t text-xs text-gray-500 text-center">
        <p>This is an auto-generated salary report. For any discrepancies, please contact the HR department.</p>
        <p>Generated on: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Salary Reports</h1>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated On</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredReports.length > 0 ? (
                      filteredReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{report.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            <div className="text-sm font-medium text-gray-800">{report.employeeName}</div>
                            <div className="text-xs text-gray-500 mt-1">Employee ID: {report.employeeNumber}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatMonth(report.month)} {report.year}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
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
                        <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
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
                          <div className="text-sm font-medium text-gray-800">Employee Name: {report.employeeName}</div>
                          <div className="text-xs text-gray-500 mt-1">Employee ID: {report.employeeNumber}</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Report ID: {report.id}</div>
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
                  <p><span className="font-medium">Report ID:</span> {selectedReport.id}</p>
                  <p><span className="font-medium">Employee Number:</span> {selectedReport.employeeNumber}</p>
                  <p><span className="font-medium">Employee Name:</span> {selectedReport.employeeName}</p>
                  <p><span className="font-medium">Employee Category:</span> {selectedReport.categaryName}</p>
                  <p><span className="font-medium">Employee Department:</span> {selectedReport.departmentName}</p>
                  <p><span className="font-medium">Period:</span> {formatMonth(selectedReport.month)} {selectedReport.year}</p>
                  <p><span className="font-medium">Date Range:</span> {new Date(selectedReport.fromDate).toLocaleDateString()} to {new Date(selectedReport.toDate).toLocaleDateString()}</p>
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
                  <p><span className="font-medium">KPI Allowance:</span> {formatCurrency(selectedReport.kpiAllowance)}</p>
                  <p><span className="font-medium">Incentives:</span> {formatCurrency(selectedReport.incentives)}</p>
                  <p><span className="font-medium">Bonus:</span> {formatCurrency(selectedReport.bonus)}</p>
                  {!selectedReport.isDaySalaryBased && (
                    <>
                      <p><span className="font-medium">Regular OT Payment:</span> {formatCurrency(selectedReport.ot1Payment)}</p>
                      <p><span className="font-medium">Double OT Payment:</span> {formatCurrency(selectedReport.ot2Payment)}</p>
                      <p><span className="font-medium">Total OT Payment:</span> {formatCurrency(selectedReport.totalOtPayment)}</p>
                    </>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Deductions & Contributions</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Salary Advances:</span> {formatCurrency(selectedReport.salaryAdvances)}</p>
                  <p><span className="font-medium">Loans:</span> {formatCurrency(selectedReport.loans)}</p>
                  <p><span className="font-medium">Other Deductions:</span> {formatCurrency(selectedReport.otherDeductions)}</p>
                  {!selectedReport.isDaySalaryBased && (
                    <>
                      <p><span className="font-medium">EPF Employee:</span> {formatCurrency(selectedReport.epf1)}</p>
                      <p><span className="font-medium">EPF Employer:</span> {formatCurrency(selectedReport.epf2)}</p>
                      <p><span className="font-medium">ETF:</span> {formatCurrency(selectedReport.etf)}</p>
                      <p><span className="font-medium">Employee Contribution:</span> {formatCurrency(selectedReport.employeeContribution)}</p>
                    </>
                  )}
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
                  <p><span className="font-medium">Regular OT Hours:</span> {selectedReport.ot1Hours}</p>
                </div>
                <div>
                  <p><span className="font-medium">Double OT Hours:</span> {selectedReport.ot2Hours}</p>
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

      {/* Hidden PDF Template (for generating PDFs) */}
      {selectedReport && (
        <div className="fixed -left-[9999px] top-0">
          <PDFTemplate report={selectedReport} />
        </div>
      )}
    </div>
  );
}