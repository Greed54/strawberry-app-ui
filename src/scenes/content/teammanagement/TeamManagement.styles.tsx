import styled from 'styled-components';
import {Layout} from "antd";

export const GridLayout = styled(Layout)`
`;

export const Content = styled(Layout)`
    display: grid;
    grid-template-columns: 1fr 11fr;
    grid-column-gap: 11px;
    margin: 16px ${p => p.theme.margin.small};
`;

export const Wrapper = styled.div`
    display: flex;
    flex: auto;
    flex-direction: column;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const TabButton = styled.div<{ isActive: boolean; disable?: boolean }>`
    display: flex;
    align-items: center;
    background-color: ${p => (p.isActive ? '#ffffff' : '#F0F2F5')};
    border: 1px solid ${p => (p.isActive ? '#ffffff' : 'rgba(0, 0, 0, 0.15)')};
    border-bottom-style: none;
    height: 36px;
    font-size: 14px;
    line-height: 18px;
    border-radius: 4px 4px 0 0;
    margin-right: 2px;
    cursor: ${p => (p.disable ? 'not-allowed' : 'pointer')};
    opacity: ${p => (p.disable ? '0.5' : '1')};
    .tabButton {
        display: flex;
        height: 36px;
        padding: 0 16px;
        align-items: center;
        outline: none;
        text-decoration: none;
        color: ${p => (p.isActive ? p.theme.colors.baseLightGreen : p.theme.colors.mediumDark)};
        font-weight: bold;
    }
`;

export const SiderContentContainer = styled.div`
    height: 100%;
    overflow-y: auto;
    padding: 16px 24px;
`;
