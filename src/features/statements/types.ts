export type StatementStatus = 'In progress' | 'Published' | 'Paid';
export type InvoiceStatus = 'Open' | 'Billed' | 'Paid';

export interface StatementItem {
  id: string;
  period: string;
  status: StatementStatus;
  trips: number;
  amount: number;
  issued: string;
  due: string;
}

export interface InvoiceItem {
  id: string;
  trip: string;
  date: string;
  route: string;
  amount: number;
  status: InvoiceStatus;
}
