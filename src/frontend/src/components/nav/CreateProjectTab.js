import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { getText } from '../../actions/edit';
import { getInputText } from '../../actions/edit2';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
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

const App = ({handleCloseCallback}) =>{
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

	const [ fileNames, setFileNames ] = useState([]);
	// const handleDrop = (acceptedFiles) => setFileNames(acceptedFiles[0].name);
  
	const showFile = (e) => {
		e.preventDefault();
    const reader = new FileReader();
		reader.onload = (e) => { 
			const text = e.target.result;
      setFileContent(text);
      //dispatch(getText(text))
		};
    reader.readAsText(e.target.files[0]);
    setFileNames(e.target.files[0].name)
  };
  const dispatch = useDispatch()
	const handleStart = () =>{
		dispatch(getText(fileContent))
		dispatch(getInputText(fileContent))
		handleCloseCallback(true)
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

			<TabPanel value={value} index={0} dir={theme.direction} className="p-5">
				
				<Dropzone >
				{({ getRootProps, getInputProps }) => (
					<div {...getRootProps({ className: 'dropzone d-flex justify-content-center' })}>
						<input {...getInputProps()} type="file" onChange={(e) => showFile(e)} />
						<div className="align-self-center text-center">
							<CloudUploadIcon fontSize="large" />
							<p>Drag & Drop OR Choose File</p>
							<h4>{fileNames}</h4>
							<p>{fileContent}</p>
						</div>
					</div>
				)}
			</Dropzone>
			</TabPanel>
			<TabPanel value={value} index={1} dir={theme.direction} className="p-5">
			<form noValidate autoComplete="off">
				<div>
					<TextField
						id="outlined-multiline-static"
						label="Input your text"
						multiline
						rows={15}
                        variant="outlined"
						fullWidth
						onChange={(e)=>setFileContent(e.target.value)}
					/>
				</div>
			</form>
			</TabPanel>
			<Button className="bg-light" color="primary" size="large" fullWidth onClick={()=>handleStart()}>
				Start
			</Button>
		</div>
	);
}

export default App;