import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tab from './Tab'
import Profile from '../profile/Profile'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
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