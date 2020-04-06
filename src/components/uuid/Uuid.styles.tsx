import styled from 'styled-components';
import React from "react";
import {SelectProps} from "antd/lib/select";
import {Select as _Select} from "antd";

export const UuidWrapper = styled('div')`
    display: grid;
    background-color: rgba(0, 78, 22, 0.19);
    border: 1px solid #004E16;
    border-radius: 4px;
    height: 151px;
    width: 100%;
`;

export const UuidHeader = styled('div')`
    font-size: 14px;
    font-weight: bold;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
`;

export const InputName = styled('div')`
    font-size: 14px;
    color: #000000;
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
