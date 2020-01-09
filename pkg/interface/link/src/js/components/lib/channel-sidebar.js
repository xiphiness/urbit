import React, { Component } from 'react';

import { Route, Link } from 'react-router-dom';
import { ChannelsItem } from '/components/lib/channels-item';

export class ChannelsSidebar extends Component {
  // drawer to the left

  render() {
    const { props, state } = this;

    let privateChannel =
      Object.keys(props.paths)
      .filter((path) => {
        return (path === "/~/default")
      })
      .map((path) => {
        let name = "Private"
        let selected = (this.props.selected === path);
        return (
          <ChannelsItem
            key={path}
            link={path}
            members={props.paths[path]}
            selected={selected}
            name={name}/>
        )
      })

    let channelItems =
      Object.keys(props.paths)
      .filter((path) => {
        return (!path.startsWith("/~/"))
      })
      .map((path) => {
        let name = path.substr(1);
        let nameSeparator = name.indexOf("/");
        name = name.substr(nameSeparator + 1);

        let selected = (this.props.selected === path);
        
        return (
          <ChannelsItem
            key={path}
            link={path}
            members={props.paths[path]}
            selected={selected}
            name={name}/>
        )
      });

    let activeClasses = (this.props.active === "channels") ? "" : "dn-s";

    return (
      <div className={`bn br-m br-l br-xl b--black lh-copy h-100 flex-basis-100-s
       flex-basis-30-ns flex-shrink-0 mw5-m mw5-l mw5-xl pt3 pt0-m pt0-l pt0-xl
        relative ` + activeClasses}>
        <a className="db dn-m dn-l dn-xl f8 pb6 pl3" href="/">⟵ Landscape</a>
        <div className="overflow-y-scroll h-100">
          <div className="pt4">
          {privateChannel}
          </div>
          <h2 className="f9 pt4 pr4 pb2 pl4 gray2 c-default">Your Channels</h2>
          {channelItems}
        </div>
      </div>
    );
  }
}

