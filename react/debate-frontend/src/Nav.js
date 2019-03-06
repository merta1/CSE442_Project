import React from 'react';

// Test
function NotLoggedInText(props) {
    return(
        <a className="nav-link" href="#/register" onClick={() => props.changeView('Register')}>Login/Register</a>
    );
}

function LoggedInText(props) {
    return (
        <div className="nav-link">Welcome {props.username} </div>
    );
}

class Nav extends React.Component {

    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    handleViewChange = (view) => {
        this.props.changeView(view);
    }
    render() {
        const isLoggedIn = (this.props.username === undefined || this.props.username === null ? false : true);
        let logintext = "";
        if (!isLoggedIn) {
            logintext = <NotLoggedInText changeView={this.handleViewChange} />;
        } else {
            logintext = <LoggedInText username={this.props.username} />;
        }
        const collapsed = this.state.collapsed;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#/" onClick={() => this.handleViewChange('DebateList')}>Bad-Ass Debate App</a>
            <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`${classOne}`} id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#/new-debate" onClick={() => this.handleViewChange('StartNewDebate')}>Start a New Debate</a>
                    </li>
                    <li className="nav-item">
                        {logintext}
                    </li>
                </ul>
                <form className="form-inline mx-2 my-2 my-lg-0">
                <select class="form-control mr-sm-2" id="switchView">
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Most Active</option>
                    <option>My Debates</option>
                </select>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Switch View</button>
                </form>
                <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
      );
    }
  }

  export default Nav;
