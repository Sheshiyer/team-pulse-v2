import { List, ActionPanel, Action, Icon, showToast, Toast } from "@raycast/api";
import EmployeeDetail from "./employee-detail";
import { useEmployees } from "../hooks/useEmployees";
import { Employee } from "../types/employee";

export default function EmployeeOverview() {
  const { employees, isLoading, error, refreshEmployees } = useEmployees();

  return (
    <List
      isLoading={isLoading}
      searchBarPlaceholder="Search employees..."
      onSelectionChange={(id) => {
        // Selection handling will be implemented in detail view
      }}
    >
      {error ? (
        <List.EmptyView
          icon={Icon.ExclamationMark}
          title="Failed to load employees"
          description={error.message}
          actions={
            <ActionPanel>
              <Action title="Retry" onAction={refreshEmployees} />
            </ActionPanel>
          }
        />
      ) : (
        employees.map((employee) => (
          <EmployeeListItem key={employee.id} employee={employee} />
        ))
      )}
    </List>
  );
}

function EmployeeListItem({ employee }: { employee: Employee }) {
  const {
    name,
    hoursThisMonth,
    holidaysTaken,
    lastLogin,
    isMentor,
  } = employee;

  const lastLoginDate = new Date(lastLogin);
  const formattedLastLogin = lastLoginDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <List.Item
      title={name}
      subtitle={`${hoursThisMonth}h this month`}
      accessories={[
        { text: `${holidaysTaken}/15 holidays` },
        { text: formattedLastLogin },
        ...(isMentor ? [{ icon: Icon.Star, tooltip: "Mentor" }] : []),
      ]}
      actions={
        <ActionPanel>
          <ActionPanel.Section>
            <Action.Push
              title="View Details"
              target={<EmployeeDetail employeeId={employee.id} />}
              icon={Icon.Person}
            />
            <Action.OpenInBrowser
              title="Open in Notion"
              url={`https://notion.so/${employee.notionPageId}`}
            />
          </ActionPanel.Section>
          <ActionPanel.Section>
            <Action
              title="Refresh"
              icon={Icon.ArrowClockwise}
              shortcut={{ modifiers: ["cmd"], key: "r" }}
              onAction={() => {}}
            />
          </ActionPanel.Section>
        </ActionPanel>
      }
    />
  );
}
