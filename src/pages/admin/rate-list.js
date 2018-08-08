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

import "antd/dist/antd.css";
import {
  Menu,
  Dropdown,
  Button,
  Icon,
  message,
  Alert,
  Divider,
  Checkbox
} from "antd";

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

import RateListItem from "../../components/RateListItem";

class RateList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    fire
      .database()
      .ref("/rates/")
      .on(
        "value",
        function(snapshot) {
          this.props.setRates(snapshot.val());
        }.bind(this)
      );
  }

  render() {
    let Rates =
      this.props.rates &&
      Object.keys(this.props.rates).map(key => {
        return (
          <RateListItem
            key={key}
            service={this.props.rates[key].service}
            origin={this.props.rates[key].origin}
            destination={this.props.rates[key].destination}
            increase={this.props.rates[key].price}
          />
        );
      });

    return (
      <div>
        <AdminTheme>
          <AdminActionBar
            searchBar={true}
            inputPlaceholder="Search rates..."
            action="Add"
            model="Rate"
            route="/admin/rate"
          />
          <AdminPageTitle title="Rates" />

          <HighlightedFormField
          customTopMargin={"0px"}
            highlightText={`Rate settings here will be considered the default for any rates. Settings can be changed rate by rate specifically by changing the individual rate setting. `}
          >
            <div className="fx fx-s-b ">
              <div className="input-wrap m-b-10 fx">
                <label>Base Level Rate Settings</label>
              </div>
            </div>

            <div className="m-b-30">
              <div><Checkbox checked>Base level setting</Checkbox></div>
              <div><Checkbox checked>A sample setting for all rates</Checkbox></div>
              <div><Checkbox checked>Another sample setting for all rates</Checkbox></div>

            </div>
          </HighlightedFormField>

          {Rates}

          <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              <Icon
                style={{ position: "absolute", right: "60px" }}
                type="info-circle-o"
              />
              <h2>Rates 101</h2>
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

const mapStateToProps = ({ user, courier, services, rates }) => {
  return { user, courier, services, rates };
};

const mapDispatchToProps = dispatch => {
  return {
    setRates: rates =>
      dispatch({
        type: `SET_RATES`,
        rates
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RateList);
