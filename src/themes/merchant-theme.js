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

import { Avatar, Badge } from 'antd';


import InputField from "../components/InputField";

class MerchantTheme extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="admin">
        <div className="admin__menu">
            <div className="admin__menu-wrap">
                <div className="admin__logo-wrap">
                    <img style={{height: "40px"}} src={require("../layouts/images/logo@2x.png")}/>
                    <div className="theme-type">MERCHANT</div>
                </div>
                
                <Link to="/merchant/dashboard">
                    <i className="fa fa-cutlery" aria-hidden="true"></i>Orders
                </Link>
                <Link to="/merchant/menus">
                    <i className="fa fa-folder-open" aria-hidden="true"></i>Menus
                </Link>
                <Link to="/admin/merchants">
                    <i className="fa fa-users" aria-hidden="true"></i>Users
                </Link>
                <Link to="/admin/merchants">
                    <i className="fa fa-calendar" aria-hidden="true"></i>Schedule
                </Link>
                <Link to="/admin/merchants">
                    <i className="fa fa-sliders" aria-hidden="true"></i>Settings
                </Link>
                <Link className="admin__current-user" to="/admin/merchants">
                    <span style={{backgroundColor: "#f5f5f5"}}>
                    <Badge count={4}><Avatar shape="circle" icon="user" /></Badge>
                    </span>
                </Link>
            </div>
        </div>
        <div className="admin__content">
            <div className="admin__content-wrap">{ this.props.children }</div>
        </div>
      </div>
    );
  }
}

export default MerchantTheme;
