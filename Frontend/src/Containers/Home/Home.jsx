import React, { useContext } from 'react';
import './Home.css';
import {PostCard, Navbar} from '../../Components/Index';
import { InscribleContext } from '../../Context/Context';
import { useNavigate } from 'react-router';

const Home = () => {

  const navigate = useNavigate();
  const { isSignedin } = useContext(InscribleContext);

  return (
    <>
      {isSignedin ? (
        <>
          <Navbar />
          <PostCard/>
        </>
      ):
        navigate('/')
      }
    </>
  );
};

export default Home;
