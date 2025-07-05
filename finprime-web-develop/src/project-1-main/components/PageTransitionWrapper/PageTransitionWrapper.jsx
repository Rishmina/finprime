import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransitionWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="page-transition animate-fade-in">
      {children}
    </div>
  );
};

export default PageTransitionWrapper;
