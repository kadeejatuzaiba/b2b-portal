export type SlaStatus = 'On time' | 'Delayed' | 'In transit' | 'Scheduled';

export interface TripReportRow {
  id: string;
  date: string;
  route: string;
  sla: SlaStatus;
  duration: string;
  score: number;
}

export interface MonthData {
  label: string;
  value: number;
}
