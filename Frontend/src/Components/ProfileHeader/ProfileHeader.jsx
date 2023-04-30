import React, { useState } from 'react';
import './ProfileHeader.css';
import { ProfilePosts, ProfileUserCard } from '../Index';

const ProfileHeader = () => {

    const [isPost, setIsPost] = useState(true);
    const [isFollower, setIsFollower] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const users = [{ name: "Anna Wintour", pic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', address: '0x00030503554385247875847200048nt2457vn' }, { name: "Alia Chaudhary", pic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', address: '0x00030503554385247875847200048nt2457vn' }, { name: "Nathan Freeman", pic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', address: '0x00030503554385247875847200048nt2457vn' }, { name: "Samuel Drake", pic: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', address: '0x00030503554385247875847200048nt2457vn' }]

    return (
        <>
            <div className='profile-header'>
                <div className="profile-header_image">
                    <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?
                        ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=
                        format&fit=crop&w=1170&q=80" alt="Pofile" />
                </div>
                <div className="profile-header_content">
                    <div className="profile-header_content-name-edit">
                        <p id='profile-name' className='bold-5 size-l'>Ana Wintour</p>
                        <button id='profile-edit-button' className='bold-5'>Edit</button>
                    </div>
                    <div className="profile-header_content-info">
                        <div>
                            <span className='bold-5'>12</span>
                            <span className={isPost ? "bold-7" : ""}
                                onClick={() => {
                                    setIsFollower(false);
                                    setIsFollowing(false);
                                    setIsPost(true);
                                }}
                            > Posts</span>
                        </div>
                        <div>
                            <span className='bold-5'>12</span>
                            <span className={isFollower ? "bold-7" : ""}
                                onClick={() => {
                                    setIsFollower(true);
                                    setIsFollowing(false);
                                    setIsPost(false);
                                }}
                            > Followers</span>
                        </div>
                        <div>
                            <span className='bold-5'>12</span>
                            <span className={isFollowing ? "bold-7" : ""}
                                onClick={() => {
                                    setIsFollower(false);
                                    setIsFollowing(true);
                                    setIsPost(false);
                                }}
                            > Following</span>
                        </div>
                    </div>
                </div>
            </div>

            {isPost && (
                <ProfilePosts />
            )}

            {isFollower && (
                <div className='profile-usercard-container'>
                    <div className='profile-usercard-header'>
                        <h3>Followers</h3>
                    </div>
                    <div className='profile-usercard-body'>
                        {users.map((item, i) => {
                            return <ProfileUserCard userName={item.name} profilePic={item.pic} address={item.address} key={i} />
                        })}
                    </div>
                </div>
            )}

            {isFollowing && (
                <div className='profile-usercard-container'>
                    <div className='profile-usercard-header'>
                        <h3>Following</h3>
                    </div>
                    <div className='profile-usercard-body'>
                        {users.map((item, i) => {
                            return <ProfileUserCard userName={item.name} profilePic={item.pic} address={item.address} key={i} />
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileHeader;