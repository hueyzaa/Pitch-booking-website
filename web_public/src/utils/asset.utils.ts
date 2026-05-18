const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9999';

/**
 * Resolves a professional asset URL from the backend.
 * Handles absolute URLs, relative paths, and provides a placeholder.
 */
export const resolveAssetUrl = (path: string | undefined): string => {
  if (!path) {
    // Return a professional placeholder image
    return 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop';
  }

  // If it's already an absolute URL, return it
  if (path.startsWith('http')) {
    return path;
  }

  // Clean the path and combine with API URL
  const cleanPath = path.replace(/\\/g, '/').replace(/^\//, '');
  return `${API_URL}/${cleanPath}`;
};
