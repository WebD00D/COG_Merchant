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

import AdminTheme from "../../themes/admin-theme";
import AdminActionBar from "../../components/AdminActionBar";
import AdminPageTitle from "../../components/AdminPageTitle";
import AdminInfoPanel from "../../components/AdminInfoPanel";

import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextareaField";
import SelectField from "../../components/SelectField";
import HighlightedFormField from "../../components/HighlightedFormField";

import { TimePicker, Checkbox, Divider } from "antd";
import moment from "moment";

class Service extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      merchantSection: "info" // info, login, api, billing
    };
  }

  onChange() {}

  render() {
    return (
      <div>
        <AdminTheme>
          <AdminActionBar
            handleAction={() => alert("SAVE THE SERVICE!")}
            action="Save"
            model="Service"
            backRoute="/admin/service-list"
          />
          <AdminPageTitle title="New Service" />
          <InputField labelName="Company name" />
          <InputField labelName="Phone" />
          <InputField labelName="Email" />

          <HighlightedFormField highlightText="When an order is placed, this is the address the courier will pick up from">
            <div className="input-field-wrap">
              <InputField isFieldGroup={true} pos="left" labelName="Street" />
              <InputField isFieldGroup={true} pos="right" labelName="City" />
            </div>
            <div className="input-field-wrap">
              <InputField isFieldGroup={true} pos="left" labelName="State" />
              <InputField isFieldGroup={true} pos="right" labelName="Zip" />
            </div>
          </HighlightedFormField>

          <InputField labelName="Primary Contact Name" />
          <InputField labelName="Primary Contact Phone " />

          <TextAreaField labelName="Description" />
          <SelectField
            labelName="Pickup / Delivery"
            selectOptions={[
              "Delivery & Pickup",
              "Delivery Only",
              "Pickup Only",
              "Phone Orders Only"
            ]}
          />
          <SelectField
            labelName="Status"
            selectOptions={[
              "Pending Approval",
              "Active",
              "Suspended",
              "Blocked",
              "Expired"
            ]}
          />

          <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              Merchant Info
            </div>
            <div className="admin-info__item ">Login Info</div>
            <div className="admin-info__item ">API Settings</div>
            <div className="admin-info__item ">Billing Info</div>
          </AdminInfoPanel>
        </AdminTheme>
      </div>
    );
  }
}

export default Service;
