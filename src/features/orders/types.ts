export type OrderStatus = 'Received / Pending' | 'Accepted' | 'Rejected' | 'Completed';
export type VehicleIconType = 'truck' | 'container' | 'reefer' | 'package';

export interface OrderItem {
  id: string;
  po: string;
  createdDate: string;
  createdTime: string;
  origin: string;
  destination: string;
  scheduledDate: string;
  scheduledSlot: string;
  vehicle: string;
  vehicleIcon: VehicleIconType;
  status: OrderStatus;
  tripRef: string | null;
  rejectionReason: string | null;
}

export interface VehicleOption {
  id: string;
  label: string;
  capacity: string;
  note: string;
  popular: boolean;
}
