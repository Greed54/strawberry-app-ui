import * as React from 'react';
import { Select } from 'antd';
import { groupBy, union } from 'lodash';
import * as styled from './Search.styles';

const { Option, OptGroup } = Select;
const WAIT_INTERVAL = 300;

export interface SelectedValueType {
  id: string;
  value: string;
}

export interface SearchOption {
  name?: string[];
}

interface Props {
  width: number;
  placeholder: string;
  aqa?: string;
  options: any;
  onChange: (res: SelectedValueType[]) => void;
  onSearch: (res: string) => void;
  clearOptions: () => void;
  style?: any;
  selectedValue?: SelectedValueType[];
  columns: any[];
}

interface State {
  searchValue: string;
  isOpenDropDown: boolean;
}

class Search extends React.Component<Props, State> {
  private timer: number | undefined;

  public static defaultProps = {
    placeholder: '',
    width: 500,
    columns: undefined,
    aqa: '',
    style: {},
    value: [],
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      searchValue: '',
      isOpenDropDown: false,
    };
  }

  public componentWillUnmount() {
    window.clearTimeout(this.timer);
  }

  // @ts-ignore
  public handleChange = (_, option) => {
    //@ts-ignore
    const selectedValues = option.map(i => ({ id: i.key.split('?')[0], value: i.props.value.split('?')[1] }));
    this.props.onChange(selectedValues);
  };

  public handleSearch = (searchValue: any) => {
    clearTimeout(this.timer);
    this.setState({ searchValue });
    this.timer = window.setTimeout(this.triggerSearch, WAIT_INTERVAL);
    this.setState({ isOpenDropDown: true });
  };

  public handleBlur = () => {
    this.setState({ isOpenDropDown: false });
  };

  public triggerSearch = () => {
    const { searchValue } = this.state;
    this.props.onSearch(searchValue);
  };

  public recordOptions = (options: Array<SearchOption>, selectedValue: Array<SelectedValueType> | undefined, columns: any[]) => {
    const valueByGroup = groupBy(selectedValue, 'id');
    return Object.entries(options).map(([key, value]) => {
      // @ts-ignore
      const column = columns.find(el => el.key === key);
      const selectedValues = valueByGroup[key] ? valueByGroup[key].map(el => el.value) : [];
      return {
        id: key,
        label: column.title,
        options: union(selectedValues, value as string[]),
      };
    });
  };

  public renderOptions = () => {
    const { options, selectedValue, columns } = this.props;
    return this.recordOptions(options, selectedValue, columns).map(item => (
        <OptGroup key={item.id} label={<styled.OptionGroup>{item.label}</styled.OptionGroup>}>
          {item.options.map((o, index) => (
              <Option title={`${item.label}: ${o}`} key={`${item.id}?${index}`} value={`${item.id}?${o}`}>
                {o}
              </Option>
          ))}
        </OptGroup>
    ));
  };

  public render() {
    const { placeholder, selectedValue, width, style, aqa } = this.props;
    // @ts-ignore
    const value = selectedValue.map(i => `${i.id}?${i.value}`);
    const { isOpenDropDown } = this.state;
    return (
        <styled.Container width={width}>
          <styled.Select
              style={style}
              filterOption={false}
              mode="multiple"
              notFoundContent={false}
              onChange={this.handleChange}
              onSearch={this.handleSearch}
              onBlur={this.handleBlur}
              placeholder={placeholder}
              value={value}
              className={`${aqa}`}
              dropdownClassName={`${aqa}-options`}
              allowClear={true}
              open={isOpenDropDown}
              dropdownMatchSelectWidth={false}
          >
            {this.renderOptions()}
          </styled.Select>
        </styled.Container>
    );
  }
}

export default Search;
