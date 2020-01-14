import _ from 'lodash';


export class InitialReducer {
  reduce(json, state) {
  let data = _.get(json, 'contact-initial', false);
    if (data) {
      state.contacts = data;
    }

    data = _.get(json, 'group-initial', false);
    if (data) {
      for (let group in data) {
        state.groups[group] = new Set(data[group]);
      }
    }
  
  data = _.get(json, 'link', false);
  if (data) {
    let name = Object.keys(data)[0];
    state.links[name] = {};
    state.links[name]["total-pages"] = data[name]["total-pages"];
    state.links[name]["total-items"] = data[name]["total-items"];
    state.links[name]["page0"] = data[name]["page"];
  }
  }
}

