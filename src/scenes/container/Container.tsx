import React from "react";
import {Dropdown, Icon, Layout} from "antd";
import * as styled from './Container.styles';
import {NavLink} from "react-router-dom";
import {CalendarOutlined, DollarCircleOutlined, TeamOutlined} from "@ant-design/icons/lib";
import {ClickParam} from "antd/lib/menu";
import {ContainerProps, ContainerState} from "./types";

const logo = require('./img/logo.svg');

const menu = (
    <styled.Menu>
      <styled.MenuItem key="0">
        <div
            onClick={() => {

            }}
        >
          Log out
        </div>
      </styled.MenuItem>
    </styled.Menu>
);


class Container extends React.Component<ContainerProps, ContainerState> {
  constructor(props: ContainerProps) {
    super(props);
    this.state = {
      collapsed: true,
      selectedMenuItem: '31',
    };
  }

  public openCloseMenu = () => {
    const {collapsed} = this.state;
    this.setState({collapsed: !collapsed});
  };

  private selectMenuItem = (itemKey: ClickParam) => {
    this.props.actions.selectMenuItem(itemKey.key);
  };

  public renderUserContainer = () => {
    return (
        <>
          <styled.UserContainer>
            <Dropdown overlay={menu} trigger={['click']}>
              <styled.ButtonLogOut>
                Dmitry <Icon type="down"/>
              </styled.ButtonLogOut>
            </Dropdown>
          </styled.UserContainer>
        </>
    );
  };


  render() {
    const {selectedMenuItem} = this.props;
    return (
        <Layout style={{flex: '1 0 100%', overflow: 'hidden', minHeight: '-webkit-fill-available'}}>
          <styled.Sider collapsed={this.state.collapsed}>
            <styled.Logo>
              <styled.LogoImg src={logo}/>
            </styled.Logo>
            <styled.Menu mode="inline" defaultSelectedKeys={[selectedMenuItem]}>
              <styled.MenuItem key="31" onClick={this.selectMenuItem}>
                <NavLink to="/workdays" className="work-days-btn">
                  <CalendarOutlined/>
                  <span>Work Days</span>
                </NavLink>
              </styled.MenuItem>
              <styled.MenuItem key="28" onClick={this.selectMenuItem}>
                <NavLink to="/teamsmanagement" className="teams-management-btn">
                  <TeamOutlined/>
                  <span>Teams Management</span>
                </NavLink>
              </styled.MenuItem>
              <styled.MenuItem key="32" onClick={this.selectMenuItem}>
                <NavLink to="/salarymanagement" className="salary-management-btn">
                  <DollarCircleOutlined/>
                  <span>Salary Management</span>
                </NavLink>
              </styled.MenuItem>
            </styled.Menu>
          </styled.Sider>
          <Layout>
            <styled.Header>
              <styled.ProjectMenu onClick={this.openCloseMenu} className="burger-btn">
                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}/>
              </styled.ProjectMenu>
              <styled.ProjectTitle>
                Strawberry App
              </styled.ProjectTitle>
              {this.renderUserContainer()}
            </styled.Header>
            {this.props.children}
          </Layout>
        </Layout>
    )
  }
}

export default Container;
