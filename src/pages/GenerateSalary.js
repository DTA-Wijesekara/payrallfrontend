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
//     ot2Hours: 0,
//     fromDate: new Date().toISOString().split('T')[0],
//     toDate: new Date().toISOString().split('T')[0]
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

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     const newFormData = {
//       ...formData,
//       [name]: value
//     };

//     if (newFormData.fromDate && newFormData.toDate) {
//       const fromDate = new Date(newFormData.fromDate);
//       const toDate = new Date(newFormData.toDate);
      
//       const workingDays = calculateBusinessDays(fromDate, toDate);
//       newFormData.workingDays = workingDays;
//     }

//     setFormData(newFormData);
//   };

//   const calculateBusinessDays = (startDate, endDate) => {
//     let count = 0;
//     const curDate = new Date(startDate.getTime());
    
//     while (curDate <= endDate) {
//       const dayOfWeek = curDate.getDay();
//       if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
//       curDate.setDate(curDate.getDate() + 1);
//     }
    
//     return count;
//   };

//   const recordLoanRepayment = async (loanId, installmentAmount) => {
//     try {
//       const repaymentDto = {
//         loanId: loanId,
//         installmentAmount: installmentAmount,
//         paymentDate: new Date().toISOString(),
//         description: `Salary deduction for ${formatMonth(formData.month)} ${formData.year}`
//       };

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_BASE_URL}/api/loanrepayment/${loanId}/repayments`,
//         repaymentDto
//       );

//       console.log("Loan repayment recorded:", response.data);
//       return true;
//     } catch (error) {
//       console.error("Error recording loan repayment:", error);
//       showMessage("Failed to record loan repayment", "error");
//       return false;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (new Date(formData.fromDate) > new Date(formData.toDate)) {
//       showMessage("From date cannot be after to date", "error");
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       // First generate the salary report
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_BASE_URL}/api/calculations/generate`,
//         formData
//       );
      
//       setGeneratedReport(res.data);
      
//       // If there's an active loan and loan amount is greater than 0, record the repayment
//       if (activeLoan && formData.loans > 0) {
//         const repaymentSuccess = await recordLoanRepayment(activeLoan.id, formData.loans);
//         if (repaymentSuccess) {
//           showMessage("Salary report generated and loan repayment recorded successfully!", "success");
//         } else {
//           showMessage("Salary report generated but failed to record loan repayment", "warning");
//         }
//       } else {
//         showMessage("Salary report generated successfully!", "success");
//       }
      
//       setIsModalOpen(true);
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
//           <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800" : message.type === "warning" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
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

//               {/* From Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
//                 <input
//                   type="date"
//                   name="fromDate"
//                   value={formData.fromDate}
//                   onChange={handleDateChange}
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* To Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
//                 <input
//                   type="date"
//                   name="toDate"
//                   value={formData.toDate}
//                   onChange={handleDateChange}
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Working Days */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Working Days
//                 </label>
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
//                 <p className="text-xs text-gray-500 mt-1">
//                   Automatically calculated from selected dates
//                 </p>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Regular OT Hours (Staff only)</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Double OT Hours (Staff only)</label>
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
//                       This amount will be recorded as a loan repayment.
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
//                   disabled={!activeLoan}
//                   className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     !activeLoan ? "bg-gray-100 cursor-not-allowed" : ""
//                   }`}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Enter the amount to be deducted for loan repayments. This will be recorded as a repayment.
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
//                   <p><span className="font-medium">Date Range:</span> {new Date(generatedReport.fromDate).toLocaleDateString()} - {new Date(generatedReport.toDate).toLocaleDateString()}</p>
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


































// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaPlus, FaEye, FaCalculator, FaExclamationTriangle, FaSearch } from "react-icons/fa";

// export default function GenerateSalary() {
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
  
//   // Calculate default dates
//   const today = new Date();
//   const prevMonth = new Date();
//   prevMonth.setMonth(today.getMonth() - 1);
  
//   // Helper function to format date as YYYY-MM-DD
//   function formatDate(date) {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }

//   // Calculate working days for initial dates
//   const calculateBusinessDays = (startDate, endDate) => {
//     let count = 0;
//     const curDate = new Date(startDate.getTime());
    
//     while (curDate <= endDate) {
//       const dayOfWeek = curDate.getDay();
//       if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
//       curDate.setDate(curDate.getDate() + 1);
//     }
    
//     return count;
//   };

//   const initialFromDate = formatDate(prevMonth);
//   const initialToDate = formatDate(today);
//   const initialWorkingDays = calculateBusinessDays(prevMonth, today);

