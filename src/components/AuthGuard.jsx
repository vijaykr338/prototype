import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const AuthenticationGuard = ({ children }) => {
  const { isAuthenticated,loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return children;
};

export default AuthenticationGuard;