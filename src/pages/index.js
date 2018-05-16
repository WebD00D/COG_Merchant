import React, { PureComponent } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import fire from "../fire";
import "../layouts/index.css";
import "../layouts/fcss.css";

import { connect } from "react-redux";

import Menu from "../components/Menu";

class IndexPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page-container">
        <div className="m-b-100">
          <h3>COG Components</h3>
        </div>
        <div>
          <div className="m-b-40">
            <h4>Menu.js</h4>
          </div>
          <div className="mx-w-600">
            <Menu menuId={false} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ merchantId, userAuthenticated }) => {
  return { merchantId, userAuthenticated };
};

const mapDispatchToProps = dispatch => {
  return {
    createAndSignInUser: (userId, first, last, email) =>
      dispatch({
        type: `CREATE_AND_SIGNIN_USER`,
        userId,
        first,
        last,
        email
      })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
