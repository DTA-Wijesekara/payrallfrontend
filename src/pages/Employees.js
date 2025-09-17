// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaPlus, FaEye, FaFilter, FaSearch, FaUndo, FaCalendar, FaMoneyBill, FaBuilding, FaIdCard, FaPercent } from "react-icons/fa";

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
//     departmentID: null,
//     employeeCategoriesID: null,
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
//     // Convert number fields from backend to strings for input compatibility
//     const employeeForEdit = {
//       ...employee,
//       departmentID: employee.departmentID ? employee.departmentID.toString() : "",
//       employeeCategoriesID: employee.employeeCategoriesID ? employee.employeeCategoriesID.toString() : ""
//     };
//     setEditEmployee(employeeForEdit);
//     setIsEditModalOpen(true);
//   };

//   const handleEditChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditEmployee(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleNewEmployeeChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     setNewEmployee(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   }, []);

//   const updateEmployee = async () => {
//     try {
//       // Convert string IDs back to numbers for the API
//       const employeeToUpdate = {
//         ...editEmployee,
//         departmentID: editEmployee.departmentID ? parseInt(editEmployee.departmentID) : null,
//         employeeCategoriesID: editEmployee.employeeCategoriesID ? parseInt(editEmployee.employeeCategoriesID) : null
//       };
      
//       await axios.put(
//         `${process.env.REACT_APP_API_BASE_URL}/api/employe/${editEmployee.id}`,
//         employeeToUpdate
//       );
//       setEmployees(prev => prev.map(emp => emp.id === editEmployee.id ? employeeToUpdate : emp));
//       setIsEditModalOpen(false);
//       showMessage("Employee updated successfully!", "success");
//     } catch (err) {
//       console.error("Error updating employee", err);
//       if (err.response) {
//         showMessage(`Update failed: ${JSON.stringify(err.response.data)}`, "error");
//       } else {
//         showMessage("Failed to update employee", "error");
//       }
//     }
//   };

//   const createEmployee = async (e) => {
//     e.preventDefault();
//     try {
//       // Convert string IDs to numbers for the API
//       const employeeToCreate = {
//         ...newEmployee,
//         departmentID: newEmployee.departmentID ? parseInt(newEmployee.departmentID) : null,
//         employeeCategoriesID: newEmployee.employeeCategoriesID ? parseInt(newEmployee.employeeCategoriesID) : null
//       };
      
//       console.log("Sending employee data:", employeeToCreate);
      
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_BASE_URL}/api/employe`,
//         employeeToCreate
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
//         departmentID: null,
//         employeeCategoriesID: null,
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
//       if (err.response) {
//         console.error("Response data:", err.response.data);
//         showMessage(`Creation failed: ${JSON.stringify(err.response.data)}`, "error");
//       } else {
//         showMessage("Failed to create employee", "error");
//       }
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

//   // Edit Modal with all fields
//   const EditEmployeeModal = () => (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
//         <form className="space-y-6">
//           {/* Personal Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaIdCard /> Personal Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={editEmployee.fullName || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Employee Number *</label>
//                 <input
//                   type="text"
//                   name="employeeNumber"
//                   value={editEmployee.employeeNumber || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">NIC *</label>
//                 <input
//                   type="text"
//                   name="nic"
//                   value={editEmployee.nic || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={editEmployee.email || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   value={editEmployee.phoneNumber || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={editEmployee.address || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Employment Details Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaBuilding /> Employment Details
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Department ID</label>
//                 <input
//                   type="text"
//                   name="departmentID"
//                   value={editEmployee.departmentID || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Employee Category ID</label>
//                 <input
//                   type="text"
//                   name="employeeCategoriesID"
//                   value={editEmployee.employeeCategoriesID || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Joined Date</label>
//                 <input
//                   type="date"
//                   name="joinedDate"
//                   value={editEmployee.joinedDate ? new Date(editEmployee.joinedDate).toISOString().split('T')[0] : ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Termination Date</label>
//                 <input
//                   type="date"
//                   name="terminationDate"
//                   value={editEmployee.terminationDate ? new Date(editEmployee.terminationDate).toISOString().split('T')[0] : ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Salary Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaMoneyBill /> Salary Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
//                 <input
//                   type="number"
//                   name="basicSalary"
//                   value={editEmployee.basicSalary || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Day Salary</label>
//                 <input
//                   type="number"
//                   name="daySalary"
//                   value={editEmployee.daySalary || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">KPI Rate</label>
//                 <input
//                   type="number"
//                   name="kpiRate"
//                   value={editEmployee.kpiRate || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">KPI Amount</label>
//                 <input
//                   type="number"
//                   name="kpiAmount"
//                   value={editEmployee.kpiAmount || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">BRA 1</label>
//                 <input
//                   type="number"
//                   name="bra1"
//                   value={editEmployee.bra1 || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">BRA 2</label>
//                 <input
//                   type="number"
//                   name="bra2"
//                   value={editEmployee.bra2 || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Bank & Tax Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaPercent /> Bank & Tax Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
//                 <input
//                   type="text"
//                   name="bankAccountNumber"
//                   value={editEmployee.bankAccountNumber || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
//                 <input
//                   type="text"
//                   name="bankName"
//                   value={editEmployee.bankName || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bank Branch</label>
//                 <input
//                   type="text"
//                   name="bankBranch"
//                   value={editEmployee.bankBranch || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Tax Identification Number</label>
//                 <input
//                   type="text"
//                   name="taxIdentificationNumber"
//                   value={editEmployee.taxIdentificationNumber || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div className="flex items-center mt-4">
//                 <input
//                   type="checkbox"
//                   name="hasTaxExemption"
//                   checked={editEmployee.hasTaxExemption || false}
//                   onChange={handleEditChange}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-900">Has Tax Exemption</label>
//               </div>
//               <div className="flex items-center mt-4">
//                 <input
//                   type="checkbox"
//                   name="isActive"
//                   checked={editEmployee.isActive || false}
//                   onChange={handleEditChange}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-900">Active Employee</label>
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={updateEmployee}
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
//             >
//               Save Changes
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsEditModalOpen(false)}
//               className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium rounded-lg shadow-sm transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );

//   // Create Modal with all fields (similar structure to Edit Modal)
//   const CreateEmployeeModal = () => (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
//         <form onSubmit={createEmployee} className="space-y-6">
//           {/* Personal Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaIdCard /> Personal Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
//                 <input
//                   key="fullName-input"
//                   type="text"
//                   name="fullName"
//                   value={newEmployee.fullName}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Employee Number *</label>
//                 <input
//                   key="employeeNumber-input"
//                   type="text"
//                   name="employeeNumber"
//                   value={newEmployee.employeeNumber}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">NIC *</label>
//                 <input
//                   key="nic-input"
//                   type="text"
//                   name="nic"
//                   value={newEmployee.nic}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
//                 <input
//                   key="email-input"
//                   type="email"
//                   name="email"
//                   value={newEmployee.email}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
//                 <input
//                   key="phoneNumber-input"
//                   type="text"
//                   name="phoneNumber"
//                   value={newEmployee.phoneNumber}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                 <input
//                   key="address-input"
//                   type="text"
//                   name="address"
//                   value={newEmployee.address}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Employment Details Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaBuilding /> Employment Details
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Department ID</label>
//                 <input
//                   key="departmentID-input"
//                   type="text"
//                   name="departmentID"
//                   value={newEmployee.departmentID || ""}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Employee Category ID</label>
//                 <input
//                   key="employeeCategoriesID-input"
//                   type="text"
//                   name="employeeCategoriesID"
//                   value={newEmployee.employeeCategoriesID || ""}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Joined Date</label>
//                 <input
//                   key="joinedDate-input"
//                   type="date"
//                   name="joinedDate"
//                   value={newEmployee.joinedDate}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Termination Date</label>
//                 <input
//                   key="terminationDate-input"
//                   type="date"
//                   name="terminationDate"
//                   value={newEmployee.terminationDate}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Salary Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaMoneyBill /> Salary Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
//                 <input
//                   key="basicSalary-input"
//                   type="number"
//                   name="basicSalary"
//                   value={newEmployee.basicSalary}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Day Salary</label>
//                 <input
//                   key="daySalary-input"
//                   type="number"
//                   name="daySalary"
//                   value={newEmployee.daySalary}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">KPI Rate</label>
//                 <input
//                   key="kpiRate-input"
//                   type="number"
//                   name="kpiRate"
//                   value={newEmployee.kpiRate}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">KPI Amount</label>
//                 <input
//                   key="kpiAmount-input"
//                   type="number"
//                   name="kpiAmount"
//                   value={newEmployee.kpiAmount}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">BRA 1</label>
//                 <input
//                   key="bra1-input"
//                   type="number"
//                   name="bra1"
//                   value={newEmployee.bra1}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">BRA 2</label>
//                 <input
//                   key="bra2-input"
//                   type="number"
//                   name="bra2"
//                   value={newEmployee.bra2}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Bank & Tax Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaPercent /> Bank & Tax Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
//                 <input
//                   key="bankAccountNumber-input"
//                   type="text"
//                   name="bankAccountNumber"
//                   value={newEmployee.bankAccountNumber}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
//                 <input
//                   key="bankName-input"
//                   type="text"
//                   name="bankName"
//                   value={newEmployee.bankName}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bank Branch</label>
//                 <input
//                   key="bankBranch-input"
//                   type="text"
//                   name="bankBranch"
//                   value={newEmployee.bankBranch}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Tax Identification Number</label>
//                 <input
//                   key="taxIdentificationNumber-input"
//                   type="text"
//                   name="taxIdentificationNumber"
//                   value={newEmployee.taxIdentificationNumber}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div className="flex items-center mt-4">
//                 <input
//                   key="hasTaxExemption-input"
//                   type="checkbox"
//                   name="hasTaxExemption"
//                   checked={newEmployee.hasTaxExemption}
//                   onChange={handleNewEmployeeChange}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-900">Has Tax Exemption</label>
//               </div>
//               <div className="flex items-center mt-4">
//                 <input
//                   key="isActive-input"
//                   type="checkbox"
//                   name="isActive"
//                   checked={newEmployee.isActive}
//                   onChange={handleNewEmployeeChange}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-900">Active Employee</label>
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
//             >
//               Create Employee
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsCreateModalOpen(false)}
//               className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium rounded-lg shadow-sm transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
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
//                   <p><span className="font-medium">Status:</span> {selectedEmployee.isActive ? "Active" : "Inactive"}</p>
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
//       {isEditModalOpen && <EditEmployeeModal />}

//       {/* Create Modal */}
//       {isCreateModalOpen && <CreateEmployeeModal />}
//     </div>
//   );
// }











// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { FaEdit, FaTrash, FaPlus, FaEye, FaFilter, FaSearch, FaUndo, FaCalendar, FaMoneyBill, FaBuilding, FaIdCard, FaPercent } from "react-icons/fa";

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
//     basicSalary: "",
//     daySalary: "",
//     kpiRate: "",
//     kpiAmount: "",
//     bra1: "",
//     bra2: "",
//     isActive: true,
//     bankAccountNumber: "",
//     bankName: "",
//     bankBranch: "",
//     taxIdentificationNumber: "",
//     hasTaxExemption: false
//   });
//   const [departments, setDepartments] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [formErrors, setFormErrors] = useState({});

//   useEffect(() => {
//     fetchEmployees();
//     fetchDepartments();
//     fetchCategories();
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

//   const fetchDepartments = async () => {
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/department`);
//       setDepartments(res.data);
//     } catch (err) {
//       console.error("Error fetching departments", err);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employeecategories`);
//       setCategories(res.data);
//     } catch (err) {
//       console.error("Error fetching categories", err);
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

