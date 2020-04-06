import styled from 'styled-components';
import React from "react";
import {CollapseProps} from "antd/lib/collapse";
import { Collapse as _Collapse } from 'antd';

const _Panel = _Collapse.Panel;

export const EmployeeSiderWrapper = styled('div')`
    display: grid;
`;

export const Collapse = styled<CollapseProps>(props => <_Collapse {...props} />)`
    margin: 10px 0;
    border: #fff;
`;

export const UuidPanel = styled(_Panel)`
    .ant-collapse-header {
        padding: 0 !important;
    }
    .ant-collapse-content-box {
        padding: 0;
        margin: 13px 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const UuidPanelHeader = styled('div')`
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 14px 8px 12px 32px;
    font-weight: bold;
    justify-content: space-between;
`;

export const SaveWrapper = styled('div')`
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
