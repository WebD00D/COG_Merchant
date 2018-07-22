import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../../fire";
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import _ from "lodash";
import { connect } from "react-redux";
import "whatwg-fetch";

import "../../layouts/fcss.css";
import "../../layouts/components.css";

import "antd/dist/antd.css";
import {
  Menu,
  Timeline,
  Dropdown,
  Button,
  Icon,
  message,
  Modal,
  Alert,
  Badge,
  Divider,
  Steps
} from "antd";

const Step = Steps.Step;

import AdminTheme from "../../themes/admin-theme";
import AdminActionBar from "../../components/AdminActionBar";
import AdminPageTitle from "../../components/AdminPageTitle";
import AdminInfoPanel from "../../components/AdminInfoPanel";
import AdminOnBoardingSteps from "../../components/AdminOnBoardingSteps";
import MerchantListActions from "../../components/MerchantListActions";
import OrderListItems from "../../components/OrderListItems";

import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextareaField";
import SelectField from "../../components/SelectField";
import HighlightedFormField from "../../components/HighlightedFormField";

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
        onboardingStep: 0
    }
  }

  render() {
    return (
      <div>
        <AdminTheme>
          {/* <div style={{paddingTop: "30px"}}>    
            <Alert message="Order #123 Cancelled" closeText="Close" type="error" showIcon />
        </div> */}

          <AdminActionBar
            searchBar={true}
            inputPlaceholder="Search orders..."
            action=""
            hideButton={true}
            model=""
          />
          <AdminPageTitle title="Orders" />

          <MerchantListActions />
          <OrderListItems />

            <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            
            
            <AdminOnBoardingSteps />

          </AdminInfoPanel>
        </AdminTheme>
      </div>
    );
  }
}


const mapStateToProps = ({ user, courier, zones, merchants, twinJetAPI }) => {
    return { user, courier, zones, merchants, twinJetAPI };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      createCourier: (user, courier) =>
        dispatch({
          type: `CREATE_COURIER`,
          user,
          courier
        })
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(
    Dashboard
  );
  
