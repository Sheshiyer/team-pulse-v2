import { useState, useEffect } from "react";
import { showToast, Toast } from "@raycast/api";
import { Employee } from "../types/employee";
import { notionService } from "../integrations/notion";

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      setIsLoading(true);
      const data = await notionService.getAllEmployees();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to fetch employees",
        message: (err as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function getEmployeeDetails(id: string): Promise<Employee | null> {
    try {
      const employee = await notionService.getEmployeeById(id);
      if (!employee) {
        throw new Error("Employee not found");
      }
      return employee;
    } catch (err) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to fetch employee details",
        message: (err as Error).message,
      });
      return null;
    }
  }

  async function updateEmployeeData(id: string, data: Partial<Employee>) {
    try {
      await notionService.updateEmployee(id, data);
      await fetchEmployees(); // Refresh the list
      showToast({
        style: Toast.Style.Success,
        title: "Employee updated successfully",
      });
    } catch (err) {
      showToast({
        style: Toast.Style.Failure,
        title: "Failed to update employee",
        message: (err as Error).message,
      });
    }
  }

  return {
    employees,
    isLoading,
    error,
    refreshEmployees: fetchEmployees,
    getEmployeeDetails,
    updateEmployeeData,
  };
}
