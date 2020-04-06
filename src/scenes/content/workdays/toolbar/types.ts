import {SearchOption, SelectedValueType} from "../../../../components/search/Search";

export interface ToolbarProps {
  multiSearchOptions: SearchOption;
  search: SelectedValueType[];
  periodFilter: string[];
  periodOption: string;
}

export interface ToolbarState {
  dates: any[];
  widthWindow: number;
}
