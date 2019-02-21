import React from 'react';

class StartNewDebate extends React.Component {  
    render() {
      return (
        <div onClick={() => this.props.changeView('DebateList')}>
           Start a New Debate page goes here!
        </div>
      );
    }
  }

  export default StartNewDebate;