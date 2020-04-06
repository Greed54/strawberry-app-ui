import * as React from 'react';
import {TableProps} from "./types";
import ReactDOM from 'react-dom';
import {calculateColumnWidths} from "./helper";
import {TableContainer} from "./Table.styles";
import TableHeader from './TableHeader';
import DraggableTableBody from './DraggableTableBody';
import TableBody from './TableBody';

class Table extends React.Component<TableProps>{

  constructor(props: TableProps) {
    super(props);
    this.tableRef = React.createRef();
  }
  private tableRef: any;

  public focusFirstRegularCell = () => {
    let indexFirstRegularRow = 0;
    this.props.dataSource.forEach((el, i) => {
      if (!el.isGroup) {
        indexFirstRegularRow = i;
      }
    });
    const firstRegularCellTabIndex = (indexFirstRegularRow + 1) * 100;
    const firstCell = (ReactDOM.findDOMNode(this.tableRef) as any).querySelectorAll(
        `[tabIndex="${firstRegularCellTabIndex}"]`
    )[0];
    firstCell.focus();
  };

  public focusByTabIndex = (tabIndex: number) => {
    const cell = (ReactDOM.findDOMNode(this.tableRef) as any).querySelectorAll(`[tabIndex="${tabIndex}"]`)[0];
    if (cell) {
      cell.focus();
    }
  };

  public render() {
    const {
      width,
      height,
      headerHeight,
      dataSource,
      rowHeight,
      rowKey,
      loading,
      sorting,
      onSort,
      draggable,
      onClick,
      groupBy,
      tabIndex,
      onDragStart,
      onDragEnd,
      dragMode,
    } = this.props;
    const columns = calculateColumnWidths(width, this.props.columns.filter(c => !c.hidden));
    const Body = draggable ? DraggableTableBody : TableBody;


    return (
        <TableContainer ref={(ref: any) => (this.tableRef = ref)} width={width} height={height} tabIndex={tabIndex}>
          <TableHeader
              groupBy={groupBy}
              columns={columns}
              height={headerHeight}
              width={width}
              sorting={sorting}
              onSort={onSort}
          />
          <Body
              dataSource={dataSource}
              columns={columns}
              width={width}
              height={height - headerHeight}
              onExpand={this.props.onExpand}
              rowHeight={rowHeight}
              rowKey={rowKey}
              loading={loading}
              onClick={onClick}
              groupBy={groupBy}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              dragMode={dragMode}
          />
        </TableContainer>
    )
  }
}

export default Table;
