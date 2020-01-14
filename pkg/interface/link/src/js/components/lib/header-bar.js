import React, { Component } from 'react';
import classnames from 'classnames';
import { IconHome } from '/components/lib/icons/icon-home';
import { IconSpinner } from '/components/lib/icons/icon-spinner';
import { Sigil } from '/components/lib/icons/sigil';

export class HeaderBar extends Component {
  render() {
    // let spin = (this.props.spinner)
    //   ?  <div className="absolute"
    //        style={{width: 16, height: 16, top: 16, left: 55}}>
    //        <IconSpinner/>
    //      </div>
    //   :  null;

    let popout = (window.location.href.includes("popout/")) 
    ? "dn"
    : "dn db-m db-l db-xl";

    return (
      <div className={"bg-white w-100 justify-between relative tc pt3 "
        + popout}
        style={{ height: 40 }}>
        <a className="dib gray2 f9 inter absolute left-0"
          href='/'
          style={{top: 14}}>
          <IconHome/>
          <span className="ml2 pt1 v-top lh-title">
          Home
          </span>
        </a>
        <span className="f9 inter">Links</span>
        {/* {spin} */}
        <div className="absolute right-0 lh-copy"
        style={{top: 12}}>
        <Sigil
          ship={"~" + window.ship}
          size={16}
          color={"#000000"}
            />
          <span className="mono f9 ml2 v-top">{"~" + window.ship}</span>
        </div>
      </div>
    );
  }
}

