import { Sorting } from "../../types/schema-types";

export interface TableProps {
    dataSource: any[];
    onExpand?: (expanded: any, record: any) => void;
    columns: Column[];
    draggable?: boolean;
    rowKey: string;
    width: number;
    height: number;
    headerHeight: number;
    rowHeight: number;
    loading?: boolean;
    sorting?: Sorting;
    groupBy?: string;
    onSort?: (sorting: Sorting) => void;
    onClick?: (row: any) => void;
    tabIndex?: number;
    onDragStart?: any;
    onDragEnd?: any;
    dragMode?: string;
}

export interface BodyProps {
    dataSource: any[];
    onExpand?: (expanded: any, record: any) => void;
    onClick?: (row: any) => void;
    columns: ColumnWithCountedWidth[];
    rowKey: string;
    width: number;
    height: number;
    rowHeight: number;
    loading?: boolean;
    groupBy?: string;
}

export interface DraggableBodyProps extends BodyProps {
    onDragStart?: any;
    onDragEnd?: any;
    dragMode?: string;
}

export interface Column {
    key: string;
    width?: string | number;
    dataIndex?: string;
    hidden?: boolean;
    sortable?: boolean;
    title?: string;
    headerCellStyle?: React.CSSProperties;
    render?: (value?: any, record?: any, width?: number, tabIndex?: number) => JSX.Element;
    renderHeaderCell?: (width?: number, groupBy?: string) => JSX.Element;
    renderOnHeaderCellHover?: () => JSX.Element;
}

export interface ColumnWithCountedWidth extends Column {
    width: number;
}

export interface HeaderProps {
    columns: ColumnWithCountedWidth[];
    width: number;
    height: number;
    sorting?: Sorting;
    onSort?: (sortig: Sorting) => void;
    groupBy?: string;
}
