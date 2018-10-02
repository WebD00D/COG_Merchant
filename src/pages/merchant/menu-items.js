import React, { PureComponent } from 'react';
import Link from 'gatsby-link';
import fire from '../../fire';
import { Route, Redirect } from 'react-router-dom';
import cx from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import 'whatwg-fetch';

import '../../layouts/fcss.css';
import '../../layouts/components.css';

import MerchantTheme from '../../themes/merchant-theme';
import AdminActionBar from '../../components/AdminActionBar';
import AdminPageTitle from '../../components/AdminPageTitle';
import AdminInfoPanel from '../../components/AdminInfoPanel';

import HighlightedFormField from '../../components/HighlightedFormField';

import { GET_ALL_MENU_ITEMS, DELETE_MENU_ITEM } from '../../api/api_merchant';

import {
  Table,
  Input,
  Button,
  Icon,
  Checkbox,
  TimePicker,
  Divider
} from 'antd';

const { Column } = Table;

import moment from 'moment';

class MenuItems extends PureComponent {
  constructor(props) {
    super(props);

    this.getMenuItems = this.getMenuItems.bind(this);
    this.deleteMenuItem = this.deleteMenuItem.bind(this);

    this.state = {
      menuItemId: '',
      createdOn: '',
      lastUpdated: '',
      items: []
    };
  }

  componentDidMount() {
    // Query the database for all menu items....
    this.getMenuItems();
  }

  getMenuItems() {
    const menuItems = GET_ALL_MENU_ITEMS(this.props.user.merchantShopId);

    menuItems &&
      menuItems.then(items => {
        this.setState({
          items
        });
      });
  }

  deleteMenuItem(menuItemId) {

    DELETE_MENU_ITEM(this.props.user.merchantShopId, menuItemId).then( () => {
      
      this.getMenuItems();
    })
  }

  render() {
    const data = [];

    this.state.items &&
      Object.keys(this.state.items).map(item => {
        const menuItemObj = {
          key: item,
          name: this.state.items[item].itemName,
          price: this.state.items[item].price
        };

        data.push(menuItemObj);
      });

    return (
      <div>
        <MerchantTheme>
          <AdminActionBar
            action="Add"
            model="Menu Item"
            backRoute="/merchant/menu-items"
            route="/merchant/menu-item"
          />
          <AdminPageTitle title="Menu Items" />

          <HighlightedFormField highlightText="Any and all menu items can be found and added here.">
            <Table size="small" dataSource={data}>
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Price" dataIndex="price" key="price" />
              <Column
                title="Actions"
                key="actions"
                render={(text, record) => (
                  <span>
                    <Link
                      onClick={() => console.log(record)}
                      to={`/merchant/menu-item?item=${record.key}`}
                    >
                      Edit
                    </Link>
                    <Divider type="vertical" />
                    <a
                      href="javascript:;"
                      onClick={e => {
                        e.preventDefault();
                        this.deleteMenuItem(record.key)
                      }}
                    >
                      Delete
                    </a>
                  </span>
                )}
              />
            </Table>
          </HighlightedFormField>

          <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              Menu Info
            </div>
          </AdminInfoPanel>
        </MerchantTheme>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

const mapDispatchToProps = dispatch => {
  return {
    setZones: zones =>
      dispatch({
        type: `SET_ZONES`,
        zones
      }),
    setHighlightedZones: zones =>
      dispatch({
        type: `SET_HIGHLIGHTED_ZONES`,
        zones
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems);
