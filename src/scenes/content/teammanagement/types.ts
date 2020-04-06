import {RouteComponentProps} from "react-router-dom";
import {StrawberryTeam} from "../../../types/schema-types";
import {ActionCreator} from "typescript-fsa";

export interface TeamsManagementStore {
  teamsList: StrawberryTeam[];
  selectedTeam?: StrawberryTeam;
  editSider: boolean;
  addingSider: boolean;
  teamsLoading: boolean;
}

export interface TeamsManagementActions {
  fetch: ActionCreator<void>;
  setTeamsLoading: ActionCreator<boolean>;
  selectTeam: ActionCreator<string>;
  toggleAddingSider: ActionCreator<boolean>;
  toggleEditSider: ActionCreator<boolean>;
  saveSider: ActionCreator<StrawberryTeam>;
  createOrUpdateTeamSubscription: ActionCreator<StrawberryTeam>;
}

export interface TeamsManagementProps extends TeamsManagementStore {
  actions: TeamsManagementActions;
}

export interface TeamsWrapperProps extends RouteComponentProps<{ teamId: string }> {

}

export interface TeamsManagementState {
  selectedTeamId: string;
  isLoading: boolean;
}
