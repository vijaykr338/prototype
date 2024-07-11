import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const AuthenticationGuard = ({ children }) => {
  const { isAuthenticated,loginWithRedirect,isLoading } = useAuth0();
  if(!isLoading){
  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return children;
};
}

export default AuthenticationGuard;