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

import ServiceRateHours from '../../components/ServiceRateHours';
import DeliverySurchargeItem from '../../components/DeliverySurchargeItem';

import { TimePicker, Checkbox, Divider, message, List, Button } from 'antd';

import { createId, getQueryVariable } from '../../utils/app-utils';

import moment from 'moment';

class Service extends PureComponent {
  constructor(props) {
    super(props);

    this.saveService = this.saveService.bind(this);

    this.state = {
      name: '',
      price: 0,
      description: '',
      notes: '',

      id: '',
      saved: '',
      updated: '',

      sunday: true,
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,

      sun__open: '',
      sun__close: '',

      mon__open: '',
      mon__close: '',

      tues__open: '',
      tues__close: '',

      wed__open: '',
      wed__close: '',

      thurs__open: '',
      thurs__close: '',

      fri__open: '',
      fri__close: '',

      sat__open: '',
      sat__close: ''
    };
  }

  saveService() {
    const serviceId = createId('SERVICE');

    const newService = {
      id: serviceId,
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      lastUpdated: Date.now()
    };

    var updates = {};
    updates['/service/' + serviceId] = newService;

    fire
      .database()
      .ref()
      .update(updates);

    this.setState({
      id: serviceId,
      saved: Date.now(),
      updated: Date.now()
    });

    // PUSH ZONE TO STORE
    message.success(`${this.state.name} created!`);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <AdminTheme>
          <AdminActionBar
            handleAction={() => this.saveService()}
            action="Save"
            model="Service"
            backRoute="/admin/service-list"
          />

          <AdminPageTitle title="New Service" />
          <InputField
            setValue={val => this.setState({ name: val })}
            labelName="Service Name"
          />
          <InputField
            setValue={val => this.setState({ price: val })}
            inputType="number"
            labelName="Base Price"
          />
          <TextAreaField
            setValue={val => this.setState({ description: val })}
            labelName="Description"
          />

          <HighlightedFormField
            highlightText={`If no time selected, service rate will default to regular open / close hours.`}
          >
            <div className="input-wrap m-b-30">
              <label>Service Rate Availability</label>
            </div>
            <List className="m-b-30" bordered>
              <ServiceRateHours day={'Sunday'} selected={this.state.service} />
              <ServiceRateHours day={'Monday'} />
              <ServiceRateHours day={'Tuesday'} />
              <ServiceRateHours day={'Wednesday'} />
              <ServiceRateHours day={'Thursday'} />
              <ServiceRateHours day={'Friday'} />
              <ServiceRateHours day={'Saturday'} />
            </List>
          </HighlightedFormField>

          <HighlightedFormField
            highlightText={`Additional delivery surcharge zone-to-zone based on time/date/order size`}
          >
            <div className="fx fx-s-b ">
              <div className="input-wrap m-b-30 fx">
                <label>Delivery Surcharges (By Time)</label>
              </div>
              <Button>Add Surcharge</Button>
            </div>

            <List className="m-b-30" bordered>
              <DeliverySurchargeItem addOnPlaceHolder={'$'} />
            </List>
          </HighlightedFormField>

          <HighlightedFormField
            highlightText={`Mandatory gratuity (%) that can be set for each zone to zone linkage`}
          >
            <div className="fx fx-s-b ">
              <div className="input-wrap m-b-30 fx">
                <label>Mandatory Gratuity (By Time)</label>
              </div>
              <Button>Add Gratuity </Button>
            </div>

            <List className="m-b-30" bordered>
              <DeliverySurchargeItem addOnPlaceHolder={'%'} />
            </List>
          </HighlightedFormField>

          <HighlightedFormField
            highlightText={`Mandatory gratuity (%) that can be set for each zone to zone linkage`}
          >
            <div className="fx fx-s-b ">
              <div className="input-wrap m-b-30 fx">
                <label>Temporary Auto-gratuity</label>
              </div>
            </div>

            <List className="m-b-30" bordered>
              <DeliverySurchargeItem addOnPlaceHolder={'%'} />
            </List>
          </HighlightedFormField>

          <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              ID: {this.state.id ? this.state.id : '-'}
            </div>
            <div className="admin-info__item admin-info__item--active">
              Created On:{' '}
              {this.state.saved != ''
                ? moment(this.state.saved).format('MM-DD-YYYY')
                : '-'}
            </div>
            <div className="admin-info__item ">
              Last Updated:{' '}
              {this.state.updated != ''
                ? moment(this.state.updated).format('MM-DD-YYYY')
                : '-'}
            </div>
          </AdminInfoPanel>
        </AdminTheme>
      </div>
    );
  }
}

export default Service;
