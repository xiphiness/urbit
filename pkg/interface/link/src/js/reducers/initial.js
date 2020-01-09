import _ from 'lodash';


export class InitialReducer {
  reduce(json, state) {
  let data = _.get(json, 'contact-initial', false);
    if (data) {
      state.contacts = data;
    }
  
  data = _.get(json, 'link', false);
  if (data) {
    _.extend(state.links, data);
  }
  }
}