//   const [formData, setFormData] = useState({
//     employeeId: "",
//     year: today.getFullYear(),
//     month: today.getMonth() + 1,
//     workingDays: initialWorkingDays,
//     incentives: 0,
//     bonus: 0,
//     salaryAdvances: 0,
//     loans: 0,
//     otherDeductions: 0,
//     leaveDays: 0,
//     halfDays: 0,
//     noPayDays: 0,
//     ot1Hours: 0,
//     ot2Hours: 0,
//     fromDate: initialFromDate,
//     toDate: initialToDate
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

//   useEffect(() => {
//     // Filter employees based on search term
//     if (searchTerm) {
//       const filtered = employees.filter(employee => 
//         employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         employee.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredEmployees(filtered);
//     } else {
//       setFilteredEmployees(employees);
//     }
//   }, [searchTerm, employees]);

//   // Calculate working days when dates change
//   useEffect(() => {
//     if (formData.fromDate && formData.toDate) {
//       const fromDate = new Date(formData.fromDate);
//       const toDate = new Date(formData.toDate);
      
//       const workingDays = calculateBusinessDays(fromDate, toDate);
//       setFormData(prev => ({
//         ...prev,
//         workingDays: workingDays
//       }));
//     }
//   }, [formData.fromDate, formData.toDate]);

//   const fetchEmployees = async () => {
//     try {
//       setEmployeeLoading(true);
//       const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employe`);
//       setEmployees(res.data);
//       setFilteredEmployees(res.data);
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
//       setActiveLoan(null);
//       setFormData(prev => ({
//         ...prev,
//         loans: 0
//       }));
//       setLoanLoading(false);
//     }
//   };

//   const handleEmployeeSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setShowDropdown(true);
//   };

//   const selectEmployee = (employee) => {
//     setFormData(prev => ({
//       ...prev,
//       employeeId: employee.id
//     }));
//     setSearchTerm(`${employee.fullName} (${employee.employeeNumber})`);
//     setShowDropdown(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleDateChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const recordLoanRepayment = async (loanId, installmentAmount) => {
//     try {
//       const repaymentDto = {
//         loanId: loanId,
//         installmentAmount: installmentAmount,
//         paymentDate: new Date().toISOString(),
//         description: `Salary deduction for ${formatMonth(formData.month)} ${formData.year}`
//       };

//       const response = await axios.post(
//         `${process.env.REACT_APP_API_BASE_URL}/api/loanrepayment/${loanId}/repayments`,
//         repaymentDto
//       );

//       console.log("Loan repayment recorded:", response.data);
//       return true;
//     } catch (error) {
//       console.error("Error recording loan repayment:", error);
//       showMessage("Failed to record loan repayment", "error");
//       return false;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (new Date(formData.fromDate) > new Date(formData.toDate)) {
//       showMessage("From date cannot be after to date", "error");
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       // First generate the salary report
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_BASE_URL}/api/calculations/generate`,
//         formData
//       );
      
//       setGeneratedReport(res.data);
      
//       // If there's an active loan and loan amount is greater than 0, record the repayment
//       if (activeLoan && formData.loans > 0) {
//         const repaymentSuccess = await recordLoanRepayment(activeLoan.id, formData.loans);
//         if (repaymentSuccess) {
//           showMessage("Salary report generated and loan repayment recorded successfully!", "success");
//         } else {
//           showMessage("Salary report generated but failed to record loan repayment", "warning");
//         }
//       } else {
//         showMessage("Salary report generated successfully!", "success");
//       }
      
//       setIsModalOpen(true);
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
//           <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800" : message.type === "warning" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
//             {message.text}
//           </div>
//         )}

//         {/* Form */}
//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Employee Selection with Search */}
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
//                 {employeeLoading ? (
//                   <div className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 animate-pulse">
//                     Loading employees...
//                   </div>
//                 ) : (
//                   <>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none mt-6">
//                         <FaSearch className="text-gray-400" />
//                       </div>
//                       <input
//                         type="text"
//                         placeholder="Search employee by name or ID..."
//                         value={searchTerm}
//                         onChange={handleEmployeeSearch}
//                         onFocus={() => setShowDropdown(true)}
//                         className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
//                       />
//                     </div>
//                     {showDropdown && filteredEmployees.length > 0 && (
//                       <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
//                         {filteredEmployees.map(employee => (
//                           <div
//                             key={employee.id}
//                             className="px-4 py-2 cursor-pointer hover:bg-gray-100"
//                             onClick={() => selectEmployee(employee)}
//                           >
//                             {employee.fullName} ({employee.employeeNumber})
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                     <input
//                       type="hidden"
//                       name="employeeId"
//                       value={formData.employeeId}
//                       required
//                     />
//                   </>
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

//               {/* From Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
//                 <input
//                   type="date"
//                   name="fromDate"
//                   value={formData.fromDate}
//                   onChange={handleDateChange}
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* To Date */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
//                 <input
//                   type="date"
//                   name="toDate"
//                   value={formData.toDate}
//                   onChange={handleDateChange}
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Working Days */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Working Days
//                 </label>
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
//                 <p className="text-xs text-gray-500 mt-1">
//                   Automatically calculated from selected dates
//                 </p>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Regular OT Hours (Staff only)</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Double OT Hours (Staff only)</label>
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
//                       This amount will be recorded as a loan repayment.
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
//                   disabled={!activeLoan}
//                   className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     !activeLoan ? "bg-gray-100 cursor-not-allowed" : ""
//                   }`}
//                 />
//                 <p className="text-xs text-gray-500 mt-1">
//                   Enter the amount to be deducted for loan repayments. This will be recorded as a repayment.
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
//                   <p><span className="font-medium">Date Range:</span> {new Date(generatedReport.fromDate).toLocaleDateString()} - {new Date(generatedReport.toDate).toLocaleDateString()}</p>
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



















