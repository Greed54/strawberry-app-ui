import actionCreatorFactory from 'typescript-fsa';
import {EmployeeListFromStore, Filters} from './types';
import {reducerWithInitialState} from 'typescript-fsa-reducers';
import {StrawberryEmployee, StrawberryEmployeeExtended} from "../../../../types/schema-types";
import {getEmployeeById} from "./selectors";


const actionCreator = actionCreatorFactory('teamsmanagement/employeeslist');

const TOGGLE_ITEMS_FILTER = 'TOGGLE_ITEMS_FILTER';
const FETCH = 'FETCH';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const CHANGE_ITEM = 'CHANGE_ITEM';
const TOGGLE_ITEM = 'TOGGLE_ITEM';
const TOGGLE_ITEM_SUCCESS = 'TOGGLE_ITEM_SUCCESS';
const CHANGE_SEARCH = 'CHANGE_SEARCH';
const TOGGLE_ADDING_SIDER = 'TOGGLE_ADDING_SIDER';
const TOGGLE_EDITING_SIDER = 'TOGGLE_EDITING_SIDER';
const TOGGLE_ADDING_SIDER_TAB = 'TOGGLE_ADDING_SIDER_TAB';
const TOGGLE_EDITING_SIDER_TAB = 'TOGGLE_EDITING_SIDER_TAB';
const CREATE_OR_UPDATE_EMPLOYEE_SUB = 'CREATE_OR_UPDATE_EMPLOYEE_SUB';
const CREATE_OR_UPDATE_EMPLOYEE_SUCCESS = 'CREATE_OR_UPDATE_EMPLOYEE_SUCCESS';

export const actions = {
  fetch: actionCreator<void>(FETCH),
  fetchSuccess: actionCreator<StrawberryEmployeeExtended[]>(FETCH_SUCCESS),
  toggleFilter: actionCreator<Filters>(TOGGLE_ITEMS_FILTER),
  changeItem: actionCreator<{ id: string; key: string; value: string | number | boolean }>(CHANGE_ITEM),
  changeSearch: actionCreator<string>(CHANGE_SEARCH),
  toggleItem: actionCreator<{ coreId: string; value: boolean; isNotValid?: boolean; }>(TOGGLE_ITEM),
  toggleItemSuccess: actionCreator<any>(TOGGLE_ITEM_SUCCESS),
  toggleAddingSider: actionCreator<boolean>(TOGGLE_ADDING_SIDER),
  toggleEditingSider: actionCreator<{ editSider: boolean, coreId?: string }>(TOGGLE_EDITING_SIDER),
  saveAddingSiderTab: actionCreator<StrawberryEmployee>(TOGGLE_ADDING_SIDER_TAB),
  saveEditingSiderTab: actionCreator<StrawberryEmployee>(TOGGLE_EDITING_SIDER_TAB),
  createOrUpdateEmployeeSubscription: actionCreator<StrawberryEmployee>(CREATE_OR_UPDATE_EMPLOYEE_SUB),
  createOrUpdateEmployeeSuccess: actionCreator<any[]>(CREATE_OR_UPDATE_EMPLOYEE_SUCCESS),
};

const initialState: EmployeeListFromStore = {
  itemFilter: Filters.ALL_ITEMS,
  employeeList: [],
  sorting: undefined,
  search: '',
  editSider: false,
  addingSider: false
};

export default reducerWithInitialState<EmployeeListFromStore>(initialState)
.case(actions.fetchSuccess, (state, employees): EmployeeListFromStore => ({...state, employeeList: employees}))
.case(actions.toggleFilter, (state, itemFilter): EmployeeListFromStore => ({...state, itemFilter}))
.case(actions.changeSearch, (state, search): EmployeeListFromStore => ({...state, search}))
.case(actions.toggleAddingSider, (state, addingSider): EmployeeListFromStore => ({...state, addingSider}))
.case(actions.toggleEditingSider, (state, {editSider, coreId}): EmployeeListFromStore => ({
  ...state,
  editSider,
  editingEmployee: getEmployeeById(coreId, state)
}))
.case(actions.changeItem,
    (state, {id, key, value}): EmployeeListFromStore => ({
      ...state,
      employeeList: state.employeeList.map(e =>
          e.coreID === id ? {...e, [key]: value} : e)
    }))
.case(actions.toggleItem,
    (state, {coreId, value}): EmployeeListFromStore => ({
      ...state,
      employeeList: state.employeeList.map(e =>
          e.coreID === coreId ? {...e, selected: value} : e)
    }));

