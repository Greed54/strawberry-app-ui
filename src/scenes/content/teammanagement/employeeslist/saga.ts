import {call, put, select} from "redux-saga/effects";
import {actions} from "./duck";
import {getSelectedTeamSelector} from "../selectors";
import {getStrawberryEmployees} from "../../../../queries/employee";
import {StrawberryEmployee, StrawberryEmployeeExtended} from "../../../../types/schema-types";
import {safeTakeEvery} from "../../../../helpers/saga";
import {Action} from "typescript-fsa";
import {AddEmployeeCommand, AmendEmployeeCommand} from "../../../../../server/src/api/employee";
import {recordKey, recordUUID, recordValue} from "../../../../helpers/data";
import moment from "moment";
import {addStrawberryEmployee, amendStrawberryEmployee} from "../../../../mutation/employee";

const userId = "6ded5d05-8996-4146-97f6-2f83984b20f6";

function* fetch() {
  const selectedTeam = yield select(getSelectedTeamSelector);
  const employees = yield call(getStrawberryEmployees, selectedTeam ? selectedTeam.coreID : '');
  const {data: {getSEmployeesByTeamId}} = employees;
  const extendedEmployees: StrawberryEmployeeExtended[] = getSEmployeesByTeamId.map((employee: StrawberryEmployee) => ({
    ...employee,
    fullName: `${employee.firstName} ${employee.lastName}`,
    selected: false,
    boxesForAllTime: 0,
    salaryForAllTime: 0,
    _isRowClickable: true
  }));

  yield put(actions.fetchSuccess(extendedEmployees));
}

function* saveStrawberryEmployee(action: Action<StrawberryEmployee>) {
  const employee = action.payload;
  const addEmployeeCommand: AddEmployeeCommand = {
    identity: recordUUID(),
    cardId: recordKey(employee.cardId),
    firstName: employee.firstName,
    lastName: employee.lastName,
    teamId: recordValue(employee.team.coreID),
    note: employee.note,
    createdAt: moment.utc().format(),
    createdBy: recordKey(userId)
  };

  debugger
  yield call(addStrawberryEmployee, addEmployeeCommand)
}

function* updateStrawberryEmployee(action: Action<StrawberryEmployee>) {
  const employee = action.payload;
  const amendEmployeeCommand: AmendEmployeeCommand = {
    identity: recordValue(employee.coreID),
    cardId: recordKey(employee.cardId),
    firstName: employee.firstName,
    lastName: employee.lastName,
    teamId: recordValue(employee.team.coreID),
    note: employee.note,
    modifiedAt: moment.utc().format(),
    modifiedBy: recordKey(userId)
  };

  debugger
  yield call(amendStrawberryEmployee, amendEmployeeCommand)
}

export function* saga() {
  yield safeTakeEvery(actions.fetch.type, fetch);
  yield safeTakeEvery(actions.saveAddingSiderTab.type, saveStrawberryEmployee);
  yield safeTakeEvery(actions.saveEditingSiderTab.type, updateStrawberryEmployee);
}

