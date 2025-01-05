# documentation.md

## Overview
This document explains how to configure and use the Team Pulse project, which surfaces Notion-based employee data in a Raycast extension. It also covers how to link external data from Clockify or Height without duplicating time-entry data locally.

## Table of Contents
1. **Prerequisites**
2. **Setting Up the Notion Database**
3. **Installing and Configuring the Raycast Extension**
4. **Integrations (Clockify, Height)**
5. **Usage Instructions**
6. **Maintaining Fields and Automations**

---

### 1. Prerequisites
- **Notion** workspace with the “Employees” database ready.
- **Raycast** installed locally.
- **Clockify/Height** account (optional but recommended) for time tracking.
- **Node.js** (if developing the extension from source).

### 2. Setting Up the Notion Database
1. **Create the “Employees” database** in Notion.
2. **Add required fields** (or “Properties” in Notion), such as:
   - **Name**, **Email**, **Phone Number**, **Mentorship Status**, **CTC (EUR)**, **CTC (INR)**, **Holidays Taken**, etc.
3. **(Optional)** Turn on the Notion API Integration:
   - Create an internal integration in Notion settings.
   - Grant it access to your “Employees” database.

### 3. Installing and Configuring the Raycast Extension
1. **Install** the Team Pulse extension (either from your Git repo or a packaged .raycast extension).
2. **Environment Variables** (within Raycast preferences):
   - `NOTION_API_KEY`: Notion integration token if you’re doing direct API calls.
   - `CLOCKIFY_API_KEY`: For fetching hours/logs if you choose to query Clockify.
   - `HEIGHT_APP_KEY`: If pulling tasks from Height.
3. **Command Setup**:
   - The extension will have at least two commands:
     - **“Employee Overview”**: Main list of employees.
     - **“Employee Detail”**: Drill-down with more fields or actions.

### 4. Integrations (Clockify, Height)
- **Clockify**:
  - Optionally configure a webhook to update the “Hours Worked” or “Last Login” fields in Notion automatically.
  - Or run an on-demand fetch from the extension whenever you view an employee.
- **Height**:
  - Optionally configure a webhook for tasks or last activity, then push relevant data to Notion fields like “Last Login Time.”

### 5. Usage Instructions
1. **Open Raycast** and search “Team Pulse” or the extension’s name.
2. **Employee Overview**: See a list of employees with high-level data (hours this month, holidays taken, last login).
3. **Select an Employee**: View detailed fields in the Raycast extension or open their Notion page.
4. **Mentorship View**: Filter employees who are mentors (either in Raycast or within Notion’s filtered view).

### 6. Maintaining Fields and Automations
- **Add/Remove Fields**: Go to the Notion “Employees” database → click “Properties” → add or remove.  
- **Automations**: Use Zapier, Make, or a custom integration to automatically update fields such as “Last Login,” “Hours Worked,” or currency conversions for CTC.

