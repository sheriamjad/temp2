import React from 'react';
import './Profile.css';
import { Navbar, ProfileHeader } from '../../Components/Index';

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="profile">
        <ProfileHeader />        
      </div>
    </>
  );
};

export default Profile;