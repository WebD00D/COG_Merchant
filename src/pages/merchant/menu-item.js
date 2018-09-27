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

import { CREATE_MENU_ITEM } from '../../api/api_merchant';

import {
  Table,
  Input,
  Button,
  Icon,
  Checkbox,
  TimePicker,
  Divider
} from 'antd';

import moment from 'moment';

class MenuItem extends PureComponent {
  constructor(props) {
    super(props);

    this.saveMenuItem = this.saveMenuItem.bind(this);

    this.state = {
      menuItemId: false,
      createdOn: false,
      lastUpdated: '',

      itemName: '',
      description: '',
      price: '',

      editMode: false
    };
  }

  componentDidMount() {
      // Need to check for URL param with menu item id. 
      // If we've got one, then query the db, and set state to edit mode.. 

      
  }

  saveMenuItem() {
    const createdOn = this.state.createdOn ? this.state.createdOn : Date.now();

    const { itemName, description, price } = this.state;
    const menuItemObj = {
      itemName,
      description,
      price,
      createdOn,
      lastUpdated: Date.now()
    };

    const activeMenuItem = CREATE_MENU_ITEM(
      this.props.user.merchantShopId,
      this.state.menuItemId,
      menuItemObj
    );

    this.setState({
      menuItemId: activeMenuItem.id,
      createdOn: activeMenuItem.fields.createdOn,
      lastUpdated: activeMenuItem.fields.lastUpdated,
      editMode: true
    })

  }

  render() {
    console.log(this.props.user);
    return (
      <div>
        <MerchantTheme>
          <AdminActionBar
            action="Save"
            model="Menu Item"
            backRoute="/merchant/menu-items"
            handleAction={() => this.saveMenuItem()}
          />
          <AdminPageTitle
            title={this.state.editMode ? 'Edit Menu Item' : 'Add Menu Item'}
          />

          <InputField
            setValue={val => this.setState({ itemName: val })}
            labelName="Item name"
          />

          <InputField
            setValue={val => this.setState({ description: val })}
            labelName="Short description"
          />

          <InputField
            setValue={val => this.setState({ price: val })}
            labelName="Price"
            inputType="number"
          />

          <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              Menu Info
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
