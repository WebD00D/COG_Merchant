import React, { PureComponent } from "react";
import Link from "gatsby-link";
import fire from "../../fire";
import { Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import "whatwg-fetch";

import "../../layouts/fcss.css";
import "../../layouts/components.css";
import "../../layouts/authentication.css";

import USAStates from "../../utils/us-states";

import "antd/dist/antd.css";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  message,
  Steps
} from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const Step = Steps.Step;

import AdminTheme from "../../themes/admin-theme";

class CourierRegistration extends React.Component {
  constructor(props) {
    super();
    this.state = {
      current: 0
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

  handleStepOne() {
    
    return (
      <div>
        <FormItem
          hasFeedback
          validateStatus="error"
          help=""
          label="Company"
        >
          <Input />
        </FormItem>
        <FormItem
          hasFeedback
          validateStatus=""
          help=""
          label="Contact Person"
        >
          <Input />
        </FormItem>
        <FormItem
          hasFeedback
          validateStatus=""
          help=""
          label="Phone"
        >
          <Input />
        </FormItem>
        <FormItem
          hasFeedback
          validateStatus=""
          help=""
          label="Email"
        >
          <Input />
        </FormItem>
        
      </div>
    );
  }

  handleStepTwo() {
    const us_states = Object.keys(USAStates).map(key => {
      return <Option value={key}>{USAStates[key]}</Option>;
    });
    return (
      <div>
        <FormItem
          hasFeedback
          validateStatus=""
          help=""
          label="City"
        >
          <Input />
        </FormItem>
        <FormItem label="State" hasFeedback validateStatus="">
          <Select>{us_states}</Select>
        </FormItem>
        <FormItem
          hasFeedback
          validateStatus=""
          help=""
          label="Zip Code"
        >
          <Input />
        </FormItem>

       
      </div>
    );
  }

  handleStepThree() {
  
    return (
      <div>
        <FormItem
          hasFeedback
          validateStatus=""
          help=""
          label="Login email"
        >
          <Input />
        </FormItem>
        
        <FormItem
          hasFeedback
          validateStatus=""
          help=""
          label="Password"
        >
          <Input type="password" />
        </FormItem>

       
      </div>
    );
  }

  render() {
    const { current } = this.state;

    const StepTwo = (
      <div>
        <FormItem
          hasFeedback
          validateStatus="error"
          help=""
          label="Second Step Input"
        >
          <Input />
        </FormItem>
      </div>
    );

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
                          this.handleAddRecord();
                          message.success("Care patient created!");
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourierRegistration;
