import React from 'react';
import Error from './Error';
import Message from './Message';

class ForgotPassword extends React.Component {
        constructor(props) {
                super(props);

                let port = "";
                if (window.location.port !== 80 && window.location.port !== 443) {
                        port = ":" + window.location.port;
                }

                this.state={
                        email :'',
                        domain: window.location.protocol + "//" + window.location.hostname + port,
                        showForm : true,
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
                        case "forgotPW":

                                formBody = [];
                                for (property in self.state) {
                                        encodedKey = encodeURIComponent(property);
                                        encodedValue = encodeURIComponent(self.state[property]);
                                        formBody.push(encodedKey + "=" + encodedValue);
                                }
                                formBody = formBody.join("&");

                                fetch(self.props.sparkEndpoint + "/user/forgotpassword", {
                                        method: 'post',
                                        headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                                        },
                                        body: formBody,
                                }).then(function(response) {
                                        return response.json();
                                }).then(function(data) {
                                        if (data.status === "ok") {
                                                self.handleMessage(data.message);
                                                self.setState({showForm: false});
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
                var style = {};
                if (!this.state.showForm) {
                        style.display = 'none'
                }
                return(
                <div className="container login-container">

                        { this.state.hasError ? <Error ErrorMessage={this.state.error} /> : null }

                        { this.state.hasMessage ? <Message Message={this.state.message} /> : null }

                        <div className="row justify-content-center" style={style}>
                                <div className="col-md-6 login-form-1">
                                <h3>Enter Your Email Below To Reset Your Password</h3>
                                <form onSubmit={this.handleSubmit('forgotPW')}>
                                                <div className="form-group">
                                                        <input placeholder='Email Address'
                                                                className="form-control"
                                                                type="email"
                                                                value={this.state.email}
                                                                onChange={e=>this.setState({email: e.target.value}) }/>
                                                </div>
                                                <div className="form-group">
                                                        <input className="btn btn-dark" type="submit" value="Send Reset Instructions" aria-describedby="forgotPasswordBlock" />
                                                </div>
                                        </form>
                                </div>
                        </div>
                </div>
                );
        }
}

export default ForgotPassword;
