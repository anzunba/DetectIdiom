import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root2: {
    width: '95%',
    margin: '0'
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  // const [value, setValue] = React.useState('Controlled');

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  const form = (<form className={classes.root2} noValidate autoComplete="off">
  <div>
    <TextField
      id="outlined-multiline-flexible"
      label="Write Comment"
      multiline
      rowsMax={4}
      // value={value}
      // onChange={handleChange}
      variant="outlined"
      fullWidth
    />
  </div>
</form>)

  return (
        <List className={classes.root}>
            <ListItem alignItems="flex-start">
                
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        form
                    }
                />
            </ListItem>
        </List>
    
    
  );
}
