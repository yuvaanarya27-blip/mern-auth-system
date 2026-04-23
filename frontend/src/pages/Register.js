import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '',
    mobile: '', gender: '', state: '', pincode: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(res.data.message);
      setTimeout(() => navigate('/verify-otp', { state: { email: formData.email } }), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div style={{minHeight:'100vh', background:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}} className="flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div style={{background:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}} className="p-8 text-center">
          <div className="text-5xl mb-3">✨</div>
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-pink-100 mt-1">Join us today for free</p>
        </div>
        <div className="p-8">
          {message && <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-4">✅ {message}</div>}
          {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4">⚠️ {error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">👤 Full Name</label>
                <input type="text" name="name" placeholder="John Doe"
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-pink-500 transition"
                  onChange={handleChange} required />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">📧 Email</label>
                <input type="email" name="email" placeholder="you@example.com"
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-pink-500 transition"
                  onChange={handleChange} required />
              </div>
              <div className="col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">🔒 Password</label>
                <input type="password" name="password" placeholder="Min 6 characters"
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-pink-500 transition"
                  onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">📱 Mobile</label>
                <input type="text" name="mobile" placeholder="9876543210"
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-pink-500 transition"
                  onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">👫 Gender</label>
                <select name="gender"
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-pink-500 transition"
                  onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">🏙️ State</label>
                <input type="text" name="state" placeholder="Delhi"
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-pink-500 transition"
                  onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">📮 Pincode</label>
                <input type="text" name="pincode" placeholder="110001"
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:outline-none focus:border-pink-500 transition"
                  onChange={handleChange} required />
              </div>
            </div>
            <button type="submit"
              style={{background:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}
              className="w-full text-white p-3 rounded-xl font-bold text-lg hover:opacity-90 transition shadow-lg mt-2"
              disabled={loading}>
              {loading ? '⏳ Creating Account...' : '🎉 Register Now'}
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{' '}
            <Link to="/" className="text-pink-600 font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;