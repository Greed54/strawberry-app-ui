import * as React from 'react';
import {Block, Cell, GroupAllCell, IconEditContainer, Notes} from "./WorkDays.styles";
import {Tooltip, Icon, Select} from "antd";
import {get} from 'lodash';

const {Option} = Select;

const renderAllGroupToggle = (
    {
      onClick,
      isOpen,
      isHidden,
    }: {
      onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
      isOpen: boolean;
      isHidden: boolean;
    },
) =>
    // @ts-ignore
    width =>
        isHidden ? (
            <Cell width={width} key="group-all-toggle"/>
        ) : (
            <GroupAllCell key="group-all-toggle" width={width} onClick={onClick}>
              <Icon type={isOpen ? 'caret-down' : 'caret-right'}/>
            </GroupAllCell>
        );


export function getColumns(this: any) {

  return [
    {
      key: 'nameIcon',
      dataIndex: 'name',
      title: '',
      width: '35px',
      render: (value: any, record: any, width: any) => (
          <Cell width={width} style={{opacity: record._rowOpacity}} key="icon-name-cell">
            {value && value !== 'NONE' ? (
                <Tooltip
                    placement="right"
                    trigger="hover"
                    title="xyz">
                  <Icon type="exclamation-circle" theme="filled"/>
                </Tooltip>
            ) : null}
          </Cell>
      ),
      renderHeaderCell: renderAllGroupToggle({
        onClick: () => {
          this.props.actions.toggleAllGroup(!this.props.isAllGroupsOpen);
        },
        isHidden:
            !this.props.group || !this.props.employees || this.props.employees.length === 0,
        isOpen: this.props.isAllGroupsOpen,
      })
    },
    {
      key: 'employeeName',
      title: 'Employee Name',
      dataIndex: 'name',
      width: '150px',
      render: (value: any, record: any, width: any) => {
        return (
            record.isGroup ? (
                value
            ) : (
                <Cell
                    className="tl-employee-name"
                    width={width}
                    style={{opacity: record._rowOpacity}}
                    key="employeeName-cell"
                >
                  {value}
                </Cell>
            )
        );
      }
    },
    {
      key: 'teamName',
      title: 'Team',
      dataIndex: 'team',
      width: '140px',
      render: (value: any, record: any, width: any) => {
        return (
            record.isGroup ? (
                value
            ) : (
                <Cell
                    className="tl-team-name"
                    width={width}
                    style={{opacity: record._rowOpacity}}
                    key="teamName-cell"
                >
                  {value}
                </Cell>
            )
        );
      }
    },
    {
      key: 'boxes',
      title: 'Boxes',
      dataIndex: 'boxes',
      width: '100px',
      render: (value: any, record: any, width: any) => {
        return (
            record.isGroup ? (
                value
            ) : (
                <Cell
                    className="tl-boxes"
                    width={width}
                    style={{opacity: record._rowOpacity}}
                    key="boxes-cell"
                >
                  {value}
                </Cell>
            )
        );
      }
    },
    {
      key: 'kilograms',
      title: 'Kilograms',
      dataIndex: 'kilograms',
      width: '150px',
      render: (value: any, record: any, width: any) => {
        return (
            record.isGroup ? (
                value
            ) : (
                <Cell
                    className="tl-kilograms"
                    width={width}
                    style={{opacity: record._rowOpacity}}
                    key="kilograms-cell"
                >
                  {value}
                </Cell>
            )
        );
      }
    },
    {
      key: 'salary',
      title: 'Salary',
      dataIndex: 'salary',
      width: '160px',
      render: (value: any, record: any, width: any) => {
        return (
            record.isGroup ? (
                value
            ) : (
                <Cell
                    className="tl-salary"
                    width={width}
                    style={{opacity: record._rowOpacity}}
                    key="salary-cell"
                >
                  {value}
                </Cell>
            )
        );
      }
    },
    {
      key: 'uuid',
      title: 'UUID',
      dataIndex: 'cardId',
      width: '170px',
      render: (value: any, record: any, width: any) => {
        return (
            record.isGroup ? (
                value
            ) : (
                <Cell
                    className="tl-uuid"
                    width={width}
                    style={{opacity: record._rowOpacity}}
                    key="uuid-cell"
                >
                  {value}
                </Cell>
            )
        );
      }
    },
    {
      key: 'weightNumbers',
      title: 'Weight Numbers',
      dataIndex: 'weightNumber',
      width: '150px',
      render: (value: any, record: any, width: any) => {
        return (
            record.isGroup ? (
                value
            ) : (
                <Cell
                    className="tl-weight-numbers"
                    width={width}
                    style={{opacity: record._rowOpacity}}
                    key="weightNumbers-cell"
                >
                  {value}
                </Cell>
            )
        );
      }
    },
    {
      key: 'note',
      dataIndex: 'notes',
      title: 'Notes',
      width: '200px',
      // headerCellStyle: { width: '100%', minWidth: '30px', paddingRight: '5px' },
      render: (value: any, record: any, width: any) => {
        // const noteText = get(value[0], 'note', '');
        const noteIconColor = 1 > 0 ? '#1890ff' : '#ccc';
        return (
            <Cell
                className="tl-note"
                width={width}
                key="note-cell"
                style={{width: '100%', minWidth: '30px'}}
            >
              <Block>
                <Tooltip placement="top" title="Add Task Notes">
                  <IconEditContainer
                      onClick={e => {
                        if (record._isRowClickable) {
                          e.stopPropagation();
                          // this.toggleNotesSider(record.coreId);
                        }
                      }}
                  >
                    <Icon type="edit" theme="filled" style={{color: noteIconColor}}/>
                  </IconEditContainer>
                </Tooltip>
              </Block>
              <Tooltip placement="top" title={"noteText"}>
                <Notes>{"noteText"}</Notes>
              </Tooltip>
            </Cell>
        );
      },
    },
    {
      key: 'employeeRole',
      dataIndex: 'role',
      title: 'Role',
      width: '140px',
      render: (value: any, record: any, width: any) => {
        const roleOptions: any = [
          <Option key={'o.coreId'}>{"Team Lead"}</Option>
        ];

        return record.isGroup ? (
            value
        ) : (
            <Cell
                className={`tl-role_${record.coreId}`}
                width={width}
                style={{opacity: record._rowOpacity}}
                key="role-cell"
                onClick={e => e.stopPropagation()}
            >
              <Select
                  placeholder="Role"
                  optionFilterProp="children"
                  showSearch={true}
                  value={(value && value.coreId) || 'Unassigned'}
                  style={{width: '140px'}}
                  onSelect={() => "f"}
                  dropdownMatchSelectWidth={false}
              >
                {roleOptions}
              </Select>
            </Cell>
        );
      },
    },
    {
      key: 'pricePerKilogram',
      title: 'Price per kilogram',
      dataIndex: 'pricePerKilogram',
      width: '150px',
      render: (value: any, record: any, width: any) => {
        return (
            record.isGroup ? (
                value
            ) : (
                <Cell
                    className="tl-price-per-kilogram"
                    width={width}
                    style={{opacity: record._rowOpacity}}
                    key="pricePerKilogram-cell"
                >
                  {value}
                </Cell>
            )
        );
      }
    }
  ]
}
