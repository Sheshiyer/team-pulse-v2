# Team Pulse

A Raycast extension for tracking employee activity, hours worked, holidays, and mentorship status through Notion integration.

## Features

- 👥 View all employees with key metrics
- 📊 Track hours worked and holidays taken
- 👨‍🏫 Monitor mentorship status
- 💰 View CTC in multiple currencies (INR/EUR)
- 🔄 Real-time sync with Notion database
- 🚀 Quick actions to update employee status

## Setup

### 1. Notion Setup

1. Create a new Notion database with the following properties:
   - Name (Title)
   - Email (Email)
   - HoursThisMonth (Number)
   - TotalHoursWorked (Number)
   - HolidaysTaken (Number)
   - LastLogin (Date)
   - IsMentor (Checkbox)
   - Mentees (Relation)
   - CTCInr (Number)
   - CTCEur (Number)
   - JoinDate (Date)

2. Get your Notion API key:
   - Go to [Notion Developers](https://developers.notion.com)
   - Click "View my integrations"
   - Create a new integration
   - Copy the API key

3. Share your database with the integration:
   - Open your Notion database
   - Click "Share" in the top right
   - Add your integration under "Connections"
   - Copy the database ID from the URL (the part after the workspace name and before the "?")

### 2. Extension Setup

1. Install the extension in Raycast
2. Configure the extension preferences:
   - Set your Notion API key
   - Set your database ID

## Usage

### Employee Overview

- View all employees with their key metrics
- Quick access to hours worked, holidays taken, and last login
- Mentor status indicated with a star icon
- Click on an employee to view detailed information

### Employee Details

- Comprehensive view of employee information
- Toggle between INR and EUR for CTC display
- Quick actions to:
  - Toggle mentor status
  - Open employee page in Notion
  - View detailed statistics

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   cd raycast-extension
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
