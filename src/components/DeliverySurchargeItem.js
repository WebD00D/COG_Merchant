import React, { PureComponent } from "react";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";

import { TimePicker, Checkbox, List, Input } from "antd";


import moment from "moment";


class DeliverySurchargeItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <List.Item >

        <div><Input addonBefore={this.props.addOnPlaceHolder} type="number" placeholder="Amount" /></div>
        
        <div className="fx">
          <div className="m-l-8">
            <TimePicker
              format={"HH:mm"}
              onChange={(time, timestring) =>
                console.log(time, timestring)
              }
              defaultOpenValue={moment("00:00", "HH:mm")}
            />
          </div>
          <div className="m-l-8">
            <TimePicker
              format={"HH:mm"}
              onChange={(time, timestring) =>
                console.log(time, timestring)
              }
              defaultOpenValue={moment("00:00", "HH:mm")}
            />
          </div>
        </div>
      </List.Item>
    
    );
  }
}

export default DeliverySurchargeItem;
