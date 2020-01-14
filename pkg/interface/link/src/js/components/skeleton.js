import React, { Component } from 'react';
import classnames from 'classnames';
import { ChannelsSidebar } from './lib/channel-sidebar';


export class Skeleton extends Component {
  render() {

    let rightPanelHide = this.props.rightPanelHide
    ? "dn-s"
    : "";

    return (
      <div className="h-100 w-100">
        <div className={`cf w-100 h-100 flex`}>
        <ChannelsSidebar
            paths={this.props.paths} 
            active={this.props.active}
            selected={this.props.selected}
            sidebarShown={this.props.sidebarShown}
            links={this.props.links}/>
          <div className={"h-100 w-100 " + rightPanelHide} style={{
            flexGrow: 1,
          }}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
