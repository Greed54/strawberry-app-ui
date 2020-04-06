import styled from 'styled-components';
import React from "react";
import {InputProps} from "antd/lib/input/Input";
import {Input as _Input, Select as _Select} from "antd";
import {SelectProps} from "antd/lib/select";

export const LineWrapper = styled.div`
    &:after {
      content: " ";
      display: block;
      height: 1px;
      background: rgba(0, 0, 0, 0.09);
      width: 75%;
      left: 100%;
      top: calc(50% - 2px);
      margin: 10px 0;
    }
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 15px;
`;

export const InputName = styled('div')`
    font-size: 18px;
    color: #000000;
`;

export const Input = styled<InputProps>(props => <_Input {...props} allowClear/>)`
    width: 191px;
    height: 32px;
    &:hover {
        border-color: #30B097;
    }
    .ant-input {
      &:hover {
        border-color: #30B097;
      }
      &:focus {
        border-color: #30B097;
        box-shadow: 0 0 0 2px rgba(141, 228, 228, 0.2);
      }
    }
`;


export const Select = styled<SelectProps>(props => <_Select {...props}/>)`
    width: 191px;
    height: 32px;
    .ant-select-selection {
      &:hover {
        border-color: #30B097;
      }
      &:active {
        border-color: #30B097;
        box-shadow: 0 0 0 2px rgba(141, 228, 228, 0.2);
      }
      &:focus {
        border-color: #30B097;
        box-shadow: 0 0 0 2px rgba(141, 228, 228, 0.2);
      }
    }
`;
