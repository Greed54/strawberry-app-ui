import * as React from 'react';
import * as styled from './SiderInput.styles';
import {InputProps} from "antd/lib/input";
import {SelectProps} from "antd/lib/select";

interface SiderInputProps extends InputProps {
  inputName: string;
}

export class SiderInput extends React.Component<SiderInputProps> {

  render() {
    const {inputName, placeholder, value, className, onChange} = this.props;

    return (
        <styled.LineWrapper>
          <styled.InputWrapper>
            <styled.InputName>
              {inputName}
            </styled.InputName>
            <styled.Input placeholder={placeholder}
                          value={value}
                          onChange={onChange}
                          className={className}/>
          </styled.InputWrapper>
        </styled.LineWrapper>
    );
  }
}

interface SiderSelectProps extends SelectProps {
  selectName: string;

  renderOptions(): any;
}

export class SiderSelect extends React.Component<SiderSelectProps> {
  render() {
    const {selectName, placeholder, onSelect, showSearch, renderOptions, defaultValue} = this.props;

    return (
        <styled.LineWrapper>
          <styled.InputWrapper>
            <styled.InputName>
              {selectName}
            </styled.InputName>
            <styled.Select defaultValue={defaultValue}
                           placeholder={placeholder}
                           optionFilterProp="children"
                           showSearch={showSearch}
                           onSelect={onSelect}
                           dropdownMatchSelectWidth={false}>
              {renderOptions()}
            </styled.Select>
          </styled.InputWrapper>
        </styled.LineWrapper>
    );
  }
}
