import _ from 'lodash';


export class InitialReducer {
  reduce(json, state) {
  let data = _.get(json, 'contact-initial', false);
    if (data) {
      state.contacts = data;
    }
  }
}

