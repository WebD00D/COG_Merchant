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


import MerchantTheme from "../../themes/merchant-theme";import AdminActionBar from "../../components/AdminActionBar";
import AdminPageTitle from "../../components/AdminPageTitle";
import AdminInfoPanel from "../../components/AdminInfoPanel";

import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextareaField";
import SelectField from "../../components/SelectField";
import HighlightedFormField from "../../components/HighlightedFormField";

import { Checkbox, TimePicker } from 'antd';

import moment from 'moment';




class Menu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      merchantSection: "info" // info, login, api, billing
    }
  }

   onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  render() {
    return (
      <div>
        <MerchantTheme>
            <AdminActionBar action="Save" model="Menu" backRoute="/merchant/menus" />
            <AdminPageTitle title="New Menu" />
            <InputField labelName="Menu name" />
            <TextAreaField labelName="Menu Description" />


            <HighlightedFormField highlightText="These are the days this menu is available">

              <div className="m-b-20">  
              <Checkbox onChange={this.onChange}>Sunday</Checkbox>
              <TimePicker onChange={this.onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              <span className="m-r-10">to</span>
              <TimePicker onChange={this.onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              </div>

              <div className="m-b-20">  
              <Checkbox onChange={this.onChange}>Monday</Checkbox>
              <TimePicker onChange={this.onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              <span className="m-r-10">to</span>
              <TimePicker onChange={this.onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              </div>

              <div className="m-b-20">  
              <Checkbox onChange={this.onChange}>Tuesday</Checkbox>
              <TimePicker onChange={this.onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              <span className="m-r-10">to</span>
              <TimePicker onChange={this.onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
              </div>

              


                
            </HighlightedFormField>

            <SelectField labelName="Pickup / Delivery" selectOptions={["Delivery & Pickup", "Delivery Only", "Pickup Only"]} />
            <SelectField labelName="Status" selectOptions={["Pending Approval", "Active", "Suspended", "Blocked", "Expired"]} />

           
            <AdminInfoPanel  contentId="" createdOn="" lastUpdated="">
                <div className="admin-info__item admin-info__item--active">
                    Menu Info
                </div>
                <div className="admin-info__item ">
                    Menu Settings
                </div>
                
            </AdminInfoPanel>
        </MerchantTheme>
      </div>
    );
  }
}

export default Menu;
