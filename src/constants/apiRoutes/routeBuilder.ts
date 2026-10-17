import { env } from '@/config/env';

export const buildRoute =
  (path: string) =>
  (suffix = '') =>
    `${env.apiPrefix}${path}${suffix}`;
