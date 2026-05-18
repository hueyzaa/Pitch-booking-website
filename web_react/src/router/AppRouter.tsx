import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes';

/**
 * Internal component that renders routes using useRoutes hook
 */
const AppRoutes: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

/**
 * Main application router component
 * Wraps the application with BrowserRouter and renders all configured routes
 */
export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
