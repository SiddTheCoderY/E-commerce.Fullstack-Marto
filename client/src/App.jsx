import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getCurrentUser } from './features/user/userThunks';
import { useDispatch, useSelector } from 'react-redux';

import LoaderModal from './components/LoaderModal';
import Login from './pages/Login';
import Register from './pages/Register';
import GoogleCallback from './pages/Oauth-pages/GoogleCallback';

import Dashboard from './pages/Dashboard';
import MessagePage from './pages/MessagePage';
import SettingLayout from './pages/Setting/SettingLayout';
import PrivateRoute from './routes/PrivateRoute';
import MainLayout from './layout/MainLayout';
import Home from './pages/Home'
import Store from './pages/Store';

function App() {
  const dispatch = useDispatch();
  const { isUserChecked } = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (!isUserChecked) return <LoaderModal />;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth/google/callback" element={<GoogleCallback />} />

        {/* all pages inside the main layout */}
        <Route  path="/" element={<MainLayout />} >
          <Route index element={<Home />} />
          {/* Protected App Routes */}
          <Route path="messages" element={<PrivateRoute><MessagePage /></PrivateRoute>} />
          <Route path="settings" element={<PrivateRoute><SettingLayout /></PrivateRoute>} />
          <Route path="stores" element={<PrivateRoute><Store /></PrivateRoute>} />

          {/* Add more pages as needed */}
        </Route>

        {/* <Route path='*' element={<ErrorPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
