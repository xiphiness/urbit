import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import classnames from 'classnames';
import _ from 'lodash';

import { api } from '/api';
import { subscription } from '/subscription';
import { store } from '/store';
import { Skeleton } from '/components/skeleton';
import { Links } from '/components/links';


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

    let paths = !!state.contacts ? state.contacts : {};
    
    return (
      <BrowserRouter>
        <Route exact path="/~link"
          render={ (props) => {
            return (
              <Skeleton 
                active="channels" 
                paths={paths}
                rightPanelHide={true}
                sidebarShown={true}>
                <div className="h-100 w-100 overflow-x-hidden flex flex-column bg-gray0 dn db-ns">
                <div className="pl3 pr3 pt2 dt pb3 w-100 h-100">
                      <p className="f8 pt3 gray2 w-100 h-100 dtc v-mid tc">
                        Channels are shared across groups. To create a new channel, <a className="gray4" href="/~contacts">create a group</a>.
                      </p>
                    </div>
                </div>
              </Skeleton>
            );
          }} />
          <Route exact path="/~link/(popout)?/:ship/:channel/:page?"
            render={ (props) => {
              // groups/contacts and link channels are the same thing in ver 1
              //TODO default to no metadata if not in a group channel

              let groupPath = 
              `/${props.match.params.ship}/${props.match.params.channel}`;
              let groupMembers = paths[groupPath] || {};

              let page = props.match.params.page || 0;

              let popout = (props.match.params.popout);

              return (
                <Skeleton
                  spinner={state.spinner}
                  paths={paths}
                  active="links"
                  selected={groupPath}
                  sidebarShown={state.sidebarShown}
                  sidebarHideMobile={true}
                  popout={popout}
                >
                  <Links
                  {...props}
                  members={groupMembers}
                  links={state.links[groupPath]}
                  page={page}
                  path={groupPath}
                  popout={popout}
                  sidebarShown={state.sidebarShown}
                  />
                </Skeleton>
              )
            }}
          />
      </BrowserRouter>
    )
  }
}

