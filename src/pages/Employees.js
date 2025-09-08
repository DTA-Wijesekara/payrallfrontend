import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/api/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees', err);
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await axios.delete(`/api/employees/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error('Error deleting employee', err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Employees</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your team — view, edit or remove employees.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition"
            >
              <FaPlus />
              Create New
            </button>
          </div>
        </div>

        {/* Table for medium+ screens */}
        <div className="hidden sm:block bg-white shadow rounded-lg overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{emp.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{emp.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 truncate max-w-xs">{emp.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{emp.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                        <div className="inline-flex items-center gap-2">
                          <button
                            aria-label={`edit-${emp.id}`}
                            className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50 transition"
                          >
                            <FaEdit />
                          </button>
                          <button
                            aria-label={`delete-${emp.id}`}
                            onClick={() => deleteEmployee(emp.id)}
                            className="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">No employees found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Card list for small screens */}
        <div className="sm:hidden space-y-4">
          {employees.length > 0 ? (
            employees.map((emp) => (
              <div key={emp.id} className="bg-white shadow-sm rounded-lg p-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                    {String(emp.name || 'U').slice(0, 1).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">{emp.name}</div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">{emp.email}</div>
                    <div className="text-xs text-gray-500 mt-1">{emp.position}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    aria-label={`edit-${emp.id}`}
                    className="p-2 rounded-md text-indigo-600 hover:bg-indigo-50 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    aria-label={`delete-${emp.id}`}
                    onClick={() => deleteEmployee(emp.id)}
                    className="p-2 rounded-md text-red-600 hover:bg-red-50 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white shadow-sm rounded-lg p-6 text-center text-gray-500">No employees found</div>
          )}
        </div>
      </div>
    </div>
  );
}
