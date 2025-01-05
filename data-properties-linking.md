4. Data-properties-linking.md

# Data-properties-linking.md

This document explains how each field in the “Employees” Notion database links to external systems (Clockify, Height) and how derived fields (holidays, hours) get populated.

## 1. Notion “Employees” Database Properties

| **Property Name**           | **Type**   | **Source**                 | **Description**                                                            |
|-----------------------------|-----------|----------------------------|----------------------------------------------------------------------------|
| `Name`                      | Title     | User input                 | Full name of the employee.                                                |
| `Email`                     | Email     | User input                 | Primary email address.                                                    |
| `Phone Number`              | Phone     | User input (optional)      | Main contact number.                                                      |
| `Profile Pic`               | Files/Media or URL | From Height/Clockify API  | Could store a link or attach an image.                                    |
| `Holidays Taken`            | Number    | Manual/Automated updates   | Count of holidays used (out of 15).                                       |
| `Total Hours This Month`    | Number    | From Clockify (webhook)    | Aggregated monthly hours.                                                 |
| `Hours to Complete (Month)` | Formula/Number | Derived from 8h/day × workdays | `Expected monthly hours – total hours worked` for the month.              |
| `Last Login Time`           | Date/Time | From Clockify/Height API   | Timestamp of the last login (webhook or direct call).                     |
| `Mentorship Status`         | Select    | User input                 | E.g., “Not Mentoring,” “Mentoring Intern,” etc.                           |
| `Total Hours Since Joined`  | Number    | From Clockify (webhook)    | Lifetime hours from date joined to present.                               |
| `Days Worked Since Joined`  | Formula/Number | (Joined → Today) minus weekends? | E.g., a formula in Notion or an automated update from an external script. |
| `CTC (EUR)`                 | Number    | Finance/HR                | Current salary in EUR.                                                    |
| `CTC (INR)`                 | Number    | Finance/HR or formula      | Optional second property with conversion from EUR.                        |
| `Joined Date`               | Date      | HR input                   | Day the employee joined.                                                  |
| `Is Active`                 | Checkbox  | Automated/Manual           | Mark if employed or not.                                                  |

> **Note**: Additional fields (like “employee_type,” “stage,” or “probation_complete_at”) can be added as needed.

## 2. Linking to External Services

### 2.1. Clockify
- **Time Tracking**: A webhook can push monthly/lifetime hours to Notion or an automated script can poll Clockify’s API daily.  
- **Last Login**: If available from Clockify’s user logs, update Notion upon any login event.

### 2.2. Height
- **Profile Picture**: If Height stores user avatars, fetch the URL and store it in the `Profile Pic` field.  
- **Tasks**: Not typically stored in Notion, but you can reference how many tasks done if needed.

## 3. Derived Fields

1. **Holidays Taken**: Either increment manually (when HR logs a holiday in Notion) or automatically (if integrated with a leave-management system).  
2. **Hours to Complete (Month)**: Possibly a formula in Notion: `ExpectedHoursThisMonth - [Total Hours This Month].`  
3. **Days Worked Since Joined**: 
   - If you want an exact count (excluding weekends/holidays), you might run a formula in an external script or a Notion formula with some date logic.  
   - Alternatively, a Zap or custom automation can update this field daily.

## 4. Implementation Tips

- **Automations**: Tools like Zapier, Make, or custom Node scripts can bridge Clockify → Notion updates.  
- **Validation**: Keep an eye on concurrency or overwriting issues (e.g., if multiple updates happen simultaneously).  
- **Performance**: Notion API has rate limits; batch updates when possible.

