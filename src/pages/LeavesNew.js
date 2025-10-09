import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LeavesNew() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [leaveSummary, setLeaveSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Form states
  const [leaveForm, setLeaveForm] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
    isHalfDay: false,
    isFirstHalfDay: null,
    leaveType: 'Casual',
    reason: ''
  });
  
  const [noPayForm, setNoPayForm] = useState({
    employeeId: '',
    noPayDate: '',
    reason: ''
  });

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch leave summary when employee or year changes
  useEffect(() => {
    if (selectedEmployee) {
      fetchLeaveSummary(selectedEmployee, selectedYear);
    }
  }, [selectedEmployee, selectedYear]);

  const fetchEmployees = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employe/employeeshaveleaves`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setMessage('Error loading employees');
    }
  };

  const fetchLeaveSummary = async (employeeId, year) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/leaves2/employee/${employeeId}/summary/${year}`);
      setLeaveSummary(response.data.data);
    } catch (error) {
      console.error('Error fetching leave summary:', error);
      setMessage('Error loading leave summary');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLeave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/leaves2/create-leave`, {
        ...leaveForm,
        employeeId: parseInt(leaveForm.employeeId)
      });
      
      if (response.data.success) {
        setMessage('Leave created successfully!');
        setLeaveForm({
          employeeId: '',
          startDate: '',
          endDate: '',
          isHalfDay: false,
          isFirstHalfDay: null,
          leaveType: 'Casual',
          reason: ''
        });
        // Refresh the summary
        if (selectedEmployee) {
          fetchLeaveSummary(selectedEmployee, selectedYear);
        }
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error creating leave:', error);
      setMessage('Error creating leave');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNoPay = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/leaves2/create-nopay`, {
        ...noPayForm,
        employeeId: parseInt(noPayForm.employeeId)
      });
      
      if (response.data.success) {
        setMessage('No-pay day created successfully!');
        setNoPayForm({
          employeeId: '',
          noPayDate: '',
          reason: ''
        });
        // Refresh the summary
        if (selectedEmployee) {
          fetchLeaveSummary(selectedEmployee, selectedYear);
        }
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error creating no-pay day:', error);
      setMessage('Error creating no-pay day');
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLeaveForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNoPayFormChange = (e) => {
    const { name, value } = e.target;
    setNoPayForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateNumberOfDays = () => {
    if (!leaveForm.startDate || !leaveForm.endDate) return 0;
    
    const start = new Date(leaveForm.startDate);
    const end = new Date(leaveForm.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    return leaveForm.isHalfDay ? 0.5 : diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Leave Management</h1>
        <p className="text-gray-600">Manage employee leaves, balances, and no-pay days</p>
      </div>

      {/* Alert Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.includes('Error') 
            ? 'bg-red-50 border border-red-200 text-red-700' 
            : 'bg-green-50 border border-green-200 text-green-700'
        }`}>
          {message}
        </div>
      )}

      {/* Employee Selection Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Employee Selection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Employee
            </label>
            <select 
              value={selectedEmployee} 
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose an employee</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.employeeNumber} - {emp.fullName}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {Array.from({length: 5}, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'create'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Create Leave
            </button>
            <button
              onClick={() => setActiveTab('nopay')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'nopay'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              No-Pay Days
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Leave History
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && leaveSummary && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Leave Balance - {leaveSummary.employeeName}
              </h3>
              
              {/* Balance Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {leaveSummary.leaveBalances.map(balance => (
                  <div key={balance.leaveType} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{balance.leaveType} Leaves</h4>
                        <p className="text-sm text-gray-600">Remaining balance</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{balance.balanceDays}</div>
                        <div className="text-sm text-gray-500">of {balance.entitledDays}</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Used</span>
                        <span>{balance.usedDays} days</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ 
                            width: `${(balance.usedDays / balance.entitledDays) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Half Days Card */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">Half Days</h4>
                      <p className="text-sm text-gray-600">Total this year</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{leaveSummary.totalHalfDays}</div>
                      <div className="text-sm text-gray-500">days</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-800">{leaveSummary.leaves.length}</div>
                  <div className="text-sm text-gray-600">Total Leaves</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {leaveSummary.leaves.filter(l => l.status === 'Approved').length}
                  </div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {leaveSummary.leaves.filter(l => l.status === 'Pending').length}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-800">{leaveSummary.noPayDays.length}</div>
                  <div className="text-sm text-gray-600">No-Pay Days</div>
                </div>
              </div>
            </div>
          )}

          {/* Create Leave Tab */}
          {activeTab === 'create' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Create New Leave</h3>
              <form onSubmit={handleCreateLeave} className="max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee
                    </label>
                    <select 
                      name="employeeId"
                      value={leaveForm.employeeId}
                      onChange={handleLeaveFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select employee</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.employeeNumber} - {emp.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Leave Type
                    </label>
                    <select 
                      name="leaveType"
                      value={leaveForm.leaveType}
                      onChange={handleLeaveFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="Casual">Casual Leave</option>
                      <option value="Annual">Annual Leave</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={leaveForm.startDate}
                      onChange={handleLeaveFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={leaveForm.endDate}
                      onChange={handleLeaveFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isHalfDay"
                        checked={leaveForm.isHalfDay}
                        onChange={handleLeaveFormChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Half Day</span>
                    </label>
                  </div>

                  {leaveForm.isHalfDay && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Half Day Type
                      </label>
                      <select 
                        name="isFirstHalfDay"
                        value={leaveForm.isFirstHalfDay || ''}
                        onChange={handleLeaveFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select half day</option>
                        <option value="true">First Half</option>
                        <option value="false">Second Half</option>
                      </select>
                    </div>
                  )}
                </div>

                {!leaveForm.isHalfDay && leaveForm.startDate && leaveForm.endDate && (
                  <div className="mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <span className="text-sm font-medium text-blue-800">
                        Number of Days: {calculateNumberOfDays()}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason
                  </label>
                  <textarea
                    name="reason"
                    value={leaveForm.reason}
                    onChange={handleLeaveFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Enter reason for leave"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Leave'}
                </button>
              </form>
            </div>
          )}

          {/* No-Pay Tab */}
          {activeTab === 'nopay' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Create No-Pay Day</h3>
              <form onSubmit={handleCreateNoPay} className="max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee
                    </label>
                    <select 
                      name="employeeId"
                      value={noPayForm.employeeId}
                      onChange={handleNoPayFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select employee</option>
                      {employees.map(emp => (
                        <option key={emp.id} value={emp.id}>
                          {emp.employeeNumber} - {emp.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      No-Pay Date
                    </label>
                    <input
                      type="date"
                      name="noPayDate"
                      value={noPayForm.noPayDate}
                      onChange={handleNoPayFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason
                  </label>
                  <textarea
                    name="reason"
                    value={noPayForm.reason}
                    onChange={handleNoPayFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="3"
                    placeholder="Enter reason for no-pay day"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create No-Pay Day'}
                </button>
              </form>

              {/* No-Pay Days List */}
              {leaveSummary && leaveSummary.noPayDays.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">No-Pay Days History</h4>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reason
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {leaveSummary.noPayDays.map(noPay => (
                          <tr key={noPay.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(noPay.noPayDate).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {noPay.reason}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && leaveSummary && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Leave History - {selectedYear}</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        End Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Days
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Half Day
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reason
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {leaveSummary.leaves.map(leave => (
                      <tr key={leave.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(leave.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(leave.endDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {leave.leaveType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {leave.numberOfDays}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {leave.isHalfDay ? (leave.isFirstHalfDay ? 'First Half' : 'Second Half') : 'No'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {leave.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            leave.status === 'Approved' 
                              ? 'bg-green-100 text-green-800'
                              : leave.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {leave.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {leaveSummary.leaves.length === 0 && (
                      <tr>
                        <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                          No leaves found for this year
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}