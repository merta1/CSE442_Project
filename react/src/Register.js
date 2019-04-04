import React from 'react';
import Error from './Error';

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

        handleError = msg => {

                this.setState({error: msg});
                this.setState({hasError: true});
                
        }

        handleSubmit = type => event => {

                let self = this;
                
                // type is the argument you passed to the function
                // event is the event object that returned
                switch(type) {
                        case "register":

                                var formBody = [];
                                for (var property in self.state) {
                                  var encodedKey = encodeURIComponent(property);
                                  var encodedValue = encodeURIComponent(self.state[property]);
                                  formBody.push(encodedKey + "=" + encodedValue);
                                }
                                formBody = formBody.join("&");

                                fetch(self.props.sparkEndpoint + "/user/register", {
                                        method: 'post',
                                        headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                        },
                                        body: formBody,
                                }).then(function(response) {
                                        return response.json();
                                }).then(function(data) {
                                        if (data.status === "ok") {
                                                self.props.setUserName(data.username);
                                                localStorage.setItem("debate", JSON.stringify({"userid":data.userid,"username":data.username, "email":data.email}));
                                                self.props.changeView('DebateWindow', self.props.debateid);
                                        } else {
                                                self.handleError(data.message);
                                        }
                                }).catch(function(err) {
                                        console.log("Fetch Error: ",err);
                                });
                                break;
                        case "login":
                                
                                var formBody = [];
                                for (var property in self.state) {
                                var encodedKey = encodeURIComponent(property);
                                var encodedValue = encodeURIComponent(self.state[property]);
                                formBody.push(encodedKey + "=" + encodedValue);
                                }
                                formBody = formBody.join("&");

                                fetch(self.props.sparkEndpoint + "/user/login", {
                                        method: 'post',
                                        headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                        },
                                        body: formBody,
                                }).then(function(response) {
                                        return response.json();
                                }).then(function(data) {
                                        if (data.status === "ok") {
                                                self.props.setUserName(data.username);
                                                localStorage.setItem("debate", JSON.stringify({"userid":data.userid,"username":data.username, "email":data.email}));
                                                self.props.changeView('DebateWindow', self.props.debateid);
                                        } else {
                                                self.handleError(data.message);
                                        }
                                }).catch(function(err) {
                                        console.log("Fetch Error: ",err);
                                });
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

                        { this.state.hasError ? <Error ErrorMessage={this.state.error} /> : null }

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
