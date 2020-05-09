import React from "react";
import * as styled from './WorkDays.styles';
import {getColumns} from "./columns";
import Table from "../../../components/table/Table";
import AutoSizer from 'react-virtualized-auto-sizer';
import {WorkDaysProps} from "./types";
import Toolbar from "./toolbar/ToolbarContainer";
import {Layout, Select} from "antd";
import {EmployeeRoles} from "../../../types/schema-types";
const {Option} = Select;


class WorkDays extends React.Component<WorkDaysProps> {

  componentDidMount(): void {
    this.props.actions.fetch();
  }

  public renderEmployeeRoles = () => {
    return Object.keys(EmployeeRoles).map(role => {
      if (role === "TEAM_LEAD" && false) {
        // @ts-ignore
        return <Option key={role} disabled={true}>{EmployeeRoles[role]}</Option>;
      } else {
        // @ts-ignore
        return <Option key={role}>{EmployeeRoles[role]}</Option>;
      }
    })
  };

  render() {
    const listColumns = getColumns.call(this);
    const {workDayList, sorting, isLoading, group} = this.props;
    return (
        <Layout>
          <Toolbar/>
          <styled.Content id="ContainerForPopover">
            <styled.ListWrapper>
              <styled.ListTitle>
                <styled.ListTitleContainer>
                  Work Days
                </styled.ListTitleContainer>
              </styled.ListTitle>
              <AutoSizer>
                {({width, height }) => (
                    <Table
                        rowKey="coreID"
                        headerHeight={40}
                        rowHeight={40}
                        columns={listColumns}
                        dataSource={workDayList}
                        height={height - 45}
                        width={width}
                        // onSort={actions.changeSorting}
                        sorting={sorting}
                        groupBy={group}
                        // onExpand={(_, record) => actions.openCloseGroup(record.coreId)}
                        loading={isLoading}
                    />
                )}
              </AutoSizer>
            </styled.ListWrapper>
          </styled.Content>
        </Layout>
    );
  }
}

export default WorkDays;
