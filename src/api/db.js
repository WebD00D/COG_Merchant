import fire from '../fire';

export const UPDATE_RECORD = update => {
  return fire
    .database()
    .ref()
    .update(update);
};
