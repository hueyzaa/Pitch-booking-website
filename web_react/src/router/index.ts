/**
 * Main router module exports
 * Provides centralized access to routing functionality
 */
export { AppRouter } from './AppRouter';
export { ROUTE_PATHS } from './constants/routePaths';
export type { RoutePathsType } from './constants/routePaths';
export * from './guards';
export * from './types';
export { routes, authRoutes, protectedRoutes, publicRoutes } from './routes';
