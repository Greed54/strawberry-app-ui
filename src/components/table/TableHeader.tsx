import * as React from 'react';
import { Icon } from 'antd';
import { TableHeader, HeaderCell, SortIconsContainer, HoverContainer, CellValue } from './Table.styles';
import { HeaderProps, ColumnWithCountedWidth } from './types';
import { onClickProps } from './helper';
import { Sorting } from '../../types/schema-types';

class TableHeaderComponent extends React.Component<HeaderProps> {
    public toggleSort = (column: ColumnWithCountedWidth) => {
        const { onSort, sorting } = this.props;
        if (onSort && column.sortable) {
            if (!sorting || (sorting && sorting.key !== column.key)) {
                onSort({ key: column.key, order: 'ASC' });
            }
            if (sorting && sorting.key === column.key) {
                onSort({ key: column.key, order: sorting.order === 'ASC' ? 'DESC' : 'ASC' });
            }
        }
    };

    private renderSortIcons = (columnKey: string, sortig: Sorting) => {
        const currentSorting: boolean = !!sortig && columnKey === sortig.key;
        return (
            <SortIconsContainer>
                <Icon
                    type="caret-up"
                    style={{
                        width: '11px',
                        height: '9px',
                        color: currentSorting && sortig.order === 'ASC' ? '#1890ff' : 'rgb(191, 191, 191)',
                    }}
                />
                <Icon
                    type="caret-down"
                    style={{
                        width: '11px',
                        height: '9px',
                        color: currentSorting && sortig.order === 'DESC' ? '#1890ff' : 'rgb(191, 191, 191)',
                    }}
                />
            </SortIconsContainer>
        );
    };

    public renderOnHover = (renderValue: React.ReactNode) => <HoverContainer>{renderValue}</HoverContainer>;

    // @ts-ignore
  public renderHeaderCell = (column: ColumnWithCountedWidth) =>
        column.renderHeaderCell ? (
            column.renderHeaderCell(column.width, this.props.groupBy)
        ) : (
            <HeaderCell
                data-column-id={column.key}
                width={column.width}
                height={this.props.height}
                key={column.key}
                title={!column.renderOnHeaderCellHover ? column.title : ''}
                sortable={column.sortable}
                style={column.headerCellStyle}
                {...onClickProps.call(this, () => this.toggleSort(column))}
            >
                {column.title && <CellValue>{column.title}</CellValue>}
                {column.sortable && this.renderSortIcons(column.key,
                    // @ts-ignore
                    this.props.sorting)}
                {column.renderOnHeaderCellHover && this.renderOnHover(column.renderOnHeaderCellHover())}
            </HeaderCell>
        );

    public render() {
        const { columns, width, height } = this.props;
        return (
            <TableHeader height={height} width={width} key="table-header">
                {columns.map(c => this.renderHeaderCell(c))}
            </TableHeader>
        );
    }
}

export default TableHeaderComponent;
