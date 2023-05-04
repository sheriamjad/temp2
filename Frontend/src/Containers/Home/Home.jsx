import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import {PostCard, Navbar, Loader} from '../../Components/Index';
import { InscribleContext } from '../../Context/Context';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Home = () => {

  const navigate = useNavigate();
  const { GetPostByUser, isLoading, singleUserPost, connectedAccount, getSignInState } = useContext(InscribleContext);

  const notify= (msg)=> toast.error(msg);
  const [isSigned, setIsSigned] = useState(false);

  useEffect(()=>{
    GetPostByUser(connectedAccount);
    const state = getSignInState();
    setIsSigned(state);
  },[]);

  useEffect(() => {
    if (!singleUserPost.length) {
      notify("No Posts Yet !");
      return;
    }
  }, [singleUserPost.length]);

  return (
    <>
      {isSigned ? (
        console.log(isSigned),
        <>
          <Navbar />
          {isLoading ? 
            <Loader/> 
            :
            (singleUserPost.length > 0 ? 
              (singleUserPost.map((item)=>{
              return <PostCard 
                username={item.createrName} 
                address={item.userAddress} 
                file={item.imageHash} 
                caption={item.caption}
                imageText={item.imageText}
                likeCount={item.likeCount._hex}
                key={item.id}/>;
              }))
              :
              null           
            )
          }
        </>
      ):
        navigate('/')
      }
    </>
  );
};

export default Home;
