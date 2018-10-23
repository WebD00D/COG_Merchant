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

import { GET_ALL_MENU_CATEGORIES, DELETE_MENU_CATEGORY } from '../../api/api_merchant';

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

class MenuCategories extends PureComponent {
  constructor(props) {
    super(props);

    this.getMenuCategories = this.getMenuCategories.bind(this);
    this.deleteMenuCategory = this.deleteMenuCategory.bind(this);

    this.state = {
      menuItemId: '',
      createdOn: '',
      lastUpdated: '',
      items: []
    };
  }

  componentDidMount() {
    // Query the database for all menu items....
    this.getMenuCategories();
  }

  getMenuCategories() {
    const menuItems = GET_ALL_MENU_CATEGORIES(this.props.user.merchantShopId);

    menuItems &&
      menuItems.then(items => {
        this.setState({
          items
        });
      });
  }

  deleteMenuCategory(menuCategoryId) {

    DELETE_MENU_CATEGORY(this.props.user.merchantShopId, menuCategoryId).then( () => {
      
      this.getMenuCategories();
    })
  }

  render() {
    const data = [];

    this.state.items &&
      Object.keys(this.state.items).map(item => {
        const menuItemObj = {
          key: item,
          name: this.state.items[item].categoryName,
        };

        data.push(menuItemObj);
      });

    return (
      <div>
        <MerchantTheme>
          <AdminActionBar
            action="Add"
            model="Menu Category"
            backRoute="/merchant/menu"
            route="/merchant/menu-category"
          />
          <AdminPageTitle title="Menu Categories" />

          <HighlightedFormField highlightText="Any and all menu items can be found and added here.">
            <Table size="small" dataSource={data}>
              <Column title="Name" dataIndex="name" key="name" />
              <Column
                title="Actions"
                key="actions"
                render={(text, record) => (
                  <span>
                    <Link
                      onClick={() => console.log(record)}
                      to={`/merchant/menu-category?item=${record.key}`}
                    >
                      Edit
                    </Link>
                    <Divider type="vertical" />
                    <a
                      href="javascript:;"
                      onClick={e => {
                        e.preventDefault();
                        this.deleteMenuCategory(record.key)
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategories);
