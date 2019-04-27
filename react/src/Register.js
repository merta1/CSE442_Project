import React from 'react';
import Error from './Error';
import Message from './Message';

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

        handleMessage = msg => {
                this.setState({message: msg});
                this.setState({hasMessage: true});
        }

        handleSubmit = type => event => {

                let self = this;
                let formBody,property,encodedKey,encodedValue;
                
                // type is the argument you passed to the function
                // event is the event object that returned
                switch(type) {
                        case "register":

                                formBody = [];

                                let port = "";
                                if (window.location.port !== 80 && window.location.port !== 443) {
                                        port = ":" + window.location.port;
                                }
                                formBody.push("domain="+window.location.protocol + "//" + window.location.hostname + port);

                                for (property in self.state) 
                                {
                                        encodedKey = encodeURIComponent(property);
                                        encodedValue = encodeURIComponent(self.state[property]);
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
                                                self.setState({hasError: false});
                                                self.handleMessage(data.message);
                                        } else {
                                                self.handleError(data.message);
                                        }
                                }).catch(function(err) {
                                        console.log("Fetch Error: ",err);
                                });
                                break;
                        case "login":
                                
                                formBody = [];
                                for (property in self.state) {
                                        
                                        encodedKey = encodeURIComponent(property);
                                        encodedValue = encodeURIComponent(self.state[property]);
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
                                                self.props.setUserID(data.userid);
                                                localStorage.setItem("debate", JSON.stringify({"userid":data.userid,"username":data.username, "email":data.email}));
                                                if (self.props.lastView === "DebateWindow") {
                                                        self.props.changeView('DebateWindow', self.props.lastDebateID);
                                                } else {
                                                        self.props.changeView(self.props.lastView);
                                                }
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

                        { this.state.hasMessage ? <Message Message={this.state.message} /> : null }

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
                                                        <input className="btn btn-light" type="submit" value="Login" aria-describedby="forgotPasswordBlock" />
                                                        <small id="forgotPasswordBlock" className="form-text text-muted">
                                                                Forgot your password? <a href="#/forgotPassword" onClick={()=>{ this.props.changeView("ForgotPassword"); }} >Click here to reset it.</a>
                                                        </small>
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
                );
        }
}

export default Register;
