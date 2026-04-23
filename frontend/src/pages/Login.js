import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:'100vh', background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}} className="flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div style={{background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}} className="p-8 text-center">
          <div className="text-5xl mb-3">🔐</div>
          <h2 className="text-3xl font-bold text-white">Welcome Back!</h2>
          <p className="text-purple-200 mt-1">Sign in to your account</p>
        </div>
        <div className="p-8">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
              ⚠️ {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">📧 Email Address</label>
              <input type="email" name="email" placeholder="you@example.com"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
                onChange={handleChange} required />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">🔒 Password</label>
              <input type="password" name="password" placeholder="Enter your password"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
                onChange={handleChange} required />
            </div>
            <button type="submit"
              style={{background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}
              className="w-full text-white p-3 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg"
              disabled={loading}>
              {loading ? '⏳ Signing in...' : '🚀 Login'}
            </button>
          </form>
          <p className="text-center mt-4">
            <Link to="/forgot-password" className="text-purple-600 hover:underline font-semibold">Forgot Password?</Link>
          </p>
          <p className="text-center mt-2 text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-600 font-bold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;