import * as React from 'react';
import * as styled from './TeamSider.styles';
import {TeamSiderProps, TeamSiderState} from "./types";
import {SiderInput} from "../../../../components/siderinput/SiderInput";
import {SaveButton} from "../../../../components/SaveButton.styles";
import {StrawberryTeam} from "../../../../types/schema-types";
import {uuid} from "../../../../helpers/data";

class TeamSider extends React.PureComponent<TeamSiderProps, TeamSiderState> {

  constructor(props: TeamSiderProps) {
    super(props);
    this.state = {
      team: props.sTeam ? props.sTeam : {
        coreID: '',
        teamName: ''
      }
    }
  }

  private handleTeamNameChange = (e: any) => {
    let value = e.target.value;
    this.setState(prevState => ({
      team: {
        ...prevState.team,
        teamName: value
      }
    }))
  };

  private isSaveDisabled = () => {
    const {team} = this.state;
    return !team.teamName;
  };

  private handleTeamSave = () => {
    const team: StrawberryTeam = {
      coreID: this.props.sTeam ? this.state.team.coreID : uuid(),
      teamName: this.state.team.teamName
    };
    this.props.onTeamSave(team);
  };

  public render() {
    const {team} = this.state;
    return (
        <styled.TeamSiderWrapper>
          <SiderInput inputName={"Team Name"}
                      placeholder={"Team name"}
                      value={team.teamName}
                      onChange={this.handleTeamNameChange}
                      className={"tn-input"}/>
          <styled.SaveWrapper>
            <SaveButton disabled={this.isSaveDisabled()}
                        onClick={this.handleTeamSave}>
              Save
            </SaveButton>
          </styled.SaveWrapper>
        </styled.TeamSiderWrapper>
    );
  }
}

export default TeamSider;
