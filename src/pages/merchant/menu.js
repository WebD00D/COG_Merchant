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

import { Checkbox, TimePicker } from 'antd';

import moment from 'moment';

class Menu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sunday: false
    };
  }

  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  render() {
    return (
      <div>
        <MerchantTheme>
          <AdminActionBar
            action="Save"
            model="Menu"
            backRoute="/merchant/menus"
          />
          <AdminPageTitle title="New Menu" />
          <InputField labelName="Menu name" />
          <TextAreaField labelName="Menu Description" />

          <HighlightedFormField highlightText="These are the days this menu is available">
            <InputField
              setValue={val => this.setState({ sunday: val })}
              inputType="checkbox"
              labelName="Sunday"
            />
          </HighlightedFormField>

          <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              Menu Info
            </div>
            <div className="admin-info__item ">Menu Settings</div>
          </AdminInfoPanel>
        </MerchantTheme>
      </div>
    );
  }
}

export default Menu;
