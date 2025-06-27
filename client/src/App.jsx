import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getCurrentUser } from './features/user/userThunks';
import { useDispatch,useSelector } from 'react-redux';

import LoaderModal from './components/LoaderModal';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';

import GoogleCallback from './pages/Oauth-pages/GoogleCallback'


function App() {
  const dispatch = useDispatch()
  const {loading,user} = useSelector((state) => state.user)
  const redoxState = useSelector((state) => state)
  console.log('All state redox',redoxState)
  
  React.useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  if(loading) return (
    <LoaderModal />
  )

  return (
    <Router>
      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />


            // Oauth routes
            <Route path="/oauth/google/callback" element={<GoogleCallback />} />
          </Routes>
   
    </Router>
  );
}

export default App;
