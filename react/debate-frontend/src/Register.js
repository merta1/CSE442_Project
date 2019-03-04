import React from 'react';

class Register extends React.Component {
        state={
                username :'',
                email :'',
                password : '',
        }
        render() {
                return(
                <div class="container login-container">
                        <div class="row">
                                <div class="col-md-6 login-form-1">
                                <h3>New User? Register</h3>
                                        <form>
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
                                                                onChange={e=>this.setState({firstname: e.target.value}) }/>
                                                </div>
                                                <div class="form-group">
                                                        <input class="btn btn-dark" type="submit" value="Register" />
                                                </div>
                                        </form>
                                </div>
                                <div class="col-md-6 login-form-2 bg-dark">
                                <h3>Existing User? Login</h3>
                                <form>
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