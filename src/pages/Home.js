// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import {
//   HiUsers,
//   HiCurrencyDollar,
//   HiOfficeBuilding,
//   HiCalendar,
//   HiPlus,
// } from 'react-icons/hi';

// export default function Home() {
//   const [stats, setStats] = useState({
//     employees: 0,
//     departments: 0,
//     pendingLeaves: 0,
//     payrollPending: 0,
//   });
//   const [recent, setRecent] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const baseUrl = process.env.REACT_APP_API_BASE_URL || '';

//   useEffect(() => {
//     let mounted = true;
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // adjust endpoints if your backend differs
//         const [empRes, deptRes] = await Promise.all([
//           axios.get(`${baseUrl}/api/employees`),
//           axios.get(`${baseUrl}/api/departments`),
//         ]);

//         const employees = empRes.data || [];
//         const departments = Array.isArray(deptRes.data) ? deptRes.data : [];

//         // example: derive pending counts locally (replace with API calls if available)
//         const pendingLeaves = employees.filter(e => e.hasPendingLeave).length || 0;
//         const payrollPending = employees.filter(e => !e.lastPayrollPaid).length || 0;

//         if (!mounted) return;
//         setStats({
//           employees: employees.length,
//           departments: departments.length,
//           pendingLeaves,
//           payrollPending,
//         });
//         setRecent((employees || []).slice(0, 6));
//       } catch (err) {
//         console.error('Dashboard fetch error', err);
//         if (!mounted) return;
//         // keep defaults if error
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     fetchData();
//     return () => { mounted = false; };
//   }, [baseUrl]);

//   return (
//     <div className="min-h-screen py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Hero */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back,</h1>
//             <p className="text-sm text-gray-500 mt-1">Overview of payroll, employees and recent activity.</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <Link
//               to="/employees/create"
//               className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm text-sm transition"
//             >
//               <HiPlus className="w-5 h-5" />
//               New Employee
//             </Link>
//             <Link
//               to="/generatesalary"
//               className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm text-sm hover:bg-gray-50 transition"
//             >
//               Generate Salary
//             </Link>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <div className="card flex items-center gap-4">
//             <div className="bg-indigo-50 text-indigo-600 rounded-lg p-3">
//               <HiUsers className="w-6 h-6" />
//             </div>
//             <div className="flex-1">
//               <div className="text-xs text-gray-500">Employees</div>
//               <div className="text-xl font-semibold text-gray-900">{loading ? '—' : stats.employees}</div>
//               <div className="text-xs text-muted mt-1">Active / total</div>
//             </div>
//           </div>

//           <div className="card flex items-center gap-4">
//             <div className="bg-green-50 text-green-600 rounded-lg p-3">
//               <HiOfficeBuilding className="w-6 h-6" />
//             </div>
//             <div className="flex-1">
//               <div className="text-xs text-gray-500">Departments</div>
//               <div className="text-xl font-semibold text-gray-900">{loading ? '—' : stats.departments}</div>
//               <div className="text-xs text-muted mt-1">Organizational units</div>
//             </div>
//           </div>

//           <div className="card flex items-center gap-4">
//             <div className="bg-yellow-50 text-yellow-600 rounded-lg p-3">
//               <HiCalendar className="w-6 h-6" />
//             </div>
//             <div className="flex-1">
//               <div className="text-xs text-gray-500">Pending Leaves</div>
//               <div className="text-xl font-semibold text-gray-900">{loading ? '—' : stats.pendingLeaves}</div>
//               <div className="text-xs text-muted mt-1">Awaiting approval</div>
//             </div>
//           </div>

//           <div className="card flex items-center gap-4">
//             <div className="bg-red-50 text-red-600 rounded-lg p-3">
//               <HiCurrencyDollar className="w-6 h-6" />
//             </div>
//             <div className="flex-1">
//               <div className="text-xs text-gray-500">Payroll Pending</div>
//               <div className="text-xl font-semibold text-gray-900">{loading ? '—' : stats.payrollPending}</div>
//               <div className="text-xs text-muted mt-1">Not processed</div>
//             </div>
//           </div>
//         </div>

