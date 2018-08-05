import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import _ from "lodash";
import { connect } from "react-redux";
import "whatwg-fetch";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";

import { Avatar, Badge, Dropdown, Menu, Button, Icon } from "antd";

class AdminTheme extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" href="#">
            {" "}
            <Icon type="profile" /> Profile
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" href="#">
            {" "}
            <Icon type="customer-service" /> Support
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" href="#">
            {" "}
            <Icon type="logout" /> Signout
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="admin">
        <div className="admin__menu">
          <div className="admin__menu-wrap">
            <div className="admin__logo-wrap">
              <img
                style={{ height: "40px" }}
                src={require("../layouts/images/logo@2x.png")}
              />
              <div className="theme-type">ADMIN</div>
            </div>
            <Link to="/admin/dashboard">
              <i className="fa fa-cutlery" aria-hidden="true" />Orders
            </Link>
            <Link to="/admin/merchant-list">
              <i className="fa fa-shopping-basket" aria-hidden="true" />Merchants
            </Link>
            <Link to="/admin/delivery-zones">
              <i className="fa fa-bicycle" aria-hidden="true" />Delivery Zones
            </Link>
            <Link to="/admin/services">
              <i className="fa fa-exchange" aria-hidden="true" />Services
            </Link>
            <Link to="/admin/rates">
              <i className="fa fa-money" aria-hidden="true" />Rates
            </Link>
            <Link to="/admin/merchants">
              <i className="fa fa-gear" aria-hidden="true" />Settings
            </Link>

            <Dropdown overlay={menu} placement="topCenter">
              <div className="admin-theme__user" style={{ height: "80px" }}>
                <div className="admin__current-user">
                  <Badge count={4}>
                    <Avatar shape="circle" icon="user" />
                  </Badge>
                </div>
                <div>{this.props.courier.company}</div>
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="admin__content">
          <div className="admin__content-wrap">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, courier }) => {
  return { user, courier };
};

//   const mapDispatchToProps = dispatch => {
//     return {
//       createCourier: (user, courier) =>
//         dispatch({
//           type: `LOGOUT_USER`
//         })
//     };
//   };

export default connect(mapStateToProps)(AdminTheme);
