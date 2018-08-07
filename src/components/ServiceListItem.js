import React, { PureComponent } from "react";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";

class ServiceListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="model-list__row" style={{ height: "70px" }}>
        <div className="model-list__item model-list__item-lg">
          <label>Service</label>
          <div>{this.props.serviceName}</div>
        </div>
        <div className="model-list__item">
          <label>Base Price</label>
          <div>${this.props.basePrice}</div>
        </div>
      </div>
    );
  }
}

export default ServiceListItem;