//   const validateForm = (employeeData, isEdit = false) => {
//     const errors = {};
    
//     if (!employeeData.fullName?.trim()) errors.fullName = "Full name is required";
//     if (!employeeData.employeeNumber?.trim()) errors.employeeNumber = "Employee number is required";
//     if (!employeeData.nic?.trim()) errors.nic = "NIC is required";
//     if (!employeeData.email?.trim()) errors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(employeeData.email)) errors.email = "Email is invalid";
//     if (!employeeData.phoneNumber?.trim()) errors.phoneNumber = "Phone number is required";
    
//     // Validate number fields
//     const numberFields = ['basicSalary', 'daySalary', 'kpiRate', 'kpiAmount', 'bra1', 'bra2'];
//     numberFields.forEach(field => {
//       if (employeeData[field] && isNaN(employeeData[field])) {
//         errors[field] = "Must be a valid number";
//       }
//     });
    
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const openEditModal = (employee) => {
//     const employeeForEdit = {
//       ...employee,
//       departmentID: employee.departmentID ? employee.departmentID.toString() : "",
//       employeeCategoriesID: employee.employeeCategoriesID ? employee.employeeCategoriesID.toString() : ""
//     };
//     setEditEmployee(employeeForEdit);
//     setIsEditModalOpen(true);
//     setFormErrors({});
//   };

//   const handleEditChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditEmployee(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    
//     // Clear error when field is edited
//     if (formErrors[name]) {
//       setFormErrors(prev => {
//         const newErrors = {...prev};
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handleNewEmployeeChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     setNewEmployee(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    
//     // Clear error when field is edited
//     if (formErrors[name]) {
//       setFormErrors(prev => {
//         const newErrors = {...prev};
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   }, [formErrors]);

