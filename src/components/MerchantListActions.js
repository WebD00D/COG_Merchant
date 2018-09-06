import React, { PureComponent } from 'react';
import Link from 'gatsby-link';
import fire from '../fire';
import { Route, Redirect } from 'react-router-dom';
import cx from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import 'whatwg-fetch';

import '../layouts/fcss.css';
import '../layouts/components.css';

import 'antd/dist/antd.css';
import { Menu, Dropdown, Button, Checkbox, Icon } from 'antd';

class MerchantListActions extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const zones =
      this.props.zones &&
      Object.keys(this.props.zones).map(zone => {
        return (
          <Menu.Item key={zone}>
            <Checkbox
              onChange={() =>
                this.props.sort('zone', this.props.zones[zone].name)
              }
            />{' '}
            {this.props.zones[zone].name}
          </Menu.Item>
        );
      });

  
    const ZoneMenu = <Menu>{zones}</Menu>;

    return (
      <div className="fx m-b-30">
        <div className="dropdown-wrapper m-r-20">
          <label>Zones</label>
          <Dropdown overlay={ZoneMenu}>
            <Button style={{ width: '150px' }}>
              All Zones <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default MerchantListActions;
