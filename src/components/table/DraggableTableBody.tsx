import * as React from 'react';
import { List } from 'react-virtualized';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { get } from 'lodash';
import { LoaderContainer, IconContainer, Row, GroupRow, TableBody, Cell, listStyle } from './Table.styles';
import TableCell from './TableCell';
import { Spinner } from '../spinner/Spinner';
import { Icon } from 'antd';
import { DraggableBodyProps } from './types';
import { onClickProps, getSortableItemProps } from './helper';

interface VirtualListProps extends DraggableBodyProps {
    getRef: any;
    rowCount: number;
    moving: boolean;
}

/* tslint:disable max-classes-per-file */

// @ts-ignore
const SortableItem = SortableElement(({ value }) => value);

class VirtualList extends React.Component<VirtualListProps> {
    public groupRowRender = (row: any, style: any) => {
        const column = this.props.columns.find(c => c.key === this.props.groupBy);
        const groupCell = column && column.render ? column.render(row.coreId, row, column.width) : row.coreId;
        return (
            // @ts-ignore
            <GroupRow
                key={row[this.props.rowKey]}
                style={style}
                width={this.props.width}
                isOpen={row.isOpen}
                {...onClickProps.call(this, () => this.props.onExpand && this.props.onExpand(!row.isOpen, row))}
            >
                <IconContainer>
                    <Icon type={row.isOpen ? 'caret-down' : 'caret-right'} />
                </IconContainer>
                <Cell>{groupCell}</Cell>
            </GroupRow>
        );
    };

    public regularRowRender = (row: any, style: any, index: number) => {
        return (
            <Row
                key={row[this.props.rowKey]}
                style={style}
                background={'#fff'}
                backgroundHover={'rgba(141, 228, 228, 0.3)'}
                width={this.props.width}
                {...onClickProps.call(this, () => this.props.onClick && this.props.onClick(row))}
            >
                {this.props.columns.map((c, i) => (
                    <TableCell
                        key={c.key}
                        // @ts-ignore
                        value={get(row, c.dataIndex)}
                        column={c}
                        row={row}
                        tabIndex={(index + 1) * 100 + i}
                    />
                ))}
            </Row>
        );
    };

    // @ts-ignore
    public rowRenderer = ({ index, style }) => {
        const row = this.props.dataSource[index];
        const value = row.isGroup ? this.groupRowRender(row, style) : this.regularRowRender(row, style, index);
        const rowIndex = row.index || index;
        return (
            <SortableItem
                key={row[this.props.rowKey]}
                index={rowIndex}
                {...getSortableItemProps(row, this.props.dragMode)}
                {...{ value }}
            />
        );
    };

    public render() {
        const { rowHeight, dataSource, width, height, getRef } = this.props;
        return (
            <List
                key="list"
                ref={getRef}
                rowCount={dataSource.length}
                data={dataSource} // Passing "data" to the list just in order to force the List re-render.
                rowHeight={rowHeight}
                rowRenderer={this.rowRenderer}
                // @ts-ignore
                style={listStyle}
                height={height}
                width={width}
                moving={this.props.moving}
            />
        );
    }
}

const SortableVirtualList = SortableContainer(VirtualList);

interface State {
    moving: boolean;
}

class TableBodyComponent extends React.Component<DraggableBodyProps, State> {
    public state = {
        moving: false,
    };

    public List: any;

    public registerListRef = (listInstance: any) => {
        this.List = listInstance;
    };

    private handleSortStart = (...args: any) => {
        this.props.onDragStart(...args);
        this.setState({ moving: true });
    };

    private handleSortEnd = (...args: any) => {
        this.props.onDragEnd(...args);
        this.setState({ moving: false });
    };

    public render() {
        const { rowHeight, dataSource, width, height, loading, columns, rowKey, dragMode } = this.props;
        const data = dataSource.map((i, index) => ({ ...i, dragId: index }));
        return (
            <TableBody key="table-body">
                {loading ? (
                    <LoaderContainer height={height}>
                        <span className="cd-spinner-lg">
                            <Spinner size="large" />
                        </span>
                    </LoaderContainer>
                ) : (
                    <SortableVirtualList
                        dragMode={dragMode}
                        moving={this.state.moving}
                        getRef={this.registerListRef}
                        rowKey={this.state.moving ? 'dragId' : rowKey}
                        columns={columns}
                        dataSource={data}
                        key="list"
                        rowCount={dataSource.length}
                        rowHeight={rowHeight}
                        height={height}
                        width={width}
                        distance={2}
                        axis="y"
                        lockAxis="y"
                        onSortStart={this.handleSortStart}
                        onSortEnd={this.handleSortEnd}
                        onClick={this.props.onClick}
                        onExpand={this.props.onExpand}
                    />
                )}
            </TableBody>
        );
    }
}

export default TableBodyComponent;
