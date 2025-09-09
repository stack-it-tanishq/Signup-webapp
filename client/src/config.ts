// Environment configuration
export const config = {
  // Default to current origin if VITE_API_URL is not set
  apiUrl: import.meta.env.VITE_API_URL || window.location.origin,
  // Add other config values here
};
