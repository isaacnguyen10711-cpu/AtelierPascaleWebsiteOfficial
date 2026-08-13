import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PopUpDialog from '../components/PopUpDialog';

const API_URL = import.meta.env.VITE_API_URL

function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState('');
  const [popUpMessage, setPopUpMessage] = useState('');
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const response = await fetch(`${API_URL}/api/Authentication/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Handle error
      setPopUpTitle('Error');
      setPopUpMessage('Invalid email or password');
      setIsPopUpOpen(true);
      return;
    }

    navigate('/');
    window.location.reload();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ap-tan px-6 py-28 text-ap-brown md:px-12 lg:px-20">
      <PopUpDialog isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} title={popUpTitle} message={popUpMessage} />
      <section className="w-full max-w-sm rounded border border-ap-brown bg-ap-pale p-5 transition duration-300 hover:shadow-lg md:max-w-md md:p-7 lg:max-w-lg lg:p-8">
        <h1 className="text-center text-4xl font-medium md:text-5xl lg:text-6xl">
          Login
        </h1>
        <p className="mt-5 text-center text-xs uppercase tracking-widest md:text-sm lg:text-sm">
          Access your Atelier Pascale account
        </p>

        <form className="mt-5 space-y-3 md:mt-7 md:space-y-4 lg:mt-8 lg:space-y-5" onSubmit={handleLogin}>
          <div className="space-y-4">
            <label htmlFor="email" className="text-xs font-medium uppercase tracking-widest md:text-sm lg:text-sm">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 w-full rounded border border-ap-brown bg-white px-3 py-2 text-xs outline-none transition duration-200 focus:border-ap-beige focus:shadow-md md:px-4 md:py-3 md:text-sm lg:px-4 lg:py-3 lg:text-base"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xs font-medium uppercase tracking-widest md:text-sm lg:text-sm">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-2 w-full rounded border border-ap-brown bg-white px-3 py-2 text-xs outline-none transition duration-200 focus:border-ap-beige focus:shadow-md md:px-4 md:py-3 md:text-sm lg:px-4 lg:py-3 lg:text-base"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Link to="/register" className="text-xs uppercase tracking-widest transition duration-200 hover:text-ap-beige md:text-xs lg:text-sm">Create Account</Link>
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded bg-ap-brown px-4 py-3 text-xs uppercase tracking-widest text-ap-tan transition duration-200 hover:-translate-y-1 hover:bg-ap-beige hover:text-white hover:cursor-pointer active:translate-y-0 md:text-xs lg:px-5 lg:py-3 lg:text-sm"
            >
              Login
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;




