import * as React from 'react';
import * as styled from './Uuid.styles';
import {Select} from "antd";

const {Option} = Select;

interface UuidState {
  comPort: string;
}

class Uuid extends React.Component<any, UuidState> {

  private handleComChange = (e: any) => {
    let value = e;
    this.setState(prevState => ({
      comPort: value
    }));
  };

  private renderComOptions = () => {
    return [
      <Option key={'1'}>{"COM 1"}</Option>,
      <Option key={'2'}>{"COM 2"}</Option>
    ]
  };

  render() {
    return (
        <styled.UuidWrapper>
          <styled.UuidHeader>
            <span>Change UUID</span>
          </styled.UuidHeader>
          <styled.InputWrapper>
            <styled.InputName>
              Select Com-port
            </styled.InputName>
            <styled.Select placeholder="Select COM"
                           optionFilterProp="children"
                           showSearch={false}
                           value={""}
                           onSelect={this.handleComChange}
                           dropdownMatchSelectWidth={false}>
              {this.renderComOptions()}
            </styled.Select>
          </styled.InputWrapper>
        </styled.UuidWrapper>
    );
  }

}

export default Uuid;
