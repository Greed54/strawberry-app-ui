import {Store} from "../../../types/store";
import {bindActionCreators, compose} from "redux";
import {connect} from "react-redux";
import TeamManagement from "./TeamManagement";
import {TeamsManagementActions} from "./types";
import {actions} from "./duck";


const mapStateToProps = (state: Store) => ({
  teamsList: state.teamsManagement.root.teamsList,
  selectedTeam: state.teamsManagement.root.selectedTeam,
  editSider: state.teamsManagement.root.editSider,
  addingSider: state.teamsManagement.root.addingSider,
  teamsLoading: state.teamsManagement.root.teamsLoading
});

const teamsManagementActions: TeamsManagementActions = {
  fetch: actions.fetch,
  setTeamsLoading: actions.setTeamsLoading,
  selectTeam: actions.selectTeam,
  toggleAddingSider: actions.toggleAddingSider,
  toggleEditSider: actions.toggleEditSider,
  saveSider: actions.saveSider,
  createOrUpdateTeamSubscription: actions.createOrUpdateTeamSubscription
};

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(teamsManagementActions as any, dispatch)
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(TeamManagement);
