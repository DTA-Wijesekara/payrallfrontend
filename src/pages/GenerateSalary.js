// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaPlus, FaEye, FaCalculator, FaExclamationTriangle } from "react-icons/fa";

// export default function GenerateSalary() {
//   const [employees, setEmployees] = useState([]);
//   const [formData, setFormData] = useState({
//     employeeId: "",
//     year: new Date().getFullYear(),
//     month: new Date().getMonth() + 1,
//     workingDays: 0,
//     incentives: 0,
//     bonus: 0,
//     salaryAdvances: 0,
//     loans: 0,
//     otherDeductions: 0,
//     leaveDays: 0,
//     halfDays: 0,
//     noPayDays: 0,
//     ot1Hours: 0,
//     ot2Hours: 0
//   });
//   const [generatedReport, setGeneratedReport] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [employeeLoading, setEmployeeLoading] = useState(true);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [activeLoan, setActiveLoan] = useState(null);
//   const [loanLoading, setLoanLoading] = useState(false);

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   useEffect(() => {
//     if (formData.employeeId) {
//       fetchActiveLoan(formData.employeeId);
//     } else {
//       setActiveLoan(null);
//       setFormData(prev => ({
//         ...prev,
//         loans: 0
//       }));
//     }
//   }, [formData.employeeId]);

//   const fetchEmployees = async () => {
//     try {
//       setEmployeeLoading(true);
//       const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employe`);
//       setEmployees(res.data);
//       setEmployeeLoading(false);
//     } catch (err) {
//       console.error("Error fetching employees", err);
//       showMessage("Failed to load employees", "error");
//       setEmployeeLoading(false);
//     }
//   };

//   const fetchActiveLoan = async (employeeId) => {
//     try {
//       setLoanLoading(true);
//       const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/loan/active/${employeeId}`);
//       if (res.data) {
//         setActiveLoan(res.data);
//         // auto-fill loan installment into form
//         setFormData(prev => ({
//           ...prev,
//           loans: res.data.monthlyInstallment
//         }));
//       } else {
//         setActiveLoan(null);
//         setFormData(prev => ({
//           ...prev,
//           loans: 0
//         }));
//       }
//       setLoanLoading(false);
//     } catch (err) {
//       // if no loan, clear loan state
//       setActiveLoan(null);
//       setFormData(prev => ({
//         ...prev,
//         loans: 0
//       }));
//       setLoanLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_BASE_URL}/api/calculations/generate`,
//         formData
//       );
      
//       setGeneratedReport(res.data);
//       setIsModalOpen(true);
//       showMessage("Salary report generated successfully!", "success");
//     } catch (err) {
//       console.error("Error generating salary report", err);
//       showMessage("Failed to generate salary report", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showMessage = (text, type) => {
//     setMessage({ text, type });
//     setTimeout(() => setMessage({ text: "", type: "" }), 5000);
//   };

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(amount);
//   };

//   const formatMonth = (month) => {
//     const months = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
//     return months[month - 1] || month;
//   };

//   // Generate years for dropdown (current year and previous 5 years)
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">Generate Salary Report</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Create new salary reports for employees.
//           </p>
//         </div>

//         {/* Message Alert */}
//         {message.text && (
//           <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//             {message.text}
//           </div>
//         )}

//         {/* Form */}
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Employee Selection */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
//                 {employeeLoading ? (
//                   <div className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 animate-pulse">
//                     Loading employees...
//                   </div>
//                 ) : (
//                   <select
//                     name="employeeId"
//                     value={formData.employeeId}
//                     onChange={handleChange}
//                     required
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   >
//                     <option value="">Select Employee</option>
//                     {employees.map(employee => (
//                       <option key={employee.id} value={employee.id}>
//                         {employee.fullName} ({employee.employeeNumber})
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               </div>

//               {/* Year Selection */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
//                 <select
//                   name="year"
//                   value={formData.year}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   {years.map(year => (
//                     <option key={year} value={year}>{year}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Month Selection */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
//                 <select
//                   name="month"
//                   value={formData.month}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
//                     <option key={month} value={month}>{formatMonth(month)}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Working Days */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Working Days</label>
//                 <input
//                   type="number"
//                   name="workingDays"
//                   value={formData.workingDays}
//                   onChange={handleChange}
//                   min="0"
//                   max="31"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Leave Days */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Leave Days (Staff only)</label>
//                 <input
//                   type="number"
//                   name="leaveDays"
//                   value={formData.leaveDays}
//                   onChange={handleChange}
//                   min="0"
//                   max="31"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Half Days */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Half Days (staff only)</label>
//                 <input
//                   type="number"
//                   name="halfDays"
//                   value={formData.halfDays}
//                   onChange={handleChange}
//                   min="0"
//                   max="31"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* No Pay Days */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">No Pay Days (Staff only)</label>
//                 <input
//                   type="number"
//                   name="noPayDays"
//                   value={formData.noPayDays}
//                   onChange={handleChange}
//                   min="0"
//                   max="31"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* OT1 Hours */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Regular OT Hours</label>
//                 <input
//                   type="number"
//                   name="ot1Hours"
//                   value={formData.ot1Hours}
//                   onChange={handleChange}
//                   min="0"
//                   step="0.5"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* OT2 Hours */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Double OT Hours</label>
//                 <input
//                   type="number"
//                   name="ot2Hours"
//                   value={formData.ot2Hours}
//                   onChange={handleChange}
//                   min="0"
//                   step="0.5"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Incentives */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Incentives</label>
//                 <input
//                   type="number"
//                   name="incentives"
//                   value={formData.incentives}
//                   onChange={handleChange}
//                   min="0"
//                   step="0.01"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Bonus */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bonus</label>
//                 <input
//                   type="number"
//                   name="bonus"
//                   value={formData.bonus}
//                   onChange={handleChange}
//                   min="0"
//                   step="0.01"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Salary Advances */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Salary Advances</label>
//                 <input
//                   type="number"
//                   name="salaryAdvances"
//                   value={formData.salaryAdvances}
//                   onChange={handleChange}
//                   min="0"
//                   step="0.01"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Other Deductions */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Other Deductions</label>
//                 <input
//                   type="number"
//                   name="otherDeductions"
//                   value={formData.otherDeductions}
//                   onChange={handleChange}
//                   min="0"
//                   step="0.01"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Loans Section */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Loan Deductions</label>
                
//                 {loanLoading ? (
//                   <div className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 animate-pulse mb-3">
//                     Checking for active loans...
//                   </div>
//                 ) : activeLoan ? (
//                   <div className="col-span-2 p-4 bg-blue-50 border border-blue-300 rounded-md mb-4">
//                     <div className="flex items-center mb-2">
//                       <FaExclamationTriangle className="text-blue-500 mr-2" />
//                       <span className="font-medium text-blue-800">Active Loan Found</span>
//                     </div>
//                     <p className="text-sm text-gray-800">
//                       <span className="font-medium">Loan Amount:</span> {formatCurrency(activeLoan.principalAmount)}<br />
//                       <span className="font-medium">Remaining Balance:</span> {formatCurrency(activeLoan.remainingBalance)}<br />
//                       <span className="font-medium">Monthly Installment:</span> {formatCurrency(activeLoan.monthlyInstallment)}
//                     </p>
//                     <p className="text-xs text-gray-600 mt-1">
//                       The installment field below has been auto-filled, but you may adjust it.
//                     </p>
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-500 mb-2">No active loans found for this employee.</p>
//                 )}
                
//                 <input
//                   type="number"
//                   name="loans"
//                   value={formData.loans}
//                   onChange={handleChange}
//                   min="0"
//                   step="0.01"
//                   required
//                   disabled={!activeLoan}   //  disable if no active loan
//                   className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     !activeLoan ? "bg-gray-100 cursor-not-allowed" : ""
//                   }`}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Enter the amount to be deducted for loan repayments
//                 </p>
//               </div>

//             </div>

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={loading || employeeLoading || !formData.employeeId}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition disabled:opacity-50"
//               >
//                 {loading ? (
//                   "Generating..."
//                 ) : (
//                   <>
//                     <FaCalculator /> Generate Report
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Report Preview Modal */}
//       {isModalOpen && generatedReport && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">Salary Report Generated Successfully</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Employee Information</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Employee ID:</span> {generatedReport.employeeId}</p>
//                   <p><span className="font-medium">Period:</span> {formatMonth(generatedReport.month)} {generatedReport.year}</p>
//                   <p><span className="font-medium">Salary Type:</span> {generatedReport.isDaySalaryBased ? "Day Salary Based" : "Monthly Salary Based"}</p>
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Salary Summary</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Gross Salary:</span> {formatCurrency(generatedReport.grossSalary)}</p>
//                   <p><span className="font-medium">Total Deductions:</span> {formatCurrency(generatedReport.totalDeductions)}</p>
//                   <p><span className="font-medium">Net Salary:</span> <span className="font-semibold text-green-600">{formatCurrency(generatedReport.netSalary)}</span></p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Earnings</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Wages:</span> {formatCurrency(generatedReport.wages)}</p>
//                   <p><span className="font-medium">KPI Allowance:</span> {formatCurrency(generatedReport.kPIAllowance)}</p>
//                   <p><span className="font-medium">Incentives:</span> {formatCurrency(generatedReport.incentives)}</p>
//                   <p><span className="font-medium">Bonus:</span> {formatCurrency(generatedReport.bonus)}</p>
//                   {!generatedReport.isDaySalaryBased && (
//                     <>
//                       <p><span className="font-medium">OT1 Payment:</span> {formatCurrency(generatedReport.oT1Payment)}</p>
//                       <p><span className="font-medium">OT2 Payment:</span> {formatCurrency(generatedReport.oT2Payment)}</p>
//                       <p><span className="font-medium">Total OT Payment:</span> {formatCurrency(generatedReport.totalOTPayment)}</p>
//                     </>
//                   )}
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Deductions & Contributions</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Salary Advances:</span> {formatCurrency(generatedReport.salaryAdvances)}</p>
//                   <p><span className="font-medium">Loans:</span> {formatCurrency(generatedReport.loans)}</p>
//                   <p><span className="font-medium">Other Deductions:</span> {formatCurrency(generatedReport.otherDeductions)}</p>
//                   {!generatedReport.isDaySalaryBased && (
//                     <>
//                       <p><span className="font-medium">EPF Employee:</span> {formatCurrency(generatedReport.ePF1)}</p>
//                       <p><span className="font-medium">EPF Employer:</span> {formatCurrency(generatedReport.ePF2)}</p>
//                       <p><span className="font-medium">ETF:</span> {formatCurrency(generatedReport.eTF)}</p>
//                       <p><span className="font-medium">Employee Contribution:</span> {formatCurrency(generatedReport.employeeContribution)}</p>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2 text-gray-800">Attendance Details</h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div>
//                   <p><span className="font-medium">Working Days:</span> {generatedReport.workingDays}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">Leave Days:</span> {generatedReport.leaveDays}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">Half Days:</span> {generatedReport.halfDays}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">No Pay Days:</span> {generatedReport.noPayDays}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">OT1 Hours:</span> {generatedReport.oT1Hours}</p>
//                 </div>
//                 <div>
//                   <p><span className="font-medium">OT2 Hours:</span> {generatedReport.oT2Hours}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
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







import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaEye, FaCalculator, FaExclamationTriangle } from "react-icons/fa";

