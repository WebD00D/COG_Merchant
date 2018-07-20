import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";


import { connect } from "react-redux";

class AdminActionBar extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {

    let iconClass;
    
    switch (this.props.action) {
      case "Save":
        iconClass = "fa fa-check-circle"
        break;
      case "Add":
        iconClass = "fa fa-plus-circle"
        break;
      default:
        break;
    }


    return (
      <div className="admin-title-bar">
          {this.props.backRoute ? 
            <Link to={this.props.backRoute} className="admin-back"><i className="fa fa-long-arrow-left"></i> Back</Link>
            : 
            <div></div> 
            }
          {this.props.route ? 
            <Link className="button" to={this.props.route} style={{backgroundColor: "#0c1267"}}><i className={iconClass}></i> {this.props.action} {this.props.model}</Link>
          : 
            <button className="button" style={{backgroundColor: "#0c1267"}}><i className={iconClass}></i> {this.props.action} {this.props.model}</button>
          }
      </div>
    );
  }
}

export default AdminActionBar;
