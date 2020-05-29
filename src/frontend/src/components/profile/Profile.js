import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ProfileEditModal from './ProfileEditModal'
import FollowModal from './FollowModal'
import CardModal from '../card/CardModal'
import WordTableModal from '../wordTable/WordTableModal'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    border: '1px solid #eee'
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: '.5rem auto'
  },
}));

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CardActionArea>
      <Avatar alt="" src="/static/frontend/images/unicorn.png" className={classes.large} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Anna Nakatsuji
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          <ProfileEditModal />
          <FollowModal />
          <CardModal />
          <WordTableModal />
      </CardActions>
    </div>
  );
}
