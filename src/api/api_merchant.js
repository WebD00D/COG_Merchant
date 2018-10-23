import fire from '../fire';
import { createId } from '../utils/app-utils';
import { GET_CURRENT_DATE } from '../api/api_utils';
import { UPDATE_RECORD } from '../api/db';

export const GET_ALL_MERCHANTS = () => {
  return fire
    .database()
    .ref('merchants')
    .once('value')
    .then(function(snapshot) {
      return snapshot.val();
    });
};

export const CREATE_NEW_MERCHANT = fields => {
  const merchantId = createId('MERCHANT');
  const currentDate = GET_CURRENT_DATE();
  const newMerchant = {
    fields,
    id: merchantId,
    createdOn: currentDate,
    lastUpdated: currentDate
  };

  let updates = {};

  updates[`/merchants/${merchantId}/`] = newMerchant;
  fire
    .database()
    .ref()
    .update(updates);

  return newMerchant;
};

export const EDIT_MERCHANT = (id, fields) => {
  const merchantId = id;
  const currentDate = GET_CURRENT_DATE();

  let updates = {};

  updates[`/merchants/${merchantId}/fields`] = fields;
  updates[`/merchants/${merchantId}/lastUpdated`] = currentDate;

  fire
    .database()
    .ref()
    .update(updates);

  return currentDate;
};


export const GET_ALL_MENU_CATEGORIES = merchantId => {
  return fire
    .database()
    .ref(`/merchants/${merchantId}/menu-categories`)
    .once('value')
    .then(function(snapshot) {
      return snapshot.val();
    });
}

export const CREATE_MENU_CATEGORY = (merchantId, categoryId, fields) => {

  const itemId = categoryId ? categoryId : createId('MENU-CAT');

  let updates = {};
  updates[`/merchants/${merchantId}/menu-categories/${itemId}`] = fields;
  const db = UPDATE_RECORD(updates);

  const newMenuItem = {
    id: itemId,
    fields
  };

  return newMenuItem;

};


export const DELETE_MENU_CATEGORY = (merchantId, menuItemId) => {
  let updates = {};
  updates[`/merchants/${merchantId}/menu-categories/${menuItemId}`] = null;
  return fire
    .database()
    .ref()
    .update(updates);
};


export const GET_MENU_CATEGORY_BY_ID = (merchantId, menuItemId) => {
  return fire
    .database()
    .ref(`/merchants/${merchantId}/menu-categories/${menuItemId}`)
    .once('value')
    .then(function(snapshot) {
      return snapshot.val();
    });
};

export const CREATE_MENU_ITEM = (merchantId, menuItemId, fields) => {
  const itemId = menuItemId ? menuItemId : createId('MENU-ITEM');

  let updates = {};
  updates[`/merchants/${merchantId}/menu-items/${itemId}`] = fields;
  const db = UPDATE_RECORD(updates);

  const newMenuItem = {
    id: itemId,
    fields
  };

  return newMenuItem;
};

export const GET_ALL_MENU_ITEMS = merchantId => {
  return fire
    .database()
    .ref(`/merchants/${merchantId}/menu-items`)
    .once('value')
    .then(function(snapshot) {
      return snapshot.val();
    });
};

export const GET_MENU_ITEM_BY_ID = (merchantId, menuItemId) => {
  return fire
    .database()
    .ref(`/merchants/${merchantId}/menu-items/${menuItemId}`)
    .once('value')
    .then(function(snapshot) {
      return snapshot.val();
    });
};

export const DELETE_MENU_ITEM = (merchantId, menuItemId) => {
  let updates = {};

  updates[`/merchants/${merchantId}/menu-items/${menuItemId}`] = null;
  return fire
    .database()
    .ref()
    .update(updates);
};

export const CREATE_ADD_ON_ITEM = (merchantId, addOnItemId, fields) => {
  const addOnId = addOnItemId ? addOnItemId : createId('ADD-ON');
  let updates = {};
  updates[`/merchants/${merchantId}/add-ons/${addOnId}`] = fields;
  const db = UPDATE_RECORD(updates);

  const newMenuItem = {
    id: addOnId,
    fields
  };

  return newMenuItem;
};

export const GET_ADD_ON_BY_ID = (merchantId, menuItemId) => {
  return fire
    .database()
    .ref(`/merchants/${merchantId}/add-ons/${menuItemId}`)
    .once('value')
    .then(function(snapshot) {
      return snapshot.val();
    });
};


export const GET_ALL_ADD_ONS = merchantId => {
  return fire
    .database()
    .ref(`/merchants/${merchantId}/add-ons`)
    .once('value')
    .then(function(snapshot) {
      return snapshot.val();
    });
};


export const DELETE_ADD_ON = (merchantId, menuItemId) => {
  let updates = {};

  updates[`/merchants/${merchantId}/add-ons/${menuItemId}`] = null;
  return fire
    .database()
    .ref()
    .update(updates);
};