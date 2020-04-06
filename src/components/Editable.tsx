import * as React from 'react';

interface Props {
    render: (arg: any) => {};
    onFocus?: () => void;
    value?: string | number | any[];
    style: any;
    tabIndex?: number;
    id?: string;
    testClassName?: string;
    disabled?: boolean;
}

interface State {
    editable: boolean;
}

class Editable extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            editable: false,
        };
    }

    public handleClick = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        this.enableEdit();
    };

    public enableEdit = () => {
        this.setState({ editable: true });
    };

    public disableEdit = () => {
        this.setState({ editable: false });
    };

    // @ts-ignore
    public handleFocus = e => {
        e.stopPropagation();
        this.enableEdit();
    };

    public render() {
        const { editable } = this.state;
        const { render, style, tabIndex, id, testClassName, disabled } = this.props;
        return (
            <div
                id={id}
                className={testClassName}
                onFocus={this.handleFocus}
                tabIndex={editable ? 0 : tabIndex}
                style={style}
                role="presentation"
                onClick={e => {
                    e.stopPropagation();
                    disabled ? e.preventDefault() : this.handleClick(e);
                }}
            >
                {render({
                    editable,
                    enableEdit: this.enableEdit,
                    disableEdit: this.disableEdit,
                })}
            </div>
        );
    }
}

export { Editable };
