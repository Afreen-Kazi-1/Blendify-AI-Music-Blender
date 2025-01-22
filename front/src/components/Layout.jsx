import React from 'react';
import MusicBars from './MusicBars';

const Layout = ({ children, isLoading = false }) => {
  return (
    <div className={`layout ${isLoading ? 'loading' : ''}`}>
      <MusicBars position="left" isLoading={isLoading} />
      <MusicBars position="right" isLoading={isLoading} />
      {children}
    </div>
  );
};

export default Layout;