//   const updateEmployee = async () => {
//     if (!validateForm(editEmployee, true)) return;
    
//     try {
//       const employeeToUpdate = {
//         ...editEmployee,
//         departmentID: editEmployee.departmentID ? parseInt(editEmployee.departmentID) : null,
//         employeeCategoriesID: editEmployee.employeeCategoriesID ? parseInt(editEmployee.employeeCategoriesID) : null,
//         basicSalary: editEmployee.basicSalary ? parseFloat(editEmployee.basicSalary) : 0,
//         daySalary: editEmployee.daySalary ? parseFloat(editEmployee.daySalary) : 0,
//         kpiRate: editEmployee.kpiRate ? parseFloat(editEmployee.kpiRate) : 0,
//         kpiAmount: editEmployee.kpiAmount ? parseFloat(editEmployee.kpiAmount) : 0,
//         bra1: editEmployee.bra1 ? parseFloat(editEmployee.bra1) : 0,
//         bra2: editEmployee.bra2 ? parseFloat(editEmployee.bra2) : 0
//       };
      
//       await axios.put(
//         `${process.env.REACT_APP_API_BASE_URL}/api/employe/${editEmployee.id}`,
//         employeeToUpdate
//       );
//       setEmployees(prev => prev.map(emp => emp.id === editEmployee.id ? employeeToUpdate : emp));
//       setIsEditModalOpen(false);
//       showMessage("Employee updated successfully!", "success");
//     } catch (err) {
//       console.error("Error updating employee", err);
//       if (err.response) {
//         showMessage(`Update failed: ${JSON.stringify(err.response.data)}`, "error");
//       } else {
//         showMessage("Failed to update employee", "error");
//       }
//     }
//   };

//   const createEmployee = async (e) => {
//     e.preventDefault();
//     if (!validateForm(newEmployee)) return;
    
