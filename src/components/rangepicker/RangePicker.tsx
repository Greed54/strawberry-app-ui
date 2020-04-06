import * as React from 'react';
import { DatePicker } from 'antd';
import {DATE_FORMAT} from "../../configs/const";

const { RangePicker } = DatePicker;

interface Props {
  rangeDatePickerValues: any;
  handleChangePeriodFilter: any;
  disabledDate: any;
  onCalendarChange: any;
  onOpenChangeRangePicker: any;
}

interface State {
  value: any;
}

class RangePickerComponent extends React.Component<Props, State>{
  public constructor(props: Props) {
    super(props);
    this.state = {
      value: props.rangeDatePickerValues,
    };
  }
  public componentWillReceiveProps(newProps: Props) {
    if (JSON.stringify(newProps.rangeDatePickerValues) !== JSON.stringify(this.props.rangeDatePickerValues)) {
      this.setState({ value: newProps.rangeDatePickerValues });
    }
  }

  public render() {
    return (
        <RangePicker
            style={{ width: 264, margin: '0 18px 0 8px' }}
            value={this.state.value}
            onChange={this.props.handleChangePeriodFilter}
            format={DATE_FORMAT}
            allowClear={false}
            disabledDate={this.props.disabledDate}
            onCalendarChange={this.props.onCalendarChange}
            onOpenChange={this.props.onOpenChangeRangePicker}
            // getCalendarContainer={() => document.getElementById('range-picker-container')}
        />
    );
  }
}

export default RangePickerComponent;
