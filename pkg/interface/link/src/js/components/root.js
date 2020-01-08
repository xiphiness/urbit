import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import classnames from 'classnames';
import _ from 'lodash';

import { api } from '/api';
import { subscription } from '/subscription';
import { store } from '/store';
import { Skeleton } from '/components/skeleton';


export class Root extends Component {
  constructor(props) {
    super(props);

    this.state = store.state;
    store.setStateHandler(this.setState.bind(this));
    this.setSpinner = this.setSpinner.bind(this);
  }

  setSpinner(spinner) {
    this.setState({
      spinner
    });
  }

  render() {
    const { props, state } = this;

    let paths = !!state.paths ? state.paths : {};


    return (
      <BrowserRouter>
        <Route exact path="/~link"
          render={ (props) => {
            return (
              <Skeleton active="channels" paths={paths}>
                <div className="h-100 w-100 overflow-x-hidden flex flex-column bg-gray0 dn db-ns">
                </div>
              </Skeleton>
            );
          }} />
      </BrowserRouter>
    )
  }
}

