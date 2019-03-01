import React from 'react';
export default class Form extends React.Component {
state=
{
firstname :'',
lastname :'',
username :'',
email :'',
password : '',
};
onPress = e => 
{
   e.preventDefault();
   console.log(this.state);
   this.setState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: ""
});
};


render() 
{
    return (
        
    <form>
        <h1>Register for our awesome debate app!</h1>
 <input name='First Name' 
        placeholder = 'First Name'
        value={this.state.firstname} 
        onChange={e=>this.setState({firstname: e.target.value}) }/>
        < br />

<input 
        name='Last Name' 
        placeholder = 'Last name'
        value={this.state.lastname} 
        onChange={e=>this.setState({lastname: e.target.value}) }/>
        < br />

<input  
       name='Username' 
       placeholder = 'Username'
        value={this.state.username} 
        onChange={e=>this.setState({username: e.target.value}) }/>
        < br />


<input 
        name='Email' 
        placeholder = 'Email'
        value={this.state.email} 
        onChange={e=>this.setState({email: e.target.value}) }/>
        < br />

<input 
        name='Password' 
        placeholder= 'Password'
        type='Password'
        value={this.state.password} 
        onChange={e=>this.setState({password: e.target.value}) }/>
        < br />

        <button onClick={e => this.onPress(e)}>Submit</button>


    </form>


    )
}
}