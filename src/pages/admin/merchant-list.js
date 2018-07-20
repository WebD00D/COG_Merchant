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
        <AdminActionBar action="Add" model="Merchant" route="/admin/merchant"  />
        <AdminPageTitle title="Merchants" />

            <div className="model-list">
                <div className="model-list__row">
                    <div className="model-list__item">
                        <label>Merchant</label>
                        <div>Strange Matter</div>
                   </div>
                   <div className="model-list__item">
                        <label>Phone</label>
                        <div>804.801.6177</div>
                   </div>
                   <div className="model-list__item">
                        <label>Sales</label>
                        <div>$13,879</div>
                   </div>
                   <div className="model-list__item">
                        <label>Status</label>
                        <div className="fc-green">Active</div>
                   </div>
                </div>
                <div className="model-list__row">
                    <div className="model-list__item">
                        <label>Merchant</label>
                        <div>Ellwood Thompson's</div>
                   </div>
                   <div className="model-list__item">
                        <label>Phone</label>
                        <div>804.801.6177</div>
                   </div>
                   <div className="model-list__item">
                        <label>Sales</label>
                        <div>$13,879</div>
                   </div>
                   <div className="model-list__item">
                        <label>Status</label>
                        <div className="fc-green">Active</div>
                   </div>
                </div>
                <div className="model-list__row">
                    <div className="model-list__item">
                        <label>Merchant</label>
                        <div>The Daily</div>
                   </div>
                   <div className="model-list__item">
                        <label>Phone</label>
                        <div>804.801.6177</div>
                   </div>
                   <div className="model-list__item">
                        <label>Sales</label>
                        <div>$13,879</div>
                   </div>
                   <div className="model-list__item">
                        <label>Status</label>
                        <div className="fc-green">Active</div>
                   </div>
                </div>
            </div>
       
        </AdminTheme>
      </div>
    );
  }
}

export default MerchantList;
