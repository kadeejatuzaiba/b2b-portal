import { buildRoute } from './routeBuilder';

const trackingBase = buildRoute('/trips');

export const trackingRoutes = {
  list: trackingBase(''),
  detail: (id: string) => trackingBase(`/${id}`),
  liveTrack: (id: string) => trackingBase(`/${id}/live`),
  report: (id: string) => trackingBase(`/${id}/report`),
} as const;
