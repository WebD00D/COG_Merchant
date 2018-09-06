import moment from 'moment';

export const GET_CURRENT_DATE = () => {
  return moment().format('MMMM Do YYYY, h:mm a');
};
