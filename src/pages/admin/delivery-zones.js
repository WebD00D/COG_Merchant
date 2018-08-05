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
import { Menu, Dropdown, Button, Icon, message, Alert, Divider } from "antd";

import AdminTheme from "../../themes/admin-theme";
import AdminActionBar from "../../components/AdminActionBar";
import AdminPageTitle from "../../components/AdminPageTitle";
import AdminInfoPanel from "../../components/AdminInfoPanel";

import DeliveryZoneItems from "../../components/DeliveryZoneItems";

import MapZonesReadOnly from "../../components/MapZonesReadOnly";

import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextareaField";
import SelectField from "../../components/SelectField";
import HighlightedFormField from "../../components/HighlightedFormField";

class DeliveryZones extends PureComponent {
  constructor(props) {
    super(props);

    this.handleZoneHighlighting = this.handleZoneHighlighting.bind(this);

    this.state = {
      highlightedZones: []
    };
  }

  componentDidMount() {
    fire
      .database()
      .ref("/zones/")
      .once("value")
      .then(
        function(snapshot) {
          this.props.setZones(snapshot.val());
        }.bind(this)
      );
  }

  handleZoneHighlighting(zone) {
    let cpyHighlightedZones = this.props.highlightedZones;
    let zoneAlreadyHighlighted = _.filter(cpyHighlightedZones, {
      name: zone.name
    });

    if (zoneAlreadyHighlighted == 0) {
      cpyHighlightedZones.push(zone);
    } else {
      let indexOfZone = _.findIndex(cpyHighlightedZones, function(o) {
        return o.name == zone.name;
      });
      cpyHighlightedZones.splice(indexOfZone, 1);
    }

    this.props.setHighlightedZones(cpyHighlightedZones)
    this.forceUpdate();
  }

  render() {
    let savedZonesArray = []; // this is for showing the list of all the zones.
    Object.keys(this.props.zones).map(key => {
      const zoneObj = {
        coordinates: this.props.zones[key].coordinates,
        color: this.props.zones[key].zoneBackground,
        name: this.props.zones[key].name,
        notes: this.props.zones[key].notes
      };
      savedZonesArray.push(zoneObj);
    });

    const highlight = this.state.highlightedZones;


    return (
      <div>
        <AdminTheme>
          <AdminActionBar
            searchBar={true}
            inputPlaceholder="Search Zones..."
            action="Add"
            model="Delivery Zone"
            route="/admin/delivery-zone"
          />
          <AdminPageTitle title="Delivery Zones" />

          <MapZonesReadOnly
            id="delivery-zone"
            height="400px"
          />

          <DeliveryZoneItems
            highlightZone={ zone => { console.log("delivery zone gets fired"); this.handleZoneHighlighting(zone)} }
            zones={savedZonesArray}
          />

          {/* <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              <Icon
                style={{ position: "absolute", right: "60px" }}
                type="info-circle-o"
              />
              <h2>Zones 101</h2>
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
          </AdminInfoPanel> */}
        </AdminTheme>
      </div>
    );
  }
}

const mapStateToProps = ({ user, courier, zones, highlightedZones }) => {
  return { user, courier, zones, highlightedZones };
};

const mapDispatchToProps = dispatch => {
  return {
    setZones: zones =>
      dispatch({
        type: `SET_ZONES`,
        zones
      }),
    setHighlightedZones: zones =>
      dispatch({
        type: `SET_HIGHLIGHTED_ZONES`,
        zones
      })

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryZones);
