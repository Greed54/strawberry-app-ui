import {EmployeeListFromStore} from "../scenes/content/teammanagement/employeeslist/types";
import { TeamsManagementStore } from "../scenes/content/teammanagement/types";
import {ContainerStore} from "../scenes/container/types";
import {GlobalStore} from "../scenes/duck";

export interface TeamsManagement {
  root: TeamsManagementStore;
  employeesList: EmployeeListFromStore;
}

export interface Store {
  teamsManagement: TeamsManagement;
  container: ContainerStore;
  global: GlobalStore;
}
