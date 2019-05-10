import React from 'react';

class CommentItem extends React.Component {  
    render() {
      return (
        <div className="comment p-2">{this.props.UserName}: {this.props.Comment}</div>
      );
    }
  }

  export default CommentItem;