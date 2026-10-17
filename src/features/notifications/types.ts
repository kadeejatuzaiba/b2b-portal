export type NotificationCategory = 'trips' | 'orders' | 'billing';

export interface NotificationItem {
  id: number;
  type: NotificationCategory;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}
