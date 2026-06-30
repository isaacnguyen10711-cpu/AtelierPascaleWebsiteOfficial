import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="min-w-xs px-8 py-6 bg-white rounded shadow-md md:min-w-md lg:min-w-xl">
        <h2 className="text-lg font-bold text-center text-black md:text-xl lg:text-2xl">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-black md:text-base lg:text-lg">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 mt-2 border rounded-md md:px-4 md:py-3 lg:px-5 lg:py-4"
              placeholder="Enter your email"
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
