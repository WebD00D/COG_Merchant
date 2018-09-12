import React, { PureComponent } from 'react';
import Link from 'gatsby-link';
import fire from '../../fire';
import { Route, Redirect } from 'react-router-dom';
import cx from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import 'whatwg-fetch';

import '../../layouts/fcss.css';
import '../../layouts/components.css';

import AdminTheme from '../../themes/admin-theme';
import AdminActionBar from '../../components/AdminActionBar';
import AdminPageTitle from '../../components/AdminPageTitle';

import InputField from '../../components/InputField';

import HighlightedFormField from '../../components/HighlightedFormField';

import { List, Button } from 'antd';

import { CREATE_NEW_MERCHANT } from '../../api/api_merchant';

class FoodCategories extends PureComponent {
  constructor(props) {
    super(props);

    this.handleSaveCategory = this.handleSaveCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);

    this.state = {
      category: '',
      categories: []
    };

    this.categoryRef;
  }

  componentDidMount() {
    // get initial categories.. attach an event listener to automatically update state.
    fire
      .database()
      .ref('/food-categories')
      .on(
        'value',
        function(snapshot) {
          console.log(snapshot.val());
          this.setState({
            categories: snapshot.val()
          });
        }.bind(this)
      );
  }

  deleteCategory(category) {
    var updates = {};
    updates['/food-categories/' + category] = null;

    fire
      .database()
      .ref()
      .update(updates);
  }

  handleSaveCategory() {
    const dateId = Date.now();
    fire
      .database()
      .ref('food-categories/' + dateId)
      .set({
        name: this.state.category
      });
  }

  render() {

    const orderedCategories = this.state.categories && _.orderBy(this.state.categories, ['name'], ['ASC'])
    console.log("order categories", orderedCategories)

    const foodCategories =
      this.state.categories &&
      Object.keys(orderedCategories).map(key => {
        return (
          <List.Item>
            <div>{orderedCategories[key].name}</div>
            <i
              onClick={() => this.deleteCategory(key)}
              className="fa fa-close"
              style={{
                lineHeight: '23px',
                cursor: 'pointer',
                color: '#f5222d'
              }}
            />
          </List.Item>
        );
      });

    return (
      <div>
        <AdminTheme>
          <AdminActionBar
            handleAction={() => this.handleSaveMerchant()}
            action="Save"
            model="Merchant"
            hideButton
            backRoute="/admin/dashboard"
          />

          <AdminPageTitle title="Food Categories" />
          <InputField
            setValue={val => this.setState({ category: val })}
            labelName="Category name"
          />
          <Button onClick={() => this.handleSaveCategory()}>
            Add Category
          </Button>

          <HighlightedFormField>
            <div className="input-field-wrap">
              <List bordered style={{ width: '100%' }}>
                {foodCategories}
              </List>
            </div>
          </HighlightedFormField>
        </AdminTheme>
      </div>
    );
  }
}

export default FoodCategories;
