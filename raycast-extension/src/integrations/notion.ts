import { Client } from "@notionhq/client";
import { getPreferenceValues } from "@raycast/api";
import { Employee, NotionConfig } from "../types/employee";

interface Preferences extends NotionConfig {}

export class NotionService {
  private client: Client;
  private databaseId: string;

  constructor() {
    const preferences = getPreferenceValues<Preferences>();
    this.client = new Client({ auth: preferences.apiKey });
    this.databaseId = preferences.databaseId;
  }

  async getAllEmployees(): Promise<Employee[]> {
    try {
      const response = await this.client.databases.query({
        database_id: this.databaseId,
      });

      return response.results.map((page: any) => {
        const props = page.properties;
        return {
          id: page.id,
          name: props.Name.title[0]?.plain_text || "",
          email: props.Email.email || "",
          hoursThisMonth: props.HoursThisMonth.number || 0,
          totalHoursWorked: props.TotalHoursWorked.number || 0,
          holidaysTaken: props.HolidaysTaken.number || 0,
          lastLogin: props.LastLogin.date?.start || "",
          isMentor: props.IsMentor.checkbox || false,
          mentees: props.Mentees.relation?.map((rel: any) => rel.id) || [],
          ctcInr: props.CTCInr.number || 0,
          ctcEur: props.CTCEur.number || 0,
          joinDate: props.JoinDate.date?.start || "",
          notionPageId: page.id,
        };
      });
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  }

  async getEmployeeById(id: string): Promise<Employee | null> {
    try {
      const page = await this.client.pages.retrieve({ page_id: id });
      const props = (page as any).properties;

      return {
        id: page.id,
        name: props.Name.title[0]?.plain_text || "",
        email: props.Email.email || "",
        hoursThisMonth: props.HoursThisMonth.number || 0,
        totalHoursWorked: props.TotalHoursWorked.number || 0,
        holidaysTaken: props.HolidaysTaken.number || 0,
        lastLogin: props.LastLogin.date?.start || "",
        isMentor: props.IsMentor.checkbox || false,
        mentees: props.Mentees.relation?.map((rel: any) => rel.id) || [],
        ctcInr: props.CTCInr.number || 0,
        ctcEur: props.CTCEur.number || 0,
        joinDate: props.JoinDate.date?.start || "",
        notionPageId: page.id,
      };
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error);
      return null;
    }
  }

  async updateEmployee(id: string, data: Partial<Employee>): Promise<void> {
    try {
      await this.client.pages.update({
        page_id: id,
        properties: {
          ...(data.hoursThisMonth !== undefined && {
            HoursThisMonth: { number: data.hoursThisMonth },
          }),
          ...(data.totalHoursWorked !== undefined && {
            TotalHoursWorked: { number: data.totalHoursWorked },
          }),
          ...(data.holidaysTaken !== undefined && {
            HolidaysTaken: { number: data.holidaysTaken },
          }),
          ...(data.lastLogin !== undefined && {
            LastLogin: { date: { start: data.lastLogin } },
          }),
          ...(data.isMentor !== undefined && {
            IsMentor: { checkbox: data.isMentor },
          }),
        },
      });
    } catch (error) {
      console.error(`Error updating employee ${id}:`, error);
      throw error;
    }
  }
}

export const notionService = new NotionService();
