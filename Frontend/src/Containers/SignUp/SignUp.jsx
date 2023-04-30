import React, { useState } from 'react';
import './SignUp.css';

const SignUp = ({address}) => {

  const [username, setUsername] = useState({
    username : ""
  });

  const handleUsername = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setUsername({...username, [name] : value});
  };

  return (
    <div className='signup-container'>

        <div className="signup-container-header">
            <h1>Inscrible</h1>
        </div>

        <div className="signup-container-body">
            <label htmlFor="username" className='signup-lable'>Username :</label>
            <input type="text" placeholder='Enter Username' className='signup-input' id='username' onChange={handleUsername} value={username.username}/>

            <label htmlFor="address" className='signup-lable'>Address :</label>
            <input type="text" placeholder='Metamask Account Address' className='signup-input' id='address' disabled='true' value={address}/>  

            <button className='signup-button'>Create</button>
        </div>
    </div>
  );
};

export default SignUp;
