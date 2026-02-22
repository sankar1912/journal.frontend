"use client"

import { logOut } from '@/redux/actions/authActions';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Signout() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(logOut());
    },[])
  return (
    <div>
      You're logged out
    </div>
  );
}

export default Signout;
