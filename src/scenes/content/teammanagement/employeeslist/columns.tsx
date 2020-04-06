import * as React from 'react';
import * as styled from './EmployeesList.styles';
import {Icon, Select, Tooltip} from "antd";
import {Column} from "../../../../components/table/types";
import {EditableCell} from "../../../../components/editablecell/EditableCell";


// @ts-ignore
const renderAllGroupToggle = ({onClick, isOpen, isHidden}) => width =>
    isHidden ? (
        <styled.Cell width={width} key="group-all"/>
    ) : (
        <styled.GroupAllCell key="group-all-toggle" width={width} onClick={onClick}>
          <Icon type={isOpen ? 'caret-down' : 'caret-right'}/>
        </styled.GroupAllCell>
    );

export function getColumns(this: any): Array<Column> {
  const sortable = !this.props.isTableDraggable;
  return [
    {
      key: 'selected',
      dataIndex: 'selected',
      width: '40px',
      // @ts-ignore
      render: (value, record, width) =>
          record.isGroup ? null : (
              <styled.Cell width={width} className="employees-list-checked">
                <styled.CheckBox
                    checked={value}
                    onChange={e =>
                        this.props.actions.toggleItem({
                          coreId: record.coreID,
                          value: e.target.checked,
                          isNotValid: record.isNotValid
                        })
                    }
                />
              </styled.Cell>
          ),
      renderHeaderCell: renderAllGroupToggle({
        onClick: () => this.props.actions.toggleAllGroup(!this.props.isAllGroupsOpen),
        isHidden: !this.props.group || !this.props.dataSource || this.props.dataSource.length === 0,
        isOpen: this.props.isAllGroupsOpen,
      }),
    },
    {
      key: 'name',
      dataIndex: 'fullName',
      title: 'Employee Name',
      sortable,
      width: '160px',
      render: (value, record, width, tabIndex) => (
          <EditableCell
              testClassName="employees-list-name"
              onChange={value =>
                  this.props.actions.changeItem({
                    id: record.coreID,
                    key: 'fullName',
                    value,
                  })
              }
              value={value}
              // @ts-ignore
              width={width}
              tabIndex={tabIndex}
          />
      ),
    },
    {
      key: 'employeeRole',
      dataIndex: 'employeeRole',
      title: 'Role',
      width: '140px',
      render: (value: any, record: any, width: any) => {
        return (
            <styled.Cell
                className={`employees-list-role_${record.coreID}`}
                width={width}
                style={{opacity: record._rowOpacity}}
                key="role-cell"
                onClick={e => e.stopPropagation()}
            >
              <Select
                  placeholder="Role"
                  optionFilterProp="children"
                  showSearch={true}
                  value={value}
                  style={{width: '140px'}}
                  onSelect={(value: any) =>
                      this.props.actions.updateEmployeeRole({
                        coreID: record.coreID,
                        role: value
                      })
                  }
                  dropdownMatchSelectWidth={false}
              >
                {this.renderEmployeeRoles()}
              </Select>
            </styled.Cell>
        );
      },
    },
    {
      key: 'uuid',
      title: 'UUID',
      dataIndex: 'cardId',
      width: '300px',
      render: (value: any, record: any, width: any) => {
        return (
            record.isGroup ? (
                value
            ) : (
                <styled.Cell
                    className="employees-list-uuid"
                    width={width}
                    style={{opacity: record._rowOpacity}}
                >
                  {value}
                </styled.Cell>
            )
        );
      }
    },
    {
      key: 'boxesForAllTime',
      dataIndex: 'boxesForAllTime',
      title: 'Boxes For All Time',
      width: '160px',
      sortable,
      render: (value, record, width) => {
        return (
            <styled.Cell
                className="employees-list-boxes"
                width={width}
                style={{opacity: record._rowOpacity}}>
              {value}
            </styled.Cell>
        );
      },
    },
    {
      key: 'salaryForAllTime',
      dataIndex: 'salaryForAllTime',
      title: 'Salary For All Time',
      width: '160px',
      sortable,
      render: (value, record, width) => {
        return (
            <styled.Cell
                className="employees-list-salary"
                width={width}
                style={{opacity: record._rowOpacity}}>
              {value ? `${value} ₴` : '0'}
            </styled.Cell>
        );
      },
    },
    {
      key: 'editIcons',
      headerCellStyle: {width: '100%', minWidth: '30px', paddingRight: '5px'},
      render: (value: any, record: any, width: any) => {
        // const noteText = get(value[0], 'note', '');
        const isActiveIcon = 1 > 0;
        return (
            <styled.Cell
                className="employees-list-edit"
                width={width}
                style={{width: '100%', minWidth: '30px', justifyContent: "flex-end", paddingRight: '30px'}}
            >
              <styled.Block>
                <Tooltip placement="top" title="Edit Employee">
                  <styled.IconEditContainer
                      onClick={e => {
                        if (record._isRowClickable) {
                          e.stopPropagation();
                          this.handleEdit(record.coreID);
                        }
                      }}
                  >
                    <styled.IconEdit type="edit" isActiveIcon={isActiveIcon}/>
                  </styled.IconEditContainer>
                </Tooltip>
              </styled.Block>
              <styled.Block>
                <Tooltip placement="top" title="Remove Employee">
                  <styled.IconEditContainer
                      onClick={e => {
                        if (record._isRowClickable) {
                          e.stopPropagation();
                          // this.toggleNotesSider(record.coreId);
                        }
                      }}
                  >
                    <styled.IconRemove type="close-circle" isActiveIcon={isActiveIcon}/>
                  </styled.IconEditContainer>
                </Tooltip>
              </styled.Block>
            </styled.Cell>
        );
      },
    },
  ]
}
