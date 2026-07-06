import { React, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match, please try again.');
      return;
    }

    const response = await fetch(`https://localhost:7215/api/Authentication/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Handle error
      alert('Registration failed');
      return;
    } else {
      alert('Registration successful, please log in to continue.');
      navigate('/login');
      window.location.reload();
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[85%] max-w-xs px-8 py-6 bg-white rounded-lg shadow-lg md:max-w-md lg:max-w-xl">
        <h2 className="text-lg font-bold text-center text-black md:text-xl lg:text-2xl">Register</h2>
        <form className="space-y-2 md:space-y-3 lg:space-y-4" onSubmit={handleRegister}>
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
          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-black md:text-base lg:text-lg">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 mt-2 border rounded-md md:px-4 md:py-3 lg:px-5 lg:py-4"
              placeholder="Re-enter your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-3 py-2 text-white bg-ap-beige rounded-md hover:bg-ap-brown md:px-4 md:py-3 lg:px-5 lg:py-4"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
