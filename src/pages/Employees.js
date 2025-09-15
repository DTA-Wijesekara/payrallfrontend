// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';

// export default function Employees() {
//   const [employees, setEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editEmployee, setEditEmployee] = useState({});


//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employe`);
//       setEmployees(res.data);
//     } catch (err) {
//       console.error('Error fetching employees', err);
//     }
//   };
//   const fetchEmployeeById = async (id) => {
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employe/${id}`);
//       setSelectedEmployee(res.data);
//       setIsModalOpen(true);
//     } catch (err) {
//       console.error('Error fetching employee details', err);
//     }
//   };

//   const openEditModal = (emp) => {
//     setEditEmployee({ ...emp }); // prefill data
//     setIsEditModalOpen(true);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const updateEmployee = async () => {
//     console.log("Updating employee", editEmployee);
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_API_BASE_URL}/api/employe/${editEmployee.id}`,
//         editEmployee
//       );
//       setEmployees((prev) =>
//         prev.map((emp) => (emp.id === editEmployee.id ? editEmployee : emp))
//       );
//       setIsEditModalOpen(false);
//     } catch (err) {
//       console.error('Error updating employee', err);
//     }
//   };

//   const deleteEmployee = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this employee?')) return;
//     try {
//       await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/employe/${id}`);
//       setEmployees((prev) => prev.filter((emp) => emp.id !== id));
//     } catch (err) {
//       console.error('Error deleting employee', err);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800">Employees</h1>
//             <p className="text-sm text-gray-500 mt-1">Manage your team — view, edit or remove employees.</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
//             >
//               <FaPlus />
//               Create New
//             </button>
//           </div>
//         </div>

//         {/* Table for medium+ screens */}
//         <div className="hidden sm:block bg-white shadow rounded-lg overflow-hidden">
//           <div className="w-full overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
//                   <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-100">
//                 {employees.length > 0 ? (
//                   employees.map((emp) => (
//                     <tr key={emp.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{emp.id}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{emp.fullName}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">{emp.email}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{emp.Department}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
//                         <div className="inline-flex items-center gap-2">
//                           <button
//                             aria-label={`view-${emp.id}`}
//                             onClick={() => fetchEmployeeById(emp.id)}
//                             className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
//                           >
//                             <FaEye />
//                           </button>
//                           <button
//                             aria-label={`edit-${emp.id}`}
//                             onClick={() => openEditModal(emp)}
//                             className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50 transition"
//                           >
//                             <FaEdit />
//                           </button>
//                           <button
//                             aria-label={`delete-${emp.id}`}
//                             onClick={() => deleteEmployee(emp.id)}
//                             className="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">No employees found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Card list for small screens */}
//         <div className="sm:hidden space-y-4">
//           {employees.length > 0 ? (
//             employees.map((emp) => (
//               <div key={emp.id} className="bg-white shadow-sm rounded-lg p-4 flex items-start justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
//                     {String(emp.name || 'U').slice(0, 1).toUpperCase()}
//                   </div>
//                   <div>
//                     <div className="text-sm font-medium text-gray-800">{emp.fullName}</div>
//                     <div className="text-xs text-gray-500 truncate max-w-xs">{emp.email}</div>
//                     <div className="text-xs text-gray-500 mt-1">{emp.position}</div>
//                   </div>
//                 </div>
//                 <div className="flex flex-col items-end gap-2">
//                   <button
//                     aria-label={`view-${emp.id}`}
//                     onClick={() => fetchEmployeeById(emp.id)}
//                     className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
//                  >
//                     <FaEye />
//                   </button>
//                   <button
//                     aria-label={`edit-${emp.id}`}
//                     onClick={() => openEditModal(emp)}
//                     className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50 transition"
//                   >
//                     <FaEdit />
//                   </button>
//                   <button
//                     aria-label={`delete-${emp.id}`}
//                     onClick={() => deleteEmployee(emp.id)}
//                     className="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="bg-white shadow-sm rounded-lg p-6 text-center text-gray-500">No employees found</div>
//           )}
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//             <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
//             <form className="space-y-3">
//               <input
//                 type="text"
//                 name="fullName"
//                 value={editEmployee.fullName || ''}
//                 onChange={handleEditChange}
//                 placeholder="Full Name"
//                 className="w-full border px-3 py-2 rounded"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={editEmployee.email || ''}
//                 onChange={handleEditChange}
//                 placeholder="Email"
//                 className="w-full border px-3 py-2 rounded"
//               />
//               <input
//                 type="text"
//                 name="nic"
//                 value={editEmployee.nic || ''}
//                 onChange={handleEditChange}
//                 placeholder="NIC"
//                 className="w-full border px-3 py-2 rounded"
//               />
//               <div className="flex gap-3">
//                 <button
//                   type="button"
//                   onClick={updateEmployee}
//                   className="px-4 py-2 bg-green-600 text-white rounded"
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsEditModalOpen(false)}
//                   className="px-4 py-2 bg-gray-400 text-white rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Modal for Employee Details */}
//       {isModalOpen && selectedEmployee && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//             <h2 className="text-xl font-bold mb-4">Employee Details</h2>
//             <p><strong>ID:</strong> {selectedEmployee.id}</p>
//             <p><strong>Name:</strong> {selectedEmployee.fullName}</p>
//             <p><strong>Email:</strong> {selectedEmployee.email}</p>
//             <p><strong>Position:</strong> {selectedEmployee.nic}</p>
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaPlus, FaEye, FaFilter, FaSearch, FaUndo } from "react-icons/fa";

