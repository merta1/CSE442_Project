import React from 'react';
export default class Form extends React.Component 
{
state=
{
firstname :'',
lastname :'',
username :'',
email :'',
password : '',
}
render() 
{
    <form>
        
 <input placeholder='First Name' 
        value={this.state.firstname} 
        onChange={e=>this.setState({firstname: e.target.value}) }/>

<input placeholder='Last Name' 
        value={this.state.lastname} 
        onChange={e=>this.setState({lastname: e.target.value}) }/>

<input placeholder='Username' 
        value={this.state.username} 
        onChange={e=>this.setState({firstname: e.target.value}) }/>


<input placeholder='Email' 
        value={this.state.email} 
        onChange={e=>this.setState({email: e.target.value}) }/>

<input placeholder='Password' 
        value={this.state.password} 
        onChange={e=>this.setState({password: e.target.value}) }/>



    </form>






}
}