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
import { Menu, Dropdown, Button, Icon, message, Alert } from 'antd';


import AdminTheme from "../../themes/admin-theme";
import AdminActionBar from "../../components/AdminActionBar";
import AdminPageTitle from "../../components/AdminPageTitle";
import AdminInfoPanel from "../../components/AdminInfoPanel";
import MerchantListActions from "../../components/MerchantListActions";
import MerchantListItems from "../../components/MerchantListItems";

import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextareaField";
import SelectField from "../../components/SelectField";
import HighlightedFormField from "../../components/HighlightedFormField";


class MerchantList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {


    return (
      <div>
        <AdminTheme>

         <div style={{paddingTop: "30px"}}>    
         <Alert 
            message="Merchant is not setup"
            description="Merchant 'ZZQ' has been Pending for 13 days"
            type="warning"
            showIcon
            closeText="Close"
         />
        </div>

        <AdminActionBar searchBar={true} inputPlaceholder="Search merchants..." action="Add" model="Merchant" route="/admin/merchant"  />
        <AdminPageTitle title="Merchants" />

        <MerchantListActions />
        <MerchantListItems />
        
        <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              <Icon
                style={{ position: "absolute", right: "60px" }}
                type="info-circle-o"
              />
              <h2>Merchants 101</h2>
              <Divider />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <h3>Still have questions?</h3>
              <Button type="primary">
                Contact support{" "}
                <Icon style={{ color: "#FFF" }} type="customer-service" />
              </Button>
            </div>
          </AdminInfoPanel>
       
        </AdminTheme>
      </div>
    );
  }
}

export default MerchantList;
