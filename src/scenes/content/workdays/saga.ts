import {call, put, select} from "redux-saga/effects";
import {safeTakeEvery} from "../../../helpers/saga";
import {actions} from "./duck";
import {getWorkDaysListFilters, getWorkDaysListSelector} from "./selectors";
import {getWorkDaysList} from "../../../queries/workday";
import {MultiSearchEmployeeOptions, StrawberryWorkDay} from "../../../types/schema-types";
import {calculateKilogramsByWorkDay, calculateSalaryByWorkDay, reduceWeightNumbers} from "../../../helpers/data";
import {getSearchWorkDaysOptions} from "../../../queries/autoComplete";
import {MultiSearchOption} from "./types";

function* fetch() {
  yield put(actions.setLoading());
  const objectSearch = yield select(getWorkDaysListFilters);
  const workDaysList = yield call(getWorkDaysList, objectSearch);
  const {data: {getSWorkDays}} = workDaysList;
  const workDays: Array<StrawberryWorkDay> = getSWorkDays;
  const workDaysTypes: any = workDays.flatMap((wd: StrawberryWorkDay) => {
    return wd.teams?.flatMap((team) => {
      return team.employees?.flatMap((employee) => {
        return {
          coreID: wd.coreID,
          date: wd.date,
          employeeCoreID: employee.coreID,
          employeeName: `${employee.firstName} ${employee.lastName}`,
          teamName: employee.team.teamName,
          cardId: employee.cardId,
          weightNumbers: reduceWeightNumbers(employee, wd.coreID),
          note: employee.note,
          employeeRole: employee.employeeRole,
          pricePerKilo: wd.pricePerKilo,
          tareWeight: wd.tareWeight,
          boxes: employee.boxes?.length,
          kilograms: calculateKilogramsByWorkDay(employee, wd.coreID),
          allSalarys: calculateSalaryByWorkDay(employee, wd.coreID)
        }
      })
    });
  });
  yield put(actions.fetchSuccess(workDaysTypes));
}

function* fetchSearchOptions({payload}: any) {
  const searchValue = payload.toLocaleLowerCase();
  const objectSearch = yield select(getWorkDaysListSelector);
  const {data} = yield call(getSearchWorkDaysOptions, searchValue);
  const multiSearchOptions: MultiSearchOption = {
    name: data.getSEmployeeOptions.map((e: MultiSearchEmployeeOptions) => `${e.firstName} ${e.lastName}`),
    uuid: data.getSEmployeeOptions.map((e: MultiSearchEmployeeOptions) => e.cardId),
    note: data.getSEmployeeOptions.map((e: MultiSearchEmployeeOptions) => e.note),
    teamName: data.getSEmployeeOptions.map((e: MultiSearchEmployeeOptions) => e.team?.teamName)
  };
  yield put(actions.fetchMultySearchOptionsSuccess(multiSearchOptions));
}

export function* saga() {
  yield safeTakeEvery([
    actions.fetch.type,
    actions.changeSearch.type,
    actions.changePeriodFilter.type,
    actions.changePeriodOption.type,
  ], fetch);
  yield safeTakeEvery(actions.fetchMultySearchOptions.type, fetchSearchOptions);
}
