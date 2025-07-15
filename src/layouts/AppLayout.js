import React from 'react'
import Navbar from '../components/navigation/Navbar';
import Sidebar from '../components/navigation/Sidebar';
import Footer from '../components/footer/Footer';
import { Outlet } from 'react-router-dom';


export default function AppLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* ——— body row ——— */}
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main className="flex-grow-1 p-4 pt-5" >
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  )
}
