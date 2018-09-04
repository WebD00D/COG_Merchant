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

import AdminTheme from '../../themes/admin-theme';
import AdminActionBar from '../../components/AdminActionBar';
import AdminPageTitle from '../../components/AdminPageTitle';
import AdminInfoPanel from '../../components/AdminInfoPanel';

import InputField from '../../components/InputField';
import TextAreaField from '../../components/TextareaField';
import SelectField from '../../components/SelectField';
import HighlightedFormField from '../../components/HighlightedFormField';

import { TimePicker, Checkbox, Divider } from 'antd';
import moment from 'moment';

import { CREATE_NEW_MERCHANT } from '../../api/api_admin.js';

class Merchant extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSaveMerchant = this.handleSaveMerchant.bind(this);
    this.handleEditMerchant = this.handleEditMerchant.bind(this);

    this.state = {
      merchantId: '',
      createdOn: '',
      lastUpdated: '',

      company: '',
      phone: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      primaryContactName: '',
      primaryContactPhone: '',
      description: '',
      pickupDelivery: 'Delivery & Pickup',
      status: 'Pending Approval',

      editMode: false
    };
  }

  componentDidMount() {

    // Are we editing a pre-existing merchant?

  }

  handleEditMerchant() {}

  handleSaveMerchant() {
    const {
      company,
      phone,
      email,
      street,
      city,
      state,
      zip,
      primaryContactName,
      primaryContactPhone,
      description,
      pickupDelivery,
      status
    } = this.state;

    // Create Merchant Object param
    const merchant = {
      company,
      phone,
      email,
      street,
      city,
      state,
      zip,
      primaryContactName,
      primaryContactPhone,
      description,
      pickupDelivery,
      status
    };

    const newMerchant = CREATE_NEW_MERCHANT(merchant);
    this.setState({
      merchantId: newMerchant.id,
      createdOn: newMerchant.createdOn,
      lastUpdated: newMerchant.lastUpdated,
      editMode: true
    });
  }

  render() {
    return (
      <div>
        <AdminTheme>
          {this.state.editMode ? (
            <AdminActionBar
              handleAction={() => this.handleEditMerchant()}
              action="Edit"
              model="Merchant"
              backRoute="/admin/merchant-list"
            />
          ) : (
            <AdminActionBar
              handleAction={() => this.handleSaveMerchant()}
              action="Save"
              model="Merchant"
              backRoute="/admin/merchant-list"
            />
          )}

          {this.state.editMode ? (
            <AdminPageTitle title="Edit Merchant" />
          ) : (
            <AdminPageTitle title="New Merchant" />
          )}
          <InputField
            setValue={val => this.setState({ company: val })}
            labelName="Company name"
          />
          <InputField
            setValue={val => this.setState({ phone: val })}
            labelName="Phone"
          />
          <InputField
            setValue={val => this.setState({ email: val })}
            labelName="Email"
          />

          <HighlightedFormField highlightText="When an order is placed, this is the address the courier will pick up from">
            <div className="input-field-wrap">
              <InputField
                setValue={val => this.setState({ street: val })}
                isFieldGroup={true}
                pos="left"
                labelName="Street"
              />
              <InputField
                setValue={val => this.setState({ city: val })}
                isFieldGroup={true}
                pos="right"
                labelName="City"
              />
            </div>
            <div className="input-field-wrap">
              <InputField
                setValue={val => this.setState({ state: val })}
                isFieldGroup={true}
                pos="left"
                labelName="State"
              />
              <InputField
                setValue={val => this.setState({ zip: val })}
                isFieldGroup={true}
                pos="right"
                labelName="Zip"
              />
            </div>
          </HighlightedFormField>

          <InputField
            setValue={val => this.setState({ primaryContactName: val })}
            labelName="Primary Contact Name"
          />
          <InputField
            setValue={val => this.setState({ primaryContactPhone: val })}
            labelName="Primary Contact Phone "
          />

          <TextAreaField
            setValue={val => this.setState({ description: val })}
            labelName="Description"
          />
          <SelectField
            setValue={val => this.setState({ pickupDelivery: val })}
            labelName="Pickup / Delivery"
            selectOptions={[
              'Delivery & Pickup',
              'Delivery Only',
              'Pickup Only',
              'Phone Orders Only'
            ]}
          />
          <SelectField
            setValue={val => this.setState({ status: val })}
            labelName="Status"
            selectOptions={[
              'Pending Approval',
              'Active',
              'Suspended',
              'Blocked',
              'Expired'
            ]}
          />

          <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              Merchant Info
            </div>
            <div className="admin-info__item ">
              ID: - {this.state.merchantId}
            </div>
            <div className="admin-info__item ">
              Created On: - {this.state.createdOn}
            </div>
            <div className="admin-info__item ">
              Last Updated: - {this.state.lastUpdated}
            </div>
          </AdminInfoPanel>
        </AdminTheme>
      </div>
    );
  }
}

export default Merchant;
