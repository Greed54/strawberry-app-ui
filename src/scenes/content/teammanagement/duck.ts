import {TeamsManagementStore} from "./types";
import {StrawberryTeam} from "../../../types/schema-types";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {actionCreatorFactory} from 'typescript-fsa';
import {getTeamById} from "./selectors";

const FETCH = 'FETCH';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const SELECT_TEAM = 'SELECT_TEAM';
const TOGGLE_ADDING_SIDER = 'TOGGLE_ADDING_TEAM_SIDER';
const TOGGLE_EDIT_SIDER = 'TOGGLE_EDIT_TEAM_SIDER';
const TOGGLE_SIDER_TAB = 'TOGGLE_SIDER_TAB';
const SET_TEAMS_LOADING = 'SET_TEAMS_LOADING';
const CREATE_OR_UPDATE_TEAM_SUB = 'CREATE_OR_UPDATE_TEAM_SUB';
const CREATE_OR_UPDATE_TEAM_SUCCESS = 'CREATE_OR_UPDATE_TEAM_SUCCESS';

const actionCreator = actionCreatorFactory('teamsmanagement');

export const actions = {
  fetch: actionCreator<void>(FETCH),
  fetchSuccess: actionCreator<StrawberryTeam[]>(FETCH_SUCCESS),
  setTeamsLoading: actionCreator<boolean>(SET_TEAMS_LOADING),
  selectTeam: actionCreator<string>(SELECT_TEAM),
  toggleAddingSider: actionCreator<boolean>(TOGGLE_ADDING_SIDER),
  toggleEditSider: actionCreator<boolean>(TOGGLE_EDIT_SIDER),
  saveSider: actionCreator<StrawberryTeam>(TOGGLE_SIDER_TAB),
  createOrUpdateTeamSubscription: actionCreator<StrawberryTeam>(CREATE_OR_UPDATE_TEAM_SUB),
  createOrUpdateTeamSuccess: actionCreator<any[]>(CREATE_OR_UPDATE_TEAM_SUCCESS),
};

const initialState: TeamsManagementStore = {
  teamsList: [],
  addingSider: false,
  editSider: false,
  teamsLoading: true
};

export default reducerWithInitialState<TeamsManagementStore>(initialState)
.case(
    actions.setTeamsLoading,
    (state, teamsLoading): TeamsManagementStore => ({...state, teamsLoading}),
)
.case(actions.fetchSuccess, (state, payload): TeamsManagementStore => ({
  ...state,
  teamsList: payload,
}))
.case(actions.selectTeam, (state, payload): TeamsManagementStore => ({...state, selectedTeam: getTeamById(payload, state)}))
.case(actions.toggleAddingSider, (state, addingSider): TeamsManagementStore => ({...state, addingSider: addingSider}))
.case(actions.toggleEditSider, (state, editSider): TeamsManagementStore => ({...state, editSider: editSider}))
.case(actions.createOrUpdateTeamSuccess, (state, payload): TeamsManagementStore => ({...state, teamsList: payload}));
