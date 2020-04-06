import React from "react";
import * as styled from './EmployeesList.styles';
import {InputSearch} from "../../../../components/inputsearch/InputSearch";
import {Radio, Select} from "antd";
import {EmployeesListProps, EmployeesListState, Filters} from "./types";
import {RadioChangeEvent} from "antd/lib/radio";
import {AutoSizer} from "react-virtualized";
import Table from "../../../../components/table/Table";
import {getColumns} from "./columns";
import {SiderWrapper} from "../../../../components/siderwrapper/SiderWrapper";
import EmployeeSider from "../../siders/employee/EmployeeSider";
import {EmployeeRoles, StrawberryEmployee} from "../../../../types/schema-types";
import {Subscription} from 'react-apollo';
import {UPDATE_STRAWBERRY_EMPLOYEE_ANY} from "../../../../subscription/employee";

const {Option} = Select;

class EmployeesList extends React.Component<EmployeesListProps, EmployeesListState> {

  componentDidMount() {
    this.props.actions.fetch();
  }

  public renderEmployeeRoles = () => {
    // @ts-ignore
    return Object.keys(EmployeeRoles).map(role => <Option key={role}>{EmployeeRoles[role]}</Option>)
  };

  public handleFilterChange = (e: RadioChangeEvent) => {
    this.props.actions.toggleFilter(e.target.value);
  };

  public handleChangeSearch = (value: string) => {
    this.props.actions.changeSearch(value);
  };

  public handleEdit = (coreId: string) => {
    this.props.actions.toggleEditingSider({editSider: true, coreId});
  };

  private handleCloseEditingSider = () => {
    this.props.actions.toggleEditingSider({editSider: false});
  };

  private handleSaveEditingSiderTab = (employee: StrawberryEmployee) => {
    this.props.actions.saveEditingSiderTab(employee);
    this.handleCloseEditingSider();
  };

  private handleAdd = () => {
    this.props.actions.toggleAddingSider(true);
  };

  private handleCloseAddingSider = () => {
    this.props.actions.toggleAddingSider(false);
  };

  private handleSaveAddingSiderTab = (employee: StrawberryEmployee) => {
    this.props.actions.saveAddingSiderTab(employee);
    this.handleCloseAddingSider();
  };

  private onStrawberryEmployeeCreateOrUpdate = ({subscriptionData}: any) => {
    const {
      updateStrawberryEmployees: {node},
    } = subscriptionData.data;

  };

  render() {
    const columns = getColumns.call(this);
    const {sorting, dataSource, addingSider, editSider, teams, selectedTeam, editingEmployee, search} = this.props;
    return (
        <Subscription
            onSubscriptionData={this.onStrawberryEmployeeCreateOrUpdate}
            subscription={UPDATE_STRAWBERRY_EMPLOYEE_ANY}
            variables={{filters: {teamId: selectedTeam?.coreID, fullName: search}}}
        >
          {() => (
              <styled.LayoutTop>
                <styled.Toolbar>
                  <styled.Block>
                    <InputSearch value={search}
                                 style={{width: 355}}
                                 placeholder="Search for..."
                                 onChange={this.handleChangeSearch}/>
                  </styled.Block>
                  <styled.Block>
                    <styled.AddButton
                        className="button"
                        icon="plus"
                        onClick={this.handleAdd}>
                      Add New
                    </styled.AddButton>
                    <Radio.Group
                        value={this.props.itemFilter}
                        style={{marginLeft: 16}}
                        onChange={this.handleFilterChange}
                    >
                      <styled.RadioButton value={Filters.ALL_ITEMS}>All Items</styled.RadioButton>
                      <styled.RadioButton value={Filters.SELECTED}>Selected Items</styled.RadioButton>
                    </Radio.Group>
                  </styled.Block>
                </styled.Toolbar>
                <styled.TableWrapper>
                  <AutoSizer>
                    {(props: { width: number; height: number }) => {
                      const {width, height} = props;
                      return (
                          <div style={{width, height}}>
                            <Table
                                width={width}
                                height={height}
                                dataSource={dataSource}
                                onExpand={() => ''}
                                onSort={() => ''}
                                sorting={sorting}
                                columns={columns}
                                rowKey="coreID"
                                headerHeight={37}
                                rowHeight={34}
                                loading={false}
                            />
                          </div>
                      );
                    }}
                  </AutoSizer>
                </styled.TableWrapper>
                <SiderWrapper visible={editSider}
                              onClose={() => this.handleCloseEditingSider()}
                              title="Edit Employee">
                  <styled.SiderContentContainer>
                    <EmployeeSider isEdit={true}
                                   selectedTeam={selectedTeam}
                                   teams={teams}
                                   employee={editingEmployee}
                                   onSave={this.handleSaveEditingSiderTab}/>
                  </styled.SiderContentContainer>
                </SiderWrapper>
                <SiderWrapper visible={addingSider}
                              onClose={this.handleCloseAddingSider}
                              title="Add Employee">
                  <styled.SiderContentContainer>
                    <EmployeeSider isEdit={false}
                                   selectedTeam={selectedTeam}
                                   teams={teams}
                                   onSave={this.handleSaveAddingSiderTab}/>
                  </styled.SiderContentContainer>
                </SiderWrapper>
              </styled.LayoutTop>
          )}
        </Subscription>
    );
  }
}

export default EmployeesList;
