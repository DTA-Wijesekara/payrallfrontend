import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== confirm) {
      return setError('Passwords do not match');
    }
    try {
      await axios.post('/api/auth/reset-password', { token, password });
      setDone(true);
    } catch {
      setError('Invalid or expired link');
    }
  };

  return (
    <div className="container d-flex vh-100 align-items-center justify-content-center">
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: '100%' }}>
        {done ? (
          <>
            <h4 className="text-center">Password reset!</h4>
            <Link to="/login" className="btn btn-success w-100 mt-3">Return to Login</Link>
          </>
        ) : (
          <>
            <h4 className="text-center mb-3">Set New Password</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-control" value={confirm} onChange={e => setConfirm(e.target.value)} required />
              </div>
              <button className="btn btn-primary w-100">Reset Password</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}