import * as React from 'react';
import { Cell, CellValue } from './Table.styles';

interface Props {
    column: any;
    row: any;
    value: any;
    tabIndex?: number;
}

class TableCell extends React.Component<Props> {
    public render() {
        const { column, value, row, tabIndex } = this.props;
        const { testClassName } = column;
        const rest = testClassName ? { className: testClassName } : {};
        return column.render ? (
            column.render(value, row, column.width, tabIndex)
        ) : (
            <Cell {...rest} width={column.width} style={{ ...column.cellStyle }}>
                <CellValue>{value}</CellValue>
            </Cell>
        );
    }
}

export default TableCell;