//     try {
//       const employeeToCreate = {
//         ...newEmployee,
//         departmentID: newEmployee.departmentID ? parseInt(newEmployee.departmentID) : null,
//         employeeCategoriesID: newEmployee.employeeCategoriesID ? parseInt(newEmployee.employeeCategoriesID) : null,
//         basicSalary: newEmployee.basicSalary ? parseFloat(newEmployee.basicSalary) : 0,
//         daySalary: newEmployee.daySalary ? parseFloat(newEmployee.daySalary) : 0,
//         kpiRate: newEmployee.kpiRate ? parseFloat(newEmployee.kpiRate) : 0,
//         kpiAmount: newEmployee.kpiAmount ? parseFloat(newEmployee.kpiAmount) : 0,
//         bra1: newEmployee.bra1 ? parseFloat(newEmployee.bra1) : 0,
//         bra2: newEmployee.bra2 ? parseFloat(newEmployee.bra2) : 0
//       };
      
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_BASE_URL}/api/employe`,
//         employeeToCreate
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
//         basicSalary: "",
//         daySalary: "",
//         kpiRate: "",
//         kpiAmount: "",
//         bra1: "",
//         bra2: "",
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
//       if (err.response) {
//         console.error("Response data:", err.response.data);
//         showMessage(`Creation failed: ${JSON.stringify(err.response.data)}`, "error");
//       } else {
//         showMessage("Failed to create employee", "error");
//       }
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

//   // Edit Modal with all fields
//   const EditEmployeeModal = () => (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
//         <form className="space-y-6">
//           {/* Personal Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaIdCard /> Personal Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={editEmployee.fullName || ""}
//                   onChange={handleEditChange}
//                   className={`w-full border ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                   required
//                 />
//                 {formErrors.fullName && <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Employee Number *</label>
//                 <input
//                   type="text"
//                   name="employeeNumber"
//                   value={editEmployee.employeeNumber || ""}
//                   onChange={handleEditChange}
//                   className={`w-full border ${formErrors.employeeNumber ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                   required
//                 />
//                 {formErrors.employeeNumber && <p className="mt-1 text-sm text-red-600">{formErrors.employeeNumber}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">NIC *</label>
//                 <input
//                   type="text"
//                   name="nic"
//                   value={editEmployee.nic || ""}
//                   onChange={handleEditChange}
//                   className={`w-full border ${formErrors.nic ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                   required
//                 />
//                 {formErrors.nic && <p className="mt-1 text-sm text-red-600">{formErrors.nic}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={editEmployee.email || ""}
//                   onChange={handleEditChange}
//                   className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                   required
//                 />
//                 {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   value={editEmployee.phoneNumber || ""}
//                   onChange={handleEditChange}
//                   className={`w-full border ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                   required
//                 />
//                 {formErrors.phoneNumber && <p className="mt-1 text-sm text-red-600">{formErrors.phoneNumber}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={editEmployee.address || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Employment Details Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaBuilding /> Employment Details
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
//                 <select
//                   name="departmentID"
//                   value={editEmployee.departmentID || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="">Select Department</option>
//                   {departments.map(dept => (
//                     <option key={dept.id} value={dept.id}>{dept.departmentName}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Employee Category</label>
//                 <select
//                   name="employeeCategoriesID"
//                   value={editEmployee.employeeCategoriesID || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map(cat => (
//                     <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Joined Date</label>
//                 <input
//                   type="date"
//                   name="joinedDate"
//                   value={editEmployee.joinedDate ? new Date(editEmployee.joinedDate).toISOString().split('T')[0] : ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Termination Date</label>
//                 <input
//                   type="date"
//                   name="terminationDate"
//                   value={editEmployee.terminationDate ? new Date(editEmployee.terminationDate).toISOString().split('T')[0] : ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Salary Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaMoneyBill /> Salary Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="basicSalary"
//                   value={editEmployee.basicSalary || ""}
//                   onChange={handleEditChange}
//                   className={`w-full border ${formErrors.basicSalary ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 />
//                 {formErrors.basicSalary && <p className="mt-1 text-sm text-red-600">{formErrors.basicSalary}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Day Salary</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="daySalary"
//                   value={editEmployee.daySalary || ""}
//                   onChange={handleEditChange}
//                   className={`w-full border ${formErrors.daySalary ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 />
//                 {formErrors.daySalary && <p className="mt-1 text-sm text-red-600">{formErrors.daySalary}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">KPI Rate</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="kpiRate"
//                   value={editEmployee.kpiRate || ""}
//                   onChange={handleEditChange}
//                   className={`w-full border ${formErrors.kpiRate ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 />
//                 {formErrors.kpiRate && <p className="mt-1 text-sm text-red-600">{formErrors.kpiRate}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">KPI Amount</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="kpiAmount"
//                   value={editEmployee.kpiAmount || ""}
//                   onChange={handleEditChange}
//                   className={`w-full border ${formErrors.kpiAmount ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 />
//                 {formErrors.kpiAmount && <p className="mt-1 text-sm text-red-600">{formErrors.kpiAmount}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">BRA 1</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="bra1"
//                   value={editEmployee.bra1 || ""}
//                   onChange={handleEditChange}
//                   className={`w-full border ${formErrors.bra1 ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 />
//                 {formErrors.bra1 && <p className="mt-1 text-sm text-red-600">{formErrors.bra1}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">BRA 2</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="bra2"
//                   value={editEmployee.bra2 || ""}
//                   onChange={handleEditChange}
//                   className={`w-full border ${formErrors.bra2 ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 />
//                 {formErrors.bra2 && <p className="mt-1 text-sm text-red-600">{formErrors.bra2}</p>}
//               </div>
//             </div>
//           </div>

