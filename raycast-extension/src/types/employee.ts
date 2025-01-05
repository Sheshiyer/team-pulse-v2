export interface Employee {
  id: string;
  name: string;
  email: string;
  hoursThisMonth: number;
  totalHoursWorked: number;
  holidaysTaken: number;
  lastLogin: string;
  isMentor: boolean;
  mentees?: string[];
  ctcInr: number;
  ctcEur: number;
  joinDate: string;
  notionPageId: string;
}

export interface EmployeeListItem {
  id: string;
  name: string;
  hoursThisMonth: number;
  holidaysTaken: number;
  lastLogin: string;
  isMentor: boolean;
}

export interface NotionConfig {
  databaseId: string;
  apiKey: string;
}

export interface TimeEntry {
  date: string;
  hours: number;
  description?: string;
}

export interface MentorshipStatus {
  isMentor: boolean;
  mentees: string[];
  totalMentorshipHours?: number;
}

export type Currency = "INR" | "EUR";
