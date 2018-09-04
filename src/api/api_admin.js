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
