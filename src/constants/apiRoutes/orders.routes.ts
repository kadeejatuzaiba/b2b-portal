import { buildRoute } from './routeBuilder';

const ordersBase = buildRoute('/orders');

export const ordersRoutes = {
  list: ordersBase(''),
  create: ordersBase(''),
  detail: (id: string) => ordersBase(`/${id}`),
  cancel: (id: string) => ordersBase(`/${id}/cancel`),
} as const;
