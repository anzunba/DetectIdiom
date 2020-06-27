import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tab from './Tab'
import Profile from '../users/profile/Profile'
import News from './news/News'
import Snackbar from '@material-ui/core/Snackbar';

const App =() =>{
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={8}>
            <Tab />
        </Grid>
        <Grid item xs={4}>
            <News />
        </Grid>
      </Grid>
      </div>
  );
}

export default App;