import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Store} from "../../../types/store";
import WorkDays from "./WorkDays";
import {WorkDaysActions} from "./types";
import {actions} from "./duck";
import {actions as employeeActions} from "../teammanagement/employeeslist/duck";
import {getWorkDaysListFilters} from "./selectors";

const mapStateToProps = (state: Store) => ({
  isLoading: state.workDays.isLoading,
  sorting: state.workDays.sorting,
  group: state.workDays.group,
  workDayList: state.workDays.workDayList,
  filters: getWorkDaysListFilters(state)
});

const workDaysActions: WorkDaysActions = {
  fetch: actions.fetch,
  updateEmployeeRole: employeeActions.updateEmployeeRole,
  changeSearch: actions.changeSearch,
  fetchMultySearchOptions: actions.fetchMultySearchOptions,
  clearMultySearchOptions: actions.clearMultySearchOptions,
  group: actions.group,
  changePeriodFilter: actions.changePeriodFilter,
  changePeriodOption: actions.changePeriodOption
};

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(workDaysActions as any, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkDays);
