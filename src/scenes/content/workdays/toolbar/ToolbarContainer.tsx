import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions} from '../duck';
import {Store} from "../../../../types/store";
import {ToolbarProps} from "./types";
import {getWorkDaysListFilters} from "../selectors";
import {getMultiSearchOptions, getPeriodFilter, getPeriodOption} from "./selectors";
import Toolbar from "./Toolbar";

const mapStateToProps = (state: Store): ToolbarProps => ({
  multiSearchOptions: getMultiSearchOptions(state),
  search: state.workDays.search,
  filters: getWorkDaysListFilters(state),
  periodOption: getPeriodOption(state),
  periodFilter: getPeriodFilter(state),
  group: state.workDays.group
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(
      {
        ...actions
      },
      dispatch
  )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);

