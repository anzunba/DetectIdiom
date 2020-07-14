import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { getNotification, deleteNotification } from '../../actions/Notification';
import { postNotify, getProfile } from '../../actions/getRequestUserProfile';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2)
	}
}));

const noNotification = <div className="p-3">You have notifications turned off!</div>;
const Notification = () => {
	const dispatch = useDispatch();
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

	const handleNotification = () =>{
		dispatch(postNotify(profileId))
		dispatch(getProfile())
	}
	const [requestUserNotify, setRequestUserNotify] = useState(false)
	const [profileId, setProfileId] = useState()
	const requestUserProfileData = useSelector((state) => state.getRequestUserProfile);
	useEffect(() => {
		dispatch(getNotification());
		dispatch(getProfile())
	}, []);
	useEffect(() => {
		setRequestUserNotify(requestUserProfileData.notify)
		setProfileId(requestUserProfileData.id)
	}, [requestUserProfileData])
	const notifications = useSelector((state) => state.notification);

	return (
		<div className="align-self-center">
			<IconButton onClick={handleClick}>
				<Badge badgeContent={requestUserNotify ? notifications.length : 0} color="error" aria-describedby={id}>
					<MailIcon style={{ color: '#f8f9fa' }} />
				</Badge>
			</IconButton>

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
							control={<Switch checked={requestUserNotify? true:false} onClick={()=>handleNotification()}  />}
							className="mt-3"
						/>
					</div>
					<Divider />
					<div className="">
						{requestUserNotify ? (
							<List className="px-3">
							{notifications.map((notification, i)=>{
								return(<ListItem key={i}>
									<ListItemAvatar>
										<Avatar alt="" src={notification.originProfile.profile_img} className={classes.large} />
									</ListItemAvatar>
									<ListItemText primary={`${notification.originUser.username}  ${notification.is_like?'liked!':notification.is_comment?'commentd!':notification.is_comment_like?'like your comment!': notification.is_reply ? 'replied!': notification.is_following? 'followed you!': ''}`} secondary={notification.article?notification.article.title:''}  />
									<ListItemSecondaryAction>
										<IconButton edge="end" aria-label="delete" onClick={()=>dispatch(deleteNotification(notification.id))}>
											<DeleteIcon />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>)
							})}
							</List>
						) : (
							noNotification
						)}
					</div>
				</div>
			</Popover>
		</div>
	);
};
export default Notification;
