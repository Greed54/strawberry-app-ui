
interface Coords {
    x: number;
    y: number;
}

export const calculateColumnWidths = (width: number, columns: any) => {
    const { fixed, float } = columns.reduce(
        //@ts-ignore
        (acc, c) =>
            typeof c.width === 'number'
                ? { ...acc, float: acc.float + c.width }
                : { ...acc, fixed: acc.fixed + parseInt(c.width, 10) },
        { float: 0, fixed: 0 }
    );
    const quotient = (width - fixed) / float;
    return columns.map((c: { width: string | number; }) => ({
        ...c,
        width: typeof c.width === 'number' ? c.width * quotient : parseInt(c.width, 10),
    }));
};

// @ts-ignore
export function onClickProps(this: any, func) {
    // @ts-ignore
    const destructCoords = e => ({ x: e.clientX, y: e.clientY });
    // @ts-ignore
    const setCoords = e => {
        this.coords = destructCoords(e);
    };
    const isClickOffset = (c1: Coords, c2: Coords) => Math.max(Math.abs(c1.x - c2.x), Math.abs(c1.y - c2.y)) <= 3;
    // @ts-ignore
    const canClick = e => isClickOffset(this.coords, destructCoords(e));
    return {
        onMouseDown: setCoords,
        // @ts-ignore
        onClick: e => canClick(e) && func(e),
    };
}

export const getSortableItemProps = (row: { isGroup: any; _group: any; }, dragMode: any) => {
    switch (dragMode) {
        case 'in_group': {
            return {
                disabled: row.isGroup,
                collection: row._group,
            };
        }
        case 'groups': {
            return {
                disabled: !row.isGroup,
                collection: row._group,
            };
        }
        default: {
            return {
                collection: row._group,
            };
        }
    }
};
