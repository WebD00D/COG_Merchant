import React, { PureComponent } from "react";
import { Link } from "gatsby-link";

import fire from "../../fire";
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import _ from "lodash";
import { connect } from "react-redux";
import "whatwg-fetch";

import "../../layouts/fcss.css";
import "../../layouts/components.css";

import { CirclePicker } from "react-color";

import AdminTheme from "../../themes/admin-theme";
import AdminActionBar from "../../components/AdminActionBar";
import AdminPageTitle from "../../components/AdminPageTitle";
import AdminInfoPanel from "../../components/AdminInfoPanel";

import MapZone from "../../components/MapZone";

import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextareaField";
import SelectField from "../../components/SelectField";
import HighlightedFormField from "../../components/HighlightedFormField";

import { createId, getQueryVariable } from "../../utils/app-utils";

import { TimePicker, Checkbox, Divider, message } from "antd";
import moment from "moment";

class DeliveryZone extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      zoneName: "",
      zoneNotes: "",
      zoneBackground: "#fff",
      coordinates: [],
      zoneSaved: false,

      id: "",
      saved: "",
      updated: ""
    };
  }

  componentWillMount() {
    // check param for zone id.

    const zoneId = getQueryVariable("zone");

    if (zoneId) {
      // if zone, filter through store
      // and set state..

     
    }
  }

  handleChangeComplete = color => {
    this.setState({ zoneBackground: color.hex });
  };

  handleSaveCoordinates = coordinates => {
    console.log("coordinates array", coordinates);
    this.setState({
      coordinates
    });
  };

  saveDeliveryZone() {
    const deliveryZoneId = createId("ZONE");

    const saveDate = Date.now();

    const newZone = {
      id: deliveryZoneId,
      name: this.state.zoneName,
      notes: this.state.zoneNotes,
      zoneBackground: this.state.zoneBackground,
      coordinates: this.state.coordinates
    };

    var updates = {};
    updates["/zones/" + deliveryZoneId] = newZone;

    fire
      .database()
      .ref()
      .update(updates);

  
    this.setState({
      id: deliveryZoneId,
      zoneSaved: true
    });

    // PUSH ZONE TO STORE

    message.success(`${this.state.zoneName} created!`);
  }

  render() {
    
    return (
      <div>
        <AdminTheme>
          <AdminActionBar
            action="Save"
            model="Delivery Zone"
            backRoute="/admin/delivery-zones"
            handleAction={() => this.saveDeliveryZone()}
          />
          <AdminPageTitle title="New Delivery Zone" />
          <InputField
            setValue={zoneName => {
              this.setState({
                zoneName
              });
            }}
            labelName="Zone Name"
          />
          <TextAreaField
            setValue={zoneNotes => {
              this.setState({
                zoneNotes
              });
            }}
            labelName="Notes"
          />
          <HighlightedFormField customTopMargin={"10px"}>
            <div className="input-wrap m-b-20">
              <label>Zone Color</label>
            </div>
            <CirclePicker
              color={this.state.zoneBackground}
              onChangeComplete={this.handleChangeComplete}
            />
          </HighlightedFormField>

          <HighlightedFormField highlightText="Map your zone coordinates">
            <MapZone
              height="400px"
              id="devzone"
              updating={this.state.updating}
              currentCoordinateSet={this.state.coordinates}
              deleteCoordinates={() => {
                this.setState({ coordinates: [] });
              }}
              saveCoordinates={coordinates =>
                this.handleSaveCoordinates(coordinates)
              }
              color={this.state.zoneBackground}
            />
          </HighlightedFormField>

          <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              ID: {this.state.id ? this.state.id : "-"}
            </div>
            <div className="admin-info__item admin-info__item--active">
              Created On:{" "}
              {this.state.saved.trim() != ""
                ? moment(this.state.saved).format("MM-DD-YYYY")
                : "-"}
            </div>
            <div className="admin-info__item ">
              Last Updated:{" "}
              {this.state.updated.trim() != ""
                ? moment(this.state.updates).format("MM-DD-YYYY")
                : "-"}
            </div>
          </AdminInfoPanel>
        </AdminTheme>
      </div>
    );
  }
}

const mapStateToProps = ({ user, courier, zones }) => {
  return { user, courier, zones };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewZone: zone =>
      dispatch({
        type: `ADD_ZONE`,
        zone
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryZone);
