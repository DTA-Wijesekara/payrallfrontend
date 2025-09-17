// import React, { useEffect, useState } from "react";

// export default function GenerateSalary() {
//   const [employees, setEmployees] = useState([]);
//   const [form, setForm] = useState({
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
//   });
//   const [report, setReport] = useState(null);

//   // Load employees from API
//   useEffect(() => {
//     fetch("/api/Employe")
//       .then((res) => res.json())
//       .then((data) => setEmployees(data));
//   }, []);

//   const handleChange = (field, value) => {
//     setForm({ ...form, [field]: value });
//   };

//   const handleSubmit = async () => {
//     const res = await fetch("/api/SalaryReport/generate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       const data = await res.json();
//       setReport(data);
//     } else {
//       alert("Error generating salary report");
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <div className="bg-white shadow rounded-2xl p-6 max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6 text-gray-700">
//           Generate Salary Report
//         </h1>

//         {/* Employee Selector */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Employee</label>
//           <select
//             value={form.employeeId}
//             onChange={(e) => handleChange("employeeId", e.target.value)}
//             className="w-full border rounded-lg p-2"
//           >
//             <option value="">Select Employee</option>
//             {employees.map((emp) => (
//               <option key={emp.id} value={emp.id}>
//                 {emp.fullName} ({emp.employeeNumber})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Month & Year */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Year</label>
//             <input
//               type="number"
//               value={form.year}
//               onChange={(e) => handleChange("year", e.target.value)}
//               className="w-full border rounded-lg p-2"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Month</label>
//             <input
//               type="number"
//               min="1"
//               max="12"
//               value={form.month}
//               onChange={(e) => handleChange("month", e.target.value)}
//               className="w-full border rounded-lg p-2"
//             />
//           </div>
//         </div>

//         {/* Salary Inputs */}
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="number"
//             placeholder="Working Days"
//             className="border rounded-lg p-2"
//             onChange={(e) => handleChange("workingDays", Number(e.target.value))}
//           />
//           <input
//             type="number"
//             placeholder="Incentives"
//             className="border rounded-lg p-2"
//             onChange={(e) => handleChange("incentives", Number(e.target.value))}
//           />
//           <input
//             type="number"
//             placeholder="Bonus"
//             className="border rounded-lg p-2"
//             onChange={(e) => handleChange("bonus", Number(e.target.value))}
//           />
//           <input
//             type="number"
//             placeholder="Salary Advances"
//             className="border rounded-lg p-2"
//             onChange={(e) =>
//               handleChange("salaryAdvances", Number(e.target.value))
//             }
//           />
//           <input
//             type="number"
//             placeholder="Loans"
//             className="border rounded-lg p-2"
//             onChange={(e) => handleChange("loans", Number(e.target.value))}
//           />
//           <input
//             type="number"
//             placeholder="Other Deductions"
//             className="border rounded-lg p-2"
//             onChange={(e) =>
//               handleChange("otherDeductions", Number(e.target.value))
//             }
//           />
//           <input
//             type="number"
//             placeholder="Leave Days"
//             className="border rounded-lg p-2"
//             onChange={(e) => handleChange("leaveDays", Number(e.target.value))}
//           />
//           <input
//             type="number"
//             placeholder="Half Days"
//             className="border rounded-lg p-2"
//             onChange={(e) => handleChange("halfDays", Number(e.target.value))}
//           />
//           <input
//             type="number"
//             placeholder="No Pay Days"
//             className="border rounded-lg p-2"
//             onChange={(e) => handleChange("noPayDays", Number(e.target.value))}
//           />
//           <input
//             type="number"
//             placeholder="OT1 Hours"
//             className="border rounded-lg p-2"
//             onChange={(e) => handleChange("ot1Hours", Number(e.target.value))}
//           />
//           <input
//             type="number"
//             placeholder="OT2 Hours"
//             className="border rounded-lg p-2"
//             onChange={(e) => handleChange("ot2Hours", Number(e.target.value))}
//           />
//         </div>

//         {/* Submit */}
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Generate
//           </button>
//         </div>

//         {/* Report Result */}
//         {report && (
//           <div className="mt-8 bg-gray-100 p-4 rounded-lg">
//             <h2 className="text-lg font-semibold mb-2">Salary Report</h2>
//             <p><strong>Employee:</strong> {report.employee.fullName}</p>
//             <p><strong>Month:</strong> {report.month}/{report.year}</p>
//             <p><strong>Gross Salary:</strong> {report.grossSalary}</p>
//             <p><strong>Net Salary:</strong> {report.netSalary}</p>
//             <p><strong>Total Deductions:</strong> {report.totalDeductions}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaPlus, FaEye, FaCalculator } from "react-icons/fa";

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
//   const [message, setMessage] = useState({ text: "", type: "" });

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employee`);
//       setEmployees(res.data);
//     } catch (err) {
//       console.error("Error fetching employees", err);
//       showMessage("Failed to load employees", "error");
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
//           <h1 className="text-2xl font-semibold text-gray-800">Generate Salary Report</h1>
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
//                 <select
//                   name="employeeId"
//                   value={formData.employeeId}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="">Select Employee</option>
//                   {employees.map(employee => (
//                     <option key={employee.id} value={employee.id}>
//                       {employee.firstName} {employee.lastName} (ID: {employee.id})
//                     </option>
//                   ))}
//                 </select>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Leave Days</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Half Days</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-1">No Pay Days</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-1">OT1 Hours</label>
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
//                 <label className="block text-sm font-medium text-gray-700 mb-1">OT2 Hours</label>
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

//               {/* Loans */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Loans</label>
//                 <input
//                   type="number"
//                   name="loans"
//                   value={formData.loans}
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
//             </div>

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 disabled={loading}
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
import { FaPlus, FaEye, FaCalculator } from "react-icons/fa";

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
    ot2Hours: 0
  });
  const [generatedReport, setGeneratedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  // Generate years for dropdown (current year and previous 5 years)
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
                        {employee.fullName} (ID: {employee.id})
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
              </div>

              {/* Leave Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Days</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Half Days</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">No Pay Days</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">OT1 Hours</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">OT2 Hours</label>
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

              {/* Loans */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loans</label>
                <input
                  type="number"
                  name="loans"
                  value={formData.loans}
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