import React from 'react';
import './App.css';
import { Profile, Home, SignUp, Create, SignIn } from './Containers/Index';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn/>}></Route>
        <Route path='/inscrible' element={<Home/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
      </Routes>
    </>
  );
};

export default App;
