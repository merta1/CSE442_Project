import React from 'react';

import DebateList from './DebateList';
import DebateWindow from './DebateWindow';
import Nav from './Nav';

class App extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
          currentView: 'DebateList',
        };
        this.changeView = this.changeView.bind(this);
      }
      changeView(view) {
        this.setState({currentView: view})
      }
    render() {
      return (
        <div className='container'>
            <Nav changeView={this.changeView} />
            {this.state.currentView === 'DebateList' ? (
                <DebateList changeView={this.changeView}  />
            ) : ( <DebateWindow changeView={this.changeView} /> )}
        </div>
      );
    }
  }

  export default App;