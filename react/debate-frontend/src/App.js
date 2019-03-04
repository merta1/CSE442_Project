import React from 'react';

import DebateList from './DebateList';
import DebateWindow from './DebateWindow';
import StartNewDebate from './StartNewDebate';
import Nav from './Nav';
import Form from './Form';

class App extends React.Component { 
    constructor(props) {
        super(props);
        //debateid is only used on the DebateWindow page right now, it refers to a debate ID in the database
        //currentView is used to change the view state of the React Application
        this.state = {
          currentView: 'DebateList',
          debateid: '#',
        };
        this.changeView = this.changeView.bind(this);
      }
      //this changes the active view and the 
      changeView(view, dbid="#") {
        this.setState({currentView: view, debateid: dbid})
      }
      drawView(state) {
        var VIEWS = {
            DebateList: <DebateList changeView={this.changeView}  />,
            DebateWindow: <DebateWindow changeView={this.changeView} debateid={state.debateid} />,
            StartNewDebate: <StartNewDebate changeView={this.changeView} />,
            Form: <Form changeView={this.changeView} />,
            }
        return VIEWS[state.currentView];
      }
    
    render() {
      return (
        <div className='container'>
            <Nav changeView={this.changeView} />
            {this.drawView(this.state)}

        </div>
      );
    }
  }

  export default App;