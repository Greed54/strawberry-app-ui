import React from "react";
import * as styled from './WorkDays.styles';
import {getColumns} from "./columns";
import Table from "../../../components/table/Table";
import AutoSizer from 'react-virtualized-auto-sizer';
import {Employee} from "./types";
import Toolbar from "./toolbar/Toolbar";
import {Layout} from "antd";

interface WorkDaysProps {
  employees: Array<Employee>
  isAllGroupsOpen: boolean
}

class WorkDays extends React.Component<WorkDaysProps> {
  render() {
    const listColumns = getColumns.call(this);
    const {employees} = this.props;
    return (
        <Layout>
          <Toolbar multiSearchOptions={{name: ["Usa"]}}
                   search={[]}
                   periodFilter={["12-09-2020", "13-09-2020"]}
                   periodOption={"1"}>
          </Toolbar>
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
                        rowKey="coreId"
                        headerHeight={40}
                        rowHeight={40}
                        columns={listColumns}
                        dataSource={employees}
                        height={height - 45}
                        width={width}
                        // onClick={this.handleRowClick}
                        // onSort={actions.changeSorting}
                        // sorting={sorting}
                        groupBy={"coreId"}
                        // onExpand={(_, record) => actions.openCloseGroup(record.coreId)}
                        // loading={isLoading}
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
