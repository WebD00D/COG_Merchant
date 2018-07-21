import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../../fire";
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import _ from "lodash";
import { connect } from "react-redux";
import "whatwg-fetch";

import "../../layouts/fcss.css";
import "../../layouts/components.css";

import 'antd/dist/antd.css';
import { Menu, Timeline, Dropdown, Button, Icon, message, Modal, Alert, Badge } from 'antd';



import AdminTheme from "../../themes/admin-theme";
import AdminActionBar from "../../components/AdminActionBar";
import AdminPageTitle from "../../components/AdminPageTitle";
import AdminInfoPanel from "../../components/AdminInfoPanel";
import MerchantListActions from "../../components/MerchantListActions";
import MerchantListItems from "../../components/MerchantListItems";
import OrderListItems from "../../components/OrderListItems";

import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextareaField";
import SelectField from "../../components/SelectField";
import HighlightedFormField from "../../components/HighlightedFormField";


class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    
  }

  
  render() {


    return (
      <div>
        <AdminTheme>

         <div style={{paddingTop: "30px"}}>    
            <Alert message="Order #123 Cancelled" closeText="Close" type="error" showIcon />
        </div>
    

        <AdminActionBar searchBar={true} inputPlaceholder="Search orders..." action="" hideButton={true} model=""   />
        <AdminPageTitle title="Orders" />

        <MerchantListActions />
        <OrderListItems />

    
        <AdminInfoPanel  contentId="" createdOn="" lastUpdated="">
            <h3>Rider List</h3>
            <div className="admin-info__item admin-info__item--active">
                Jess Izen <Badge status="success" />
            </div>
            <div className="admin-info__item admin-info__item--active ">
                Marc Redmond <Badge status="success" />
            </div>
            <div className="admin-info__item admin-info__item--active ">
                Christian Bryant <Badge status="success" />
            </div>
            <div className="admin-info__item admin-info__item--active">
                Christine Young <Badge status="warning" />
            </div>
            <div className="admin-info__item ">
                Leslie Knope <Badge status="default" />
            </div>
            <div className="admin-info__item ">
                Ron Swanson <Badge status="default" />
            </div>
            <div className="admin-info__item ">
                Jerry Seinfield <Badge status="default" />
            </div>
            <div className="admin-info__item ">
                George Castanza <Badge status="default" />
            </div>
            <div className="admin-info__item ">
                Zach Sadovszky <Badge status="default" />
            </div>
            
        </AdminInfoPanel>
       
        </AdminTheme>
      </div>
    );
  }
}

export default Dashboard;