//         {/* Main grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Recent employees / table */}
//           <section className="lg:col-span-2 card">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Recent employees</h2>
//               <Link to="/employees" className="text-sm text-indigo-600 hover:underline">View all</Link>
//             </div>

//             <div className="overflow-x-auto table-responsive">
//               <table className="table">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-2 text-left text-xs text-gray-500">Name</th>
//                     <th className="px-4 py-2 text-left text-xs text-gray-500">Email</th>
//                     <th className="px-4 py-2 text-left text-xs text-gray-500">Department</th>
//                     <th className="px-4 py-2 text-left text-xs text-gray-500">Joined</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr><td colSpan="4" className="p-6 text-center text-sm text-gray-500">Loading...</td></tr>
//                   ) : recent.length ? (
//                     recent.map(emp => (
//                       <tr key={emp.id} className="hover:bg-gray-50">
//                         <td className="px-4 py-3 text-sm font-medium text-gray-800">{emp.fullName || emp.name}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600 truncate">{emp.email}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600">{emp.departmentName || emp.department || '-'}</td>
//                         <td className="px-4 py-3 text-sm text-gray-600">{emp.joinedDate ? new Date(emp.joinedDate).toLocaleDateString() : '-'}</td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr><td colSpan="4" className="p-6 text-center text-sm text-gray-500">No recent employees</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </section>

//           {/* Activity / quick actions */}
//           <aside className="card">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick actions</h3>
//             <div className="flex flex-col gap-3">
//               <Link to="/employees/create" className="btn btn-primary">
//                 <HiPlus className="w-4 h-4" />
//                 Add employee
//               </Link>
//               <Link to="/generatesalary" className="btn btn-ghost">
//                 Generate salary
//               </Link>
//               <Link to="/leaves" className="btn btn-ghost">
//                 Review leaves
//               </Link>
//             </div>

//             <div className="mt-6">
//               <h4 className="text-sm font-semibold text-gray-700 mb-2">Recent activity</h4>
//               <ul className="space-y-3 text-sm text-gray-600">
//                 <li className="flex items-start gap-3">
//                   <span className="w-2.5 h-2.5 mt-2 rounded-full bg-indigo-600/60 inline-block" />
//                   <div>
//                     Payroll for September processed — <span className="text-gray-500">2h ago</span>
//                   </div>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="w-2.5 h-2.5 mt-2 rounded-full bg-green-600/60 inline-block" />
//                   <div>
//                     3 new employees added — <span className="text-gray-500">1d ago</span>
//                   </div>
//                 </li>
//                 <li className="flex items-start gap-3">
//                   <span className="w-2.5 h-2.5 mt-2 rounded-full bg-yellow-500/60 inline-block" />
//                   <div>
//                     Pending leave approvals — <span className="text-gray-500">3d ago</span>
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }











import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiUsers,
  HiCurrencyDollar,
  HiOfficeBuilding,
  HiCalendar,
  HiDocument,
  HiDatabase,
  HiFire,
  HiCash,
  HiGlobe,
  HiFlag,
  HiDuplicate,
  HiPlus,
  HiCalculator,
} from "react-icons/hi";
import axios from "axios";

