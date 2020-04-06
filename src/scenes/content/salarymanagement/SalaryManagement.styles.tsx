import styled from 'styled-components';
import {Layout} from "antd";

export const GridLayout = styled(Layout)`
`;

export const Content = styled('div')`
    display: grid;
    grid-template-columns: 1fr 11fr;
    grid-column-gap: 11px;
    margin: 16px ${p => p.theme.margin.small};
`;
