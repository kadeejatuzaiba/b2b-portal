import { buildRoute } from './routeBuilder';

const authBase = buildRoute('/auth');

export const authRoutes = {
  login: authBase('/login'),
  logout: authBase('/logout'),
  forgotPassword: authBase('/forgot-password'),
  resetPassword: authBase('/reset-password'),
  me: authBase('/me'),
} as const;
