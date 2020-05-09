import {SelectedValueType} from "../../../components/search/Search";
import {Sorting, WorkDaysListFilter, WorkDaysType} from "../../../types/schema-types";
import {ActionCreator} from 'typescript-fsa';
import {EmployeeRole} from "../../../../server/src/api/employee";

export interface WorkDaysStore {
  isLoading: boolean;
  multiSearchOptions: MultiSearchOption;
  search: SelectedValueType[];
  workDayList: WorkDaysType[];
  filters: WorkDaysListFilter;
  group: string;
  periodOption: string;
  periodFilter: string[];
  sorting?: Sorting;
}

export interface WorkDaysActions {
  fetch: ActionCreator<void>;
  fetchMultySearchOptions: ActionCreator<string>;
  clearMultySearchOptions: ActionCreator<void>;
  updateEmployeeRole: ActionCreator<{coreID: string; role: EmployeeRole}>;
  changeSearch: ActionCreator<any>;
  group: ActionCreator<string>;
  changePeriodFilter: ActionCreator<string[]>;
  changePeriodOption: ActionCreator<string>;
}

export interface WorkDaysProps extends WorkDaysStore {
  actions: WorkDaysActions;
}

export interface MultiSearchOption {
  name?: string[];
  uuid?: string[];
  note?: string[];
  teamName?: string[];
}
