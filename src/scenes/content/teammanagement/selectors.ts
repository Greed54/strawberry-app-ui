import {createSelector} from 'reselect';
import {Store} from "../../../types/store";
import {TeamsManagementStore} from "./types";

export const getSelectedTeamSelector = (state: Store) => state.teamsManagement.root.selectedTeam;
export const getTeamsSelector = (state: Store) => state.teamsManagement.root.teamsList;
const getTeams = (store: TeamsManagementStore) => store.teamsList;

export const getStrawberryTeams = createSelector(getTeams, teams => teams);

export function getTeamById(coreId: string, state: TeamsManagementStore) {
  return getStrawberryTeams(state).filter(team => team.coreID === coreId).pop();
}
