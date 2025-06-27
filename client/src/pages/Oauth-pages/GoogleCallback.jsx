import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleLoginRegister } from '../../features/auth/authThunks';

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      dispatch(googleLoginRegister({ code })).then(() => {
        navigate('/');
      });
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return <p>Redirecting...</p>;
};

export default GoogleCallback;
