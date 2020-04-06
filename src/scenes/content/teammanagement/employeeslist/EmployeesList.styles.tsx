import styled from 'styled-components';
import {Button, Checkbox, Icon, Layout, Radio} from 'antd';
import {NativeButtonProps} from "antd/lib/button/button";
import * as React from "react";
import {RadioButtonProps} from "antd/lib/radio/radioButton";
import {IconProps} from "antd/lib/icon";
import {CheckboxProps} from "antd/lib/checkbox/Checkbox";

const {Button: _Radio} = Radio;

export const LayoutTop = styled(Layout)``;

interface EditIconProps extends IconProps {
  isActiveIcon: boolean;
}

export const Toolbar = styled('div')`
    height: ${p => p.theme.size.headerHeight}!important;
    width: 100%;
    padding: 0 16px;
    align-items: center;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    margin-right: ${p => p.theme.margin.small};
`;

export const AddButton = styled<NativeButtonProps>(props => <Button {...props} />)`
    padding: 5px !important;
    color: ${p => p.theme.colors.baseLightGreen}
    &:hover {
      color: #30B097;
      border-color: #30B097;
    }
    &:focus {
      color: #30B097;
      border-color: #30B097;
    }
    &:active {
      color: ${p => p.theme.colors.baseGreen};
      border-color: ${p => p.theme.colors.baseGreen};
    }
`;

export const RadioButton = styled<RadioButtonProps>(props => <_Radio {...props}/>)`
    &:hover {
      color: #30B097;
      border-color: #30B097;
    }
    &:focus {
      color: #30B097;
      border-color: #30B097;
    }
    &:active {
      color: ${p => p.theme.colors.baseGreen};
      border-color: ${p => p.theme.colors.baseGreen};
    }
`;

export const TableWrapper = styled.div`
    display: flex;
    flex: auto;
    background-color: #fff;
`;

export const CheckBox = styled<CheckboxProps>(props => <Checkbox {...props}/>)`
    .ant-checkbox .ant-checkbox-input {
      $:focus {
        border-color: ${p => p.theme.colors.baseLightGreen};
      }
      $:hover {
        border-color: ${p => p.theme.colors.baseLightGreen};
      }
    }
    $:hover {
        border-color: ${p => p.theme.colors.baseLightGreen};
    }
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${p => p.theme.colors.baseLightGreen};
      border-color: ${p => p.theme.colors.baseLightGreen};
    }
`;

export const Cell = styled('div')<{ width?: number }>`
    min-width: ${p => p.width}px;
    width: ${p => p.width}px;
    display: flex;
    align-items: center;
    padding: 0 5px 0 15px;
`;

export const Block = styled.div`
    display: flex;
    align-items: center;
    margin-left: 16px;
`;

export const IconEditContainer = styled('div')`
    height: 35px;
    width: 16px;
    padding: 8px 0;
    text-align: center;
    cursor: pointer;
`;

export const IconEdit = styled<EditIconProps>(props => <Icon {...props} theme={"filled"}/>)`
    color: ${p => p.isActiveIcon ? p.theme.colors.baseLightGreen : p.theme.colors.gray};
    font-size: 20px;
`;

export const IconRemove = styled<EditIconProps>(props => <Icon {...props} theme={"filled"}/>)`
    color: ${p => p.isActiveIcon ? "#F5222D" : p.theme.colors.gray};
    font-size: 20px;
`;

export const GroupAllCell = styled('div')<{ width: number }>`
    min-width: ${p => p.width}px;
    max-width: ${p => p.width}px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: #f2f2f2;
    }
`;

export const SiderContentContainer = styled.div`
    height: 100%;
    overflow-y: auto;
    padding: 16px 24px;
`;

