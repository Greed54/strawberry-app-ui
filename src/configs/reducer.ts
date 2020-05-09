import {combineReducers} from "redux";
import containerReducer from "../scenes/container/duck";
import global from "../scenes/duck";
import employeesListReducer from "../scenes/content/teammanagement/employeeslist/duck";
import workDaysReducer from "../scenes/content/workdays/duck";
import rootTeamsManagementReducer from "../scenes/content/teammanagement/duck";

const teamsManagementReducer = combineReducers({
  root: rootTeamsManagementReducer,
  employeesList: employeesListReducer
});

export const rootReducer = combineReducers({
  teamsManagement: teamsManagementReducer,
  workDays: workDaysReducer,
  container: containerReducer,
  global
});
