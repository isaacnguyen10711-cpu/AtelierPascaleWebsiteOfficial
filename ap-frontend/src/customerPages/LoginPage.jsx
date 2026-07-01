import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const response = await fetch(`https://localhost:7215/api/Authentication/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Handle error
      alert('Invalid email or password');
      return;
    }
    else {
      alert('Login successful');
    }

    const data = await response.json();
    localStorage.setItem('token', data.accessToken);
    navigate('/');
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="min-w-xs px-8 py-6 bg-white rounded-lg shadow-lg md:min-w-md lg:min-w-xl">
        <h2 className="text-lg font-bold text-center text-black md:text-xl lg:text-2xl">Login</h2>
        <form className="space-y-2 md:space-y-3 lg:space-y-4" onSubmit={handleLogin}>
          <div className="space-y-4">
            <label htmlFor="email" className="text-sm font-medium text-black md:text-base lg:text-lg">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 mt-2 border rounded-md md:px-4 md:py-3 lg:px-5 lg:py-4"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-black md:text-base lg:text-lg">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 mt-2 border rounded-md md:px-4 md:py-3 lg:px-5 lg:py-4"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:justify-between">
          <Link to="/forgot-password" className="text-xs text-blue-900 hover:underline md:text-sm lg:text-base">Forgot Password?</Link>
            <Link to="/register" className="text-xs text-blue-900 hover:underline md:text-sm lg:text-base">Don't have an account? Register</Link>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-white bg-ap-beige rounded-md hover:bg-ap-brown md:px-4 md:py-3 lg:px-5 lg:py-4"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
