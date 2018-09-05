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
import { Menu, Dropdown, Button, Icon, message, Alert, Divider } from 'antd';

import AdminTheme from '../../themes/admin-theme';
import AdminActionBar from '../../components/AdminActionBar';
import AdminPageTitle from '../../components/AdminPageTitle';
import AdminInfoPanel from '../../components/AdminInfoPanel';
import MerchantListActions from '../../components/MerchantListActions';
import MerchantListItem from '../../components/MerchantListItem';

import { GET_ALL_MERCHANTS } from '../../api/api_admin';

class MerchantList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { setMerchants } = this.props;

    console.log("component monted in merchant list?")

    // get merchants..
    GET_ALL_MERCHANTS.then(merchants => {
      console.log("merchants", merchants)
      setMerchants(merchants);
    });
  }

  render() {
    const merchants =
      this.props.merchants &&
      Object.keys(this.props.merchants).map(merchant => {
        return (
          <MerchantListItem
            key={merchant}
            merchant={this.props.merchants[merchant]}
          />
        );
      });

    return (
      <div>
        <AdminTheme>
          <div style={{ paddingTop: '30px' }}>
            <Alert
              message="Merchant is not setup"
              description="Merchant 'ZZQ' has been Pending for 13 days"
              type="warning"
              showIcon
              closeText="Close"
            />
          </div>

          <AdminActionBar
            searchBar={true}
            inputPlaceholder="Search merchants..."
            action="Add"
            model="Merchant"
            route="/admin/merchant"
          />
          <AdminPageTitle title="Merchants" />

          <MerchantListActions />

          <div className="model-list">{merchants}</div>

          <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              <Icon
                style={{ position: 'absolute', right: '60px' }}
                type="info-circle-o"
              />
              <h2>Merchants 101</h2>
              <Divider />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <h3>Still have questions?</h3>
              <Button type="primary">
                Contact support{' '}
                <Icon style={{ color: '#FFF' }} type="customer-service" />
              </Button>
            </div>
          </AdminInfoPanel>
        </AdminTheme>
      </div>
    );
  }
}

const mapStateToProps = ({ merchants }) => {
  return { merchants };
};

const mapDispatchToProps = dispatch => {
  return {
    setMerchants: merchants =>
      dispatch({
        type: `SET_MERCHANTS`,
        merchants
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantList);
