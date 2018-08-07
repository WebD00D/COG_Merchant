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

import { TimePicker, Checkbox, Divider, message } from "antd";

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
      updated: ""
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

    this.props.services && Object.keys(this.props.services).map( (key) => {
        serviceOptions.push(this.props.services[key].name)
    } )

    let zoneOptions = [];
    this.props.zones && Object.keys(this.props.zones).map( (key) => {
        zoneOptions.push(this.props.zones[key].name)
    })
   

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