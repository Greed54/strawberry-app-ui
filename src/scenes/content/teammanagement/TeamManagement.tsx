import React from "react";
import * as styled from './TeamManagement.styles';
import TeamInfo from "../teaminfo/TeamInfo";
import Toolbar from "../toolbar/Toolbar";
import {Link, Route, Switch} from "react-router-dom";
import {TeamsManagementProps, TeamsManagementState, TeamsWrapperProps} from "./types";
import EmployeesList from "./employeeslist/EmployeesListContainer";
import {SiderWrapper} from "../../../components/siderwrapper/SiderWrapper";
import TeamSider from "../siders/team/TeamSider";
import {Subscription} from 'react-apollo';
import {getTeamAfterSub} from "../../../queries/team";
import {UPDATE_STRAWBERRY_TEAMS_ANY} from "../../../subscription/team";
import {StrawberryTeam} from "../../../types/schema-types";

class TeamManagement extends React.Component<TeamsManagementProps, TeamsManagementState> {

  public componentDidMount() {
    this.props.actions.fetch();
  }

  private handleAdd = () => {
    this.props.actions.toggleAddingSider(true);
  };

  private handleCloseAddingSider = () => {
    this.props.actions.toggleAddingSider(false);
  };

  private handleEdit = (coreid: string) => {
    this.props.actions.toggleEditSider(true);
  };

  private handleCloseEditSider = () => {
    this.props.actions.toggleEditSider(false);
  };

  private handleSelectTeam = (coreId: string) => {
    this.props.actions.selectTeam(coreId);
  };

  private onTeamSave = (team: StrawberryTeam) => {
    this.props.actions.saveSider(team);
    this.handleCloseEditSider();
    this.handleCloseAddingSider();
  };

  private onStrawberryTeamCreateOrUpdate = ({subscriptionData}: any) => {
    const {
      updateStrawberryTeamAny: {node},
    } = subscriptionData.data;
    getTeamAfterSub(node.coreID).then((res: any) => {
      const {
        data: {getSTeam}
      } = res;
      this.props.actions.createOrUpdateTeamSubscription(getSTeam);
    });
  };

  render() {
    const {teamsList, addingSider, editSider, selectedTeam, teamsLoading} = this.props;

    return (
        <Subscription
            onSubscriptionData={this.onStrawberryTeamCreateOrUpdate}
            subscription={UPDATE_STRAWBERRY_TEAMS_ANY}>
          {() => (
              <styled.GridLayout>
                <Toolbar savingInProgress={false} isSaveDisable={false} isRemoved={false}/>
                <styled.Content>
                  <TeamInfo teams={teamsList}
                            isTeamManagement={true}
                            handleAdd={this.handleAdd}
                            handleEdit={this.handleEdit}
                            handleSelect={this.handleSelectTeam}
                            isLoading={teamsLoading}/>
                  <Route path={"/teamsmanagement/:teamId"} component={TeamsWrapper}/>
                </styled.Content>
                <SiderWrapper visible={addingSider}
                              onClose={this.handleCloseAddingSider}
                              title={"Add Team"}>
                  <styled.SiderContentContainer>
                    <TeamSider isEdit={false} onTeamSave={this.onTeamSave}/>
                  </styled.SiderContentContainer>
                </SiderWrapper>
                <SiderWrapper visible={editSider}
                              onClose={this.handleCloseEditSider}
                              title={"Edit Team"}>
                  <styled.SiderContentContainer>
                    <TeamSider isEdit={true} sTeam={selectedTeam} onTeamSave={this.onTeamSave}/>
                  </styled.SiderContentContainer>
                </SiderWrapper>
              </styled.GridLayout>
          )}
        </Subscription>
    );
  }
}

class TeamsWrapper extends React.Component<TeamsWrapperProps> {

  public renderContentButton = (name: string, link: string, disable?: boolean) => {
    const {match: {params: {teamId}}, location: {pathname}} = this.props;
    const isActive = pathname === `/teamsmanagement/${teamId}${link}`;
    return (
        <styled.TabButton isActive={isActive} disable={disable}>
          {!disable ? (
              <Link className="tabButton" to={isActive ? `/teamsmanagement/${teamId}` : `/teamsmanagement/${teamId}${link}`}>
                {name}
              </Link>
          ) : (
              <span className="tabButton">{name}</span>
          )}
        </styled.TabButton>
    );
  };

  render() {
    const {match} = this.props;

    return (
        <styled.Wrapper>
          <styled.ButtonWrapper>
            {this.renderContentButton('Employees', '')}
            {this.renderContentButton('Productivity', '/productivity')}
          </styled.ButtonWrapper>
          <Switch>
            <Route path={`${match.url}`} component={(props: any) => <EmployeesList {...props}/>}/>
          </Switch>
        </styled.Wrapper>
    );
  }
}

export default TeamManagement;
