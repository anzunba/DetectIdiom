import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Scream from '../feed/Scream';
import PublicIcon from '@material-ui/icons/Public';
import Order from '../feed/Order';
import CardTryLog from './CardTryLog'
import TodayIcon from '@material-ui/icons/Today';
import BookIcon from '@material-ui/icons/Book';


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
				<Box p={3}>
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

export default function ScrollableTabsButtonForce() {
	const [ value, setValue ] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div> 
        
            <span className="float-right"><Order/></span>          
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
					<Tab label="Card Log" icon={<BookIcon />} {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0} component="div">
            <Scream />
			</TabPanel>
			<TabPanel value={value} index={1} component="div">
            <CardTryLog />
			</TabPanel>
		</div>
	);
}
