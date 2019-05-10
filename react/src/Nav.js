import React from 'react';

function NotLoggedInText(props) {
    return(
        <a className="nav-link" href="#/register" onClick={() => props.changeView('Register')}>Login/Register</a>
    );
}

function LoggedInText(props) {
    return (
        <a className="nav-link" href="#/" onClick={() => Logout(props)}>Logout {props.username}</a>
    );
}

function Logout(props) {
    props.setUser(null);
    localStorage.removeItem("debate");
    props.changeView('DebateList');
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
    setUserName = (user) => {
        this.props.setUserName(user);
    }
    render() {
        const isLoggedIn = (this.props.username === undefined || this.props.username === null ? false : true);

        let logintext = "";
        let newDebateText = "";
        if (!isLoggedIn) {
            logintext = <NotLoggedInText changeView={this.handleViewChange} />;
        } else {
            logintext = <LoggedInText setUser={this.setUserName} changeView={this.handleViewChange} username={this.props.username} />;
            newDebateText = (<li className="nav-item">
                                    <a className="nav-link" href="#/new-debate" onClick={() => this.handleViewChange('StartNewDebate')}>Start a New Debate</a>
                              </li>);
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
                    {newDebateText}
                    <li className="nav-item">
                        {logintext}
                    </li>
                </ul>
                <form className="form-inline mx-2 my-2 my-lg-0">
                <select className="form-control mr-sm-2" id="switchView">
                    <option value='recent'>Most Recent</option>
                    <option value='popular'>Most Popular</option>
                    <option value='active'>Most Active</option>
                    <option value='id'>My Debates</option>
                </select>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Switch View </button>
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
