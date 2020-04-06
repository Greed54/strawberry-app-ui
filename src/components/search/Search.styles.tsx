import * as React from 'react';
import styled from '../../configs/theme';
import {Select as _Select} from 'antd';
import {SelectProps} from 'antd/lib/select';

export const Container = styled('div')<{ width: number }>`
    width: ${p => p.width}px;
    height: 32px;
    position: relative;
`;


export const Select = styled<SelectProps>(props => <_Select {...props} />)`
    position: !important;
    width: 100%;
    z-index: 999;
    & {
        ul {
            display: flex;
        }
    }
    .ant-select-selection {
        background: none;
        height: 32px;
        border: 1px solid ${
    // @ts-ignore
    p => (p.style.borderColor ? p.style.borderColor : p.theme.colors.lightGray)};
        overflow: hidden;
    }
    .ant-select-selection__placeholder {
        top: 27%;
        color: rgba(0, 0, 0, 0.25) !important;
    }
`;

export const OptionGroup = styled.div`
    font-weight: bold;
    font-size: ${p => p.theme.text.size.small};
    color: ${p => p.theme.colors.lightDark};
    padding-left: 5px;
`;
