import {actionCreatorFactory} from 'typescript-fsa';
import {reducerWithInitialState} from 'typescript-fsa-reducers';
import {WorkDaysType} from "../../../types/schema-types";
import {WorkDaysStore} from "./types";
import moment from 'moment';
import {date} from "../../../helpers/format";
import { uniq } from 'lodash';
import {groupingTransform} from "./selectors";
import {rangeInDays} from "../../../helpers/data";
import {DATE_FORMAT} from "../../../configs/const";

const FETCH = 'FETCH';
const SET_LOADING = 'SET_LOADING';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const CHANGE_SEARCH = 'CHANGE_SEARCH';
const FETCH_MULTI_SEARCH_OPTIONS = 'FETCH_MULTI_SEARCH_OPTIONS';
const FETCH_MULTI_SEARCH_OPTIONS_SUCCESS = 'FETCH_MULTI_SEARCH_OPTIONS_SUCCESS';
const CLEAR_MULTI_SEARCH_OPTIONS = 'CLEAR_MULTI_SEARCH_OPTIONS';
const GROUP = 'GROUP';
const CHANGE_PERIOD_FILTER = 'CHANGE_PERIOD_FILTER';
const CHANGE_PERIOD_OPTION = 'CHANGE_PERIOD_OPTION';

const actionCreator = actionCreatorFactory('workdays');

export const actions = {
  fetch: actionCreator<void>(FETCH),
  setLoading: actionCreator<void>(SET_LOADING),
  fetchSuccess: actionCreator<WorkDaysType[]>(FETCH_SUCCESS),
  changeSearch: actionCreator<any>(CHANGE_SEARCH),
  fetchMultySearchOptions: actionCreator<string>(FETCH_MULTI_SEARCH_OPTIONS),
  fetchMultySearchOptionsSuccess: actionCreator<any>(FETCH_MULTI_SEARCH_OPTIONS_SUCCESS),
  clearMultySearchOptions: actionCreator<void>(CLEAR_MULTI_SEARCH_OPTIONS),
  group: actionCreator<string>(GROUP),
  changePeriodFilter: actionCreator<string[]>(CHANGE_PERIOD_FILTER),
  changePeriodOption: actionCreator<string>(CHANGE_PERIOD_OPTION),
};

const initialState: WorkDaysStore = {
  search: [],
  multiSearchOptions: {},
  isLoading: false,
  workDayList: [],
  filters: {},
  group: 'date',
  sorting: undefined,
  periodOption: '2',
  periodFilter: [date(), date(moment().add(1, 'days'))]
};


export default reducerWithInitialState(initialState)
.case(actions.setLoading, (state): WorkDaysStore => ({
  ...state,
  isLoading: true
}))
.case(actions.fetchSuccess, (state, payload): WorkDaysStore => ({
  ...state,
  workDayList: payload,
  isLoading: false
}))
.case(actions.changeSearch, (state, payload): WorkDaysStore => ({...state, search: payload}))
.case(actions.fetchMultySearchOptionsSuccess, (state, data): WorkDaysStore => ({ ...state, multiSearchOptions: data }))
.case(actions.clearMultySearchOptions, state => ({ ...state, multiSearchOptions: {} }))
.case(actions.group, (state, payload) => ({
  ...state,
  group: payload,
  expandedCategory: uniq(state.workDayList.map((wd) => moment.utc(wd.date).format(DATE_FORMAT))),
}))
.case(actions.changePeriodFilter, (state, payload) => ({
  ...state,
  periodFilter: payload,
  periodOption:
      date(moment()) === payload[0] && [1, 2, 4, 7].includes(rangeInDays(payload))
          ? `${rangeInDays(payload)}`
          : 'custom',
}))
.case(actions.changePeriodOption, (state, payload) => ({
  ...state,
  periodOption: payload,
  periodFilter:
      payload === 'custom' ? state.periodFilter : [date(), date(moment().add(parseInt(payload, 10) - 1, 'days'))],
}));
