import React, { Component } from 'react';
import styled from 'styled-components';

import { Menu, Avatar, Dropdown, Icon, Drawer, Badge } from 'antd';

const Nav = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.06);
  position: fixed;
  z-index: 2;
  top: 0px;
`;

const NavSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: 30px;
  padding-right: 30px;
  color: #abbdd1;

  font-size: 16px;
  ${props => props.style};
`;

const NavLogo = styled.img`
  height: 40px;
`;

const LocationIcon = styled.i`
  margin-right: 8px;
`;

const MenuButton = styled(Icon)`
  cursor: pointer;
`;

const profileMenu = (
  <Menu>
    <Menu.Item>Profile</Menu.Item>
    <Menu.Item>Order History</Menu.Item>
    <Menu.Item>Logout</Menu.Item>
  </Menu>
);

class ClientNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Drawer
          title="Your Order"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width={320}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
        <Nav>
          <NavSection style={{ borderRight: '3px solid #F7F8FB' }}>
            <NavLogo src={require('../layouts/images/logo@2x.png')} />
          </NavSection>
          <NavSection style={{ borderRight: '3px solid #F7F8FB' }}>
            <LocationIcon className="fa fa-map-marker" />
            Browse Partners
          </NavSection>
          <NavSection style={{ borderRight: '3px solid #F7F8FB' }}>
            Custom Orders
          </NavSection>
          <NavSection style={{ borderRight: '3px solid #F7F8FB' }}>
            <Dropdown overlay={profileMenu}>
              <div>
                <div>
                  <Avatar
                    style={{
                      color: '#1890ff',
                      backgroundColor: '#fde3cf',
                      marginRight: '8px'
                    }}
                  >
                    C
                  </Avatar>{' '}
                  Christian Bryant <Icon type="down" />
                </div>
              </div>
            </Dropdown>
          </NavSection>
          <NavSection
            onClick={() => this.showDrawer()}
            style={{ flex: 'none', cursor: 'pointer' }}
          >
            <Badge count={5}>
              <MenuButton style={{ fontSize: '24px' }} type="shopping-cart" />
            </Badge>
          </NavSection>
        </Nav>
      </div>
    );
  }
}

export default ClientNavbar;
