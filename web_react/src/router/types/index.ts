import React from 'react';

/**
 * Configuration for a single route
 */
export interface RouteConfig {
  path: string;
  element: React.ReactElement;
  children?: RouteConfig[];
}

/**
 * Configuration for a lazy-loaded route
 */
export interface LazyRouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  children?: LazyRouteConfig[];
}
