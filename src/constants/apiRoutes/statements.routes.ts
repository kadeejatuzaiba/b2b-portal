import { buildRoute } from './routeBuilder';

const statementsBase = buildRoute('/statements');

export const statementsRoutes = {
  list: statementsBase(''),
  detail: (id: string) => statementsBase(`/${id}`),
  downloadPdf: (id: string) => statementsBase(`/${id}/download`),
  invoices: buildRoute('/invoices')(''),
} as const;
