import React, { Component } from 'react'
import { CommentItem } from './comment-item';

import { uxToHex } from '../../lib/util'; 

export class Comments extends Component {
  render() {
    let props = this.props;

    let comments = !!props.comments
    ? props.comments.page
    : {};

    let commentsList = Object.keys(comments)
    .map((entry) => {

      let commentObj = comments[entry]
      let ship = commentObj.ship;
      let time = commentObj.time;
      let content = commentObj.udon;

      let members = !!props.members 
      ? props.members
      : {};

      let nickname = !!members[ship]
      ? members[ship].nickname
      : "";

      let nameClass = nickname ? "inter" : "mono";

      let color = !!members[ship]
      ? uxToHex(members[ship].color)
      : "000000";

      return(
        <CommentItem
          key={time}
          ship={ship}
          time={time}
          content={content}
          nickname={nickname}
          nameClass={nameClass}
          color={color}
        />
      )
    })
    return (
      <div>
        {commentsList}
      </div>
    )
  }
}

export default Comments
