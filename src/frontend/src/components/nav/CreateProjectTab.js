import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CreateProjectTabPage1 from './CreateProjectTabPage1';
import CreateProjectTabPage2 from './CreateProjectTabPage2';
import Button from '@material-ui/core/Button';
import { getText } from '../../actions/edit';
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <React.Fragment>{children}</React.Fragment>}
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
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 500
	}
}));

export default function FullWidthTabs() {
	const classes = useStyles();
	const theme = useTheme();
	const [ value, setValue ] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	const [fileContent, setFileContent] = useState('')
	const callback = (fileContent) => {
		setFileContent(fileContent)
		console.log(fileContent)
	}
	const dispatch = useDispatch()
	const handleStart = () =>{
		dispatch(getText(fileContent))
	}

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					<Tab label="Upload File" {...a11yProps(0)} />
					<Tab label="Custom Input" {...a11yProps(1)} />
				</Tabs>
			</AppBar>

			<TabPanel value={value} index={0} dir={theme.direction}>
				<CreateProjectTabPage1 parentCallback={callback}/>
			</TabPanel>
			<TabPanel value={value} index={1} dir={theme.direction}>
				<CreateProjectTabPage2 />
			</TabPanel>
			<Button color="primary" size="large" fullWidth onClick={()=>handleStart()}>
				Start
			</Button>
		</div>
	);
}
