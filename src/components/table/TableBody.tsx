import * as React from 'react';
import {List} from 'react-virtualized';
import {get} from 'lodash';
import {Cell, GroupRow, IconContainer, listStyle, LoaderContainer, Row, TableBody} from './Table.styles';
import TableCell from './TableCell';
import {Spinner} from '../spinner/Spinner';
import {Icon} from 'antd';
import {BodyProps} from './types';
import {onClickProps} from './helper';

class TableBodyComponent extends React.Component<BodyProps> {
    public groupRowRender = (row: any, style: any) => {
        const column = this.props.columns.find(c => c.key === this.props.groupBy);
        const groupCell =
            column && column.render ? column.render(row[this.props.rowKey], row, column.width) : row[this.props.rowKey];
        const nameRow = groupCell
            .toString()
            .split(' ')
            .join('');
        return (
            // @ts-ignore
            <GroupRow
                key={row[this.props.rowKey]}
                style={style}
                width={this.props.width}
                isOpen={row.isOpen}
                className={`pil-${nameRow}`}
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
        const {_isRowClickable } = row;
        return (
            <Row
                key={row[this.props.rowKey]}
                style={style}
                background={'#fff'}
                backgroundHover={'rgba(141, 228, 228, 0.3)'}
                width={this.props.width}
                {...onClickProps.call(this, () =>
                    _isRowClickable ? this.props.onClick && this.props.onClick(row) : null
                )}
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
        if (row.isGroup) {
            return this.groupRowRender(row, style);
        }
        return this.regularRowRender(row, style, index);
    };

    public render() {
        const { rowHeight, dataSource, width, height, loading } = this.props;
        // Passing "data" to the list just in order to force the List re-render.
        return (
            <TableBody key="table-body">
                {loading ? (
                    <LoaderContainer height={height}>
                        <Spinner size="large" />
                    </LoaderContainer>
                ) : (
                    <List
                        key="list"
                        rowCount={dataSource.length}
                        rowHeight={rowHeight}
                        data={dataSource}
                        rowRenderer={this.rowRenderer}
                        // @ts-ignore
                        style={listStyle}
                        height={height}
                        width={width}
                        columns={this.props.columns}
                    />
                )}
            </TableBody>
        );
    }
}

export default TableBodyComponent;
