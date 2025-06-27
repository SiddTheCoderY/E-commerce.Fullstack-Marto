import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, googleLogin } from '../features/auth/authThunks'; // ✅ googleLogin thunk
import { useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username: formData.email,
      email: formData.email,
      password: formData.password,
    };

    dispatch(loginUser(payload));
  };

  // ✅ Google Login setup
  const handleGoogleRedirectLogin = () => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent',
    });
  
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500/30 px-4">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full">
        {/* Left - Form */}
        <div className="flex-1 p-8 md:p-12">
          <button onClick={() => navigate('/')} className="flex cursor-pointer items-center text-gray-500 hover:text-indigo-600 mb-4">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>

          <h2 className="text-2xl font-bold text-black mb-2">Welcome back!</h2>
          <p className="text-gray-500 text-sm mb-6">Login to access all your data</p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {/* Email */}
            <div className="relative">
              <Mail className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
              <input
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                type="text"
                placeholder="Email address or username"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
              <input
                name='password'
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-xl cursor-pointer text-white ${
                loading ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800'
              } transition`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-400 text-sm">Continue with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social logins */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleRedirectLogin}
              className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center hover:bg-gray-50 transition cursor-pointer"
            >
              <img src="/goggle-png.png" alt="Google" className="w-5 h-5 mr-2" />
              Login with Google
            </button>
            <button className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center hover:bg-gray-50 transition cursor-pointer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="Facebook"
                className="w-5 h-5 mr-2"
              />
              Login with Facebook
            </button>
          </div>

          {/* Register */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <a href="/register" className="text-indigo-600 font-medium hover:underline">
              Register
            </a>
          </p>
        </div>

        {/* Right - Image */}
        <div className="flex-1 hidden md:block">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?semt=ais_hybrid&w=740"
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
