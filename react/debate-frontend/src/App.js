import React from 'react';

import DebateList from './DebateList';
import DebateWindow from './DebateWindow';
import StartNewDebate from './StartNewDebate';
import Nav from './Nav';
import Register from './Register';

class App extends React.Component { 
    constructor(props) {
        super(props);

        //strip the anchor out of the URL, it will determine the view that is loaded if a page is refreshed
        let url = document.URL;
        let urlparts = url.split('#');
        let anchorparts = urlparts[1].split("/");

        switch(anchorparts[1]) {
            case "debate":
                //debateid is only used on the DebateWindow page right now, it refers to a debate ID in the database
                //currentView is used to change the view state of the React Application
                this.state = {
                    currentView: 'DebateWindow',
                    debateid: anchorparts[2],
                };
                break;
            case "new-debate":
                this.state = {
                    currentView: 'StartNewDebate',
                    debateid: '#',
                };
                break;
            case "register":
                this.state = {
                    currentView: 'Register',
                    debateid: '#',
                };
                break;
            default:
                this.state = {
                    currentView: 'DebateList',
                    debateid: '#',
                };
                break;
        }

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
            Register: <Register changeView={this.changeView} />,
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