//           {/* Bank & Tax Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaPercent /> Bank & Tax Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
//                 <input
//                   type="text"
//                   name="bankAccountNumber"
//                   value={editEmployee.bankAccountNumber || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
//                 <input
//                   type="text"
//                   name="bankName"
//                   value={editEmployee.bankName || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bank Branch</label>
//                 <input
//                   type="text"
//                   name="bankBranch"
//                   value={editEmployee.bankBranch || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Tax Identification Number</label>
//                 <input
//                   type="text"
//                   name="taxIdentificationNumber"
//                   value={editEmployee.taxIdentificationNumber || ""}
//                   onChange={handleEditChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div className="flex items-center mt-4">
//                 <input
//                   type="checkbox"
//                   name="hasTaxExemption"
//                   checked={editEmployee.hasTaxExemption || false}
//                   onChange={handleEditChange}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-900">Has Tax Exemption</label>
//               </div>
//               <div className="flex items-center mt-4">
//                 <input
//                   type="checkbox"
//                   name="isActive"
//                   checked={editEmployee.isActive || false}
//                   onChange={handleEditChange}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-900">Active Employee</label>
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button
//               type="button"
//               onClick={updateEmployee}
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
//             >
//               Save Changes
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsEditModalOpen(false)}
//               className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium rounded-lg shadow-sm transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );

