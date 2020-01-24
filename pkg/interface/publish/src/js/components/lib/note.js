import React, { Component } from 'react';
import { Comments } from './comments';

//TODO ask for note if we don't have it
//TODO initialise note if no state

//TODO if comments are disabled on the notebook, don't render comments
export class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.note = null;

    this.loadNote().then(note => {
      this.state.note = note;
    });
  }

  async loadNote() {
    const { notebooks, ship, notebook, note } = this.props;
    //TODO check for existence etc
    return notebooks[ship][notebook][note];
  }

  render() {
    const { note } = this.state;

    console.log('rendering note')


    return (
      <div className="mw7 center">
      
        // <div id="headNav"
        //    className={`pl3 pt2 bb b--gray4 b--gray2-d bg-black-d flex relative overflow-x-scroll
        //    overflow-x-auto-l overflow-x-auto-xl flex-shrink-0`}
        //    style={{ height: 48 }}>
        //    // <SidebarSwitcher
        //    //   sidebarShown={this.props.sidebarShown}
        //    //   popout={this.props.popout}
        //    // />
        //    <Link to={`/~publish/` + isinPopout + '/' ship + '/' + notebook + '/' + note}
        //    className="pt2 white-d">
        //      <h2
        //        className="mono dib f8 fw4 v-top"
        //        style={{ width: "max-content" }}>
        //        {`<- ${note} index`}
        //      </h2>
        //    </Link>
        // </div>

        <div id="postHead">
          title
          author time
        </div>


        <div id="postBody">
          body
        </div>

        <div id="postNav">
          <div id="prev">&lt;-</div>
          <div id="next">-&gt;</div>
        </div>

        <Comments/>
      </div>
    )
  }
}

export default Note
