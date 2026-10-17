import { buildRoute } from './routeBuilder';

const profileBase = buildRoute('/profile');

export const profileRoutes = {
  get: profileBase(''),
  update: profileBase(''),
  preferences: profileBase('/preferences'),
} as const;
