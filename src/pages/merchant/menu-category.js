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

import InputField from '../../components/InputField';
import TextAreaField from '../../components/TextareaField';
import SelectField from '../../components/SelectField';
import HighlightedFormField from '../../components/HighlightedFormField';

import { Checkbox, Row, Col, Table, Divider, message } from 'antd';

const { Column } = Table;

import {
  GET_ALL_MENU_ITEMS,
  CREATE_MENU_CATEGORY,
  GET_MENU_CATEGORY_BY_ID
} from '../../api/api_merchant';
import { GET_URL_VARIABLES } from '../../api/api_utils';

import moment from 'moment';

class MenuCategory extends PureComponent {
  constructor(props) {
    super(props);

    this.getMenuItems = this.getMenuItems.bind(this);
    this.addMenuItems = this.addMenuItems.bind(this);
    this.saveMenuCategory = this.saveMenuCategory.bind(this);

    this.state = {
      menuItemId: false,
      createdOn: false,
      lastUpdated: '',

      categoryName: '',
      categoryDescription: '',
      itemsToInclude: [],
      items: []
    };
  }

  componentWillMount() {
    // Need to check for URL param with menu item id.
    // If we've got one, then query the db, and set state to edit mode..
    const menuItemId = GET_URL_VARIABLES()['item'];

    if (menuItemId) {
      // query database for details..
      GET_MENU_CATEGORY_BY_ID(this.props.user.merchantShopId, menuItemId).then(
        response => {
          // set item details to state..
          // set edit mode to true..
          console.log('add ons', response.itemsToInclude);

          const itemsToInclude = response.itemsToInclude;

          this.setState({
            menuItemId: menuItemId,
            createdOn: response.createdOn,
            lastUpdated: response.lastUpdated,
            categoryName: response.categoryName,
            categoryDescription: response.categoryDescription,
            editMode: true,
            itemsToInclude: itemsToInclude ? itemsToInclude : []
          });
        }
      );
    }
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

  addMenuItems(record) {
    const recordCheck = _.find(this.state.itemsToInclude, function(o) {
      return o.key === record.key;
    });

    const idx = _.indexOf(this.state.itemsToInclude, recordCheck);
    const items = this.state.itemsToInclude;

    if (!recordCheck) {
      items.push(record);
    } else {
      items.splice(idx, 1);
    }

    this.setState({
      itemsToInclude: items
    });
  }

  saveMenuCategory() {
    const createdOn = this.state.createdOn ? this.state.createdOn : Date.now();

    const { categoryName, categoryDescription, itemsToInclude } = this.state;

    const menuCategoryObj = {
      categoryName,
      categoryDescription,
      createdOn,
      itemsToInclude,
      lastUpdated: Date.now()
    };

    const activeMenuItem = CREATE_MENU_CATEGORY(
      this.props.user.merchantShopId,
      this.state.menuItemId,
      menuCategoryObj
    );

    this.setState({
      menuItemId: activeMenuItem.id,
      createdOn: activeMenuItem.fields.createdOn,
      lastUpdated: activeMenuItem.fields.lastUpdated,
      editMode: true
    });

    message.success('Menu category saved!');
  }

  render() {
    const data = [];

    this.state.items &&
      Object.keys(this.state.items).map(item => {
        const recordCheck = _.find(this.state.itemsToInclude, function(o) {
          return o.key === item;
        });

        const menuItemObj = {
          key: item,
          name: this.state.items[item].itemName,
          price: this.state.items[item].price,
          checked: recordCheck ? true : false
        };
        data.push(menuItemObj);
      });

    return (
      <div>
        <MerchantTheme>
          <AdminActionBar
            action="Save"
            model="Category"
            backRoute="/merchant/menu-categories"
            handleAction={() => this.saveMenuCategory()}
          />

          <AdminPageTitle
            title={
              this.state.editMode ? 'Edit Menu Category' : 'Add Menu Category'
            }
          />
          <InputField
            setValue={val => this.setState({ categoryName: val })}
            initialValue={this.state.categoryName}
            labelName="Category name"
          />
          <InputField
            setValue={val => this.setState({ categoryDescription: val })}
            initialValue={this.state.categoryDescription}
            labelName="Description"
          />

          <HighlightedFormField>
            <Table size="small" dataSource={data}>
              <Column title="Name" dataIndex="name" key="name" />
              <Column title="Price" dataIndex="price" key="price" />
              <Column
                title="Include"
                key="actions"
                render={(text, record) => (
                  <Checkbox
                    defaultChecked={record.checked ? true : false}
                    onChange={e => {
                      this.addMenuItems(record);
                    }}
                  />
                )}
              />
            </Table>
          </HighlightedFormField>

          <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              Category Info
            </div>
            <div className="admin-info__item ">
              ID: - {this.state.menuItemId}
            </div>
            <div className="admin-info__item ">
              Created On: - {this.state.createdOn}
            </div>
            <div className="admin-info__item ">
              Last Updated: - {this.state.lastUpdated}
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuCategory);
