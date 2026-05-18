import { RouteObject } from 'react-router-dom';
import { authRoutes } from './authRoutes';
import { protectedRoutes } from './protectedRoutes';
import { publicRoutes } from './publicRoutes';

/**
 * Main route configuration
 * Aggregates all route definitions from different modules
 */
export const routes: RouteObject[] = [...protectedRoutes, ...authRoutes, ...publicRoutes];

// Export individual route modules for flexibility
export { authRoutes, protectedRoutes, publicRoutes };
