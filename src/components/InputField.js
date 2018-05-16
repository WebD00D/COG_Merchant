import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../fire";
import { Route, Redirect } from "react-router-dom";
import cx from "classnames";
import _ from "lodash";
import { connect } from "react-redux";
import "whatwg-fetch";

import "../layouts/fcss.css";
import "../layouts/components.css";

class InputField extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selected: false
    };
  }

  render() {
    return (
      <div className="w-100p">
        <div className="input-wrap">
          <label>{this.props.labelName}</label>
          <input onChange={ (e) => this.props.setValue(e.target.value) } type={this.props.inputType} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userAuthenticated, merchantId }) => {
  return {
    userAuthenticated,
    merchantId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: `INCREMENT` })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