// export default function Employees() {
//   const [employees, setEmployees] = useState([]);
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isViewDeleted, setIsViewDeleted] = useState(false);
//   const [editEmployee, setEditEmployee] = useState({});
//   const [newEmployee, setNewEmployee] = useState({
//     employeeNumber: "",
//     email: "",
//     address: "",
//     fullName: "",
//     nic: "",
//     joinedDate: "",
//     terminationDate: "",
//     phoneNumber: "",
//     departmentID: "",
//     employeeCategoriesID: "",
//     basicSalary: 0,
//     daySalary: 0,
//     kpiRate: 0,
//     kpiAmount: 0,
//     bra1: 0,
//     bra2: 0,
//     isActive: true,
//     bankAccountNumber: "",
//     bankName: "",
//     bankBranch: "",
//     taxIdentificationNumber: "",
//     hasTaxExemption: false
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState({ text: "", type: "" });

//   useEffect(() => {
//     fetchEmployees();
//   }, [isViewDeleted]);

//   useEffect(() => {
//     filterEmployees();
//   }, [employees, searchTerm]);

//   const fetchEmployees = async () => {
//     try {
//       setLoading(true);
//       const endpoint = isViewDeleted 
//         ? `${process.env.REACT_APP_API_BASE_URL}/api/employe/getAllDeletedEmployees`
//         : `${process.env.REACT_APP_API_BASE_URL}/api/employe`;
      
//       const res = await axios.get(endpoint);
//       setEmployees(res.data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching employees", err);
//       showMessage("Failed to load employees", "error");
//       setLoading(false);
//     }
//   };

//   const fetchEmployeeById = async (id) => {
//     try {
//       const endpoint = isViewDeleted 
//         ? `${process.env.REACT_APP_API_BASE_URL}/api/employe/getDeletedEmployeeById/${id}`
//         : `${process.env.REACT_APP_API_BASE_URL}/api/employe/${id}`;
      
//       const res = await axios.get(endpoint);
//       setSelectedEmployee(res.data);
//       setIsModalOpen(true);
//     } catch (err) {
//       console.error("Error fetching employee details", err);
//       showMessage("Failed to load employee details", "error");
//     }
//   };

//   const filterEmployees = () => {
//     if (!searchTerm) {
//       setFilteredEmployees(employees);
//       return;
//     }

//     const result = employees.filter(employee => 
//       employee.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       employee.employeeNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       employee.nic?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     setFilteredEmployees(result);
//   };

//   const openEditModal = (employee) => {
//     setEditEmployee({ ...employee });
//     setIsEditModalOpen(true);
//   };

//   const handleEditChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditEmployee(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleNewEmployeeChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewEmployee(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const updateEmployee = async () => {
//     try {
//       await axios.put(
//         `${process.env.REACT_APP_API_BASE_URL}/api/employe/${editEmployee.id}`,
//         editEmployee
//       );
//       setEmployees(prev => prev.map(emp => emp.id === editEmployee.id ? editEmployee : emp));
//       setIsEditModalOpen(false);
//       showMessage("Employee updated successfully!", "success");
//     } catch (err) {
//       console.error("Error updating employee", err);
//       showMessage("Failed to update employee", "error");
//     }
//   };

//   const createEmployee = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_BASE_URL}/api/employe`,
//         newEmployee
//       );
//       setEmployees(prev => [...prev, res.data]);
//       setIsCreateModalOpen(false);
//       setNewEmployee({
//         employeeNumber: "",
//         email: "",
//         address: "",
//         fullName: "",
//         nic: "",
//         joinedDate: "",
//         terminationDate: "",
//         phoneNumber: "",
//         departmentID: "",
//         employeeCategoriesID: "",
//         basicSalary: 0,
//         daySalary: 0,
//         kpiRate: 0,
//         kpiAmount: 0,
//         bra1: 0,
//         bra2: 0,
//         isActive: true,
//         bankAccountNumber: "",
//         bankName: "",
//         bankBranch: "",
//         taxIdentificationNumber: "",
//         hasTaxExemption: false
//       });
//       showMessage("Employee created successfully!", "success");
//     } catch (err) {
//       console.error("Error creating employee", err);
//       showMessage("Failed to create employee", "error");
//     }
//   };

//   const deleteEmployee = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this employee?")) return;
//     try {
//       await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/employe/${id}`);
//       setEmployees(prev => prev.filter(emp => emp.id !== id));
//       showMessage("Employee deleted successfully!", "success");
//     } catch (err) {
//       console.error("Error deleting employee", err);
//       showMessage("Failed to delete employee", "error");
//     }
//   };

//   const recoverEmployee = async (id) => {
//     try {
//       await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/employe/recoverDeletedEmployee/${id}`);
//       setEmployees(prev => prev.filter(emp => emp.id !== id));
//       showMessage("Employee recovered successfully!", "success");
//     } catch (err) {
//       console.error("Error recovering employee", err);
//       showMessage("Failed to recover employee", "error");
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
//     }).format(amount || 0);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString();
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-semibold text-gray-800">Employees</h1>
//             <p className="text-sm text-gray-500 mt-1">
//               {isViewDeleted ? "Viewing deleted employees" : "Manage employee records"}
//             </p>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               onClick={() => setIsViewDeleted(!isViewDeleted)}
//               className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
//             >
//               {isViewDeleted ? (
//                 <>
//                   <FaEye /> View Active
//                 </>
//               ) : (
//                 <>
//                   <FaFilter /> View Deleted
//                 </>
//               )}
//             </button>
//             {!isViewDeleted && (
//               <button
//                 type="button"
//                 onClick={() => setIsCreateModalOpen(true)}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
//               >
//                 <FaPlus /> Add New
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Message Alert */}
//         {message.text && (
//           <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//             {message.text}
//           </div>
//         )}

//         {/* Search */}
//         <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FaSearch className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search employees by name, ID, email, or NIC..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>
//         </div>

//         {/* Employees Table */}
//         {loading ? (
//           <div className="bg-white shadow rounded-lg p-8 text-center">
//             <p className="text-gray-500">Loading employees...</p>
//           </div>
//         ) : (
//           <>
//             {/* Table for medium+ screens */}
//             <div className="hidden sm:block bg-white shadow rounded-lg overflow-hidden">
//               <div className="w-full overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
//                       <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {filteredEmployees.length > 0 ? (
//                       filteredEmployees.map((employee) => (
//                         <tr key={employee.id} className="hover:bg-gray-50">
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">#{employee.id}</td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm font-medium text-gray-800">{employee.fullName}</div>
//                             <div className="text-xs text-gray-500">{employee.employeeNumber}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <div className="text-sm text-gray-800">{employee.email}</div>
//                             <div className="text-xs text-gray-500">{employee.phoneNumber}</div>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                             {formatCurrency(employee.basicSalary || employee.daySalary)}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {formatDate(employee.joinedDate)}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
//                             <div className="inline-flex items-center gap-2">
//                               <button
//                                 aria-label={`view-${employee.id}`}
//                                 onClick={() => fetchEmployeeById(employee.id)}
//                                 className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
//                               >
//                                 <FaEye />
//                               </button>
//                               {!isViewDeleted ? (
//                                 <>
//                                   <button
//                                     aria-label={`edit-${employee.id}`}
//                                     onClick={() => openEditModal(employee)}
//                                     className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50 transition"
//                                   >
//                                     <FaEdit />
//                                   </button>
//                                   <button
//                                     aria-label={`delete-${employee.id}`}
//                                     onClick={() => deleteEmployee(employee.id)}
//                                     className="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
//                                   >
//                                     <FaTrash />
//                                   </button>
//                                 </>
//                               ) : (
//                                 <button
//                                   aria-label={`recover-${employee.id}`}
//                                   onClick={() => recoverEmployee(employee.id)}
//                                   className="p-2 rounded-md text-green-600 hover:bg-green-50 transition"
//                                 >
//                                   <FaUndo />
//                                 </button>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
//                           No employees found
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Card list for small screens */}
//             <div className="sm:hidden space-y-4">
//               {filteredEmployees.length > 0 ? (
//                 filteredEmployees.map((employee) => (
//                   <div
//                     key={employee.id}
//                     className="bg-white shadow-sm rounded-lg p-4"
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <div>
//                         <div className="text-sm font-medium text-gray-800">{employee.fullName}</div>
//                         <div className="text-xs text-gray-500 mt-1">ID: #{employee.id} | {employee.employeeNumber}</div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <button
//                           aria-label={`view-${employee.id}`}
//                           onClick={() => fetchEmployeeById(employee.id)}
//                           className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
//                         >
//                           <FaEye />
//                         </button>
//                         {!isViewDeleted ? (
//                           <>
//                             <button
//                               aria-label={`edit-${employee.id}`}
//                               onClick={() => openEditModal(employee)}
//                               className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50 transition"
//                             >
//                               <FaEdit />
//                             </button>
//                             <button
//                               aria-label={`delete-${employee.id}`}
//                               onClick={() => deleteEmployee(employee.id)}
//                               className="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
//                             >
//                               <FaTrash />
//                             </button>
//                           </>
//                         ) : (
//                           <button
//                             aria-label={`recover-${employee.id}`}
//                             onClick={() => recoverEmployee(employee.id)}
//                             className="p-2 rounded-md text-green-600 hover:bg-green-50 transition"
//                           >
//                             <FaUndo />
//                           </button>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-2 text-sm">
//                       <div>
//                         <span className="font-medium">Email:</span> {employee.email}
//                       </div>
//                       <div>
//                         <span className="font-medium">Phone:</span> {employee.phoneNumber}
//                       </div>
//                       <div>
//                         <span className="font-medium">Salary:</span> {formatCurrency(employee.basicSalary || employee.daySalary)}
//                       </div>
//                       <div>
//                         <span className="font-medium">Joined:</span> {formatDate(employee.joinedDate)}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="bg-white shadow-sm rounded-lg p-6 text-center text-gray-500">
//                   No employees found
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>

