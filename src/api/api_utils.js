import moment from 'moment';

export const GET_CURRENT_DATE = () => {
  return moment().format('MMMM Do YYYY, h:mm a');
};

export const GET_URL_VARIABLES = () => {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
};
