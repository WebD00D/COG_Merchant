import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";

import MapZone from "../components/MapZone";


import InputField from "../components/InputField";

import { Button, Modal, Icon } from "antd";

import { connect } from "react-redux";

class DeliveryZoneItem extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showDetailsModal: false
    }
    
  }

  render() {

    console.log("this props", this.props)
    return (
      <div className="model-list__row">
        <div className="model-list__item model-list__item-lg">
          <label>Name</label>
          <div style={{ color: this.props.color }}>{this.props.zone}</div>
        </div>
        <Button onClick={() => this.setState({ showDetailsModal: true })} style={{height: "20px", width: "30px", padding: "0px"}} type=""><Icon type="ellipsis" /></Button>


        <Modal
          okText="Delete Zone"
          okType="danger"
          title={this.props.zone}
          visible={this.state.showDetailsModal}
          onOk={()=> console.log("do something")}
          onCancel={() => this.setState({ showDetailsModal: false })}
        >
          <p>{this.props.notes}</p>
          
        </Modal>
      </div>
    );
  }
}

export default DeliveryZoneItem;
