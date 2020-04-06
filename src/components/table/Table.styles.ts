import styled from '../../configs/theme';

export const TableContainer = styled('div')<{ width: number; height: number }>`
    width: ${p => p.width}px;
    height: ${p => p.height}px;
`;

// --------------- Header ---------------

export const TableHeader = styled('div')<{ width: number; height: number }>`
    height: ${p => p.height}px;
    width: ${p => p.width}px;
    color: rgba(0, 0, 0, 0.85);
    background: #fafafa;
    overflow: hidden;
    display: flex;
    border-bottom: 1px solid #e8e8e8;
`;

export const HeaderCell = styled('div')<{ width: number; height: number; sortable?: boolean }>`
    position: relative;
    font-size: 14px;
    font-weight: bold;
    min-width: ${p => p.width}px;
    height: ${p => p.height}px;
    line-height: ${p => p.height}px;
    padding: 0 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: ${p => p.sortable && 'pointer'};
    &:hover {
        background-color: ${p => p.sortable && '#f2f2f2'};
    }
`;

export const HoverContainer = styled('div')`
    visibility: hidden;
    position: relative;
    right: 15px;
    z-index: 10;
    ${HeaderCell}:hover & {
        visibility: visible;
    }
`;

export const SortIconsContainer = styled('div')`
    position: absolute;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    right: 6px;
    top: 6px;
    width: 14px;
    height: 100%;
    color: #bfbfbf;
`;

// --------------- Body ---------------

export const LoaderContainer = styled('div')<{ height: number }>`
    display: flex;
    height: ${p => p.height}px;
    align-items: center;
    justify-content: center;
`;

export const TableBody = styled.div`
    flex-direction: column;
    display: flex;
    flex: auto;
    outline: none;
    color: rgba(0, 0, 0, 0.65);
`;

// --------------- Row ---------------

export const Row = styled.div<{ width: number; background: string; backgroundHover: string }>`
    display: flex;
    background-color: ${p => p.background};
    border-bottom: 1px solid #e8e8e8;
    &:hover {
        background-color: ${p => p.backgroundHover};
    }
    width: ${p => p.width}px;
`;

export const GroupRow = styled(Row)<{ isOpen: boolean }>`
    cursor: pointer;
    font-weight: bold;
    padding-left: 15px;
    color: rgba(0, 0, 0, 0.75);
    width: 100% !important;
`;

export const IconContainer = styled('div')`
    display: flex;
    align-items: center;
    padding-bottom: 3px;
`;

// --------------- Cell ---------------

export const Cell = styled('div')<{ width?: number }>`
    display: flex;
    position: relative;
    flex: none;
    padding: 0 15px;
    align-items: center;
    height: 100%;
    box-sizing: border-box;
    min-width: ${p => p.width}px;
    max-width: ${p => p.width}px;
    overflow: hidden;
`;

export const CellValue = styled.div`
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

// --------------- Inline Styles ---------------

export const listStyle = {
    outline: 'none',
    overflowX: 'hidden',
    backgroundColor: '#FFF',
};
