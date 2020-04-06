import * as React from 'react';
import styled from '../../configs/theme';
import { DrawerProps } from 'antd/lib/drawer';
import { Drawer as _Drawer } from 'antd';

export const Container = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export const Drawer = styled<DrawerProps>(props => <_Drawer {...props} />)`
    .ant-drawer-wrapper-body {
        overflow: hidden !important;
    }
    .ant-drawer-body {
        padding: 0;
        height: calc(100% - 55px); // 55px - header size
    }
`;
