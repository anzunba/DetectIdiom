import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2)
	}
}));

const n = (
	<List className="px-3">
		<ListItem>
			<ListItemAvatar>
				<Avatar>
					<FolderIcon />
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary="Single-line item" secondary="Secondary text" />
			<ListItemSecondaryAction>
				<IconButton edge="end" aria-label="delete">
					<DeleteIcon />
				</IconButton>
			</ListItemSecondaryAction>
		</ListItem>
	</List>
);

const noNotification = (
    <div className="p-3">You have notifications turned off!</div>
);

export default function SimplePopover() {
	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

    const [state, setState] = React.useState({
        checkedA: true,
      });
    
      const [notify, setNotify] = useState(true)
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        event.target.checked ? setNotify(true) : setNotify(false);
      };
	return (
		<div className="align-self-center">
			<IconButton onClick={handleClick}><Badge badgeContent={notify?4:0} color="error" aria-describedby={id}>
			<MailIcon style={{color:'#f8f9fa'}}/>
			</Badge></IconButton>

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
			>
				<div>
                    <div className="d-flex justify-content-between">
					<Typography variant="h6" className="p-3">
						Notifications
					</Typography>
					<FormControlLabel
						control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}  className="mt-3"
					/>
                    </div>
					<Divider />
					<div className="">
                        {notify === true? n : noNotification }
					</div>
				</div>
			</Popover>
		</div>
	);
}
