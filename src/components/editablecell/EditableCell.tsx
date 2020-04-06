import * as React from 'react';
import { CellInput, Cell } from './EditableCell.styles';
import { Tooltip } from 'antd';
import { Editable } from '../Editable';

interface Props {
    onChange: (str: string) => void;
    isInvalid?: boolean;
    width: number;
    className?: string;
    regularStyle?: React.CSSProperties;
    editStyle?: React.CSSProperties;
    value: string;
    defaultValue?: string;
    tabIndex?: number;
    autoSelect?: boolean;
    pattern?: RegExp;
    format?: (str: string) => string;
    testClassName?: string;
}

interface State {
    value?: string;
}

export class EditableCell extends React.Component<Props, State> {
    public static defaultProps = {
        defaultValue: '',
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            value: props.format ? props.format(props.value) : props.value || props.defaultValue,
        };
    }

    public componentWillReceiveProps(newProps: Props) {
        if (newProps.value !== this.props.value) {
            this.setState({ value: newProps.value });
        }
    }

    // @ts-ignore
  private handleChangeValue = ({ target: { value } }) =>
        this.props.pattern
            ? (this.props.pattern.test(value) || value === '') && this.setState({ value })
            : this.setState({ value });

    private handleOnBlur = (e: { target: { blur: () => void; }; }) => {
        if (this.props.value !== this.state.value) {
            // @ts-ignore
          this.props.onChange(this.state.value);
        }
        e.target.blur();
    };

    private handleFocus = (e: { target: { select: () => any; }; }) => this.props.autoSelect && e.target.select();

    public render() {
        const { width, className, regularStyle, editStyle, tabIndex, isInvalid, format, testClassName } = this.props;
        const { value } = this.state;
        return (
            <Editable
                tabIndex={tabIndex}
                testClassName={testClassName}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: width + 'px',
                    minWidth: width + 'px',
                    height: '32px',
                }}
                render={({ editable, disableEdit }) => {
                  return editable ? (
                        <CellInput
                            tabIndex={tabIndex}
                            autoFocus={true}
                            onFocus={this.handleFocus}
                            width={width}
                            className={className}
                            style={editStyle}
                            value={value}
                            onBlur={(e: { target: { blur: () => void; }; }) => {
                                this.handleOnBlur(e);
                                disableEdit();
                            }}
                            onKeyPress={(e: { key: string; }) => e.key === 'Enter' && this.handleOnBlur}
                            onChange={this.handleChangeValue}
                        />
                    ) : (
                        <Tooltip placement="topLeft" title={value}>
                            <Cell width={width} isInvalid={isInvalid} style={regularStyle}>
                                {format ?
                                    // @ts-ignore
                                    format(value) : value}
                            </Cell>
                        </Tooltip>
                    );
                }}
            />
        );
    }
}
