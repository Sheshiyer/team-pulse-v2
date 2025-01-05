import { useEffect, useState } from "react";
import {
  List,
  ActionPanel,
  Action,
  Icon,
  Detail,
  showToast,
  Toast,
  getPreferenceValues,
} from "@raycast/api";
import { useEmployees } from "../hooks/useEmployees";
import { Employee, Currency } from "../types/employee";

export default function EmployeeDetail(props: { employeeId?: string }) {
  const { getEmployeeDetails, updateEmployeeData } = useEmployees();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("INR");

  useEffect(() => {
    async function fetchEmployee() {
      if (!props.employeeId) {
        showToast({
          style: Toast.Style.Failure,
          title: "Employee ID not provided",
        });
        return;
      }

      setIsLoading(true);
      const data = await getEmployeeDetails(props.employeeId);
      setEmployee(data);
      setIsLoading(false);
    }

    fetchEmployee();
  }, [props.employeeId]);

  if (!employee) {
    return (
      <List isLoading={isLoading}>
        <List.EmptyView
          icon={Icon.Person}
          title="Employee not found"
          description="Could not load employee details"
        />
      </List>
    );
  }

  const ctc = selectedCurrency === "INR" ? employee.ctcInr : employee.ctcEur;
  const currencySymbol = selectedCurrency === "INR" ? "₹" : "€";

  const markdown = `
# ${employee.name}

## Contact Information
- Email: ${employee.email}

## Work Statistics
- Hours This Month: ${employee.hoursThisMonth}h
- Total Hours Worked: ${employee.totalHoursWorked}h
- Holidays Taken: ${employee.holidaysTaken}/15
- Last Login: ${new Date(employee.lastLogin).toLocaleString()}
- Join Date: ${new Date(employee.joinDate).toLocaleDateString()}

## Compensation
- Current CTC: ${currencySymbol}${ctc.toLocaleString()}

## Mentorship Status
${
  employee.isMentor
    ? `- Active Mentor
${
  employee.mentees && employee.mentees.length > 0
    ? `- Mentees: ${employee.mentees.length}`
    : "- No active mentees"
}`
    : "- Not currently mentoring"
}
  `;

  return (
    <Detail
      markdown={markdown}
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.TagList title="Status">
            <Detail.Metadata.TagList.Item
              text={employee.isMentor ? "Mentor" : "Team Member"}
              color={employee.isMentor ? "green" : "blue"}
            />
          </Detail.Metadata.TagList>
          <Detail.Metadata.Separator />
          <Detail.Metadata.Label
            title="Hours This Month"
            text={`${employee.hoursThisMonth}h`}
          />
          <Detail.Metadata.Label
            title="Holidays Taken"
            text={`${employee.holidaysTaken}/15`}
          />
          <Detail.Metadata.Label
            title="Last Active"
            text={new Date(employee.lastLogin).toLocaleString()}
          />
        </Detail.Metadata>
      }
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action
              title="Toggle Currency"
              icon={Icon.BankNote}
              onAction={() =>
                setSelectedCurrency((curr) => (curr === "INR" ? "EUR" : "INR"))
              }
              shortcut={{ modifiers: ["cmd"], key: "t" }}
            />
            <Action.OpenInBrowser
              title="Open in Notion"
              url={`https://notion.so/${employee.notionPageId}`}
            />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action
              title="Toggle Mentor Status"
              icon={Icon.Star}
              onAction={async () => {
                await updateEmployeeData(employee.id, {
                  isMentor: !employee.isMentor,
                });
                const updated = await getEmployeeDetails(employee.id);
                setEmployee(updated);
              }}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}
