import React, { PureComponent } from "react";

import "../layouts/fcss.css";
import "../layouts/components.css";
import "../layouts/admin.css";

import { TimePicker, Checkbox, List } from "antd";


import moment from "moment";


class ServiceRateHours extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List.Item itemLayout="horizontal" className="special-list-item">
        <Checkbox
          checked
          onChange={e => {
            this.setState({
              sunday: e.target.checked
            });
          }}
        >
          {this.props.day}
        </Checkbox>
        <div className="fx">
          <div>
            <TimePicker
              format={"HH:mm"}
              onChange={(time, timestring) => console.log(time, timestring)}
              defaultOpenValue={moment("00:00", "HH:mm")}
            />
          </div>
          <div className="m-l-8">
            <TimePicker
              format={"HH:mm"}
              onChange={(time, timestring) => console.log(time, timestring)}
              defaultOpenValue={moment("00:00", "HH:mm")}
            />
          </div>
        </div>
      </List.Item>
    );
  }
}

export default ServiceRateHours;
