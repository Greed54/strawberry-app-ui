import {Store} from "../../../../types/store";
import {bindActionCreators} from 'redux';
import {EmployeesListActions, EmployeesListPropsFromStore} from "./types";
import {actions} from './duck';
import EmployeesList from "./EmployeesList";
import {connect} from "react-redux";


const mapStateToProps = (state: Store): EmployeesListPropsFromStore => ({
  itemFilter: state.teamsManagement.employeesList.itemFilter,
  dataSource: state.teamsManagement.employeesList.employeeList,
  editingEmployee: state.teamsManagement.employeesList.editingEmployee,
  teams: state.teamsManagement.root.teamsList,
  selectedTeam: state.teamsManagement.root.selectedTeam,
  groupNamesOrder: [''],
  search: state.teamsManagement.employeesList.search,
  sorting: state.teamsManagement.employeesList.sorting,
  editSider: state.teamsManagement.employeesList.editSider,
  addingSider: state.teamsManagement.employeesList.addingSider,
});

const employeesListActions: EmployeesListActions = {
  fetch: actions.fetch,
  toggleFilter: actions.toggleFilter,
  changeItem: actions.changeItem,
  changeSearch: actions.changeSearch,
  toggleItem: actions.toggleItem,
  toggleAddingSider: actions.toggleAddingSider,
  toggleEditingSider: actions.toggleEditingSider,
  saveAddingSiderTab: actions.saveAddingSiderTab,
  saveEditingSiderTab: actions.saveEditingSiderTab,
  createOrUpdateEmployeeSubscription: actions.createOrUpdateEmployeeSubscription,
  updateEmployeeRole: actions.updateEmployeeRole
};

// @ts-ignore
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(employeesListActions as any, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesList)
