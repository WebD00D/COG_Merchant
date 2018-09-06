import moment from 'moment';
import fire from '../fire';

import { createId } from '../utils/app-utils';

export const GET_CURRENT_DATE = () => {
  return moment().format('MMMM Do YYYY, h:mm a');
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

export const GET_ALL_MERCHANTS = () => {
  return fire
    .database()
    .ref('merchants')
    .once('value')
    .then(function(snapshot) {
      return snapshot.val();
    });
};

export const GET_ALL_ZONES = () => {
  return fire
    .database()
    .ref('zones')
    .once('value')
    .then(function(snapshot) {
      return snapshot.val();
    });
};
