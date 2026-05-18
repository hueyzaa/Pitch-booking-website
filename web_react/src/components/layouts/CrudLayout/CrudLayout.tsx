import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * CrudLayout component
 * Simple layout wrapper for CRUD pages
 * Renders child routes without additional UI elements
 */
const CrudLayout: React.FC = () => {
  return <Outlet />;
};

export default CrudLayout;
