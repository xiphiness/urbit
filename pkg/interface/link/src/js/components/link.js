import React, { Component } from 'react'
import { LinksTabBar } from './lib/links-tabbar';
import { SidebarSwitcher } from '/components/lib/icons/icon-sidebar-switch.js';
import { api } from '../api';
import { Route, Link } from 'react-router-dom';
import { Sigil } from '/components/lib/icons/sigil';
import { Comments } from './lib/comments';
import { uxToHex } from '../lib/util';
import moment from 'moment'

export class LinkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSinceLinkPost: this.getTimeSinceLinkPost(),
      comment: ""
    };

    this.setComment = this.setComment.bind(this);
  }
  
  componentDidMount() {
    // if we have preloaded our data,
    // but no comments, grab the comments
    if (!!this.props.data.url) {
      let props = this.props;
      let comments = !!props.data.comments;
      
      if (!comments) {
        api.getComments(props.path, props.data.url, props.page, props.link);
      }
    }

    this.updateTimeSinceNewestMessageInterval = setInterval( () => {
      this.setState({timeSinceLinkPost: this.getTimeSinceLinkPost()});
    }, 60000);
  }
  
  componentDidUpdate(prevProps) {
    // if we came to this page *directly*,
    // load the comments -- DidMount will fail
    if (this.props.data.url !== prevProps.data.url) {
      let props = this.props;
      let comments = !!this.props.data.comments;
      
      if (!comments && this.props.data.url) {
        api.getComments(props.path, props.data.url, props.page, props.link);
      }
    }

    if (this.props.data.timestamp !== prevProps.data.timestamp) {
      this.setState({timeSinceLinkPost: this.getTimeSinceLinkPost()})
    }
  }

  componentWillUnmount() {
    if (this.updateTimeSinceNewestMessageInterval) {
      clearInterval(this.updateTimeSinceNewestMessageInterval);
      this.updateTimeSinceNewestMessageInterval = null;
    }
  }

  getTimeSinceLinkPost() {
    return !!this.props.data.timestamp ?
      moment.unix(this.props.data.timestamp / 1000).from(moment.utc())
      : '';
  }

  onClickPost() {
    let url = this.props.data.url || "";

    let request = api.postComment(
      this.props.path, 
      url, 
      this.state.comment, 
      this.props.page, 
      this.props.link
      );

    if (request) {
      this.setState({comment: ""})
    }
  }

  setComment(event) {
    this.setState({comment: event.target.value});
  }
  
  render() {
    let props = this.props;
    let popout = (props.popout) ? "/popout" : "";
    let path = props.path + "/" + props.page + "/" + props.link;

    let ship = props.data.ship || "zod";
    let title = props.data.title || "";
    let url = props.data.url || "";

    let URLparser = new RegExp(/((?:([\w\d\.-]+)\:\/\/?){1}(?:(www)\.?){0,1}(((?:[\w\d-]+\.)*)([\w\d-]+\.[\w\d]+))){1}(?:\:(\d+)){0,1}((\/(?:(?:[^\/\s\?]+\/)*))(?:([^\?\/\s#]+?(?:.[^\?\s]+){0,1}){0,1}(?:\?([^\s#]+)){0,1})){0,1}(?:#([^#\s]+)){0,1}/);

    let hostname = URLparser.exec(url);

    if (hostname) {
      hostname = hostname[4];
    }

    let commentCount = props.data.commentCount || 0;

    let comments = commentCount + " comment" + ((commentCount === 1) ? "" : "s");
    
    let nickname = !!props.members[props.data.ship]
    ? props.members[props.data.ship].nickname
    : "";

    let nameClass = nickname ? "inter" : "mono";

    let color = !!props.members[props.data.ship]
    ? uxToHex(props.members[props.data.ship].color)
    : "000000";

    let activeClasses = (this.state.comment)
    ? "black b--black pointer"
    : "gray2 b--gray2";
    
    return (
      <div className="h-100 w-100 overflow-hidden flex flex-column">
        <div
            className={`pl3 pt2 flex relative overflow-x-scroll 
            overflow-x-auto-l overflow-x-auto-xl flex-shrink-0
            bb bn-m bn-l bn-xl b--gray4`}
            style={{ height: 48 }}>
              <SidebarSwitcher
              sidebarShown={props.sidebarShown}
              popout={props.popout}/>
              <Link 
              className="dib f8 fw4 v-top pt2 gray2"
              to={"/~link" + props.path + "/" + props.page}>
                {"<- Collection index"}
              </Link>
              <LinksTabBar
              {...props}
              popout={popout}
              path={path}/>
            </div>
            <div className="w-100 mt6 flex justify-center overflow-y-scroll pa4">
          <div className="w-100 mw7">
            <div className="pt6 pb6 flex">
              <Sigil
              ship={"~" + ship}
              size={36}
              color={"#" + color}
              />
              <div className="flex flex-column ml2">
                <a href={url}
                className="w-100 flex"
                target="_blank">
                  <p className="f8 truncate">{title}
                    <span className="gray2 ml2 flex-shrink-0">{hostname} ↗</span>
                  </p>
                </a>
                <div className="w-100 pt1">
                  <span className={"f9 pr2 v-mid " + nameClass}>{(nickname) 
                  ? nickname 
                  : "~" + ship}
                  </span>
                <span className="f9 inter gray2 pr3 v-mid">
                  {this.state.timeSinceLinkPost}
                  </span>
                <Link to={"/~link" + props.path + "/" + props.page + "/" + props.link} className="v-top">
                  <span className="f9 inter gray2">
                      {comments}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          <textarea
          className="w-100 f8 ba b--gray4 pa3 mt6 mb3"
          style={{
            resize: "none",
            height: 100
          }}
          placeholder="Enter a comment"
          onChange={this.setComment}
          value={this.state.comment}
          />
          <button className={"f8 ba pa2 " + activeClasses}
          disabled={!this.state.comment}
          onClick={this.onClickPost.bind(this)}>
            Post
          </button>
          <Comments comments={props.data.comments} members={props.members}/>
          </div>
        </div>
      </div>
      )
    }
  }
  
  export default LinkDetail;
  