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

import 'antd/dist/antd.css';
import {
  Menu,
  Dropdown,
  Button,
  Icon,
  message,
  Modal,
  Alert,
  Badge,
  Divider
} from 'antd';

import MerchantTheme from '../../themes/merchant-theme';
import AdminActionBar from '../../components/AdminActionBar';
import AdminPageTitle from '../../components/AdminPageTitle';
import AdminInfoPanel from '../../components/AdminInfoPanel';
import MerchantListActions from '../../components/MerchantListActions';
import MerchantListItems from '../../components/MerchantListItems';
import OrderListItems from '../../components/OrderListItems';

import InputField from '../../components/InputField';
import TextAreaField from '../../components/TextareaField';
import SelectField from '../../components/SelectField';
import HighlightedFormField from '../../components/HighlightedFormField';

class MenuDash extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MerchantTheme>
          <div style={{ paddingTop: '60px' }}>
            <AdminPageTitle title="Menu Details" />
          </div>

          <h2>
            Note: To navigate back to this page, click "Menu" in the left menu
          </h2>
          <h2>
            ** IF YOU ARE GOING TO TEST DELETING DATA, PLEASE MAKE SURE YOU
            CREATE YOUR OWN FIRST AND DON'T DELETE CHRISTIAN'S TEST DATA!{' '}
          </h2>

          <ul style={{ marginTop: '30px' }}>
            <li>
              <h3>Add Ons</h3>
              <ul>
                <li>
                  <Link to="/merchant/add-on">Create </Link>
                </li>
                <li>
                  <Link to="/merchant/add-ons">View All / Edit / Delete</Link>
                </li>
              </ul>
              <Divider />
            </li>
            <li>
              <h3>Food Item</h3>
              <ul>
                <li>
                  <Link to="/merchant/menu-item">Create </Link>
                </li>
                <li>
                  <Link to="/merchant/menu-items">
                    View All / Edit / Delete
                  </Link>
                </li>
              </ul>
              <Divider />
            </li>

            <li>
              <h3>Menu Categories</h3>
              <ul>
                <li>
                  <Link to="/merchant/menu-category">Create </Link>
                </li>
                <li>
                  <Link to="/merchant/menu-categories">
                    View All / Edit / Delete
                  </Link>
                </li>
              </ul>
              <Divider />
            </li>
          </ul>

          <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <h3>Staff List</h3>
            <div className="admin-info__item admin-info__item--active">
              Jess Izen <Badge status="success" />
            </div>
            <div className="admin-info__item admin-info__item--active ">
              Marc Redmond <Badge status="success" />
            </div>
            <div className="admin-info__item admin-info__item--active ">
              Christian Bryant <Badge status="success" />
            </div>
            <div className="admin-info__item admin-info__item--active">
              Christine Young <Badge status="warning" />
            </div>
            <div className="admin-info__item ">
              Leslie Knope <Badge status="default" />
            </div>
            <div className="admin-info__item ">
              Ron Swanson <Badge status="default" />
            </div>
            <div className="admin-info__item ">
              Jerry Seinfield <Badge status="default" />
            </div>
            <div className="admin-info__item ">
              George Castanza <Badge status="default" />
            </div>
            <div className="admin-info__item ">
              Zach Sadovszky <Badge status="default" />
            </div>
          </AdminInfoPanel>
        </MerchantTheme>
      </div>
    );
  }
}

export default MenuDash;
