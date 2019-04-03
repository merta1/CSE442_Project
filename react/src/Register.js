import React from 'react';

class Register extends React.Component {
        constructor(props) {
                super(props);

                this.state={
                        username :'',
                        email :'',
                        password : '',
                        firstname : '',
                        lastname : "",
                        emaillogin :'',
                        passwordlogin : '',
                }
                this.handleSubmit = this.handleSubmit.bind(this);

        }

        handleSubmit = type => event => {
                // type is the argument you passed to the function
                // event is the event object that returned
                switch(type) {
                        case "register":
                                // this needs some work.  Now we need to send an API request to register a user
                                // and once we get a successful message form the API, then we set the username
                                // through the set username function.
                                var data = new FormData();
                                data.append("username", this.state.username);
                                data.append("email", this.state.email);
                                data.append("password", this.state.password);
                                data.append("firstname", this.state.firstname);
                                data.append("lastname", this.state.lastname);
                                fetch(this.props.sparkEndpoint + "/user/register", {
                                        method: 'post',
                                        body: data,
                                }).then(function(response) {
                                        return response.json();
                                }).then(function(data) {
                                        if (data.status === "ok") {
                                                //this.props.setUserName(this.state.username);
                                                localStorage.setItem("debate", JSON.stringify({"username":this.state.username, "email":this.state.email}));
                                                this.props.changeView('DebateWindow', this.props.debateid);
                                        } else {
                                                //there is an error, tell someone
                                                console.log(data);
                                        }
                                }).catch(function(err) {
                                        console.log("Fetch Error: ",err);
                                });
                                break;
                        case "login":
                                // here we send the API request to login and wait for a successful response.
                                // if there isn't a successful response, we need to display a message to the
                                // user.  If it is successful, then we set the username.

                                // We need to to encrypt the password before we send it.
                                alert("do login for " + this.state.emaillogin);
                                break;
                        default:
                                alert("an error occured.");
                                break;
                }
                event.preventDefault();
        }

        render() {
                return(
                <div className="container login-container">
                        <div className="row">
                                <div className="col-md-6 login-form-1">
                                <h3>New User? Register</h3>
                                        <form onSubmit={this.handleSubmit('register')}>
                                                <div className="form-group">
                                                        <input placeholder='First Name'
                                                                className="form-control"
                                                                value={this.state.firstname}
                                                                onChange={e=>this.setState({firstname: e.target.value}) }/>
                                                </div>
                                                <div className="form-group">
                                                        <input placeholder='Last Name'
                                                                className="form-control"
                                                                value={this.state.lastname}
                                                                onChange={e=>this.setState({lastname: e.target.value}) }/>
                                                </div>
                                                <div className="form-group">
                                                        <input placeholder='Email'
                                                                className="form-control"
                                                                type="email"
                                                                value={this.state.email}
                                                                onChange={e=>this.setState({email: e.target.value}) }/>
                                                </div>
                                                <div className="form-group">
                                                        <input placeholder='Password'
                                                                className="form-control"
                                                                type="password"
                                                                value={this.state.password}
                                                                onChange={e=>this.setState({password: e.target.value}) }/>
                                                </div>
                                                <div className="form-group">
                                                        <input placeholder='Display Name'
                                                                className="form-control"
                                                                value={this.state.username}
                                                                onChange={e=>this.setState({username: e.target.value}) }/>
                                                </div>
                                                <div className="form-group">
                                                        <input className="btn btn-dark" type="submit" value="Register" />
                                                </div>
                                        </form>
                                </div>
                                <div className="col-md-6 login-form-2 bg-dark">
                                <h3>Existing User? Login</h3>
                                <form onSubmit={this.handleSubmit('login')}>
                                                <div className="form-group">
                                                        <input placeholder='Email Address'
                                                                className="form-control"
                                                                type="email"
                                                                value={this.state.emaillogin}
                                                                onChange={e=>this.setState({emaillogin: e.target.value}) }/>
                                                </div>
                                                <div className="form-group">
                                                        <input placeholder='Password'
                                                                className="form-control"
                                                                type="password"
                                                                value={this.state.passwordlogin}
                                                                onChange={e=>this.setState({passwordlogin: e.target.value}) }/>
                                                </div>
                                                <div className="form-group">
                                                        <input className="btn btn-light" type="submit" value="Login" />
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
                );
        }
}

export default Register;
