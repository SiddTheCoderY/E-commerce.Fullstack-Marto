import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authThunks';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  console.log("user at header",user)
  console.log("uer is authenticared ? ",isAuthenticated)

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); // redirect to home after logout
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-purple-700">
        Your E-Commerce
      </Link>

      <nav>
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.fullName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-purple-700 hover:underline font-semibold"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-purple-700 hover:underline font-semibold"
            >
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
