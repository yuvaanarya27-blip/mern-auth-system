import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div style={{minHeight:'100vh', background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}} className="p-4">
      
      {/* Navbar */}
      <div className="bg-white rounded-2xl shadow-lg p-4 flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div style={{background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-gray-800">Hello, {user.name}! 👋</p>
            <p className="text-gray-500 text-sm">Welcome to your dashboard</p>
          </div>
        </div>
        <button onClick={handleLogout}
          style={{background:'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}
          className="text-white px-5 py-2 rounded-xl font-bold hover:opacity-90 transition shadow-md">
          🚪 Logout
        </button>
      </div>

      {/* Profile Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* Profile Header */}
          <div style={{background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}} className="p-8 text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span style={{background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent'}} className="text-4xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-purple-200">{user.email}</p>
            <span className="bg-green-400 text-white text-xs px-3 py-1 rounded-full mt-2 inline-block">
              ✅ Verified Account
            </span>
          </div>

          {/* Profile Details */}
          <div className="p-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">📋 Profile Information</h3>
            <div className="grid grid-cols-2 gap-4">
              
              <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
                <p className="text-purple-500 text-xs font-semibold uppercase">👤 Full Name</p>
                <p className="font-bold text-gray-800 mt-1">{user.name}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                <p className="text-blue-500 text-xs font-semibold uppercase">📧 Email</p>
                <p className="font-bold text-gray-800 mt-1 text-sm">{user.email}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
                <p className="text-green-500 text-xs font-semibold uppercase">📱 Mobile</p>
                <p className="font-bold text-gray-800 mt-1">{user.mobile}</p>
              </div>

              <div className="bg-pink-50 p-4 rounded-xl border-l-4 border-pink-500">
                <p className="text-pink-500 text-xs font-semibold uppercase">👫 Gender</p>
                <p className="font-bold text-gray-800 mt-1">{user.gender}</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500">
                <p className="text-yellow-500 text-xs font-semibold uppercase">🏙️ State</p>
                <p className="font-bold text-gray-800 mt-1">{user.state}</p>
              </div>

              <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
                <p className="text-red-500 text-xs font-semibold uppercase">📮 Pin Code</p>
                <p className="font-bold text-gray-800 mt-1">{user.pincode}</p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-xl border-l-4 border-indigo-500 col-span-2">
                <p className="text-indigo-500 text-xs font-semibold uppercase">📅 Member Since</p>
                <p className="font-bold text-gray-800 mt-1">
                  {new Date(user.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;