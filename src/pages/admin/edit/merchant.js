import React, { PureComponent } from 'react';
import Link from 'gatsby-link';
import fire from '../../../fire';
import { Route, Redirect } from 'react-router-dom';
import cx from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import 'whatwg-fetch';

import '../../../layouts/fcss.css';
import '../../../layouts/components.css';

import AdminTheme from '../../../themes/admin-theme';
import AdminActionBar from '../../../components/AdminActionBar';
import AdminPageTitle from '../../../components/AdminPageTitle';
import AdminInfoPanel from '../../../components/AdminInfoPanel';

import InputField from '../../../components/InputField';
import TextAreaField from '../../../components/TextareaField';
import SelectField from '../../../components/SelectField';
import HighlightedFormField from '../../../components/HighlightedFormField';

import { TimePicker, Checkbox, Divider, message } from 'antd';
import moment from 'moment';

import { CREATE_NEW_MERCHANT, GET_ALL_ZONES, EDIT_MERCHANT } from '../../../api/api_admin.js';

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
      pickupDelivery: '',
      status: '',
      zone: '',
      editMode: false,

      zones: []
    };
  }

  componentDidMount() {

    console.log("this.props.single", this.props.singleMerchant)

    GET_ALL_ZONES.then(zones => {
      console.log('retrieved zones', zones);
      this.setState({
        zones
      });
    });

    // Are we editing a pre-existing merchant?
  }

  handleEditMerchant() {

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
      status,
      zone
    } = this.state;

    const single = this.props.singleMerchant.fields

    const merchant = {
      company: company || single.company,
      phone: phone || single.phone,
      email: email || single.email,
      street: street || single.street,
      city: city || single.city,
      state: state || single.state,
      zip: zip || single.zip,
      primaryContactName: primaryContactName || single.primaryContactName,
      primaryContactPhone: primaryContactPhone || single.primaryContactPhone,
      description: description || single.description,
      pickupDelivery: pickupDelivery || single.pickupDelivery,
      status: status || single.status,
      zone: zone || single.zone
    };

    const updatedMerchant = EDIT_MERCHANT(this.props.singleMerchant.id, merchant);
    this.setState({
      lastUpdated: updatedMerchant,
      editMode: false
    });

    message.success("Saved merchant!")

  }

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
      status,
      zone

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
      status,
      zone
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
    const zoneChoices = [];

    this.state.zones &&
      Object.keys(this.state.zones).map(z => {
        zoneChoices.push(this.state.zones[z].name);
      });

    return (
      <div>
        <AdminTheme>
        
            <AdminActionBar
              handleAction={() => this.handleEditMerchant()}
              action="Save"
              model="Merchant"
              backRoute="/admin/merchant-list"
            />
          
          <AdminPageTitle title="Edit Merchant" />

          <InputField
            setValue={val => this.setState({ company: val })}
            labelName="Company name"
            initialValue={this.props.singleMerchant.fields.company}
          />
          <InputField
            setValue={val => this.setState({ phone: val })}
            labelName="Phone"
            initialValue={this.props.singleMerchant.fields.phone}

          />
          <InputField
            setValue={val => this.setState({ email: val })}
            labelName="Email"
            initialValue={this.props.singleMerchant.fields.email}

          />

          <HighlightedFormField highlightText="When an order is placed, this is the address the courier will pick up from">
            <div className="input-field-wrap">
              <InputField
                setValue={val => this.setState({ street: val })}
                isFieldGroup={true}
                pos="left"
                labelName="Street"
                initialValue={this.props.singleMerchant.fields.street}

              />
              <InputField
                setValue={val => this.setState({ city: val })}
                isFieldGroup={true}
                pos="right"
                labelName="City"
                initialValue={this.props.singleMerchant.fields.city}

              />
            </div>
            <div className="input-field-wrap">
              <InputField
                setValue={val => this.setState({ state: val })}
                isFieldGroup={true}
                pos="left"
                labelName="State"
                initialValue={this.props.singleMerchant.fields.state}

              />
              <InputField
                setValue={val => this.setState({ zip: val })}
                isFieldGroup={true}
                pos="right"
                labelName="Zip"
                initialValue={this.props.singleMerchant.fields.zip}

              />
            </div>
          </HighlightedFormField>

          <InputField
            setValue={val => this.setState({ primaryContactName: val })}
            labelName="Primary Contact Name"
            initialValue={this.props.singleMerchant.fields.primaryContactName}

          />
          <InputField
            setValue={val => this.setState({ primaryContactPhone: val })}
            labelName="Primary Contact Phone "
            initialValue={this.props.singleMerchant.fields.primaryContactPhone}

          />

          <TextAreaField
            setValue={val => this.setState({ description: val })}
            labelName="Description"
            initialValue={this.props.singleMerchant.fields.description}

          />
          <SelectField
            setValue={val => this.setState({ zone: val })}
            labelName="Zone"
            selectOptions={zoneChoices}
            initialValue={this.props.singleMerchant.fields.zone}

          />
          <SelectField
            setValue={val => this.setState({ pickupDelivery: val })}
            labelName="Pickup / Delivery"
            initialValue={this.props.singleMerchant.fields.pickupDelivery}
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
            initialValue={this.props.singleMerchant.fields.status}
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
              ID: - {this.props.singleMerchant.id}
            </div>
            <div className="admin-info__item ">
              Created On: - {this.props.singleMerchant.createdOn}
            </div>
            <div className="admin-info__item ">
              Last Updated: - {this.props.singleMerchant.lastUpdated}
            </div>
          </AdminInfoPanel>
        </AdminTheme>
      </div>
    );
  }
}

const mapStateToProps = ({ singleMerchant }) => {
  return { singleMerchant };
};

const mapDispatchToProps = dispatch => {
  return {
    setSingleMerchant: merchant =>
      dispatch({
        type: `SET_SINGLE_MERCHANT`,
        merchant
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Merchant);
