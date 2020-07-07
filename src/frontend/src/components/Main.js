import React, { Fragment, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Profile from './profile/Profile'
import News from './feed/News'
import Snackbar from '@material-ui/core/Snackbar';
import Home from './feed/Feed';
import Edit from './edit/Edit';
import { useSelector } from 'react-redux';

const Main =() =>{
    const page = useSelector((state) => state.page);

  return (
    <Fragment>{page=='home'?<Home/>:page=='edit'?<Edit/>:page=="profile"?<Profile/>:''}</Fragment>
  );
}

export default Main;