import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3 sticky-top">
      <Link className="navbar-brand" to="/dashboard">
        MyApp
      </Link>
    </nav>
  );
}