import styled from "styled-components";
import * as React from 'react';
import {NativeButtonProps} from "antd/lib/button/button";
import {Button, List} from "antd";
import {NavLink, NavLinkProps} from "react-router-dom";


export const Container = styled('div')`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 4px;
    width: 408px;
    position: relative;
`;

export const Header = styled('div')`
    min-height: 48px;
    padding-left: 16px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    align-items: center;
    color: #000;
    font-size: 18px;
    font-weight: bold;
    justify-content: space-between;
`;

export const LinkButton = styled<NativeButtonProps>(props => <Button {...props} />)`
    padding: 0 !important;
    margin-right: 16px;
    color: ${p => p.theme.colors.baseLightGreen}
    &:hover {
      color: #30B097 !important
    }
    &:focus {
      color: #30B097 !important
    }
`;

export const ListItem = styled(List.Item)`
    padding: 15px 0 15px 14px !important;
    margin: 0 11px 0 11px !important;
    font-size: 24px;
    font-weight: bold;
    color: #000;
`;

export const Link = styled<NavLinkProps>(props => <NavLink{...props} style={{color: '#000'}}/>)`
    &.active {
        color: ${p => p.theme.colors.baseLightGreen} !important
    }
`;
