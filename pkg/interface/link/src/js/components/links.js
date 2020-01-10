import React, { Component } from 'react'
import { LinksTabBar } from './lib/links-tabbar';
import { SidebarSwitcher } from '/components/lib/icons/icon-sidebar-switch.js';
import { Route, Link } from "react-router-dom";
import { LinkItem } from '/components/lib/link-item.js';



export class Links extends Component {
  constructor() {
    super();
    this.state = {
      linkValue: ""
    }
    this.setLinkValue = this.setLinkValue.bind(this);
  }

  setLinkValue(event) {
    this.setState({linkValue: event.target.value});
  }
  render() {
    let props = this.props;

    let popout = (props.popout) ? "/popout" : "";

    let channel = props.path.substr(1);

    let activeClasses = (this.state.linkValue)
    ? "b--black black"
    : "b--gray2 gray2";

    let linkPage = (props.page === 0)
    ? "page"
    : "page" + props.page;

    let LinkList = Object.keys(props.links[linkPage])
    .map((link) => {

      let linksObj = props.links[linkPage];

      let title = linksObj[link].title;
      let url = linksObj[link].url;
      let timestamp = linksObj[link].timestamp;
      let ship = linksObj[link].ship;

      let mono = true;

      if (props.members[ship].nickname) {
        ship = props.members[ship].nickname;
        mono = false;
      }

      return(
        <LinkItem
        key={timestamp}
        title={title}
        url={url}
        timestamp={timestamp}
        ship={ship}
        mono={mono}
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
         className={`pl3 pt2 bb b--gray4 flex relative overflow-x-scroll 
         overflow-x-auto-l overflow-x-auto-xl flex-shrink-0`}
         style={{ height: 48 }}>
          <SidebarSwitcher
           sidebarShown={props.sidebarShown}
           popout={props.popout}
         />
         <Link to={`/~link` + popout + props.path} className="pt2">
           <h2
             className="dib f8 fw4 v-top">
             {(props.path.includes("/~/"))
             ? "Private"
            : channel.substr(channel.indexOf("/") + 1)}
           </h2>
         </Link>
          <LinksTabBar
          {...props}
          popout={popout}
          path={props.path}/>
        </div>
        <div className="w-100 mt6 flex justify-center pa4">
          <div className="w-100 mw7">
            <div className="flex">
              <textarea
              className="ba b--gray4 pl2 w-100 f8"
              style={{
                resize: "none",
                height: 40,
                paddingTop: 10
              }}
              placeholder="Paste link here"
              onChange={this.setLinkValue}/>
              <button
                className={"ba f8 pa2 ml2 flex-shrink-0 " + activeClasses}>
                  Post Link
              </button>
            </div>
            <div>
            {LinkList}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Links