//   // Create Modal with all fields
//   const CreateEmployeeModal = () => (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
//         <form onSubmit={createEmployee} className="space-y-6">
//           {/* Personal Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaIdCard /> Personal Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={newEmployee.fullName}
//                   onChange={handleNewEmployeeChange}
//                   className={`w-full border ${formErrors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                   required
//                 />
//                 {formErrors.fullName && <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Employee Number *</label>
//                 <input
//                   type="text"
//                   name="employeeNumber"
//                   value={newEmployee.employeeNumber}
//                   onChange={handleNewEmployeeChange}
//                   className={`w-full border ${formErrors.employeeNumber ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                   required
//                 />
//                 {formErrors.employeeNumber && <p className="mt-1 text-sm text-red-600">{formErrors.employeeNumber}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">NIC *</label>
//                 <input
//                   type="text"
//                   name="nic"
//                   value={newEmployee.nic}
//                   onChange={handleNewEmployeeChange}
//                   className={`w-full border ${formErrors.nic ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                   required
//                 />
//                 {formErrors.nic && <p className="mt-1 text-sm text-red-600">{formErrors.nic}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={newEmployee.email}
//                   onChange={handleNewEmployeeChange}
//                   className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                   required
//                 />
//                 {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   value={newEmployee.phoneNumber}
//                   onChange={handleNewEmployeeChange}
//                   className={`w-full border ${formErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                   required
//                 />
//                 {formErrors.phoneNumber && <p className="mt-1 text-sm text-red-600">{formErrors.phoneNumber}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={newEmployee.address}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Employment Details Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaBuilding /> Employment Details
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
//                 <select
//                   name="departmentID"
//                   value={newEmployee.departmentID}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="">Select Department</option>
//                   {departments.map(dept => (
//                     <option key={dept.id} value={dept.id}>{dept.departmentName}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Employee Category</label>
//                 <select
//                   name="employeeCategoriesID"
//                   value={newEmployee.employeeCategoriesID}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map(cat => (
//                     <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Joined Date</label>
//                 <input
//                   type="date"
//                   name="joinedDate"
//                   value={newEmployee.joinedDate}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Termination Date</label>
//                 <input
//                   type="date"
//                   name="terminationDate"
//                   value={newEmployee.terminationDate}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Salary Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaMoneyBill /> Salary Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="basicSalary"
//                   value={newEmployee.basicSalary}
//                   onChange={handleNewEmployeeChange}
//                   className={`w-full border ${formErrors.basicSalary ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 />
//                 {formErrors.basicSalary && <p className="mt-1 text-sm text-red-600">{formErrors.basicSalary}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Day Salary</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="daySalary"
//                   value={newEmployee.daySalary}
//                   onChange={handleNewEmployeeChange}
//                   className={`w-full border ${formErrors.daySalary ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 />
//                 {formErrors.daySalary && <p className="mt-1 text-sm text-red-600">{formErrors.daySalary}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">KPI Rate</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="kpiRate"
//                   value={newEmployee.kpiRate}
//                   onChange={handleNewEmployeeChange}
//                   className={`w-full border ${formErrors.kpiRate ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 />
//                 {formErrors.kpiRate && <p className="mt-1 text-sm text-red-600">{formErrors.kpiRate}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">KPI Amount</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="kpiAmount"
//                   value={newEmployee.kpiAmount}
//                   onChange={handleNewEmployeeChange}
//                   className={`w-full border ${formErrors.kpiAmount ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 />
//                 {formErrors.kpiAmount && <p className="mt-1 text-sm text-red-600">{formErrors.kpiAmount}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">BRA 1</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="bra1"
//                   value={newEmployee.bra1}
//                   onChange={handleNewEmployeeChange}
//                   className={`w-full border ${formErrors.bra1 ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 />
//                 {formErrors.bra1 && <p className="mt-1 text-sm text-red-600">{formErrors.bra1}</p>}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">BRA 2</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   name="bra2"
//                   value={newEmployee.bra2}
//                   onChange={handleNewEmployeeChange}
//                   className={`w-full border ${formErrors.bra2 ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 />
//                 {formErrors.bra2 && <p className="mt-1 text-sm text-red-600">{formErrors.bra2}</p>}
//               </div>
//             </div>
//           </div>

//           {/* Bank & Tax Information Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
//               <FaPercent /> Bank & Tax Information
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
//                 <input
//                   type="text"
//                   name="bankAccountNumber"
//                   value={newEmployee.bankAccountNumber}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
//                 <input
//                   type="text"
//                   name="bankName"
//                   value={newEmployee.bankName}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Bank Branch</label>
//                 <input
//                   type="text"
//                   name="bankBranch"
//                   value={newEmployee.bankBranch}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Tax Identification Number</label>
//                 <input
//                   type="text"
//                   name="taxIdentificationNumber"
//                   value={newEmployee.taxIdentificationNumber}
//                   onChange={handleNewEmployeeChange}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>
//               <div className="flex items-center mt-4">
//                 <input
//                   type="checkbox"
//                   name="hasTaxExemption"
//                   checked={newEmployee.hasTaxExemption}
//                   onChange={handleNewEmployeeChange}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-900">Has Tax Exemption</label>
//               </div>
//               <div className="flex items-center mt-4">
//                 <input
//                   type="checkbox"
//                   name="isActive"
//                   checked={newEmployee.isActive}
//                   onChange={handleNewEmployeeChange}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 block text-sm text-gray-900">Active Employee</label>
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-3 pt-4">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
//             >
//               Create Employee
//             </button>
//             <button
//               type="button"
//               onClick={() => setIsCreateModalOpen(false)}
//               className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white text-sm font-medium rounded-lg shadow-sm transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen p-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
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
//                   <p><span className="font-medium">Status:</span> {selectedEmployee.isActive ? "Active" : "Inactive"}</p>
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
//       {isEditModalOpen && <EditEmployeeModal />}

