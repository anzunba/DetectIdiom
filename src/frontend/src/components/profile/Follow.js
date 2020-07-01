import React, { useState } from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import ConfirmationDelete from './ConfirmationDelete';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 500
	}
}));

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<div>{children}</div>
				</Box>
			)}
		</div>
	);
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

const tabProps = (i) => {
	return {
		id: `full-width-tab-${i}`,
		'aria-controls': `full-width-tabpanel-${i}`
	};
};

const followerList = [
	'follower1',
	'follower2',
	'follower3',
	'follower4',
	'follower5',
	'follower6',
	'follower7',
	'follower8',
	'follower9'
];
const followingList = [
	'following1',
	'following2',
	'following3',
	'following4',
	'following5',
	'following6',
	'following7',
	'following8',
	'following9'
];
const followsList = [ followingList, followerList ];
const App = () => {
	const classes = useStyles();
	const [ followModalOpen, setFollowModalOpen ] = useState(false);

	const handleFollowModalOpen = () => {
		setFollowModalOpen(true);
	};

	const handleFollowModalClose = () => {
		setFollowModalOpen(false);
	};

	const theme = useTheme();
	const [ tabIndex, setTabIndex ] = useState(0);

	const handleCurrentTabChange = (e, newTabIndex) => {
		setTabIndex(newTabIndex);
	};

	return (
		<div>
			<Button type="button" size="small" color="primary" onClick={handleFollowModalOpen} className="w-100">
				Follow
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={followModalOpen}
				onClose={handleFollowModalClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={followModalOpen}>
					<div>
						<div className={classes.root}>
							<AppBar position="static" color="default">
								<Tabs
									value={tabIndex}
									onChange={handleCurrentTabChange}
									indicatorColor="primary"
									textColor="primary"
									variant="fullWidth"
									aria-label="full width tabs example"
								>
									<Tab label="Following" {...tabProps(0)} />
									<Tab label="Follower" {...tabProps(1)} />
								</Tabs>
							</AppBar>
							{followsList.map((list, i) => {
								return (
									<TabPanel value={tabIndex} key={i} index={i} dir={theme.direction} className="listScroll">
										{list.map((listItem, j) =>
											<List key={j}>
												<ListItem>
													<ListItemAvatar>
														<Avatar className="mr-5">
															<FolderIcon />
														</Avatar>
													</ListItemAvatar>
													<ListItemText primary={listItem} />
													<ListItemSecondaryAction>
														<ConfirmationDelete />
													</ListItemSecondaryAction>
												</ListItem>
											</List>
										)}
									</TabPanel>
								);
							})}
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};
export default App;
