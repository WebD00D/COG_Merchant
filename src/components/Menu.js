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

import InputField from "./InputField";
import TextareaField from "./TextareaField";
import MenuItem from "./MenuItem";

class Menu extends PureComponent {
  constructor(props) {
    super(props);

    this._handleShowEditForm = this._handleShowEditForm.bind(this);
    this._handleAddItem = this._handleAddItem.bind(this);

    this.state = {
      showItemForm: false,

      newItemName: "",
      newItemDescription: "",
      newItemPrice: "",

      editItemName: "",
      editItemDescription: "",
      editItemPrice: "",
      editItemKey: "",

      // Pre-populate as an example for merchant?
      menuItems: [
        {
          name: "1/2 Salad + 1/2 Sandwhich",
          price: "6.99",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          name: "Greek Salad",
          price: "8.99",
          description: "Lorem ipsum dolor sit amet, consectetur."
        }
      ]
    };
  }

  _handleShowEditForm() {

    // TODO:
    // Add validation for name, price, and description..

    this.setState({
      showItemForm: !this.state.showItemForm
    });
  }

  _handleAddItem() {
    let currentItems = this.state.menuItems;

    let newItem = {
      name: this.state.newItemName,
      price: this.state.newItemPrice,
      description: this.state.newItemDescription
    };

    currentItems.unshift(newItem);

    this.setState({
      showItemForm: false,
      menuItems: currentItems
    });
  }

  render() {
    let menuItemsToDisplay =
      this.state.menuItems &&
      Object.keys(this.state.menuItems).map(
        function(key) {
          return (
            <MenuItem
              key={key}
              itemName={this.state.menuItems[key].name}
              itemPrice={this.state.menuItems[key].price}
              itemDescription={this.state.menuItems[key].description}
            />
          );
        }.bind(this)
      );

    return (
      <div className="w-100p component">
        <div className="component-container">
          {this.state.showItemForm ? (
            <div className="edit-form">
              <div className="component-container">
                <div className="fx fx-a-c fx-s-b m-b-20">
                  <h2 className="fc-purple">New Menu Item</h2>
                  <div
                    onClick={() => this._handleShowEditForm()}
                    className="fc-red hover f-14"
                  >
                    <i className="fa fa-close" /> <span>Cancel</span>
                  </div>
                </div>

                <InputField
                  setValue={value => this.setState({ newItemName: value })}
                  labelName="Item Name"
                  inputType="text"
                />
                <TextareaField
                  setValue={value =>
                    this.setState({ newItemDescription: value })
                  }
                  labelName="Item Description"
                />
                <InputField
                  setValue={value => this.setState({ newItemPrice: value })}
                  labelName="Item Price"
                  inputType="number"
                />
                <button
                  onClick={() => this._handleAddItem()}
                  className="bg-red button-secondary"
                >
                  Save Item
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          <h1 className="fc-purple">Menu Builder</h1>
          <InputField labelName="Menu Name" inputType="text" />
          <TextareaField labelName="Menu Description" />
          <button
            onClick={() => this._handleShowEditForm()}
            className="bg-red button-secondary"
          >
            Add Menu Item
          </button>

          <div className="m-t-40">{menuItemsToDisplay}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
