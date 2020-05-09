import {SelectedValueType} from "../../../../components/search/Search";
import {MultiSearchOption, WorkDaysActions} from "../types";
import {WorkDaysListFilter} from "../../../../types/schema-types";

export interface ToolbarProps {
  actions?: WorkDaysActions;
  multiSearchOptions: MultiSearchOption;
  search: SelectedValueType[];
  filters: WorkDaysListFilter;
  periodFilter: string[];
  periodOption: string;
  group: string;
}

export interface ToolbarState {
  dates: any[];
  widthWindow: number;
}
