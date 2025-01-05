3. Raycast-design-guidelines.md

# Raycast-design-guidelines.md

This document outlines best practices for building and structuring the Raycast extension for Team Pulse.

## 1. Command Structure
- **Employee Overview Command**  
  - Displays a list of employees (fetched from Notion or from a local cache).
  - Displays key metrics inline: “Holidays Taken,” “Hours This Month,” “Last Login.”
  - Enables a quick “View Details” action or “Open in Notion.”

- **Employee Detail Command**  
  - Accessed by selecting an employee from the list or via a dedicated command.
  - Shows extended fields: “CTC with Currency Toggle,” “Total Hours Since Joined,” “Days Worked,” “Mentorship Status,” etc.

## 2. UI Best Practices
- **Use Clear Titles**: e.g., “Team Pulse: Employees,” “Team Pulse: [Employee Name].”
- **Minimalistic Layout**: In Raycast, highlight only the most critical info. Additional details can appear in a “Detail View” or as separate actions.
- **Performance**:
  - Fetch data on demand or rely on webhooks to update local cache. Avoid heavy background polling.

## 3. Caching Strategy
- **Short-Term Caching**: Raycast can store last-fetched data for quick navigation. Invalidate or refresh data based on user actions or time intervals.
- **Webhooks**: Use them wherever possible (e.g., Clockify → update hours in Notion → Raycast reads from Notion).

## 4. Code Organization
- **One Command per File**:
  - `employee-overview.tsx`: Exports the “Overview” list command.
  - `employee-detail.tsx`: Exports the detail command.
- **Hooks & Utilities**:
  - `useNotionData.ts`: A custom hook for fetching Notion data.
  - `useClockifyData.ts`: For on-demand time logs or last login if needed.
- **Styling**: Keep it minimal in Raycast; let Notion or the external system handle rich formatting. Use the standard Raycast UI components.

## 5. Error Handling
- **Fallback States**:
  - If Notion API is offline, show a relevant error. Provide a “Retry” action.
  - If Clockify fails, still show cached data or partial info from Notion.

## 6. Actions & Quick Links
- **Open in Notion**: Jump directly to the employee’s page for further editing.
- **Refresh Data**: Force a re-fetch from Notion or external APIs.
- **Toggle Mentorship**: Potentially, a quick action to mark an employee as mentor or not (writes back to Notion).

---

