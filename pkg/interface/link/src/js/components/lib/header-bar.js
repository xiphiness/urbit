import React, { Component } from 'react';
import classnames from 'classnames';
import { IconHome } from '/components/lib/icons/icon-home';
import { IconSpinner } from '/components/lib/icons/icon-spinner';

export class HeaderBar extends Component {
  render() {
    // let spin = (this.props.spinner)
    //   ?  <div className="absolute"
    //        style={{width: 16, height: 16, top: 16, left: 55}}>
    //        <IconSpinner/>
    //      </div>
    //   :  null;

    return (
      <div className="bg-white w-100 dn db-m db-l db-xl justify-between"
        style={{ height: 48 }}>
        <a className="db"
          style={{ background: '#FFFFFF',
            borderRadius: 8,
            width: 16,
            height: 16,
            top: 8 }}
          href='/'>
          {/* <IconHome /> */}
        </a>
        {/* {spin} */}
      </div>
    );
  }
}

