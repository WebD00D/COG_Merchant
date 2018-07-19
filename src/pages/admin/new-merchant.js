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

import InputField from "../../components/InputField";


class NewMerchant extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AdminTheme>
            <AdminActionBar />
            <AdminPageTitle title="New Merchant" />
            <InputField labelName="Company name" />
            <InputField labelName="Phone" />
            <InputField labelName="Email" />

        </AdminTheme>
      </div>
    );
  }
}

export default NewMerchant;
