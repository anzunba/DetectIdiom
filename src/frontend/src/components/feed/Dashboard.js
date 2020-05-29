import React from 'react';
import Grid from '@material-ui/core/Grid';
import Tab from './Tab'
import Profile from '../profile/Profile'

export default function Dashboard() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={8}>
            <Tab />
        </Grid>
        <Grid item xs={4}>
            <Profile />
        </Grid>
      </Grid>
      </div>
  );
}