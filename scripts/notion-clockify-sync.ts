import { Client } from "@notionhq/client";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface ClockifyTimeEntry {
  timeInterval: {
    start: string;
    end: string;
    duration: string;
  };
  userId: string;
}

class NotionClockifySync {
  private notionClient: Client;
  private clockifyApiKey: string;
  private notionDatabaseId: string;
  private clockifyWorkspaceId: string;

  constructor() {
    // Initialize clients with environment variables
    this.notionClient = new Client({ auth: process.env.NOTION_API_KEY });
    this.clockifyApiKey = process.env.CLOCKIFY_API_KEY || "";
    this.notionDatabaseId = process.env.NOTION_DATABASE_ID || "";
    this.clockifyWorkspaceId = process.env.CLOCKIFY_WORKSPACE_ID || "";
  }

  private async getClockifyData(userId: string, startDate: string): Promise<number> {
    try {
      const response = await axios.get(
        `https://api.clockify.me/api/v1/workspaces/${this.clockifyWorkspaceId}/user/${userId}/time-entries`,
        {
          headers: {
            "X-Api-Key": this.clockifyApiKey,
          },
          params: {
            start: startDate,
          },
        }
      );

      const timeEntries: ClockifyTimeEntry[] = response.data;
      const totalHours = timeEntries.reduce((acc, entry) => {
        const duration = new Date(entry.timeInterval.duration).getTime();
        return acc + duration / (1000 * 60 * 60); // Convert to hours
      }, 0);

      return Math.round(totalHours * 100) / 100; // Round to 2 decimal places
    } catch (error) {
      console.error("Error fetching Clockify data:", error);
      return 0;
    }
  }

  private async updateNotionDatabase(
    pageId: string,
    hoursThisMonth: number,
    lastLogin: string
  ) {
    try {
      await this.notionClient.pages.update({
        page_id: pageId,
        properties: {
          HoursThisMonth: {
            number: hoursThisMonth,
          },
          LastLogin: {
            date: {
              start: lastLogin,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error updating Notion:", error);
    }
  }

  public async syncData() {
    try {
      // Get all employees from Notion
      const response = await this.notionClient.databases.query({
        database_id: this.notionDatabaseId,
      });

      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      // Process each employee
      for (const page of response.results) {
        const pageId = page.id;
        const clockifyUserId = (page as any).properties.ClockifyUserId?.rich_text[0]?.plain_text;

        if (!clockifyUserId) {
          console.log(`No Clockify User ID found for page ${pageId}`);
          continue;
        }

        // Get hours worked this month
        const hoursThisMonth = await this.getClockifyData(
          clockifyUserId,
          startOfMonth.toISOString()
        );

        // Get last login (most recent time entry)
        const lastLogin = new Date().toISOString(); // In a real implementation, get this from Clockify

        // Update Notion
        await this.updateNotionDatabase(pageId, hoursThisMonth, lastLogin);
        console.log(`Updated data for employee ${pageId}`);
      }

      console.log("Sync completed successfully");
    } catch (error) {
      console.error("Error during sync:", error);
    }
  }
}

// Run the sync
const sync = new NotionClockifySync();
sync.syncData().catch(console.error);