export default function Home() {
  const [stats, setStats] = useState({
    employees: 0,
    departments: 0,
    leaves: 0,
    loans: 0,
    payrolls: 0,
    categories: 0,
    otSettings: 0,
    otUsage: 0,
    holidays: 0,
  });
  const [recentEmployees, setRecentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.REACT_APP_API_BASE_URL || "";

  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      setLoading(true);
      try {
        // Adjust endpoints as needed for your backend
        const [
          empRes,
          deptRes,
          leaveRes,
          loanRes,
          catRes,
          otRes,
          otUsageRes,
          holidayRes,
          payrollRes,
        ] = await Promise.all([
          axios.get(`${baseUrl}/api/employees`),
          axios.get(`${baseUrl}/api/departments`),
          axios.get(`${baseUrl}/api/leaves`),
          axios.get(`${baseUrl}/api/loan`),
          axios.get(`${baseUrl}/api/empcategories`),
          axios.get(`${baseUrl}/api/ot`),
          axios.get(`${baseUrl}/api/EmpOvertime`),
          axios.get(`${baseUrl}/api/specialHolidays`),
          axios.get(`${baseUrl}/api/calculations`),
        ]);
        if (!mounted) return;
        setStats({
          employees: empRes.data?.length || 0,
          departments: deptRes.data?.length || 0,
          leaves: leaveRes.data?.length || 0,
          loans: loanRes.data?.length || 0,
          categories: catRes.data?.length || 0,
          otSettings: otRes.data?.length || 0,
          otUsage: otUsageRes.data?.length || 0,
          holidays: holidayRes.data?.length || 0,
          payrolls: payrollRes.data?.length || 0,
        });
        setRecentEmployees(empRes.data?.slice(0, 5) || []);
      } catch (err) {
        // fallback to zeroes
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchStats();
    return () => {
      mounted = false;
    };
  }, [baseUrl]);

  // Card data for quick navigation
  const quickLinks = [
    {
      to: "/employees",
      label: "Employees",
      icon: <HiUsers className="w-6 h-6" />,
      stat: stats.employees,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      to: "/departments",
      label: "Departments",
      icon: <HiOfficeBuilding className="w-6 h-6" />,
      stat: stats.departments,
      color: "bg-green-50 text-green-600",
    },
    {
      to: "/leaves",
      label: "Leaves",
      icon: <HiCalendar className="w-6 h-6" />,
      stat: stats.leaves,
      color: "bg-yellow-50 text-yellow-600",
    },
    {
      to: "/loan",
      label: "Loans",
      icon: <HiCash className="w-6 h-6" />,
      stat: stats.loans,
      color: "bg-red-50 text-red-600",
    },
    {
      to: "/salaryreports",
      label: "Salary Reports",
      icon: <HiDocument className="w-6 h-6" />,
      stat: stats.payrolls,
      color: "bg-blue-50 text-blue-600",
    },
    {
      to: "/generatesalary",
      label: "Generate Salary",
      icon: <HiDatabase className="w-6 h-6" />,
      stat: null,
      color: "bg-purple-50 text-purple-600",
    },
    {
      to: "/OTusage",
      label: "OT Usage",
      icon: <HiCalculator className="w-6 h-6" />,
      stat: stats.otUsage,
      color: "bg-pink-50 text-pink-600",
    },
    {
      to: "/specialHolidays",
      label: "Special Holidays",
      icon: <HiCalendar className="w-6 h-6" />,
      stat: stats.holidays,
      color: "bg-orange-50 text-orange-600",
    },
    {
      to: "/empcategories",
      label: "Employee Categories",
      icon: <HiDuplicate className="w-6 h-6" />,
      stat: stats.categories,
      color: "bg-teal-50 text-teal-600",
    },
    {
      to: "/OT",
      label: "OT Settings",
      icon: <HiFlag className="w-6 h-6" />,
      stat: stats.otSettings,
      color: "bg-gray-100 text-gray-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Payroll Dashboard</h1>
            <p className="text-gray-500">All your payroll and HR essentials at a glance.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/employees"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow text-sm font-medium hover:bg-gray-100 transition no-underline"
              style={{ textDecoration: "none" }}
            >
              <HiPlus className="w-5 h-5" />
              Add Employee
            </Link>
            <Link
              to="/generatesalary"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow text-sm font-medium hover:bg-gray-100 transition no-underline"
              style={{ textDecoration: "none" }}
            >
              <HiDatabase className="w-5 h-5" />
              Generate Salary
            </Link>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {quickLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl shadow-sm bg-white hover:bg-indigo-50 transition group border border-gray-100 no-underline`}
              style={{ textDecoration: "none" }}
            >
              <span className={`rounded-full p-2 ${link.color} mb-1 group-hover:scale-110 transition`}>
                {link.icon}
              </span>
              <span className="font-semibold text-gray-800 group-hover:text-indigo-700 text-sm">{link.label}</span>
              {/* Only show stat if not loading and stat is not 0 and not null */}
              {link.stat !== null && !loading && link.stat > 0 && (
                <span className="text-xs text-gray-500">{link.stat}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}