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


import MerchantTheme from "../../themes/merchant-theme";import AdminActionBar from "../../components/AdminActionBar";
import AdminPageTitle from "../../components/AdminPageTitle";
import AdminInfoPanel from "../../components/AdminInfoPanel";

import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextareaField";
import SelectField from "../../components/SelectField";
import HighlightedFormField from "../../components/HighlightedFormField";

import { Checkbox, TimePicker } from 'antd';


class MerchantIndex extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

   

  render() {
    return (
      <div>
        
          
          Merchant Auth

      </div>
    );
  }
}


const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: `INCREMENT` })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantIndex);