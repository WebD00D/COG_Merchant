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

import { TimePicker, Checkbox, Divider } from "antd";
import moment from "moment";

class DeliveryZones extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      zoneName: "",
      zoneBackground: "#fff",
      coordinates: []
    };
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

  render() {
    return (
      <div>
        <AdminTheme>
          <AdminActionBar
            action="Save"
            model="Delivery Zone"
            backRoute="/admin/delivery-zones"
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
              ID: -
            </div>
            <div className="admin-info__item admin-info__item--active">
              Created On: -
            </div>
            <div className="admin-info__item ">Last Updated: -</div>
          </AdminInfoPanel>
        </AdminTheme>
      </div>
    );
  }
}

export default DeliveryZones;
