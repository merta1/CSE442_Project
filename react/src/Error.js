import React from 'react';

class Error extends React.Component {  
    render() {
      return (
        <div className="alert alert-danger" role="alert">
            {this.props.ErrorMessage}
        </div>
      );
    }
  }

  export default Error;