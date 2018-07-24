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

import 'antd/dist/antd.css';
import { Menu, Dropdown, Button, Icon, message, Alert } from 'antd';


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

    this.state = {
    }
  }

  render() {

    const sampleCoordinates = [
      {
        coordinates: [
          "33.891012,-118.338042",
          "33.888162,-118.3916",
          "33.853242,-118.395548",
          "33.849963,-118.353835",
          "33.86151,-118.330317"
        ],
        color: "#ffc107",
        name: "Zone 1"
      },
      {
        coordinates: [
          "33.889661,-118.308401",
          "33.787001,-118.305655",
          "33.80412,-118.142233",
          "33.959172,-118.195791",
          "33.935249,-118.275442",
        ],
        color: "#00bcd4",
        name: "Zone 2"
      },    
    ];
      
    return (
      <div>
        <AdminTheme>

    
        <AdminActionBar searchBar={true} inputPlaceholder="Search Zones..." action="Add" model="Delivery Zone" route="/admin/delivery-zone"  />
        <AdminPageTitle title="Delivery Zones" />


        <MapZonesReadOnly coordinateSet={sampleCoordinates}  id="delivery-zone" height="400px" />
        
        <DeliveryZoneItems />
        
        <AdminInfoPanel  contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
                Merchant Info
            </div>
            <div className="admin-info__item ">
                Login Info
            </div>
            <div className="admin-info__item ">
                API Settings
            </div>
            <div className="admin-info__item ">
                Billing Info
            </div>
        </AdminInfoPanel>
       
        </AdminTheme>
      </div>
    );
  }
}

export default DeliveryZones;
