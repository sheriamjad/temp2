import React, { useState } from 'react';
import './SignIn.css';

const SignIn = ({address}) => {

    const [username, setUsername] = useState("");

    const handleUsername = (e)=>{
        const value = e.target.value;
        setUsername(value);
    };

  return (
    <div className='signin-container'>
        <div className="signin-container-header">
            <h1>Inscrible</h1>
        </div>  

        <div className="signin-container-body">
            <label htmlFor="username" className='signin-lable'>Username :</label>
            <input type="text" placeholder='Enter Username' className='signin-input' id='username' onChange={handleUsername} value={username}/>

            <label htmlFor="address" className='signin-lable'>Address :</label>
            <input type="text" placeholder='Metamask Account Address' className='signin-input' id='address' value={address}/>  

            <button className='signin-button'>Login</button>
        </div>    
    </div>
  );
};

export default SignIn;
