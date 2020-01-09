import { InitialReducer } from '/reducers/initial';
import { PermissionUpdateReducer } from '/reducers/permission-update';


class Store {
  constructor() {
    this.state = {
      contacts: {},
      groups: {},
      permissions: {},
      spinner: false
    };

    this.initialReducer = new InitialReducer();
    this.permissionUpdateReducer = new PermissionUpdateReducer();
    this.setState = () => {};
  }

  setStateHandler(setState) {
    this.setState = setState;
  }

  handleEvent(data) {
    let json = data.data;

    console.log(json);
    this.initialReducer.reduce(json, this.state);
    this.permissionUpdateReducer.reduce(json, this.state);

    this.setState(this.state);
  }
}

export let store = new Store();
window.store = store;