//       {/* Create Modal */}
//       {isCreateModalOpen && <CreateEmployeeModal />}
//     </div>
//   );
// }










import React, { useEffect, useState, useCallback, useMemo } from "react";
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
    departmentID: null,
    employeeCategoriesID: null,
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
    // Convert number fields from backend to strings for input compatibility
    const employeeForEdit = {
      ...employee,
      departmentID: employee.departmentID ? employee.departmentID.toString() : "",
      employeeCategoriesID: employee.employeeCategoriesID ? employee.employeeCategoriesID.toString() : ""
    };
    setEditEmployee(employeeForEdit);
    setIsEditModalOpen(true);
  };

  const handleEditChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setEditEmployee(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleNewEmployeeChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const updateEmployee = async () => {
    try {
      // Convert string IDs back to numbers for the API
      const employeeToUpdate = {
        ...editEmployee,
        departmentID: editEmployee.departmentID ? parseInt(editEmployee.departmentID) : null,
        employeeCategoriesID: editEmployee.employeeCategoriesID ? parseInt(editEmployee.employeeCategoriesID) : null
      };
      
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/employe/${editEmployee.id}`,
        employeeToUpdate
      );
      setEmployees(prev => prev.map(emp => emp.id === editEmployee.id ? employeeToUpdate : emp));
      setIsEditModalOpen(false);
      showMessage("Employee updated successfully!", "success");
    } catch (err) {
      console.error("Error updating employee", err);
      if (err.response) {
        showMessage(`Update failed: ${JSON.stringify(err.response.data)}`, "error");
      } else {
        showMessage("Failed to update employee", "error");
      }
    }
  };

  const createEmployee = async (e) => {
    e.preventDefault();
    try {
      // Convert string IDs to numbers for the API
      const employeeToCreate = {
        ...newEmployee,
        departmentID: newEmployee.departmentID ? parseInt(newEmployee.departmentID) : null,
        employeeCategoriesID: newEmployee.employeeCategoriesID ? parseInt(newEmployee.employeeCategoriesID) : null
      };
      
      console.log("Sending employee data:", employeeToCreate);
      
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/employe`,
        employeeToCreate
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
        departmentID: null,
        employeeCategoriesID: null,
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
      if (err.response) {
        console.error("Response data:", err.response.data);
        showMessage(`Creation failed: ${JSON.stringify(err.response.data)}`, "error");
      } else {
        showMessage("Failed to create employee", "error");
      }
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

  // Memoized Edit Modal to prevent re-rendering issues
  const EditEmployeeModal = useMemo(() => {
    if (!isEditModalOpen) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
          <form className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
                 Personal Information
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
                 Employment Details
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
                 Salary Information
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
                 Bank & Tax Information
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name &</label>
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
  }, [isEditModalOpen, editEmployee, handleEditChange, updateEmployee]);

  // Memoized Create Modal to prevent re-rendering issues
  const CreateEmployeeModal = useMemo(() => {
    if (!isCreateModalOpen) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-screen overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
          <form onSubmit={createEmployee} className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2 flex items-center gap-2">
                 Personal Information
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
                 Employment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department ID</label>
                  <input
                    type="text"
                    name="departmentID"
                    value={newEmployee.departmentID || ""}
                    onChange={handleNewEmployeeChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee Category ID</label>
                  <input
                    type="text"
                    name="employeeCategoriesID"
                    value={newEmployee.employeeCategoriesID || ""}
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
                 Salary Information
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
                 Bank & Tax Information
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name & Account Holders Name</label>
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
  }, [isCreateModalOpen, newEmployee, handleNewEmployeeChange, createEmployee]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Employees</h1>
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
      {EditEmployeeModal}

      {/* Create Modal */}
      {CreateEmployeeModal}
    </div>
  );
}


