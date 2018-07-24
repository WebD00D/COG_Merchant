import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";

import InputField from "../components/InputField";

import DeliveryZoneItem from "../components/DeliveryZoneItem";

import { connect } from "react-redux";

class DeliveryZoneItems extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="model-list">
        <DeliveryZoneItem zone="Zone 1" color="#ffc107" />
        <DeliveryZoneItem zone="Zone 2" color="#00bcd4" />
      </div>
    );
  }
}

export default DeliveryZoneItems;
