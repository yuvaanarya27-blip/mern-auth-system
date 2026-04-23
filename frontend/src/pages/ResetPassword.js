import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [formData, setFormData] = useState({ otp: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', { email, ...formData });
      setMessage(res.data.message);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:'100vh', background:'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}} className="flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div style={{background:'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}} className="p-8 text-center">
          <div className="text-5xl mb-3">🔓</div>
          <h2 className="text-3xl font-bold text-white">Reset Password</h2>
          <p className="text-green-100 mt-1">OTP sent to: <b>{email}</b></p>
        </div>
        <div className="p-8">
          {message && <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-4">✅ {message}</div>}
          {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4">⚠️ {error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">🔢 Enter OTP</label>
              <input type="text" placeholder="• • • • • •"
                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-green-500 transition text-center text-3xl tracking-widest font-bold"
                maxLength={6} onChange={(e) => setFormData({ ...formData, otp: e.target.value })} required />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">🔒 New Password</label>
              <input type="password" placeholder="Enter new password"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-green-500 transition"
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })} required />
            </div>
            <button type="submit"
              style={{background:'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}
              className="w-full text-white p-3 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg"
              disabled={loading}>
              {loading ? '⏳ Resetting...' : '🔐 Reset Password'}
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            <Link to="/" className="text-green-600 font-bold hover:underline">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;