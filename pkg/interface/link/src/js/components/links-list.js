import React, { Component } from 'react'
import { LinksTabBar } from './lib/links-tabbar';
import { SidebarSwitcher } from '/components/lib/icons/icon-sidebar-switch.js';
import { Route, Link } from "react-router-dom";
import { LinkItem } from '/components/lib/link-item.js';
import { api } from '../api';

import { uxToHex } from '../lib/util';


export class Links extends Component {
  constructor() {
    super();
    this.state = {
      linkValue: "",
      linkTitle: ""
    }
    this.setLinkValue = this.setLinkValue.bind(this);
    this.setLinkTitle = this.setLinkTitle.bind(this);
  }

   onClickPost() {
    let link = this.state.linkValue;
    let title = (this.state.linkTitle)
    ? this.state.linkTitle
    : this.state.linkValue;
    let request = api.postLink(this.props.path, link, title);

    if (request) {
      this.setState({linkValue: "", linkTitle: ""})
    }
  }

  setLinkValue(event) {
    this.setState({linkValue: event.target.value});
  }

  setLinkTitle(event) {
    this.setState({linkTitle: event.target.value});
  }

  render() {
    let props = this.props;

    let popout = (props.popout) ? "/popout" : "";

    let channel = props.path.substr(1);

    let activeClasses = (this.state.linkValue)
    ? "green2 pointer"
    : "gray2";

    let linkPage = "page" + props.page

    //TODO if "page[num]" is not in state, ask for it, send it to update reducer

    let links = !!props.links[linkPage]
    ? props.links[linkPage]
    : {};

    let LinkList = Object.keys(links)
    .map((link) => {

      let linksObj = props.links[linkPage];

      let title = linksObj[link].title;
      let url = linksObj[link].url;
      let timestamp = linksObj[link].timestamp;
      let ship = linksObj[link].ship;
      let comments = linksObj[link].commentCount;

      let mono = true;
      let members = {};

      if (!props.members[ship]) {
        members[ship] = {'nickname': '', 'avatar': 'TODO', 'color': '0x0'};
      } else {
        members = props.members;
      }
      let color = uxToHex('0x0');

      let nickname = "";

      // restore this to props.members
      if (members[ship].nickname) {
        nickname = members[ship].nickname;
        mono = false;
      }

      if (members[ship].color !== "") {
        color = uxToHex(members[ship].color);
      }

      return(
        <LinkItem
        key={timestamp}
        title={title}
        page={props.page}
        index={link}
        url={url}
        timestamp={timestamp}
        nickname={nickname}
        ship={ship}
        color={color}
        comments={comments}
        mono={mono}
        channel={channel}
        popout={popout}
        />
      )
    })

    return (
      <div
      className="h-100 w-100 overflow-hidden flex flex-column">
        <div
          className="w-100 dn-m dn-l dn-xl inter pt4 pb6 pl3 f8"
          style={{ height: "1rem" }}>
         <Link to="/~link/">{"⟵ All Channels"}</Link>
       </div>
       <div
         className={`pl3 pt2 flex relative overflow-x-scroll 
         overflow-x-auto-l overflow-x-auto-xl flex-shrink-0
         bb bn-m bn-l bn-xl b--gray4`}
         style={{ height: 48 }}>
          <SidebarSwitcher
           sidebarShown={props.sidebarShown}
           popout={props.popout}
         />
         <Link to={`/~link` + popout + props.path} className="pt2">
           <h2
             className={`dib f8 fw4 v-top ` + 
             (props.path.includes("/~/")
             ? ""
             : "mono")}>
              {(props.path.includes("/~/"))
              ? "Private"
              : channel}
           </h2>
         </Link>
          <LinksTabBar
          {...props}
          popout={popout}
          path={props.path}/>
        </div>
        <div className="w-100 mt6 flex justify-center overflow-y-scroll pa4">
          <div className="w-100 mw7">
            <div className="flex">
              <div className="relative ba b--gray4 br1 w-100 mb6">
              <textarea
              className="pl2 w-100 f8"
              style={{
                resize: "none",
                height: 40,
                paddingTop: 10
              }}
              placeholder="Paste link here"
              onChange={this.setLinkValue}
              spellCheck="false"
              rows={1}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  this.onClickPost();
                }
              }}
              value={this.state.linkValue}
              />

              <textarea
              className="pl2 w-100 f8"
              style={{
                resize: "none",
                height: 40,
                paddingTop: 16
              }}
              placeholder="Enter title"
              onChange={this.setLinkTitle}
              spellCheck="false"
              rows={1}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  this.onClickPost();
                }
              }}
              value={this.state.linkTitle}/>

              <button
                className={"absolute f8 ml2 flex-shrink-0 " + activeClasses}
                disabled={!this.state.linkValue}
                onClick={this.onClickPost.bind(this)}
                style={{
                  bottom: 12,
                  right: 8
                }}>
                  Post
              </button>
              </div>
            </div>
            <div>
            {LinkList}
            {/*TODO Pagination */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Links
