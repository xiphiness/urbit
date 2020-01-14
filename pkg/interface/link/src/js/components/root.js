import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import classnames from 'classnames';
import _ from 'lodash';

import { api } from '/api';
import { subscription } from '/subscription';
import { store } from '/store';
import { Skeleton } from '/components/skeleton';
import { Links } from '/components/links-list';


export class Root extends Component {
  constructor(props) {
    super(props);

    this.state = store.state;
    store.setStateHandler(this.setState.bind(this));
    this.setSpinner = this.setSpinner.bind(this);
  }

  componentDidMount() {
    // remove window dressing on index.html if popout
    if (window.location.href.includes("popout/")) {
      this.popout();
    }
  }

  popout() {
    let root = document.getElementById("root");
    root.classList.add("h-100");
    root.classList.remove("h-100-m-40-ns", "ba-m", "ba-l", "ba-xl");

    let body = document.body;
    body.classList.remove(
      "ph4-m", "ph4-l", "ph4-xl", "pb4-m", "pb4-l", "pb4-xl"
      );
  }

  setSpinner(spinner) {
    this.setState({
      spinner
    });
  }

  render() {
    const { props, state } = this;

    let paths = !!state.contacts ? state.contacts : {};

    let links = !!state.links ? state.links : {};
    
    return (
      <BrowserRouter>
        <Route exact path="/~link"
          render={ (props) => {
            return (
              <Skeleton 
                active="channels" 
                paths={paths}
                rightPanelHide={true}
                sidebarShown={true}
                links={links}>
                <div className="h-100 w-100 overflow-x-hidden flex flex-column bg-white dn db-ns">
                <div className="pl3 pr3 pt2 dt pb3 w-100 h-100">
                      <p className="f8 pt3 gray2 w-100 h-100 dtc v-mid tc">
                        Channels are shared across groups. To create a new channel, <a className="black" href="/~contacts">create a group</a>.
                      </p>
                    </div>
                </div>
              </Skeleton>
            );
          }} />
          <Route exact path="/~link/(popout)?/:ship/:channel/:page?"
            render={ (props) => {
              // groups/contacts and link channels are the same thing in ver 1

              let groupPath = 
              `/${props.match.params.ship}/${props.match.params.channel}`;
              let groupMembers = paths[groupPath] || {};

              let page = props.match.params.page || 0;

              let popout = props.match.url.includes("/popout/");

              let channelLinks = !!links[groupPath] 
              ? links[groupPath] 
              : {};

              return (
                <Skeleton
                  spinner={state.spinner}
                  paths={paths}
                  active="links"
                  selected={groupPath}
                  sidebarShown={state.sidebarShown}
                  sidebarHideMobile={true}
                  popout={popout}
                  links={links}
                >
                  <Links
                  {...props}
                  members={groupMembers}
                  links={channelLinks}
                  page={page}
                  path={groupPath}
                  popout={popout}
                  sidebarShown={state.sidebarShown}
                  />
                </Skeleton>
              )
            }}
          />
                    <Route exact path="/~link/(popout)?/:ship/:channel/url/:link"
            render={ (props) => {

              let groupPath = 
              `/${props.match.params.ship}/${props.match.params.channel}`;
              let groupMembers = paths[groupPath] || {};

              let url = props.match.params.link || "";

              let popout = props.match.url.includes("/popout/");

              return (
                <Skeleton
                  spinner={state.spinner}
                  paths={paths}
                  active="links"
                  selected={groupPath}
                  sidebarShown={state.sidebarShown}
                  sidebarHideMobile={true}
                  popout={popout}
                  links={links}
                >
                  <Link
                  {...props}
                  url={url}
                  members={groupMembers}
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

