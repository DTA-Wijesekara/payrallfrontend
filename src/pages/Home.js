import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  HiUsers,
  HiCurrencyDollar,
  HiOfficeBuilding,
  HiCalendar,
  HiPlus,
} from 'react-icons/hi';

export default function Home() {
  const [stats, setStats] = useState({
    employees: 0,
    departments: 0,
    pendingLeaves: 0,
    payrollPending: 0,
  });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.REACT_APP_API_BASE_URL || '';

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        // adjust endpoints if your backend differs
        const [empRes, deptRes] = await Promise.all([
          axios.get(`${baseUrl}/api/employees`),
          axios.get(`${baseUrl}/api/departments`),
        ]);

        const employees = empRes.data || [];
        const departments = Array.isArray(deptRes.data) ? deptRes.data : [];

        // example: derive pending counts locally (replace with API calls if available)
        const pendingLeaves = employees.filter(e => e.hasPendingLeave).length || 0;
        const payrollPending = employees.filter(e => !e.lastPayrollPaid).length || 0;

        if (!mounted) return;
        setStats({
          employees: employees.length,
          departments: departments.length,
          pendingLeaves,
          payrollPending,
        });
        setRecent((employees || []).slice(0, 6));
      } catch (err) {
        console.error('Dashboard fetch error', err);
        if (!mounted) return;
        // keep defaults if error
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false; };
  }, [baseUrl]);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back,</h1>
            <p className="text-sm text-gray-500 mt-1">Overview of payroll, employees and recent activity.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/employees/create"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm text-sm transition"
            >
              <HiPlus className="w-5 h-5" />
              New Employee
            </Link>
            <Link
              to="/generatesalary"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm text-sm hover:bg-gray-50 transition"
            >
              Generate Salary
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="card flex items-center gap-4">
            <div className="bg-indigo-50 text-indigo-600 rounded-lg p-3">
              <HiUsers className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500">Employees</div>
              <div className="text-xl font-semibold text-gray-900">{loading ? '—' : stats.employees}</div>
              <div className="text-xs text-muted mt-1">Active / total</div>
            </div>
          </div>

          <div className="card flex items-center gap-4">
            <div className="bg-green-50 text-green-600 rounded-lg p-3">
              <HiOfficeBuilding className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500">Departments</div>
              <div className="text-xl font-semibold text-gray-900">{loading ? '—' : stats.departments}</div>
              <div className="text-xs text-muted mt-1">Organizational units</div>
            </div>
          </div>

          <div className="card flex items-center gap-4">
            <div className="bg-yellow-50 text-yellow-600 rounded-lg p-3">
              <HiCalendar className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500">Pending Leaves</div>
              <div className="text-xl font-semibold text-gray-900">{loading ? '—' : stats.pendingLeaves}</div>
              <div className="text-xs text-muted mt-1">Awaiting approval</div>
            </div>
          </div>

          <div className="card flex items-center gap-4">
            <div className="bg-red-50 text-red-600 rounded-lg p-3">
              <HiCurrencyDollar className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-500">Payroll Pending</div>
              <div className="text-xl font-semibold text-gray-900">{loading ? '—' : stats.payrollPending}</div>
              <div className="text-xs text-muted mt-1">Not processed</div>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent employees / table */}
          <section className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent employees</h2>
              <Link to="/employees" className="text-sm text-indigo-600 hover:underline">View all</Link>
            </div>

            <div className="overflow-x-auto table-responsive">
              <table className="table">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs text-gray-500">Name</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-500">Email</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-500">Department</th>
                    <th className="px-4 py-2 text-left text-xs text-gray-500">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="4" className="p-6 text-center text-sm text-gray-500">Loading...</td></tr>
                  ) : recent.length ? (
                    recent.map(emp => (
                      <tr key={emp.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-800">{emp.fullName || emp.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 truncate">{emp.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{emp.departmentName || emp.department || '-'}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{emp.joinedDate ? new Date(emp.joinedDate).toLocaleDateString() : '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" className="p-6 text-center text-sm text-gray-500">No recent employees</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Activity / quick actions */}
          <aside className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick actions</h3>
            <div className="flex flex-col gap-3">
              <Link to="/employees/create" className="btn btn-primary">
                <HiPlus className="w-4 h-4" />
                Add employee
              </Link>
              <Link to="/generatesalary" className="btn btn-ghost">
                Generate salary
              </Link>
              <Link to="/leaves" className="btn btn-ghost">
                Review leaves
              </Link>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent activity</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 mt-2 rounded-full bg-indigo-600/60 inline-block" />
                  <div>
                    Payroll for September processed — <span className="text-gray-500">2h ago</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 mt-2 rounded-full bg-green-600/60 inline-block" />
                  <div>
                    3 new employees added — <span className="text-gray-500">1d ago</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 mt-2 rounded-full bg-yellow-500/60 inline-block" />
                  <div>
                    Pending leave approvals — <span className="text-gray-500">3d ago</span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
