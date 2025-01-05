# Product Requirements Document (PRD)

## 1. Project Overview

**Project Name**: Team Pulse  
**Primary Goal**: Provide real-time visibility into employee activity (hours worked, holidays taken, last login, mentorship status) within a single Notion database, surfaced through a Raycast extension.

## 2. Stakeholders and Users

- **Project Managers**: Need quick access to who’s on holiday, total hours worked, and last login times.  
- **Mentors / Team Leads**: Track mentorship status, measure hours spent guiding interns, check monthly or weekly time logs.  
- **HR / Finance Teams**: Monitor total holidays taken, current CTC with a toggle for different currencies (INR/EUR).  
- **Developers**: Integrate data from Clockify, Height, or other platforms via webhooks or on-demand queries.

## 3. Key Functional Requirements

1. **Centralized Employee Data in Notion**  
   - All fields—basic employee info, hours logged, holiday count, last login, mentorship, CTC—stored or referenced in a single Notion database.  
   - Leverage different Notion views (filters, grouping) for distinct use cases.

2. **Raycast Extension**  
   - Real-time list of employees with key metrics (e.g., “Total Hours This Month,” “Holidays Taken Out of 15,” “Last Login Time”).  
   - Drill-down details to see a single employee’s information (CTC, total hours since joined, number of days worked, etc.).  
   - Optional triggers or actions: update Notion fields, open the Notion page, link to external systems.

3. **Time Tracking Integration**  
   - **Clockify** or an equivalent: no local “time_entries” table; use external webhooks or APIs.  
   - Aggregate hours: “Total Hours This Month” (based on 8 hours/day for workdays) and “Total Hours Since Joined.”

4. **Mentorship Tracking**  
   - Boolean or status field in Notion for “Mentoring” or “Not Mentoring.”  
   - Potential expansions: track interns assigned, total hours spent in mentorship, etc.

5. **Holidays and CTC**  
   - “Holidays Taken” out of 15 annual allowance.  
   - “Current CTC” with an EUR/INR toggle or dual numeric fields for each currency.

6. **Last Login / Activity**  
   - “Last Login” or “Last Active” field updated via webhooks or periodic sync with Clockify/Height.

## 4. Non-Functional Requirements

- **Performance**: The Raycast extension should load employee data within ~1 second for typical team sizes (<150 employees).  
- **Security**: API keys and sensitive info stored in Raycast’s secure preferences or environment variables; sensitive Notion fields restricted via Notion’s permission settings.  
- **Scalability**: Must handle additional employees or fields without major schema changes.

## 5. Success Criteria

- **Single Source of Truth**: All employee info is consistently tracked in one Notion database.  
- **Minimal Data Duplication**: Rely on external systems (Clockify, Height) for real-time logs, only storing derived fields (e.g., total hours, holiday counts) in Notion.  
- **High Adoption**: Team leads and HR find the Raycast extension intuitive for daily usage.  
- **Maintainable**: Adding new fields or adjusting calculations (e.g., changing holiday allowance) is straightforward via Notion updates and minimal code changes.

## 6. Milestones

1. **Notion Database Setup**: Create/define properties for employees (holidays, hours, CTC, etc.).  
2. **Raycast Extension MVP**: Display a list of employees with relevant data.  
3. **Webhook / API Integrations**: Automate updates for hours worked, last login.  
4. **Mentorship Dashboard**: Add a specialized view or feature to filter employees who are mentors.  
5. **Final Testing & Rollout**: Validate performance, accuracy, and usability, then release to the team.

