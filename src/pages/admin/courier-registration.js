import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../../fire";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import "whatwg-fetch";

import "../../layouts/fcss.css";
import "../../layouts/components.css";
import "../../layouts/authentication.css";

import FormInputField from "../../components/FormInputField";
import FormSelectField from "../../components/FormSelectField";
import Loading from "../../components/Loading";
import USAStates from "../../utils/us-states";
import createId from "../../utils/app-utils";

import "antd/dist/antd.css";
import { Form, Select, Button, message, Steps } from "antd";

const Option = Select.Option;
const Step = Steps.Step;

class CourierRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      company: "",
      phone: "",
      email: "",
      contactPerson: "",
      city: "",
      usState: "",
      zip: "",
      loginEmail: "",
      loginPassword: "",

      showSpin: false,
      accountCreated: false
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleRegistration() {
    this.setState({ showSpin: true });

    fire
      .auth()
      .createUserWithEmailAndPassword(
        this.state.loginEmail,
        this.state.loginPassword
      )
      .then(
        function(user) {
          message.success(`Courier ${user.uid} created!`);

          const newUser = {
            authenticated: true,
            id: user.uid,
            type: `COURIER`,
            email: this.state.loginEmail,
            name: this.state.contactPerson
          };

          const newCourier = {
            id: user.uid,
            company: this.state.company,
            contactName: this.state.contactPerson,
            contactEmail: this.state.email,
            contactPhone: this.state.phone,
            city: this.state.city,
            state: this.state.usState,
            zip: this.state.zip,
            authenticationEmail: this.state.loginEmail
          };

           // SAVE USER / COURIER PROPS TO DB
          var updates = {};
          updates["/users/" + user.uid] = newUser;
          updates["/couriers/" + user.uid] = newCourier;
       
          fire
            .database()
            .ref()
            .update(updates);

          this.setState({ showSpin: false });
          this.props.createCourier(newUser, newCourier);
        }.bind(this)
      )
      .catch(function(error) {
        // handle errors.
        const errorCode = error.code;
        const errorMessage = error.message;
        message.error(`Error: ${errorCode} - ${errorMessage}`);
      });
  }

  handleStepOne() {
    return (
      <div>
        <FormInputField
          label="Company"
          status="error"
          helpText=""
          defaultValue={this.state.company}
          handleChange={val => {
            this.setState({ company: val });
          }}
        />

        <FormInputField
          label="Contact Person"
          status=""
          helpText=""
          defaultValue={this.state.contactPerson}
          handleChange={val => {
            this.setState({ contactPerson: val });
          }}
        />

        <FormInputField
          label="Phone"
          status=""
          helpText=""
          defaultValue={this.state.phone}
          handleChange={val => {
            this.setState({ phone: val });
          }}
        />

        <FormInputField
          label="Email"
          status=""
          helpText=""
          defaultValue={this.state.email}
          handleChange={val => {
            this.setState({ email: val });
          }}
        />
      </div>
    );
  }

  handleStepTwo() {
    const us_states = Object.keys(USAStates).map(key => {
      return (
        <Option key={key} value={key}>
          {USAStates[key]}
        </Option>
      );
    });
    return (
      <div>
        <FormInputField
          label="City"
          status=""
          helpText=""
          defaultValue={this.state.city}
          handleChange={val => {
            this.setState({ city: val });
          }}
        />

        <FormSelectField
          label="State"
          status=""
          helpText=""
          defaultValue={this.state.usState}
          handleChange={val => {
            this.setState({ usState: val });
          }}
          items={us_states}
        />
        <FormInputField
          label="Zip"
          status=""
          helpText=""
          defaultValue={this.state.zip}
          handleChange={val => {
            this.setState({ zip: val });
          }}
        />
      </div>
    );
  }

  handleStepThree() {
    return (
      <div>
        <FormInputField
          label="Login email"
          status=""
          helpText=""
          defaultValue={this.state.loginEmail}
          handleChange={val => {
            this.setState({ loginEmail: val });
          }}
        />
        <FormInputField
          label="Login password"
          status=""
          helpText=""
          inputType="password"
          defaultValue={this.state.loginPassword}
          handleChange={val => {
            this.setState({ loginPassword: val });
          }}
        />
      </div>
    );
  }

  render() {
    const { current } = this.state;

    // this.props.user.authenticated ? <Redirect /> : ""

    if (this.props.user.authenticated) {
      return <Redirect to="/admin/dashboard" />;
    }

    return (
      <div className="auth-body">
        <img
          className="auth-logo"
          src={require("../../layouts/images/logo@2x.png")}
        />
        <div className="authentication">
          <div className="auth-form">
            <div className="auth-form__wrap">
              <h1 className="t-center m-b-30">
                <b>Courier Registration</b>
              </h1>
              <div className="auth-form__content">
                <Form layout="vertical">
                  <Steps current={current}>
                    <Step title="" />
                    <Step title="" />
                    <Step title="" />
                  </Steps>
                  <div className="steps-content">
                    {current === 0 ? this.handleStepOne() : ""}
                    {current === 1 ? this.handleStepTwo() : ""}
                    {current === 2 ? this.handleStepThree() : ""}
                  </div>
                  <div className="steps-action">
                    {current < 3 - 1 && (
                      <Button type="primary" onClick={() => this.next()}>
                        Next
                      </Button>
                    )}
                    {current === 3 - 1 && (
                      <Button
                        type="primary"
                        onClick={() => {
                          this.handleRegistration();
                        }}
                      >
                        Done
                      </Button>
                    )}
                    {current > 0 && (
                      <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => this.prev()}
                      >
                        Previous
                      </Button>
                    )}
                  </div>
                </Form>

                {this.state.showSpin ? <Loading /> : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
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
  CourierRegistration
);
