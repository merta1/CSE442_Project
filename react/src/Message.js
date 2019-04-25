import React from 'react';

class Message extends React.Component {  
    render() {
      return (
        <div className="alert alert-warning" role="alert">
            {this.props.Message}
        </div>
      );
    }
  }

  export default Message;