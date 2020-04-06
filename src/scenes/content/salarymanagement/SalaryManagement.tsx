import React from "react";
import * as styled from './SalaryManagement.styles';
import TeamInfo from "../teaminfo/TeamInfo";
import Content from "../Content";
import Toolbar from "../toolbar/Toolbar";
import {StrawberryTeam} from "../../../types/schema-types";

class SalaryManagement extends React.Component {

  render() {
    const teams: Array<StrawberryTeam> = [
      {
        coreID: "1",
        teamName: "Team 1"
      },
      {
        coreID: "2",
        teamName: "Team 2"
      }
    ];

    return (
        <styled.GridLayout>
          <Toolbar savingInProgress={false} isSaveDisable={false} isRemoved={false}/>
          <styled.Content>
            <TeamInfo teams={teams} isTeamManagement={false} handleEdit={() => ''} handleAdd={() => ''} handleSelect={() => ''} isLoading={true}/>
            <Content></Content>
          </styled.Content>
        </styled.GridLayout>
    );
  }
}

export default SalaryManagement;
