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

import { GET_ALL_MERCHANTS, GET_ALL_ZONES } from '../../api/api_admin';

class MerchantList extends PureComponent {
  constructor(props) {
    super(props);
    this.handleSorting = this.handleSorting.bind(this);
    this.state = {
      filteredMerchants: [],
      zoneFilters: [],
    };
  }

  componentDidMount() {
    const { setMerchants, setZones } = this.props;
    GET_ALL_MERCHANTS().then(merchants => {
      setMerchants(merchants);
      this.setState({ filteredMerchants: merchants });
    });
    GET_ALL_ZONES().then(zones => setZones(zones));
  }

  handleSorting(type, name) {

    const { zoneFilters } = this.state;

    if ( type === "zone" ) {

      _.includes(zoneFilters, name) ? zoneFilters.splice(zoneFilters.indexOf(name), 1) : zoneFilters.push(name);

      this.setState({
        zoneFilters,
      
      })
    }


  }

  render() {
    const merchants =
      this.state.filteredMerchants &&
      Object.keys(this.state.filteredMerchants).map(merchant => {

        return (
          <MerchantListItem
            key={merchant}
            merchant={this.state.filteredMerchants[merchant]}
          />
        );
      });

    return (
      <div>
        <AdminTheme>
          <AdminActionBar
            searchBar={true}
            inputPlaceholder="Search merchants..."
            action="Add"
            model="Merchant"
            route="/admin/merchant"
          />
          <AdminPageTitle title="Merchants" />

          <MerchantListActions
            sort={(type, value) => this.handleSorting(type, value)}
            zones={this.props.zones}
          />

          <div className="model-list">{merchants}</div>

          {/* <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
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
          </AdminInfoPanel> */}
        </AdminTheme>
      </div>
    );
  }
}

const mapStateToProps = ({ merchants, zones }) => {
  return { merchants, zones };
};

const mapDispatchToProps = dispatch => {
  return {
    setMerchants: merchants =>
      dispatch({
        type: `SET_MERCHANTS`,
        merchants
      }),
    setZones: zones =>
      dispatch({
        type: `SET_ZONES`,
        zones
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantList);
