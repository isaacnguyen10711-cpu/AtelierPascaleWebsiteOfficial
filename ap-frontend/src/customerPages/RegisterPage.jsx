import { React, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import PopUpDialog from '../components/PopUpDialog';

const API_URL = import.meta.env.VITE_API_URL

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpTitle, setPopUpTitle] = useState('');
  const [popUpMessage, setPopUpMessage] = useState('');
  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setPopUpTitle('Error');
      setPopUpMessage('Passwords do not match, please try again.');
      setIsPopUpOpen(true);
      return;
    }

    const response = await fetch(`${API_URL}/api/Authentication/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Handle error
      setPopUpTitle('Error');
      setPopUpMessage('Registration failed');
      setIsPopUpOpen(true);
      return;
    } else {
      navigate('/login');
      window.location.reload();
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ap-tan px-6 py-28 text-ap-brown md:px-12 lg:px-20">
      <PopUpDialog isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} title={popUpTitle} message={popUpMessage} />
      <section className="w-full max-w-sm rounded border border-ap-brown bg-ap-pale p-5 transition duration-300 hover:shadow-lg md:max-w-md md:p-7 lg:max-w-lg lg:p-8">
        <h1 className="text-center font-medium text-4xl font-bold md:text-5xl lg:text-6xl">
          Register
        </h1>
        <p className="mt-5 text-center text-xs uppercase tracking-widest md:text-sm lg:text-sm">
          Create your Atelier Pascale account
        </p>

        <form className="mt-5 space-y-3 md:mt-7 md:space-y-4 lg:mt-8 lg:space-y-5" onSubmit={handleRegister}>
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
          <div>
            <label htmlFor="confirmPassword" className="text-xs font-medium uppercase tracking-widest md:text-sm lg:text-sm">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-2 w-full rounded border border-ap-brown bg-white px-3 py-2 text-xs outline-none transition duration-200 focus:border-ap-beige focus:shadow-md md:px-4 md:py-3 md:text-sm lg:px-4 lg:py-3 lg:text-base"
              placeholder="Re-enter your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded bg-ap-brown px-4 py-3 text-xs uppercase tracking-widest text-ap-tan hover:cursor-pointer transition duration-200 hover:-translate-y-1 hover:bg-ap-beige hover:text-white active:translate-y-0 md:text-xs lg:px-5 lg:py-3 lg:text-sm"
            >
              Register
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;
