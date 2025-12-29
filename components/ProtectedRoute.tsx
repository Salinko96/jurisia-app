
import React, { useEffect } from 'react';
import { View } from '../types';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  onRedirect: (view: View) => void;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, onRedirect, children }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      onRedirect(View.LOGIN);
    }
  }, [isAuthenticated, onRedirect]);

  if (!isAuthenticated) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
