import styled from 'styled-components';

export const Content = styled('div')`
    margin: 0 ${p => p.theme.margin.small};
    display: flex;
    flex: auto;
    min-height: 1000px;
    flex-direction: column;
    .ant-popover-inner-content {
        width: auto !important;
        padding: 0 0 0 16px !important;
        max-height: 250px !important;
        overflow-y: auto !important;
    }
`;

export const ListWrapper = styled('div')`
    margin: 16px 0;
    display: flex;
    flex: auto;
    overflow: hidden;
    flex-direction: column;
    background-color: #fff;
    position: relative;
`;

export const ListTitle = styled('div')`
    font-weight: bold;
    color: #263343;
    height: 48px;
    font-size: 16px;
    line-height: 48px;
`;

export const ListTitleContainer = styled('div')`
    display: flex;
    justify-content: flex-start;
    padding-left: 16px;
`;

export const Cell = styled('div')<{ width: number; opacity?: number }>`
    min-width: ${p => p.width}px;
    max-width: ${p => p.width}px;
    opacity: ${p => p.opacity};
    padding: 0 5px 0 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
`;

export const Block = styled('div')`
    padding-right: 5px;
    display: flex;
    align-items: center;
`;

export const IconEditContainer = styled('div')`
    height: 40px;
    width: 16px;
    padding: 12px 0;
    text-align: center;
    cursor: pointer;
`;

export const Notes = styled('span')<{ width?: string }>`
    width: ${p => p.width};
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding-top: 4px;
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
