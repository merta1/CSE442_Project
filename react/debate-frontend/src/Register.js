import React from 'react';

class Register extends React.Component {
        constructor(props) {
                super(props);

                this.state={
                        username :'',
                        email :'',
                        password : '',
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
                                localStorage.setItem("debate", JSON.stringify({"username":this.state.username, "email":this.state.email}));
                                break;
                        case "login":
                                alert("do login for " + this.state.emaillogin);
                                break;
                }
        }

        setUserName = user => {
                this.props.setUserName(user);            
        } 

        render() {
                return(
                <div class="container login-container">
                        <div class="row">
                                <div class="col-md-6 login-form-1">
                                <h3>New User? Register</h3>
                                        <form onSubmit={this.handleSubmit('register')}>
                                                <div class="form-group">
                                                        <input placeholder='Email Address' 
                                                                class="form-control"
                                                                type="email"
                                                                value={this.state.email} 
                                                                onChange={e=>this.setState({email: e.target.value}) }/>
                                                </div>
                                                <div class="form-group">
                                                        <input placeholder='Password' 
                                                                class="form-control"
                                                                type="password"
                                                                value={this.state.password} 
                                                                onChange={e=>this.setState({password: e.target.value}) }/>
                                                </div>
                                                <div class="form-group">
                                                        <input placeholder='Display Name' 
                                                                class="form-control"
                                                                value={this.state.username} 
                                                                onChange={e=>this.setState({username: e.target.value}) }/>
                                                </div>
                                                <div class="form-group">
                                                        <input class="btn btn-dark" type="submit" value="Register" onClick={() => this.setUserName(this.state.username)} />
                                                </div>
                                        </form>
                                </div>
                                <div class="col-md-6 login-form-2 bg-dark">
                                <h3>Existing User? Login</h3>
                                <form onSubmit={this.handleSubmit('login')}>
                                                <div class="form-group">
                                                        <input placeholder='Email Address' 
                                                                class="form-control"
                                                                type="email"
                                                                value={this.state.emaillogin} 
                                                                onChange={e=>this.setState({emaillogin: e.target.value}) }/>
                                                </div>
                                                <div class="form-group">
                                                        <input placeholder='Password' 
                                                                class="form-control"
                                                                type="password"
                                                                value={this.state.passwordlogin} 
                                                                onChange={e=>this.setState({passwordlogin: e.target.value}) }/>
                                                </div>
                                                <div class="form-group">
                                                        <input class="btn btn-light" type="submit" value="Login" />
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
                );
        }
}

export default Register;