//       {/* View Modal */}
//       {isModalOpen && selectedEmployee && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">Employee Details</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Personal Information</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">ID:</span> #{selectedEmployee.id}</p>
//                   <p><span className="font-medium">Name:</span> {selectedEmployee.fullName}</p>
//                   <p><span className="font-medium">Employee #:</span> {selectedEmployee.employeeNumber}</p>
//                   <p><span className="font-medium">NIC:</span> {selectedEmployee.nic}</p>
//                   <p><span className="font-medium">Joined Date:</span> {formatDate(selectedEmployee.joinedDate)}</p>
//                   <p><span className="font-medium">Termination Date:</span> {formatDate(selectedEmployee.terminationDate)}</p>
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Contact Information</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Email:</span> {selectedEmployee.email}</p>
//                   <p><span className="font-medium">Phone:</span> {selectedEmployee.phoneNumber}</p>
//                   <p><span className="font-medium">Address:</span> {selectedEmployee.address}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Salary Information</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Basic Salary:</span> {formatCurrency(selectedEmployee.basicSalary)}</p>
//                   <p><span className="font-medium">Day Salary:</span> {formatCurrency(selectedEmployee.daySalary)}</p>
//                   <p><span className="font-medium">KPI Rate:</span> {selectedEmployee.kpiRate}</p>
//                   <p><span className="font-medium">KPI Amount:</span> {formatCurrency(selectedEmployee.kpiAmount)}</p>
//                   <p><span className="font-medium">BRA1:</span> {formatCurrency(selectedEmployee.bra1)}</p>
//                   <p><span className="font-medium">BRA2:</span> {formatCurrency(selectedEmployee.bra2)}</p>
//                 </div>
//               </div>
              
//               <div>
//                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Bank & Tax Information</h3>
//                 <div className="space-y-2">
//                   <p><span className="font-medium">Bank Account:</span> {selectedEmployee.bankAccountNumber}</p>
//                   <p><span className="font-medium">Bank Name:</span> {selectedEmployee.bankName}</p>
//                   <p><span className="font-medium">Bank Branch:</span> {selectedEmployee.bankBranch}</p>
//                   <p><span className="font-medium">Tax ID:</span> {selectedEmployee.taxIdentificationNumber}</p>
//                   <p><span className="font-medium">Tax Exemption:</span> {selectedEmployee.hasTaxExemption ? "Yes" : "No"}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex justify-end">
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

