import * as React from 'react';
import styled from 'styled-components';
import { Layout as _Layout, Menu as _Menu } from 'antd';
import {SiderProps} from "antd/lib/layout";
import { MenuProps } from 'antd/lib/menu';

const { Header: _Header, Sider: _Sider } = _Layout;

const { Item: _MenuItem } = _Menu;

export const MenuItem = styled(_MenuItem)`
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: row;
`;

export const Menu = styled<MenuProps>(props => <_Menu {...props} theme="light" />)``;

export const Sider = styled<SiderProps>(props => <_Sider {...props} />)`
    background: ${p => p.theme.colors.baseGreen};
    .ant-menu-inline .ant-menu-item,
    .ant-menu-inline .ant-menu-submenu-title {
        margin: 0 !important;
    }
    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
        background-color: rgba(141, 228, 228, 0.3);
    }
    .ant-menu-item-selected > a, .ant-menu-item-selected > a:hover {
        color: ${p => p.theme.colors.baseGreen};
    }
    .ant-menu-item > a:hover {
        color: ${p => p.theme.colors.baseGreen};
    }
    .ant-menu-item::after {
        border-right: 3px solid ${p => p.theme.colors.baseLightGreen};
    }
`;

export const Header = styled(_Header)`
    display: flex;
    font-size: 22px;
    justify-content: space-between;
    align-items: center;
    background-color: ${p => p.theme.colors.baseGreen};
    color: #fff;
    height: 64px;
    padding: 0 !important;
    box-shadow: inset 0 -1px 0 0 rgba(255, 255, 255, 0.1), 0 1px 4px 0 rgba(0, 21, 41, 0.12);
`;

export const ProjectMenu = styled('div')`
    width: 64px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    z-index: 20;
`;

export const ProjectTitle = styled.div`
    font-size: ${p => p.theme.fontStyles.display.size};
    font-weight: ${p => (p.theme.fontStyles.display.bold ? 'bold' : 900)};
    display: flex;
    align-items: center;
    flex-direction: row;
`;

export const UserContainer = styled('div')`
    display: flex;
    align-items: center;
    font-size: ${p => p.theme.text.size.small};
    line-height: 19px;
    margin-right: 25px;
    z-index: 99;
`;

export const ButtonLogOut = styled('div')`
    cursor: pointer !important;
`;

export const Logo = styled('div')`
    height: 64px;
    padding: 5px 0 0 15px;
`;

export const LogoImg = styled('img')`
    width: 54px;
    height: 54px;
`;