import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaCalculator, FaExclamationTriangle } from "react-icons/fa";

// Helper functions
const formatDate = (d) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};
const sameDayPreviousMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const useDay = Math.min(day, prevMonthLastDay);
  return new Date(year, month - 1, useDay);
};

// Searchable dropdown for employees
function SearchableSelect({ items, valueId, onSelect, placeholder = "Select..." }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const sel = items.find((i) => String(i.id) === String(valueId));
    setInput(sel ? `${sel.fullName || sel.name} (${sel.employeeNumber || sel.id})` : "");
  }, [valueId, items]);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = input
    ? items.filter((it) =>
        `${it.fullName || it.name} ${it.email || ""} ${it.employeeNumber || ""}`
          .toLowerCase()
          .includes(input.toLowerCase())
      )
    : items.slice(0, 8);

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls="employee-list"
        placeholder={placeholder}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
          if (valueId) onSelect("");
        }}
        onFocus={() => setOpen(true)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {open && (
        <ul
          id="employee-list"
          role="listbox"
          className="absolute z-40 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filtered.length ? (
            filtered.map((it) => (
              <li
                key={it.id}
                role="option"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(it.id);
                  setInput(`${it.fullName || it.name} (${it.employeeNumber || it.id})`);
                  setOpen(false);
                }}
                className="px-3 py-2 hover:bg-indigo-50 cursor-pointer text-sm text-gray-700"
              >
                <div className="font-medium">{it.fullName || it.name}</div>
                <div className="text-xs text-gray-500">{it.email || it.employeeNumber}</div>
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-sm text-gray-500">No matches</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default function GenerateSalary() {
  // Default dates
  const today = new Date();
  const toDefault = formatDate(today);
  const fromDefault = formatDate(sameDayPreviousMonth(today));

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    year: today.getFullYear(),
    month: today.getMonth() + 1,
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
    fromDate: fromDefault,
    toDate: toDefault,
  });
  const [generatedReport, setGeneratedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeLoan, setActiveLoan] = useState(null);
  const [loanLoading, setLoanLoading] = useState(false);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setEmployeeLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employe`);
        setEmployees(res.data || []);
      } catch (err) {
        showMessage("Failed to load employees", "error");
      } finally {
        setEmployeeLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Fetch active loan when employee changes
  useEffect(() => {
    const fetchActiveLoan = async (employeeId) => {
      try {
        setLoanLoading(true);
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/loan/active/${employeeId}`);
        if (res.data) {
          setActiveLoan(res.data);
          setFormData((prev) => ({
            ...prev,
            loans: res.data.monthlyInstallment,
          }));
        } else {
          setActiveLoan(null);
          setFormData((prev) => ({ ...prev, loans: 0 }));
        }
      } catch {
        setActiveLoan(null);
        setFormData((prev) => ({ ...prev, loans: 0 }));
      } finally {
        setLoanLoading(false);
      }
    };
    if (formData.employeeId) {
      fetchActiveLoan(formData.employeeId);
    } else {
      setActiveLoan(null);
      setFormData((prev) => ({ ...prev, loans: 0 }));
    }
    // eslint-disable-next-line
  }, [formData.employeeId]);

  // Fetch OT hours when employee or date range changes
  useEffect(() => {
    const fetchOtHours = async (employeeId, fromDate, toDate) => {
      if (!employeeId || !fromDate || !toDate) return;
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/EmpOvertime/sum/${employeeId}`,
          { params: { fromDate, toDate } }
        );
        if (res.data) {
          setFormData((prev) => ({
            ...prev,
            ot1Hours: res.data.totalOt1Hours || 0,
            ot2Hours: res.data.totalOt2Hours || 0,
          }));
        }
      } catch {
        setFormData((prev) => ({
          ...prev,
          ot1Hours: 0,
          ot2Hours: 0,
        }));
      }
    };
    if (formData.employeeId && formData.fromDate && formData.toDate) {
      fetchOtHours(formData.employeeId, formData.fromDate, formData.toDate);
    }
    // eslint-disable-next-line
  }, [formData.employeeId, formData.fromDate, formData.toDate]);

  // Calculate working days when dates change
  useEffect(() => {
    if (formData.fromDate && formData.toDate) {
      const fromDate = new Date(formData.fromDate);
      const toDate = new Date(formData.toDate);
      const workingDays = calculateBusinessDays(fromDate, toDate);
      setFormData((prev) => ({
        ...prev,
        workingDays: workingDays,
      }));
    }
    // eslint-disable-next-line
  }, [formData.fromDate, formData.toDate]);

  function calculateBusinessDays(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
      const dayOfWeek = curDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === "number" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const recordLoanRepayment = async (loanId, installmentAmount) => {
    try {
      const repaymentDto = {
        loanId: loanId,
        installmentAmount: installmentAmount,
        paymentDate: new Date().toISOString(),
        description: `Salary deduction for ${formatMonth(formData.month)} ${formData.year}`,
      };
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/loanrepayment/${loanId}/repayments`,
        repaymentDto
      );
      return true;
    } catch {
      showMessage("Failed to record loan repayment", "error");
      return false;
    }
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
      if (activeLoan && formData.loans > 0) {
        const repaymentSuccess = await recordLoanRepayment(activeLoan.id, formData.loans);
        if (repaymentSuccess) {
          showMessage("Salary report generated and loan repayment recorded successfully!", "success");
        } else {
          showMessage("Salary report generated but failed to record loan repayment", "warning");
        }
      } else {
        showMessage("Salary report generated successfully!", "success");
      }
      setIsModalOpen(true);
    } catch {
      showMessage("Failed to generate salary report", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const formatMonth = (month) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[month - 1] || month;
  };

  const currentYear = today.getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Generate Salary Report</h1>
          <p className="text-sm text-gray-500 mt-1">Create new salary reports for employees.</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : message.type === "warning"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee Selection (searchable) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                {employeeLoading ? (
                  <div className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 animate-pulse">Loading employees...</div>
                ) : (
                  <SearchableSelect
                    items={employees}
                    valueId={formData.employeeId}
                    onSelect={(id) => setFormData((prev) => ({ ...prev, employeeId: id }))}
                    placeholder="Type name, email or employee number..."
                  />
                )}
              </div>

              {/* Year Selection */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* Month Selection */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {formatMonth(month)}
                    </option>
                  ))}
                </select>
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year & Month
                </label>
                <input
                  type="month"
                  value={`${formData.year}-${String(formData.month).padStart(2, '0')}`}
                  onChange={(e) => {
                    const [year, month] = e.target.value.split('-');
                    setFormData(prev => ({
                      ...prev,
                      year: parseInt(year, 10),
                      month: parseInt(month, 10)
                    }));
                  }}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Working Days</label>
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
                <p className="text-xs text-gray-500 mt-1">Automatically calculated from selected dates</p>
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

              {/* OT1 Hours (auto-filled, read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Regular OT Hours (Staff only)</label>
                <input
                  type="number"
                  name="ot1Hours"
                  value={formData.ot1Hours}
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-filled from overtime records</p>
              </div>

              {/* OT2 Hours (auto-filled, read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Double OT Hours (Staff only)</label>
                <input
                  type="number"
                  name="ot2Hours"
                  value={formData.ot2Hours}
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100  focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-filled from overtime records</p>
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
                      <span className="font-medium">Loan Amount:</span> {formatCurrency(activeLoan.principalAmount)}
                      <br />
                      <span className="font-medium">Remaining Balance:</span> {formatCurrency(activeLoan.remainingBalance)}
                      <br />
                      <span className="font-medium">Monthly Installment:</span> {formatCurrency(activeLoan.monthlyInstallment)}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      The installment field below has been auto-filled, but you may adjust it. This amount will be recorded as a loan repayment.
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
                  Enter the amount to be deducted for loan repayments. This will be recorded as a repayment.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || employeeLoading || !formData.employeeId}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition disabled:opacity-50"
              >
                {loading ? "Generating..." : <><FaCalculator /> Generate Report</>}
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
            {/* ...modal content as before... */}
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