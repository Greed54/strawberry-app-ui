import styled from 'styled-components';

export const Toolbar = styled('div')`
    height: ${p => p.theme.size.headerHeight}!important;
    min-height: ${p => p.theme.size.headerHeight}!important;
    width: 100%;
    align-items: center;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
    padding: 0 16px;
`;


