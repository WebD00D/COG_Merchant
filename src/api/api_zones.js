import fire from '../fire';

export const GET_ALL_ZONES = () => {
    return fire
      .database()
      .ref('zones')
      .once('value')
      .then(function(snapshot) {
        return snapshot.val();
      });
  };