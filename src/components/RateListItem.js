import React, { PureComponent } from "react";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";

class RateListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="model-list__row" style={{ height: "70px" }}>
        <div className="model-list__item model-list__item-lg">
          <label>Service</label>
          <div>{this.props.service}</div>
        </div>
        <div className="model-list__item">
          <label>Origin</label>
          <div>{this.props.origin}</div>
        </div>
        <div className="model-list__item">
          <label>Destination</label>
          <div>{this.props.destination}</div>
        </div>
        <div className="model-list__item">
          <label>Rate Increase</label>
          <div>+ ${this.props.increase}</div>
        </div>
      </div>
    );
  }
}

export default RateListItem;
