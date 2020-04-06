import * as React from 'react';
import * as styled from './TeamInfo.styles';
import {List, Skeleton} from "antd";
import {compose} from 'redux';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {StrawberryTeam} from "../../../types/schema-types";


interface TeamInfoProps extends RouteComponentProps<{ teamId: string }> {
  isTeamManagement?: boolean;
  teams: Array<StrawberryTeam>;
  isLoading: boolean;

  handleAdd(): void;

  handleEdit(coreId: string): void;

  handleSelect(coreId: string): void;
}

interface TeamInfoState {
  selectedTeam: string;
}


class TeamInfo extends React.Component<TeamInfoProps, TeamInfoState> {

  public render() {
    const {isTeamManagement, teams, handleAdd, handleEdit, handleSelect, isLoading} = this.props;
    const headerText = isTeamManagement ? 'Team management' : 'Salary management';
    const activeLink = isTeamManagement ? '/teamsmanagement/' : '/salarymanagement/';
    return (
        <styled.Container>
          <styled.Header>
            {headerText}
            {isTeamManagement ?
                <styled.LinkButton type="link" onClick={(handleAdd)}>
                  + Add team
                </styled.LinkButton> : null}
          </styled.Header>
          <List itemLayout="horizontal"
                dataSource={teams}
                renderItem={item => (
                    <styled.ListItem key={item.coreID} onDoubleClick={() => handleEdit(item.coreID)}>
                      <Skeleton loading={isLoading} active>
                        <styled.Link to={activeLink + item.coreID} onClick={() => handleSelect(item.coreID)}>
                          {item.teamName}
                        </styled.Link>
                      </Skeleton>
                    </styled.ListItem>
                )}>
          </List>
        </styled.Container>
    )
  }
}

export default compose(withRouter)(TeamInfo);
