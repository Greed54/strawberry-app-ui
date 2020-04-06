import {ActionCreator} from 'typescript-fsa';
import {Sorting, StrawberryEmployee, StrawberryEmployeeExtended, StrawberryTeam} from "../../../../types/schema-types";
import {EmployeeRole} from "../../../../../server/src/api/employee";

export enum Filters {
  ALL_ITEMS = 'ALL_ITEMS',
  SELECTED = 'SELECTED',
}

export interface EmployeeListFromStore {
  itemFilter: Filters;
  employeeList: StrawberryEmployeeExtended[];
  editingEmployee?: StrawberryEmployee;
  sorting: any
  search: string;
  editSider: boolean;
  addingSider: boolean;
}

export interface EmployeesListPropsFromStore {
  itemFilter: Filters;
  dataSource: any;
  editingEmployee?: StrawberryEmployee;
  teams: StrawberryTeam[];
  selectedTeam?: StrawberryTeam;
  groupNamesOrder: string[];
  sorting: Sorting;
  search: string;
  editSider: boolean;
  addingSider: boolean;
}

export interface EmployeesListActions {
  fetch: ActionCreator<void>;
  toggleFilter: ActionCreator<Filters>;
  changeItem: ActionCreator<{ id: string; key: string; value: any }>;
  changeSearch: ActionCreator<string>;
  toggleItem: ActionCreator<{ coreId: string; value: boolean; isNotValid?: boolean }>;
  toggleAddingSider: ActionCreator<boolean>;
  toggleEditingSider: ActionCreator<{editSider: boolean, coreId?: string}>;
  saveAddingSiderTab: ActionCreator<StrawberryEmployee>;
  saveEditingSiderTab: ActionCreator<StrawberryEmployee>;
  updateEmployeeRole: ActionCreator<{coreID: string; role: EmployeeRole}>;
  createOrUpdateEmployeeSubscription: ActionCreator<StrawberryEmployeeExtended>;
}

export interface EmployeesListProps extends EmployeesListPropsFromStore {
  actions: EmployeesListActions;
}

export interface EmployeesListState {

}
