/**
 * Company & Partner Profile Types
 */

export interface CompanyProfile {
  company: string;
  gstin: string;
  billingEmail: string;
  phone: string;
  address: string;
  dispatcherName: string;
  dispatcherRole: string;
  notifyTrips: boolean;
  notifyBilling: boolean;
  notifyOrders: boolean;
}
