import {Store} from "../../../../types/store";
import {EmployeeListFromStore} from "./types";

export const getEmployeeListSelector = (state: Store) => state.teamsManagement.employeesList.employeeList;

// @ts-ignore
export function getEmployeeById(coreId?: string, state: EmployeeListFromStore) {
  return state.employeeList.find(employee => employee.coreID === coreId);
}
