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

import MerchantTheme from "../../themes/merchant-theme";
import AdminActionBar from "../../components/AdminActionBar";
import AdminPageTitle from "../../components/AdminPageTitle";
import AdminInfoPanel from "../../components/AdminInfoPanel";

import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextareaField";
import SelectField from "../../components/SelectField";
import HighlightedFormField from "../../components/HighlightedFormField";

import {
  Table,
  Input,
  Button,
  Icon,
  Checkbox,
  TimePicker,
  Divider
} from "antd";

import moment from "moment";

class MenuItems extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ""
    };
  }

  onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },

      {
        title: "Price",
        dataIndex: "price",
        key: "price"
      },
 
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="javascript:;">Edit</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
          </span>
        )
      }
    ];

    const data = [
      {
        key: "1",
        name: "House Blend Coffee",
        price: "2.50"
      },
      {
        key: "2",
        name: "Cafe Americano",
        price: "3.25"
      },
      {
        key: "3",
        name: "Cafe Latte",
        price: "4.00"
      }
    ];

    return (
      <div>
        <MerchantTheme>
          <AdminActionBar
            action="Add"
            model="Menu Item"
            backRoute="/merchant/menus"
          />
          <AdminPageTitle title="Menu Items" />

          <HighlightedFormField highlightText="Any and all menu items can be found and added here." >
            <Table size="small" columns={columns} dataSource={data} />
          </HighlightedFormField>

          <AdminInfoPanel contentId="" createdOn="" lastUpdated="">
            <div className="admin-info__item admin-info__item--active">
              Menu Info
            </div>
            <div className="admin-info__item ">Menu Settings</div>
          </AdminInfoPanel>
        </MerchantTheme>
      </div>
    );
  }
}

export default MenuItems;
