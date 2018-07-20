import React, { PureComponent } from "react";
import Link from "gatsby-link";
import cx from "classnames";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";


import { connect } from "react-redux";

class AdminInfoPanel extends PureComponent {
  constructor(props) {
    super(props);

  }


  render() {
    return (
        <div className="admin-info-panel">
        <div className="admin-info-panel__wrap">
            <div className="admin-info__section">
                <div><span>ID:</span><span>{this.props.contentId ? this.props.contentId : "-"}</span></div>
                <div><span>Created:</span><span>{this.props.createdOn ? this.props.createdOn : "-"}</span></div>
                <div><span>Updated:</span><span>{this.props.lastUpdated ? this.props.lastUpdated : "-"}</span></div>
            </div>
            {this.props.children ? <div className="admin-info__section">{this.props.children}</div> : ""}
        </div>
       
    </div>
    );
  }
}

export default AdminInfoPanel;
