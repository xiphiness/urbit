import React, { Component } from 'react';
import classnames from 'classnames';
import { HeaderBar } from './lib/header-bar';
import { ChannelsSidebar } from './lib/channel-sidebar';


export class Skeleton extends Component {
  render() {
    return (
      <div className="h-100 w-100">
      <HeaderBar spinner={this.props.spinner} />
        <div className="cf w-100 h-100 h-100-m-48-ns flex">
        <ChannelsSidebar
            paths={this.props.paths} 
            active={this.props.active}
            selected={this.props.selected}/>
          <div className="h-100 w-100" style={{
            flexGrow: 1,
          }}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
