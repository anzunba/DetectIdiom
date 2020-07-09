import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GroupIcon from '@material-ui/icons/Group';
import Box from '@material-ui/core/Box';
import Article from './Article';
import PublicIcon from '@material-ui/icons/Public';
import Order from './Order';
import { getArticle, getAllArticle, getFollowArticle, getClassmateArticle } from '../../actions/article';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../actions/profile';

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

const ArticleTab = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllArticle());
	}, []);

	const [ value, setValue ] = React.useState(0);

	const handleChange = (e, newValue) => {
		if(newValue==0){
			dispatch(getAllArticle());
		}else if(newValue==1){
			dispatch(getFollowArticle())
			
		}else if(newValue==2){
			dispatch(getClassmateArticle())
		}
		else{
			dispatch(getArticle());
		}
		setValue(newValue);
	};

	return (
		<div> 
            {/* <span className="float-right"><Order/></span>           */}
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
					<Tab label="Following" icon={<FavoriteIcon />} {...a11yProps(1)} />
					<Tab label="ClassMates" icon={<GroupIcon />} {...a11yProps(2)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<Article />
			</TabPanel>
			<TabPanel value={value} index={1}>
            <Article />
			</TabPanel>
			<TabPanel value={value} index={2}>
            <Article />
			</TabPanel>
		</div>
	);
}
export default ArticleTab;
