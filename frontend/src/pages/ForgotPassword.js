import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await axios.post('http://https://mern-auth-system-k2ci.onrender.com/api/auth/forgot-password', { email });
      setMessage(res.data.message);
      setTimeout(() => navigate('/reset-password', { state: { email } }), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:'100vh', background:'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'}} className="flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div style={{background:'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'}} className="p-8 text-center">
          <div className="text-5xl mb-3">🔑</div>
          <h2 className="text-3xl font-bold text-white">Forgot Password?</h2>
          <p className="text-yellow-100 mt-1">No worries, we'll send you an OTP</p>
        </div>
        <div className="p-8">
          {message && <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-4">✅ {message}</div>}
          {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4">⚠️ {error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">📧 Email Address</label>
              <input type="email" placeholder="you@example.com"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-pink-500 transition"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit"
              style={{background:'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'}}
              className="w-full text-white p-3 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg"
              disabled={loading}>
              {loading ? '⏳ Sending OTP...' : '📨 Send OTP'}
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Remember password?{' '}
            <Link to="/" className="text-pink-600 font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;