import React, { Component } from 'react';
import classnames from 'classnames';
import { HeaderBar } from './lib/header-bar';
import { ChannelsSidebar } from './lib/channel-sidebar';


export class Skeleton extends Component {
  render() {

    let rightPanelHide = this.props.rightPanelHide
    ? "dn-s"
    : "";

    return (
      <div className="h-100 w-100">
      <HeaderBar spinner={this.props.spinner} popout={this.props.popout} />
        <div className={`cf w-100 flex ` +
      ((this.props.rightPanelHide)
      ? "h-100 "
      : "h-100-m-48-s ") +
      ((this.props.popout)
      ? "h-100"
      : "h-100-m-48-ns")}>
        <ChannelsSidebar
            paths={this.props.paths} 
            active={this.props.active}
            selected={this.props.selected}
            sidebarShown={this.props.sidebarShown}/>
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