//       {/* Edit Modal */}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
//             <form className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={editEmployee.fullName || ""}
//                   onChange={handleEditChange}
//                   placeholder="Full Name"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="text"
//                   name="employeeNumber"
//                   value={editEmployee.employeeNumber || ""}
//                   onChange={handleEditChange}
//                   placeholder="Employee Number"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={editEmployee.email || ""}
//                   onChange={handleEditChange}
//                   placeholder="Email"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   value={editEmployee.phoneNumber || ""}
//                   onChange={handleEditChange}
//                   placeholder="Phone Number"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="text"
//                   name="nic"
//                   value={editEmployee.nic || ""}
//                   onChange={handleEditChange}
//                   placeholder="NIC"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="text"
//                   name="address"
//                   value={editEmployee.address || ""}
//                   onChange={handleEditChange}
//                   placeholder="Address"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="number"
//                   name="basicSalary"
//                   value={editEmployee.basicSalary || ""}
//                   onChange={handleEditChange}
//                   placeholder="Basic Salary"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="number"
//                   name="daySalary"
//                   value={editEmployee.daySalary || ""}
//                   onChange={handleEditChange}
//                   placeholder="Day Salary"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   type="button"
//                   onClick={updateEmployee}
//                   className="px-4 py-2 bg-green-600 text-white rounded"
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsEditModalOpen(false)}
//                   className="px-4 py-2 bg-gray-400 text-white rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Create Modal */}
//       {isCreateModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
//             <form onSubmit={createEmployee} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={newEmployee.fullName}
//                   onChange={handleNewEmployeeChange}
//                   placeholder="Full Name"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="text"
//                   name="employeeNumber"
//                   value={newEmployee.employeeNumber}
//                   onChange={handleNewEmployeeChange}
//                   placeholder="Employee Number"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="email"
//                   name="email"
//                   value={newEmployee.email}
//                   onChange={handleNewEmployeeChange}
//                   placeholder="Email"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   value={newEmployee.phoneNumber}
//                   onChange={handleNewEmployeeChange}
//                   placeholder="Phone Number"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="text"
//                   name="nic"
//                   value={newEmployee.nic}
//                   onChange={handleNewEmployeeChange}
//                   placeholder="NIC"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="text"
//                   name="address"
//                   value={newEmployee.address}
//                   onChange={handleNewEmployeeChange}
//                   placeholder="Address"
//                   required
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="number"
//                   name="basicSalary"
//                   value={newEmployee.basicSalary}
//                   onChange={handleNewEmployeeChange}
//                   placeholder="Basic Salary"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//                 <input
//                   type="number"
//                   name="daySalary"
//                   value={newEmployee.daySalary}
//                   onChange={handleNewEmployeeChange}
//                   placeholder="Day Salary"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-green-600 text-white rounded"
//                 >
//                   Create
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsCreateModalOpen(false)}
//                   className="px-4 py-2 bg-gray-400 text-white rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaEye, FaFilter, FaSearch, FaUndo, FaCalendar, FaMoneyBill, FaBuilding, FaIdCard, FaPercent } from "react-icons/fa";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewDeleted, setIsViewDeleted] = useState(false);
  const [editEmployee, setEditEmployee] = useState({});
  const [newEmployee, setNewEmployee] = useState({
    employeeNumber: "",
    email: "",
    address: "",
    fullName: "",
    nic: "",
    joinedDate: "",
    terminationDate: "",
    phoneNumber: "",
    departmentID: "",
    employeeCategoriesID: "",
    basicSalary: 0,
    daySalary: 0,
    kpiRate: 0,
    kpiAmount: 0,
    bra1: 0,
    bra2: 0,
    isActive: true,
    bankAccountNumber: "",
    bankName: "",
    bankBranch: "",
    taxIdentificationNumber: "",
    hasTaxExemption: false
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchEmployees();
  }, [isViewDeleted]);

  useEffect(() => {
    filterEmployees();
  }, [employees, searchTerm]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const endpoint = isViewDeleted 
        ? `${process.env.REACT_APP_API_BASE_URL}/api/employe/getAllDeletedEmployees`
        : `${process.env.REACT_APP_API_BASE_URL}/api/employe`;
      
      const res = await axios.get(endpoint);
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching employees", err);
      showMessage("Failed to load employees", "error");
      setLoading(false);
    }
  };

  const fetchEmployeeById = async (id) => {
    try {
      const endpoint = isViewDeleted 
        ? `${process.env.REACT_APP_API_BASE_URL}/api/employe/getDeletedEmployeeById/${id}`
        : `${process.env.REACT_APP_API_BASE_URL}/api/employe/${id}`;
      
      const res = await axios.get(endpoint);
      setSelectedEmployee(res.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error fetching employee details", err);
      showMessage("Failed to load employee details", "error");
    }
  };

  const filterEmployees = () => {
    if (!searchTerm) {
      setFilteredEmployees(employees);
      return;
    }

    const result = employees.filter(employee => 
      employee.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.nic?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredEmployees(result);
  };

  const openEditModal = (employee) => {
    setEditEmployee({ ...employee });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditEmployee(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNewEmployeeChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const updateEmployee = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/employe/${editEmployee.id}`,
        editEmployee
      );
      setEmployees(prev => prev.map(emp => emp.id === editEmployee.id ? editEmployee : emp));
      setIsEditModalOpen(false);
      showMessage("Employee updated successfully!", "success");
    } catch (err) {
      console.error("Error updating employee", err);
      showMessage("Failed to update employee", "error");
    }
  };

  const createEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/employe`,
        newEmployee
      );
      setEmployees(prev => [...prev, res.data]);
      setIsCreateModalOpen(false);
      setNewEmployee({
        employeeNumber: "",
        email: "",
        address: "",
        fullName: "",
        nic: "",
        joinedDate: "",
        terminationDate: "",
        phoneNumber: "",
        departmentID: "",
        employeeCategoriesID: "",
        basicSalary: 0,
        daySalary: 0,
        kpiRate: 0,
        kpiAmount: 0,
        bra1: 0,
        bra2: 0,
        isActive: true,
        bankAccountNumber: "",
        bankName: "",
        bankBranch: "",
        taxIdentificationNumber: "",
        hasTaxExemption: false
      });
      showMessage("Employee created successfully!", "success");
    } catch (err) {
      console.error("Error creating employee", err);
      showMessage("Failed to create employee", "error");
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/employe/${id}`);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      showMessage("Employee deleted successfully!", "success");
    } catch (err) {
      console.error("Error deleting employee", err);
      showMessage("Failed to delete employee", "error");
    }
  };

  const recoverEmployee = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/employe/recoverDeletedEmployee/${id}`);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      showMessage("Employee recovered successfully!", "success");
    } catch (err) {
      console.error("Error recovering employee", err);
      showMessage("Failed to recover employee", "error");
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
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Edit Modal with all fields
  const EditEmployeeModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
        <form className="space-y-6">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
              <FaIdCard /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={editEmployee.fullName || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Number *</label>
                <input
                  type="text"
                  name="employeeNumber"
                  value={editEmployee.employeeNumber || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIC *</label>
                <input
                  type="text"
                  name="nic"
                  value={editEmployee.nic || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={editEmployee.email || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={editEmployee.phoneNumber || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={editEmployee.address || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Employment Details Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
              <FaBuilding /> Employment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department ID</label>
                <input
                  type="text"
                  name="departmentID"
                  value={editEmployee.departmentID || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Category ID</label>
                <input
                  type="text"
                  name="employeeCategoriesID"
                  value={editEmployee.employeeCategoriesID || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Joined Date</label>
                <input
                  type="date"
                  name="joinedDate"
                  value={editEmployee.joinedDate ? new Date(editEmployee.joinedDate).toISOString().split('T')[0] : ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Termination Date</label>
                <input
                  type="date"
                  name="terminationDate"
                  value={editEmployee.terminationDate ? new Date(editEmployee.terminationDate).toISOString().split('T')[0] : ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Salary Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
              <FaMoneyBill /> Salary Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
                <input
                  type="number"
                  name="basicSalary"
                  value={editEmployee.basicSalary || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Day Salary</label>
                <input
                  type="number"
                  name="daySalary"
                  value={editEmployee.daySalary || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KPI Rate</label>
                <input
                  type="number"
                  name="kpiRate"
                  value={editEmployee.kpiRate || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KPI Amount</label>
                <input
                  type="number"
                  name="kpiAmount"
                  value={editEmployee.kpiAmount || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BRA 1</label>
                <input
                  type="number"
                  name="bra1"
                  value={editEmployee.bra1 || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BRA 2</label>
                <input
                  type="number"
                  name="bra2"
                  value={editEmployee.bra2 || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Bank & Tax Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
              <FaPercent /> Bank & Tax Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
                <input
                  type="text"
                  name="bankAccountNumber"
                  value={editEmployee.bankAccountNumber || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={editEmployee.bankName || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Branch</label>
                <input
                  type="text"
                  name="bankBranch"
                  value={editEmployee.bankBranch || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Identification Number</label>
                <input
                  type="text"
                  name="taxIdentificationNumber"
                  value={editEmployee.taxIdentificationNumber || ""}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="hasTaxExemption"
                  checked={editEmployee.hasTaxExemption || false}
                  onChange={handleEditChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Has Tax Exemption</label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={editEmployee.isActive || false}
                  onChange={handleEditChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Active Employee</label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={updateEmployee}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium rounded-lg shadow-sm transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Create Modal with all fields (similar structure to Edit Modal)
  const CreateEmployeeModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
        <form onSubmit={createEmployee} className="space-y-6">
          {/* Personal Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
              <FaIdCard /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={newEmployee.fullName}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Number *</label>
                <input
                  type="text"
                  name="employeeNumber"
                  value={newEmployee.employeeNumber}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIC *</label>
                <input
                  type="text"
                  name="nic"
                  value={newEmployee.nic}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={newEmployee.phoneNumber}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newEmployee.address}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Employment Details Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
              <FaBuilding /> Employment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department ID</label>
                <input
                  type="text"
                  name="departmentID"
                  value={newEmployee.departmentID}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Category ID</label>
                <input
                  type="text"
                  name="employeeCategoriesID"
                  value={newEmployee.employeeCategoriesID}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Joined Date</label>
                <input
                  type="date"
                  name="joinedDate"
                  value={newEmployee.joinedDate}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Termination Date</label>
                <input
                  type="date"
                  name="terminationDate"
                  value={newEmployee.terminationDate}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Salary Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
              <FaMoneyBill /> Salary Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
                <input
                  type="number"
                  name="basicSalary"
                  value={newEmployee.basicSalary}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Day Salary</label>
                <input
                  type="number"
                  name="daySalary"
                  value={newEmployee.daySalary}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KPI Rate</label>
                <input
                  type="number"
                  name="kpiRate"
                  value={newEmployee.kpiRate}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KPI Amount</label>
                <input
                  type="number"
                  name="kpiAmount"
                  value={newEmployee.kpiAmount}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BRA 1</label>
                <input
                  type="number"
                  name="bra1"
                  value={newEmployee.bra1}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BRA 2</label>
                <input
                  type="number"
                  name="bra2"
                  value={newEmployee.bra2}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Bank & Tax Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
              <FaPercent /> Bank & Tax Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
                <input
                  type="text"
                  name="bankAccountNumber"
                  value={newEmployee.bankAccountNumber}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={newEmployee.bankName}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Branch</label>
                <input
                  type="text"
                  name="bankBranch"
                  value={newEmployee.bankBranch}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Identification Number</label>
                <input
                  type="text"
                  name="taxIdentificationNumber"
                  value={newEmployee.taxIdentificationNumber}
                  onChange={handleNewEmployeeChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="hasTaxExemption"
                  checked={newEmployee.hasTaxExemption}
                  onChange={handleNewEmployeeChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Has Tax Exemption</label>
              </div>
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={newEmployee.isActive}
                  onChange={handleNewEmployeeChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Active Employee</label>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
            >
              Create Employee
            </button>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium rounded-lg shadow-sm transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Employees</h1>
            <p className="text-sm text-gray-500 mt-1">
              {isViewDeleted ? "Viewing deleted employees" : "Manage employee records"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsViewDeleted(!isViewDeleted)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
            >
              {isViewDeleted ? (
                <>
                  <FaEye /> View Active
                </>
              ) : (
                <>
                  <FaFilter /> View Deleted
                </>
              )}
            </button>
            {!isViewDeleted && (
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
              >
                <FaPlus /> Add New
              </button>
            )}
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {message.text}
          </div>
        )}

        {/* Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search employees by name, ID, email, or NIC..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Employees Table */}
        {loading ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-gray-500">Loading employees...</p>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">#{employee.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-800">{employee.fullName}</div>
                            <div className="text-xs text-gray-500">{employee.employeeNumber}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-800">{employee.email}</div>
                            <div className="text-xs text-gray-500">{employee.phoneNumber}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {formatCurrency(employee.basicSalary || employee.daySalary)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(employee.joinedDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                            <div className="inline-flex items-center gap-2">
                              <button
                                aria-label={`view-${employee.id}`}
                                onClick={() => fetchEmployeeById(employee.id)}
                                className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
                              >
                                <FaEye />
                              </button>
                              {!isViewDeleted ? (
                                <>
                                  <button
                                    aria-label={`edit-${employee.id}`}
                                    onClick={() => openEditModal(employee)}
                                    className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50 transition"
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    aria-label={`delete-${employee.id}`}
                                    onClick={() => deleteEmployee(employee.id)}
                                    className="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
                                  >
                                    <FaTrash />
                                  </button>
                                </>
                              ) : (
                                <button
                                  aria-label={`recover-${employee.id}`}
                                  onClick={() => recoverEmployee(employee.id)}
                                  className="p-2 rounded-md text-green-600 hover:bg-green-50 transition"
                                >
                                  <FaUndo />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-sm text-gray-500">
                          No employees found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card list for small screens */}
            <div className="sm:hidden space-y-4">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="bg-white shadow-sm rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm font-medium text-gray-800">{employee.fullName}</div>
                        <div className="text-xs text-gray-500 mt-1">ID: #{employee.id} | {employee.employeeNumber}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          aria-label={`view-${employee.id}`}
                          onClick={() => fetchEmployeeById(employee.id)}
                          className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition"
                        >
                          <FaEye />
                        </button>
                        {!isViewDeleted ? (
                          <>
                            <button
                              aria-label={`edit-${employee.id}`}
                              onClick={() => openEditModal(employee)}
                              className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50 transition"
                            >
                              <FaEdit />
                            </button>
                            <button
                              aria-label={`delete-${employee.id}`}
                              onClick={() => deleteEmployee(employee.id)}
                              className="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
                            >
                              <FaTrash />
                            </button>
                          </>
                        ) : (
                          <button
                            aria-label={`recover-${employee.id}`}
                            onClick={() => recoverEmployee(employee.id)}
                            className="p-2 rounded-md text-green-600 hover:bg-green-50 transition"
                          >
                            <FaUndo />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Email:</span> {employee.email}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span> {employee.phoneNumber}
                      </div>
                      <div>
                        <span className="font-medium">Salary:</span> {formatCurrency(employee.basicSalary || employee.daySalary)}
                      </div>
                      <div>
                        <span className="font-medium">Joined:</span> {formatDate(employee.joinedDate)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white shadow-sm rounded-lg p-6 text-center text-gray-500">
                  No employees found
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* View Modal */}
      {isModalOpen && selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Employee Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Personal Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">ID:</span> #{selectedEmployee.id}</p>
                  <p><span className="font-medium">Name:</span> {selectedEmployee.fullName}</p>
                  <p><span className="font-medium">Employee #:</span> {selectedEmployee.employeeNumber}</p>
                  <p><span className="font-medium">NIC:</span> {selectedEmployee.nic}</p>
                  <p><span className="font-medium">Joined Date:</span> {formatDate(selectedEmployee.joinedDate)}</p>
                  <p><span className="font-medium">Termination Date:</span> {formatDate(selectedEmployee.terminationDate)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Contact Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Email:</span> {selectedEmployee.email}</p>
                  <p><span className="font-medium">Phone:</span> {selectedEmployee.phoneNumber}</p>
                  <p><span className="font-medium">Address:</span> {selectedEmployee.address}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Salary Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Basic Salary:</span> {formatCurrency(selectedEmployee.basicSalary)}</p>
                  <p><span className="font-medium">Day Salary:</span> {formatCurrency(selectedEmployee.daySalary)}</p>
                  <p><span className="font-medium">KPI Rate:</span> {selectedEmployee.kpiRate}</p>
                  <p><span className="font-medium">KPI Amount:</span> {formatCurrency(selectedEmployee.kpiAmount)}</p>
                  <p><span className="font-medium">BRA1:</span> {formatCurrency(selectedEmployee.bra1)}</p>
                  <p><span className="font-medium">BRA2:</span> {formatCurrency(selectedEmployee.bra2)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Bank & Tax Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Bank Account:</span> {selectedEmployee.bankAccountNumber}</p>
                  <p><span className="font-medium">Bank Name:</span> {selectedEmployee.bankName}</p>
                  <p><span className="font-medium">Bank Branch:</span> {selectedEmployee.bankBranch}</p>
                  <p><span className="font-medium">Tax ID:</span> {selectedEmployee.taxIdentificationNumber}</p>
                  <p><span className="font-medium">Tax Exemption:</span> {selectedEmployee.hasTaxExemption ? "Yes" : "No"}</p>
                  <p><span className="font-medium">Status:</span> {selectedEmployee.isActive ? "Active" : "Inactive"}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
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

      {/* Edit Modal */}
      {isEditModalOpen && <EditEmployeeModal />}

      {/* Create Modal */}
      {isCreateModalOpen && <CreateEmployeeModal />}
    </div>
  );
}