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

import { Checkbox, Row, Col, Table, Divider } from 'antd';

const { Column } = Table;

import { GET_ALL_MENU_ITEMS } from '../../api/api_merchant';

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
    const { itemName, description, price } = this.state;

    const { categoryName, categoryDescription, itemsToInclude } = this.state;

    const menuCategoryObj = {
      categoryName,
      description,
      price,
      createdOn,
      lastUpdated: Date.now()
    };

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
            action="Save"
            model="Category"
            backRoute="/merchant/menu"
          />
          <AdminPageTitle title="New Menu Category" />
          <InputField
            setValue={val => this.setState({ categoryName: val })}
            initialValue={this.state.categoryName}
            labelName="Category name"
          />
          <TextAreaField
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
