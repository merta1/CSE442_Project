import React from 'react';
import Error from './Error';
import Message from './Message';

class ResetPassword extends React.Component {
        constructor(props) {
                super(props);

                //get the reset token
                let url = document.URL;
                let urlparts = url.split('#');
                let anchorparts = urlparts[1].split("/");

                this.state={
                        password :'',
                        passwordConfirm : '',
                        email : '',
                        showForm : false,
                        token : anchorparts[2],
                }

                this.handleSubmit = this.handleSubmit.bind(this);

        }

        handleMessage = (msg,type) => {

                this.setState({message: msg});
                if (type === "error") {
                        this.setState({hasError: true});
                        this.setState({hasMessage: false});
                } else {
                        this.setState({hasError: false});
                        this.setState({hasMessage: true});
                }
                
        }

        handleSubmit = type => event => {

                let self = this;
                let formBody,property,encodedKey,encodedValue;
                
                // type is the argument you passed to the function
                // event is the event object that returned
                switch(type) {
                        case "resetPW":

                                formBody = [];
                                for (property in self.state) {
                                        encodedKey = encodeURIComponent(property);
                                        encodedValue = encodeURIComponent(self.state[property]);
                                        formBody.push(encodedKey + "=" + encodedValue);
                                }
                                formBody = formBody.join("&");

                                fetch(self.props.sparkEndpoint + "/user/resetpassword", {
                                        method: 'post',
                                        headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                        },
                                        body: formBody,
                                }).then(function(response) {
                                        return response.json();
                                }).then(function(data) {
                                        if (data.status === "ok") {
                                                self.handleMessage(data.message, "message");
                                                self.setState({showForm: false});
                                        } else {
                                                self.handleMessage(data.message, "error");
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

        componentDidMount() {

                let self = this;
                 
                fetch(this.props.sparkEndpoint + "/user/resetpassword?token=" + this.state.token)
                  .then(function(response) {
                        return response.json();
                  }).then(function(data) {
                        if (data.status === "ok") {
                                self.setState({showForm: true});
                                self.setState({email: data.email})
                        } else {
                                self.handleMessage(data.message, "error");
                        }
                  }).catch(function(err) {
                        console.log("Fetch Error: ",err);
                });
        }

        render() {
                var style = {};
                if (!this.state.showForm) {
                        style.display = 'none'
                }
                return(
                <div className="container login-container">

                        { this.state.hasError ? <Error ErrorMessage={this.state.message} /> : null }

                        { this.state.hasMessage ? <Message Message={this.state.message} /> : null }

                        <div className="row justify-content-center" style={style}>
                                <div className="col-md-6 login-form-1">
                                <h3>Create a New Password</h3>
                                        <form onSubmit={this.handleSubmit('resetPW')}>
                                                <div className="form-group">
                                                        <input placeholder='Password'
                                                                className="form-control"
                                                                type="password"
                                                                value={this.state.password}
                                                                onChange={e=>this.setState({password: e.target.value}) }/>
                                                </div>
                                                <div className="form-group">
                                                        <input placeholder='Confirm Password'
                                                                className="form-control"
                                                                type="password"
                                                                value={this.state.passwordConfirm}
                                                                onChange={e=>this.setState({passwordConfirm: e.target.value}) }/>
                                                </div>
                                                <div className="form-group">
                                                        <input className="btn btn-dark" type="submit" value="Reset Password" />
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
                );
        }
}

export default ResetPassword;
