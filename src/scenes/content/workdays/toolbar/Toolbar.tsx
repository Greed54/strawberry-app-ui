import * as React from 'react';
import {ToolbarProps, ToolbarState} from "./types";
import {ToolbarComponent} from "./Toolbar.styles";
import moment from 'moment';
import Search from "../../../../components/search/Search";
import {Select} from "antd";
import {DATE_FORMAT} from "../../../../configs/const";
import RangePickerComponent from "../../../../components/rangepicker/RangePicker";
import {searchColumns} from "../columns";

const {Option} = Select;


class Toolbar extends React.Component<ToolbarProps, ToolbarState> {

  public constructor(props: ToolbarProps) {
    super(props);
    this.state = {
      dates: [],
      widthWindow: window.innerWidth,
    };
  }

  public componentDidMount() {
    window.addEventListener('resize', this.updateWidthWindow);
  }

  public updateWidthWindow = () => this.setState({widthWindow: window.innerWidth});

  public handleChangeSearch = (value: any) => {
    // @ts-ignore
    this.props.actions.changeSearch(value);
  };

  public handleGroup = (value: any) => {
    // @ts-ignore
    this.props.actions.group(value);
  };

  public handleChangePeriodFilter = (_: any, range: string[]) => {
    this.setState({dates: []});
    // @ts-ignore
    this.props.actions.changePeriodFilter(range);
  };

  private onCalendarChange = (dates: any) => {
    this.setState({dates});
  };

  private onOpenChangeRangePicker = (isOpen: boolean) => {
    if (!isOpen) {
      this.setState({dates: []});
    }
  };

  public render() {
    const {
      multiSearchOptions,
      search,
      periodFilter,
      periodOption,
      actions,
      group
    } = this.props;

    const {dates, widthWindow} = this.state;

    const disabledDate = (current: number) => {
      if (dates.length) {
        const endDate = dates[0].clone().add(13, 'day');
        const startDate = dates[0].clone().subtract(13, 'day');
        return current && (current.valueOf() > endDate.valueOf() || current.valueOf() < startDate.valueOf());
      }
      return false;
    };

    const rangeDatePickerValues = dates.length
        ? dates
        : [moment(periodFilter[0], DATE_FORMAT), moment(periodFilter[1], DATE_FORMAT)];

    return (
        <ToolbarComponent id="range-picker-container"
                          startFilter={(rangeDatePickerValues[0] && rangeDatePickerValues[0].format(DATE_FORMAT)) || ''}
                          endFilter={(rangeDatePickerValues[1] && rangeDatePickerValues[1].format(DATE_FORMAT)) || ''}>
          <Search width={360}
                  placeholder="Search for..."
                  columns={searchColumns}
                  onChange={this.handleChangeSearch}
                  onSearch={
                    // @ts-ignore
                    actions.fetchMultySearchOptions}
                  clearOptions={
                    // @ts-ignore
                    actions.clearMultySearchOptions}
                  options={multiSearchOptions}
                  selectedValue={search}
                  aqa="ch-search-autocomplete-filter"/>
          <Select value={group} style={{width: 230, marginLeft: 18}} onChange={this.handleGroup}>
            <Option value="dateAndTime">Grouped By Date and Time</Option>
            <Option value="teamName">Grouped By Team Name</Option>
          </Select>
          <Select
              value={periodOption}
              style={{width: 140, marginLeft: 8}}
              onChange={
                // @ts-ignore
                actions.changePeriodOption}
          >
            <Option value="1">1 Days Period</Option>
            <Option value="2">2 Days Period</Option>
            <Option value="3">3 Days Period</Option>
            <Option value="4">4 Days Period</Option>
            <Option value="7">7 Days Period</Option>
            {periodOption === 'custom' && (
                <Option value="custom" disabled={true}>
                  Custom Period
                </Option>
            )}
          </Select>
          <RangePickerComponent rangeDatePickerValues={rangeDatePickerValues}
                                handleChangePeriodFilter={this.handleChangePeriodFilter}
                                disabledDate={disabledDate}
                                onCalendarChange={this.onCalendarChange}
                                onOpenChangeRangePicker={this.onOpenChangeRangePicker}/>
        </ToolbarComponent>
    );
  }
}

export default Toolbar;
