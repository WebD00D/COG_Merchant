import React from 'react';
import styled from 'styled-components';

import { Menu, Avatar, Dropdown, Icon } from 'antd';

const Nav = styled.div`
  display: flex;
  align-items: center;
  height: 100px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 2;
`;

const NavSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-left: 30px;
  padding-right: 30px;
  color: #ABBDD1;

  font-size: 16px;
  ${props => props.style};
`;

const NavLogo = styled.img`
  height: 40px;
`;

const LocationIcon = styled.i`
  margin-right: 8px;
`;

const profileMenu = (
  <Menu>
    <Menu.Item>Profile</Menu.Item>
    <Menu.Item>Order History</Menu.Item>
    <Menu.Item>Logout</Menu.Item>
  </Menu>
);

const ClientNavbar = () => (
  <div>
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
      <NavSection>
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
    </Nav>
  </div>
);
export default ClientNavbar;
