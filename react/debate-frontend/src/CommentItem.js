import React from 'react';

class CommentItem extends React.Component {  
    render() {
      return (
        <tr>
            <td>{this.props.UserID}: {this.props.Comment}</td>
        </tr>
      );
    }
  }

  export default CommentItem;