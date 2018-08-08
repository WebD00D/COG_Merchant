import React, { PureComponent } from "react";
import fire from "../../fire";
import { Route, Redirect } from "react-router-dom";

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

import ServiceRateHours from "../../components/ServiceRateHours";
import DeliverySurchargeItem from "../../components/DeliverySurchargeItem";

import {
  TimePicker,
  Checkbox,
  Divider,
  message,
  List,
  Button,
  Input
} from "antd";

import { createId, getQueryVariable } from "../../utils/app-utils";

import moment from "moment";

class Rate extends PureComponent {
  constructor(props) {
    super(props);

    this.saveRate = this.saveRate.bind(this);

    this.state = {
      service: "",
      origin: "",
      destination: "",
      price: 0,

      id: "",
      saved: "",
      updated: "",

      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,

      sun__open: "",
      sun__close: "",

      mon__open: "",
      mon__close: "",

      tues__open: "",
      tues__close: "",

      wed__open: "",
      wed__close: "",

      thurs__open: "",
      thurs__close: "",

      fri__open: "",
      fri__close: "",

      sat__open: "",
      sat__close: ""
    };
  }

  saveRate() {
    // We'll prob need to save a in a few different ways...
    // 1. Save my service type
    // 2. Save full to a full list of rates

    const rateId = createId("RATE");

    const newRate = {
      id: rateId,
      service: this.state.service,
      origin: this.state.origin,
      destination: this.state.destination,
      price: this.state.price,
      lastUpdated: Date.now()
    };

    var updates = {};
    updates["/rates/" + rateId] = newRate;

    fire
      .database()
      .ref()
      .update(updates);

    this.setState({
      id: rateId,
      saved: Date.now(),
      updated: Date.now()
    });

    // PUSH ZONE TO STORE
    message.success(`rate created!`);
  }

  render() {
    let serviceOptions = [];

    this.props.services &&
      Object.keys(this.props.services).map(key => {
        serviceOptions.push(this.props.services[key].name);
      });

    let zoneOptions = [];
    this.props.zones &&
      Object.keys(this.props.zones).map(key => {
        zoneOptions.push(this.props.zones[key].name);
      });

    return (
      <div>
        <AdminTheme>
          <AdminActionBar
            handleAction={() => this.saveRate()}
            action="Save"
            model="Rate"
            backRoute="/admin/rate-list"
          />

          <AdminPageTitle title="New Rate" />

          <SelectField
            setValue={val => this.setState({ service: val })}
            labelName="Service"
            selectOptions={serviceOptions}
          />

          <SelectField
            setValue={val => this.setState({ origin: val })}
            labelName="Origin Zone"
            selectOptions={zoneOptions}
          />

          <SelectField
            setValue={val => this.setState({ destination: val })}
            labelName="Destination Zone"
            selectOptions={zoneOptions}
          />

          <InputField
            setValue={val => this.setState({ price: val })}
            inputType="number"
            labelName="Rate Increase"
          />

          <HighlightedFormField
            highlightText={`If no time selected, service rate will default to regular open / close hours.`}
          >
            <div className="input-wrap m-b-30">
              <label>Service Rate Availability</label>
            </div>
            <List className="m-b-30" bordered>
              <ServiceRateHours day={"Sunday"} selected={this.state.s} />
              <ServiceRateHours day={"Monday"} />
              <ServiceRateHours day={"Tuesday"} />
              <ServiceRateHours day={"Wednesday"} />
              <ServiceRateHours day={"Thursday"} />
              <ServiceRateHours day={"Friday"} />
              <ServiceRateHours day={"Saturday"} />
            </List>
          </HighlightedFormField>

          <HighlightedFormField
            highlightText={`Additional delivery surcharge zone-to-zone based on time/date/order size`}
          >
            <div className="fx fx-s-b ">
              <div className="input-wrap m-b-30 fx">
                <label>Delivery Surcharges (By Time)</label>
              </div>
              <Button>Add Surcharge</Button>
            </div>

            <List className="m-b-30" bordered>
              <DeliverySurchargeItem addOnPlaceHolder={"$"} />
            </List>
          </HighlightedFormField>


          <HighlightedFormField
            highlightText={`Mandatory gratuity (%) that can be set for each zone to zone linkage`}
          >
            <div className="fx fx-s-b ">
              <div className="input-wrap m-b-30 fx">
                <label>Mandatory Gratuity (By Time)</label>
              </div>
              <Button>Add Gratuity </Button>
            </div>

            <List className="m-b-30" bordered>
              <DeliverySurchargeItem addOnPlaceHolder={"%"} />
            </List>
          </HighlightedFormField>

          <HighlightedFormField
            highlightText={`Mandatory gratuity (%) that can be set for each zone to zone linkage`}
          >
            <div className="fx fx-s-b ">
              <div className="input-wrap m-b-30 fx">
                <label>Temporary Auto-gratuity</label>
              </div>
            </div>

            <List className="m-b-30" bordered>
              <DeliverySurchargeItem addOnPlaceHolder={"%"} />
            </List>
          </HighlightedFormField>

          <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              ID: {this.state.id ? this.state.id : "-"}
            </div>
            <div className="admin-info__item admin-info__item--active">
              Created On:{" "}
              {this.state.saved != ""
                ? moment(this.state.saved).format("MM-DD-YYYY")
                : "-"}
            </div>
            <div className="admin-info__item ">
              Last Updated:{" "}
              {this.state.updated != ""
                ? moment(this.state.updated).format("MM-DD-YYYY")
                : "-"}
            </div>
          </AdminInfoPanel>
        </AdminTheme>
      </div>
    );
  }
}

const mapStateToProps = ({ services, zones }) => {
  return {
    services,
    zones
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: `INCREMENT` })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rate);