export default function GenerateSalary() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    workingDays: 0,
    incentives: 0,
    bonus: 0,
    salaryAdvances: 0,
    loans: 0,
    otherDeductions: 0,
    leaveDays: 0,
    halfDays: 0,
    noPayDays: 0,
    ot1Hours: 0,
    ot2Hours: 0,
    fromDate: new Date().toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0]
  });
  const [generatedReport, setGeneratedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeLoan, setActiveLoan] = useState(null);
  const [loanLoading, setLoanLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (formData.employeeId) {
      fetchActiveLoan(formData.employeeId);
    } else {
      setActiveLoan(null);
      setFormData(prev => ({
        ...prev,
        loans: 0
      }));
    }
  }, [formData.employeeId]);

  const fetchEmployees = async () => {
    try {
      setEmployeeLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employe`);
      setEmployees(res.data);
      setEmployeeLoading(false);
    } catch (err) {
      console.error("Error fetching employees", err);
      showMessage("Failed to load employees", "error");
      setEmployeeLoading(false);
    }
  };

  const fetchActiveLoan = async (employeeId) => {
    try {
      setLoanLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/loan/active/${employeeId}`);
      if (res.data) {
        setActiveLoan(res.data);
        setFormData(prev => ({
          ...prev,
          loans: res.data.monthlyInstallment
        }));
      } else {
        setActiveLoan(null);
        setFormData(prev => ({
          ...prev,
          loans: 0
        }));
      }
      setLoanLoading(false);
    } catch (err) {
      setActiveLoan(null);
      setFormData(prev => ({
        ...prev,
        loans: 0
      }));
      setLoanLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };

    if (newFormData.fromDate && newFormData.toDate) {
      const fromDate = new Date(newFormData.fromDate);
      const toDate = new Date(newFormData.toDate);
      
      const workingDays = calculateBusinessDays(fromDate, toDate);
      newFormData.workingDays = workingDays;
    }

    setFormData(newFormData);
  };

  const calculateBusinessDays = (startDate, endDate) => {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    
    return count;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (new Date(formData.fromDate) > new Date(formData.toDate)) {
      showMessage("From date cannot be after to date", "error");
      return;
    }
    
    setLoading(true);
    
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/calculations/generate`,
        formData
      );
      
      setGeneratedReport(res.data);
      setIsModalOpen(true);
      showMessage("Salary report generated successfully!", "success");
    } catch (err) {
      console.error("Error generating salary report", err);
      showMessage("Failed to generate salary report", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatMonth = (month) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[month - 1] || month;
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Generate Salary Report</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create new salary reports for employees.
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                {employeeLoading ? (
                  <div className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 animate-pulse">
                    Loading employees...
                  </div>
                ) : (
                  <select
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Employee</option>
                    {employees.map(employee => (
                      <option key={employee.id} value={employee.id}>
                        {employee.fullName} ({employee.employeeNumber})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Year Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Month Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>{formatMonth(month)}</option>
                  ))}
                </select>
              </div>

              {/* From Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleDateChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* To Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleDateChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Working Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Working Days
                </label>
                <input
                  type="number"
                  name="workingDays"
                  value={formData.workingDays}
                  onChange={handleChange}
                  min="0"
                  max="31"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Automatically calculated from selected dates
                </p>
              </div>

              {/* Leave Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Days (Staff only)</label>
                <input
                  type="number"
                  name="leaveDays"
                  value={formData.leaveDays}
                  onChange={handleChange}
                  min="0"
                  max="31"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Half Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Half Days (staff only)</label>
                <input
                  type="number"
                  name="halfDays"
                  value={formData.halfDays}
                  onChange={handleChange}
                  min="0"
                  max="31"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* No Pay Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No Pay Days (Staff only)</label>
                <input
                  type="number"
                  name="noPayDays"
                  value={formData.noPayDays}
                  onChange={handleChange}
                  min="0"
                  max="31"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* OT1 Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Regular OT Hours (Staff only)</label>
                <input
                  type="number"
                  name="ot1Hours"
                  value={formData.ot1Hours}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* OT2 Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Double OT Hours (Staff only)</label>
                <input
                  type="number"
                  name="ot2Hours"
                  value={formData.ot2Hours}
                  onChange={handleChange}
                  min="0"
                  step="0.5"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Incentives */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Incentives</label>
                <input
                  type="number"
                  name="incentives"
                  value={formData.incentives}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Bonus */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bonus</label>
                <input
                  type="number"
                  name="bonus"
                  value={formData.bonus}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Salary Advances */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Advances</label>
                <input
                  type="number"
                  name="salaryAdvances"
                  value={formData.salaryAdvances}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Other Deductions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Other Deductions</label>
                <input
                  type="number"
                  name="otherDeductions"
                  value={formData.otherDeductions}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Loans Section */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Deductions</label>
                
                {loanLoading ? (
                  <div className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 animate-pulse mb-3">
                    Checking for active loans...
                  </div>
                ) : activeLoan ? (
                  <div className="col-span-2 p-4 bg-blue-50 border border-blue-300 rounded-md mb-4">
                    <div className="flex items-center mb-2">
                      <FaExclamationTriangle className="text-blue-500 mr-2" />
                      <span className="font-medium text-blue-800">Active Loan Found</span>
                    </div>
                    <p className="text-sm text-gray-800">
                      <span className="font-medium">Loan Amount:</span> {formatCurrency(activeLoan.principalAmount)}<br />
                      <span className="font-medium">Remaining Balance:</span> {formatCurrency(activeLoan.remainingBalance)}<br />
                      <span className="font-medium">Monthly Installment:</span> {formatCurrency(activeLoan.monthlyInstallment)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      The installment field below has been auto-filled, but you may adjust it.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mb-2">No active loans found for this employee.</p>
                )}
                
                <input
                  type="number"
                  name="loans"
                  value={formData.loans}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  disabled={!activeLoan}
                  className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    !activeLoan ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the amount to be deducted for loan repayments
                </p>
              </div>

            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || employeeLoading || !formData.employeeId}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition disabled:opacity-50"
              >
                {loading ? (
                  "Generating..."
                ) : (
                  <>
                    <FaCalculator /> Generate Report
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Report Preview Modal */}
      {isModalOpen && generatedReport && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Salary Report Generated Successfully</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Employee Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Employee ID:</span> {generatedReport.employeeId}</p>
                  <p><span className="font-medium">Period:</span> {formatMonth(generatedReport.month)} {generatedReport.year}</p>
                  <p><span className="font-medium">Date Range:</span> {new Date(generatedReport.fromDate).toLocaleDateString()} - {new Date(generatedReport.toDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Salary Type:</span> {generatedReport.isDaySalaryBased ? "Day Salary Based" : "Monthly Salary Based"}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Salary Summary</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Gross Salary:</span> {formatCurrency(generatedReport.grossSalary)}</p>
                  <p><span className="font-medium">Total Deductions:</span> {formatCurrency(generatedReport.totalDeductions)}</p>
                  <p><span className="font-medium">Net Salary:</span> <span className="font-semibold text-green-600">{formatCurrency(generatedReport.netSalary)}</span></p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Earnings</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Wages:</span> {formatCurrency(generatedReport.wages)}</p>
                  <p><span className="font-medium">KPI Allowance:</span> {formatCurrency(generatedReport.kPIAllowance)}</p>
                  <p><span className="font-medium">Incentives:</span> {formatCurrency(generatedReport.incentives)}</p>
                  <p><span className="font-medium">Bonus:</span> {formatCurrency(generatedReport.bonus)}</p>
                  {!generatedReport.isDaySalaryBased && (
                    <>
                      <p><span className="font-medium">OT1 Payment:</span> {formatCurrency(generatedReport.oT1Payment)}</p>
                      <p><span className="font-medium">OT2 Payment:</span> {formatCurrency(generatedReport.oT2Payment)}</p>
                      <p><span className="font-medium">Total OT Payment:</span> {formatCurrency(generatedReport.totalOTPayment)}</p>
                    </>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Deductions & Contributions</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Salary Advances:</span> {formatCurrency(generatedReport.salaryAdvances)}</p>
                  <p><span className="font-medium">Loans:</span> {formatCurrency(generatedReport.loans)}</p>
                  <p><span className="font-medium">Other Deductions:</span> {formatCurrency(generatedReport.otherDeductions)}</p>
                  {!generatedReport.isDaySalaryBased && (
                    <>
                      <p><span className="font-medium">EPF Employee:</span> {formatCurrency(generatedReport.ePF1)}</p>
                      <p><span className="font-medium">EPF Employer:</span> {formatCurrency(generatedReport.ePF2)}</p>
                      <p><span className="font-medium">ETF:</span> {formatCurrency(generatedReport.eTF)}</p>
                      <p><span className="font-medium">Employee Contribution:</span> {formatCurrency(generatedReport.employeeContribution)}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Attendance Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p><span className="font-medium">Working Days:</span> {generatedReport.workingDays}</p>
                </div>
                <div>
                  <p><span className="font-medium">Leave Days:</span> {generatedReport.leaveDays}</p>
                </div>
                <div>
                  <p><span className="font-medium">Half Days:</span> {generatedReport.halfDays}</p>
                </div>
                <div>
                  <p><span className="font-medium">No Pay Days:</span> {generatedReport.noPayDays}</p>
                </div>
                <div>
                  <p><span className="font-medium">OT1 Hours:</span> {generatedReport.oT1Hours}</p>
                </div>
                <div>
                  <p><span className="font-medium">OT2 Hours:</span> {generatedReport.oT2Hours}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
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