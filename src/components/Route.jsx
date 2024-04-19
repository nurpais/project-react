import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './AuthProvider';
import { Spinner } from './ui';

const Route = ({ children, isProtected }) => {
  const navigate = useNavigate();

  const { token } = useAuth();

  useEffect(() => {
    if (isProtected && token === null) {
      navigate('/signin', { replace: true });
    }
  }, [isProtected, navigate, token]);

  if (token === undefined) {
    return (
      <div className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return children;
};

export default Route;
