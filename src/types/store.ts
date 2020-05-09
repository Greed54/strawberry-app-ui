import {EmployeeListFromStore} from "../scenes/content/teammanagement/employeeslist/types";
import { TeamsManagementStore } from "../scenes/content/teammanagement/types";
import {ContainerStore} from "../scenes/container/types";
import {GlobalStore} from "../scenes/duck";
import {WorkDaysStore} from "../scenes/content/workdays/types";

export interface TeamsManagement {
  root: TeamsManagementStore;
  employeesList: EmployeeListFromStore;
}

export interface Store {
  teamsManagement: TeamsManagement;
  workDays: WorkDaysStore;
  container: ContainerStore;
  global: GlobalStore;
}
