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
    return (
      <div className="admin-title-bar">
          <div className="admin-back"><i className="fa fa-long-arrow-left"></i> Back</div>
          <button><i className="fa fa-check-circle"></i> Save Merchant</button>
      </div>
    );
  }
}

export default AdminActionBar;
