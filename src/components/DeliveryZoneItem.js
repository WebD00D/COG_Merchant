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

    return (
      <div onClick={ () => this.props.handleClick() } className="model-list__row " style={{height: "50px", marginBottom: "12px", cursor: "pointer"}}>
        <div className="model-list__item model-list__item-lg">
          <div style={{ color: this.props.color }}>{this.props.zone}</div>
        
        </div>

        <div style={{backgroundColor: this.props.color, height: "15px", width: "15px", borderRadius: "50%"}}></div>

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
