import * as React from 'react';
import styled from 'styled-components';

export const ToolbarComponent = styled('div')<{ startFilter: string; endFilter: string }>`
    padding: 0 16px !important;
    height: 48px;
    align-items: center;
    background-color: #fff;
    display: flex;
    flex: 0 0 ${p => p.theme.size.headerHeight};
    .ant-calendar-picker {
      min-width: 250px;
    }
    .ant-calendar-input {
      display: none!important;
    };
    .ant-calendar-range-left {
      .ant-calendar-input-wrap {
        &:after {
          content: "${props => props.startFilter}";
        };
      };
    };
    .ant-calendar-range-right {
      .ant-calendar-input-wrap {
        &:after {
          content: "${props => props.endFilter}";
        };
      };
    };
`;
