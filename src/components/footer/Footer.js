import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className="bg-dark text-white text-center py-3 border-top">
        <small>&copy; {new Date().getFullYear()} Arithmos. All rights reserved.</small>
      </footer>
    </div>
  )
}
