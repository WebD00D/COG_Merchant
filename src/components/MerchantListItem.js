import React, { PureComponent } from 'react';
import Link from 'gatsby-link';
import cx from 'classnames';
import { connect } from 'react-redux';

import '../layouts/fcss.css';
import '../layouts/components.css';
import '../layouts/admin.css';

import { Progress } from 'antd';

class MerchantListItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { createdOn, id, lastUpdated } = this.props.merchant;
    const { company, phone, status } = this.props.merchant.fields;

    let statusPercent;
    let showInfo;
    let statusLabel;

    switch (status) {
      case 'Pending Approval':
        statusPercent = 50;
        showInfo = false;
        statusLabel = null;
        break;
      case 'Active':
        statusPercent = 100;
        showInfo = true;
        statusLabel = null;
        break;
      case 'Suspended':
        statusPercent = 100;
        showInfo = true;
        statusLabel = 'exception';
        break;
      default:
        statusPercent = 100;
        showInfo = true;
        statusLabel = 'exception';
        break;
    }

    return (
      <Link onClick={ () => this.props.setSingleMerchant(this.props.merchant) } to={`/admin/edit/merchant`} className="model-list__row">
        <div className="model-list__item model-list__item-lg">
          <label>Merchant</label>
          <div>{company}</div>
        </div>
        <div className="model-list__item">
          <label>Phone</label>
          <div>{phone}</div>
        </div>
        <div className="model-list__item">
          <label>Status</label>
          <Progress percent={statusPercent} showInfo={showInfo} status={statusLabel} />
        </div>
      </Link>
    );
  }
}

const mapStateToProps = ({ merchants }) => {
  return { merchants };
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

export default connect(mapStateToProps, mapDispatchToProps)(MerchantListItem);
