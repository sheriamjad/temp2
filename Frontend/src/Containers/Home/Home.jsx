import React from 'react';
import './Home.css';
import {PostCard, Navbar} from '../../Components/Index';

const Home = () => {
  const arr = ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'];

  return (
    <>
      <Navbar />
      {arr.map((item)=>{
        return <PostCard src={item}/>
      })}
    </>
  );
};

export default Home;
