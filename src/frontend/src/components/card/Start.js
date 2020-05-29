import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import PetsIcon from '@material-ui/icons/Pets';
import CardCheckBox from './CardCheckBox'

const useStyles = makeStyles({
    root:{
      textAlign: 'center',
      marginTop: '3rem',
        padding: '3rem'
  }
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
        <div className={classes.root}>
        <img alt="" src="/static/frontend/images/wisdom.svg" style={{width:'60px'}}></img>
        <CardCheckBox/>
        </div>
  );
}
