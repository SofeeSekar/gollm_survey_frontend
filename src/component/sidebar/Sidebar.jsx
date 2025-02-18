import React from 'react'

const Sidebar = ({ className, children }) => {
  return <div className={`${className}`}>{children}</div>;
};

export default Sidebar