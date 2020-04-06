import * as React from 'react';
import {EditEmployeeProps, EditEmployeeState} from "./types";
import * as styled from './EmployeeSider.styles';
import {SiderInput, SiderSelect} from "../../../../components/siderinput/SiderInput";
import {Select} from "antd";
import Notes from "../../../../components/notes/Notes";
import {SaveButton} from "../../../../components/SaveButton.styles";
import Uuid from "../../../../components/uuid/Uuid";
import {StrawberryTeam} from "../../../../types/schema-types";
import {uuid} from "../../../../helpers/data";

const {Option} = Select;

class EmployeeSider extends React.PureComponent<EditEmployeeProps, EditEmployeeState> {

  constructor(props: EditEmployeeProps) {
    super(props);
    this.state = {
      employee: props.employee || {
        coreID: '',
        lastName: '',
        firstName: '',
        cardId: uuid(),
        note: ''
      }
    }
  }

  private handleFirstNameChange = (e: any) => {
    let value = e.target.value;
    this.setState(prevState => ({
      employee: {
        ...prevState.employee,
        firstName: value
      }
    }));
  };

  private handleLastNameChange = (e: any) => {
    let value = e.target.value;
    this.setState(prevState => ({
      employee: {
        ...prevState.employee,
        lastName: value
      }
    }));
  };

  private handleTeamChange = (e: any) => {
    let value = e;
    const {teams} = this.props;
    const team = teams.find((team: StrawberryTeam) => team.coreID === value);
    // @ts-ignore
    this.setState(prevState => ({
      employee: {
        ...prevState.employee,
        team: team
      }
    }));
  };

  private handleNoteChange = (note: string) => {
    this.setState(prevState => ({
      employee: {
        ...prevState.employee,
        note: note
      }
    }))
  };

  private renderTeamsOptions = () => {
    return this.props.teams.map((team: StrawberryTeam) => <Option key={team.coreID} value={team.coreID}>{team.teamName}</Option>);
  };

  private renderUuidHeader = (cardId: string) => {
    return (
        <styled.UuidPanelHeader>
          <span>UUID: {cardId}</span>
        </styled.UuidPanelHeader>
    );
  };

  private isSaveDisabled = () => {
    const {employee} = this.state;
    return !(employee.lastName && employee.firstName && employee.cardId && employee.team);
  };

  public render() {
    const {onSave, selectedTeam} = this.props;
    const {employee} = this.state;
    debugger
    return (
        <styled.EmployeeSiderWrapper>
          <SiderInput inputName={"First Name"}
                      placeholder={"First name"}
                      value={employee.firstName}
                      onChange={this.handleFirstNameChange}
                      className={"fn-input"}/>
          <SiderInput inputName={"Last Name"}
                      placeholder={"Last name"}
                      value={employee.lastName}
                      onChange={this.handleLastNameChange}
                      className={"ln-input"}/>
          <SiderSelect selectName={"Team"}
                       defaultValue={selectedTeam ? selectedTeam.coreID : undefined}
                       renderOptions={this.renderTeamsOptions}
                       placeholder="Team"
                       showSearch={true}
                       onSelect={this.handleTeamChange}/>
          <styled.Collapse defaultActiveKey={"1"}>
            <styled.UuidPanel key={"1"} header={this.renderUuidHeader(employee.cardId)}>
              <Uuid/>
            </styled.UuidPanel>
          </styled.Collapse>
          <Notes handleChange={this.handleNoteChange} value={employee.note}/>
          <styled.SaveWrapper>
            <SaveButton
                disabled={this.isSaveDisabled()}
                onClick={() => onSave(employee)}
            >
              Save
            </SaveButton>
          </styled.SaveWrapper>
        </styled.EmployeeSiderWrapper>
    );
  }
}

export default EmployeeSider;
