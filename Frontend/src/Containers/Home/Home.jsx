import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import {PostCard, Navbar, Loader} from '../../Components/Index';
import { InscribleContext } from '../../Context/Context';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Home = () => {

  const navigate = useNavigate();
  const { GetPostByUser, isLoading, singleUserPost, connectedAccount } = useContext(InscribleContext);

  const notify= (msg)=> toast.error(msg);

  useEffect(()=>{
    GetPostByUser(connectedAccount);
  },[]);

  return (
    <div>
      {JSON.parse(localStorage.getItem('isSignedIn')) ? (
        console.log("In home"),
        <>
          <Navbar />

          {isLoading ? 
            <Loader/> 
            :
            (singleUserPost.length > 0 ? 
              singleUserPost.map((item)=>{
              return <PostCard 
                username={item.createrName} 
                address={item.userAddress} 
                file={item.imageHash} 
                caption={item.caption}
                imageText={item.imageText}
                likeCount={item.likeCount._hex}
                key={item.id}/>;
              })
              :
              notify("No Posts Yet !")            
            )
          }
        </>
      ):
        navigate('/')
      }
    </div>
  );
};

export default Home;
