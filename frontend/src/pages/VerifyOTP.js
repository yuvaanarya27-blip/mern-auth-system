import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await axios.post('http://https://mern-auth-system-k2ci.onrender.com/api/auth/verify-otp', { email, otp });
      setMessage(res.data.message);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:'100vh', background:'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}} className="flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div style={{background:'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}} className="p-8 text-center">
          <div className="text-5xl mb-3">📧</div>
          <h2 className="text-3xl font-bold text-white">Verify Email</h2>
          <p className="text-blue-100 mt-1">OTP sent to: <b>{email}</b></p>
        </div>
        <div className="p-8">
          {message && <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-4">✅ {message}</div>}
          {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4">⚠️ {error}</div>}
          <p className="text-gray-500 text-center mb-6">Please enter the 6-digit OTP sent to your email inbox</p>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="• • • • • •"
              className="w-full border-2 border-gray-200 p-4 rounded-xl focus:outline-none focus:border-blue-500 transition text-center text-3xl tracking-widest font-bold mb-6"
              value={otp} onChange={(e) => setOtp(e.target.value)}
              maxLength={6} required />
            <button type="submit"
              style={{background:'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}
              className="w-full text-white p-3 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg"
              disabled={loading}>
              {loading ? '⏳ Verifying...' : '✅ Verify OTP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;