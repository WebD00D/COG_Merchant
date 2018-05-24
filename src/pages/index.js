import React, { PureComponent } from "react";
import { Route, Redirect, Link } from "react-router-dom";
import fire from "../fire";
import "../layouts/index.css";
import "../layouts/fcss.css";

import { connect } from "react-redux";

import MenuCategory from "../components/MenuCategory";

class IndexPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="page-container">
        <div className="m-b-100">
          <h1>COG Components</h1>
          <p>
            <b>What' this?</b> Essentially a style guide, but components
            have full functionality. We're creating the puzzle pieces to
            the COG Merchant app first, then we'll add display logic, routing, etc. and hook it up to the database.
          </p>
          <p>
            This page should only house working components. While developing,
            <b> KNOWN Team</b> should use <Link to="/known">this</Link> page
            to import their WIP components. Christian will use <Link to="/christian">this</Link>
          </p>
        </div>
        <div>
          <div className="m-b-40">
            <code style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              MenuCategory.js
            </code>
          </div>
          <div className="mx-w-600">
            <MenuCategory menuId={false} />
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
