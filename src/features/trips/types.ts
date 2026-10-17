export type TripStatus = 'Ongoing' | 'Upcoming' | 'Completed';

export interface TripItem {
  id: string;
  orderId: string;
  serviceType: string;
  status: TripStatus;
  origin: string;
  destination: string;
  eta: string | null;
  progress: number;
  driver: string;
  vehicle: string;
  dispatchedAt: string | null;
  scheduledPickup: string | null;
  completedAt: string | null;
  duration: string | null;
  estTransit: string | null;
}
