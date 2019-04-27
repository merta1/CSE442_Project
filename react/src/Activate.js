import React from 'react';
import Error from './Error';
import Message from './Message';

function Activated(props) {
        return (
                <div className="alert alert-success" role="alert">
                Your account has been activated. <a href="#/register" onClick={()=>{ props.changeView("Register"); }} >Click here to log in.</a>
                </div>
        );
}

class Activate extends React.Component {
        constructor(props) {
                super(props);

                //get the activate token
                let url = document.URL;
                let urlparts = url.split('#');
                let anchorparts = urlparts[1].split("/");

                this.state={
                        token : anchorparts[2],
                }

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

        handleViewChange = (view) => {
                this.props.changeView(view);
        }

        componentDidMount() {

                let self = this;
                 
                fetch(this.props.sparkEndpoint + "/user/activate?token=" + this.state.token)
                  .then(function(response) {
                        return response.json();
                  }).then(function(data) {
                        if (data.status === "ok") {
                                self.setState({hasMessage: true});
                        } else {
                                self.handleMessage(data.message, "error");
                        }
                  }).catch(function(err) {
                        console.log("Fetch Error: ",err);
                });
        }

        render() {
                return(
                <div className="container login-container">

                        { this.state.hasError ? <Error ErrorMessage={this.state.message} /> : null }

                        { this.state.hasMessage ? <Activated changeView={this.handleViewChange} />
                        : null }

                </div>
                );
        }
}

export default Activate;
