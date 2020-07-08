import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ProfileEdit from './ProfileEdit';
import Follow from './Follow';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import Scream from '../feed/Article';
import PublicIcon from '@material-ui/icons/Public';
import { postFollow, getFollow, deleteFollow } from '../../actions/Follow';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		border: '1px solid #eee'
	},
	large: {
		width: theme.spacing(20),
		height: theme.spacing(20),
		margin: '.5rem auto',
		border: '1px solid #eee'
	}
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-force-tabpanel-${index}`}
			aria-labelledby={`scrollable-force-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					<div>{children}</div>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `scrollable-force-tab-${index}`,
		'aria-controls': `scrollable-force-tabpanel-${index}`
	};
}

const Profile = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [ profileBio, setProfileBio ] = useState('');
	const [ croppedImg, setCroppedImg ] = useState('/static/frontend/images/user.png');
	const requestUserProfileData = useSelector((state) => state.getRequestUserProfile);
	const customUserProfileData = useSelector((state) => state.profile);
	const followData = useSelector((state) => state.follow);
	const [ profileData, setProfileData ] = useState();
	console.log(followData);
	useEffect(
		() => {
			setProfileData(requestUserProfileData);
			console.log('debug');
		},
		[ requestUserProfileData ]
	);

	useEffect(
		() => {
			if (customUserProfileData.user && customUserProfileData.user.id) {
				console.log("aa: " + customUserProfileData.user.id)
				dispatch(getFollow(customUserProfileData.user.id));
			}
			setProfileData(customUserProfileData);
		},
		[ customUserProfileData ]
	);
	useEffect(
		() => {
			if (profileData) {
				setProfileBio(profileData.bio);
				setCroppedImg(profileData.profile_img);
			}
		},
		[ profileData ]
	);

	const [ value, setValue ] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const follow = (followed) => {
		const formData = new FormData();
		formData.append('followed_user', followed);
		dispatch(postFollow(formData));
	};

	const unfollow = (followed) => {
		dispatch(deleteFollow(followed));
	};
	return (
		<Grid container spacing={3}>
			<Grid item xs={8}>
				<AppBar position="static" color="default">
					<Tabs
						value={value}
						onChange={handleChange}
						variant="scrollable"
						scrollButtons="on"
						indicatorColor="primary"
						textColor="primary"
						aria-label="scrollable force tabs example"
					>
						<Tab label="All" icon={<PublicIcon />} {...a11yProps(0)} />
						{/* <Tab label="Card Log" icon={<BookIcon />} {...a11yProps(1)} /> */}
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0} component="div">
					<Scream />
				</TabPanel>
			</Grid>
			<Grid item xs={4}>
				<div className="rounded shadow p-3 mb-5 mt-4">
					<div>
						<Avatar alt="" src={croppedImg} className={classes.large} />

						<CardContent>
							<div className="d-flex justify-content-between">
								<Typography gutterBottom variant="h5" component="h2">
									{profileData ? profileData.username : ''}
								</Typography>
							</div>
							<Typography variant="body2" color="textSecondary" component="p">
								{profileBio}
							</Typography>
						</CardContent>
					</div>
					<CardActions>
						<div className="w-50">
							{profileData && requestUserProfileData.id == profileData.id ? (
								<ProfileEdit profileImg={croppedImg} />
							) : (
								''
							)}
						</div>
						<div className="w-50">
							{profileData &&
							customUserProfileData.id == profileData.id &&
							requestUserProfileData.id != profileData.id ? followData ? (
								<Button
									type="button"
									size="small"
									color="primary"
									onClick={() => unfollow(customUserProfileData.user.id)}
									className="w-100"
								>
									UnFollow
								</Button>
							) : (
								<Button
									type="button"
									size="small"
									color="primary"
									onClick={() => follow(customUserProfileData.user.id)}
									className="w-100"
								>
									Follow
								</Button>
							) : (
								''
							)}
							{/* <Follow /> */}
						</div>
					</CardActions>
				</div>
			</Grid>
		</Grid>
	);
};
export default Profile;
