import * as React from 'react';
import { Input } from 'antd';

const { Search } = Input;

interface Props {
    placeholder: string;
    onChange?: (res: any) => void;
    value?: any;
    style?: any;
}

interface State {
    stateValue: any;
}

class InputSearch extends React.Component<Props, State> {
    private timer: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            stateValue: props.value,
        };
    }

    public componentWillReceiveProps(nextProps: Props) {
        const { value } = nextProps;
        if (value !== this.state.stateValue) {
            this.setState({ stateValue: value });
        }
    }

    public componentWillUnmount() {
        clearTimeout(this.timer);
    }

    public onTriggerChange = () => {
        const { value } = this.props;
        const { stateValue } = this.state;
        if (value !== stateValue) {
            // @ts-ignore
            this.props.onChange(stateValue);
        }
    };

    public onChange = (e: { target: { value: any; }; }) => {
        clearTimeout(this.timer);
        const { value } = e.target;
        this.setState({ stateValue: value });
        this.timer = setTimeout(this.onTriggerChange, 500);
    };

    public render() {
        const { stateValue } = this.state;
        const { placeholder, style } = this.props;
        return (
            <Search
                style={style}
                value={stateValue}
                placeholder={placeholder}
                onChange={this.onChange}
            />
        );
    }
}

export { InputSearch };
