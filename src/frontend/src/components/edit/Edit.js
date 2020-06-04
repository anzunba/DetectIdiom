import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MeaningTable from './MeaningTable';
import TextField from '@material-ui/core/TextField';
import Setting from './Setting';
import Save from './Save';
import LinearProgress from '@material-ui/core/LinearProgress';

import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '500px'
	}
}));



//RECEIVE DATA
const CenteredGrid = () => {
	const classes = useStyles();
	const inputText = useSelector(state => state.edit.input_html)
	console.log("inputText: " + inputText)

	return (
		<div>
			<div className="float-left">
				<form noValidate autoComplete="off">
					<div className="selectedInputs">
						<TextField disabled id="standard-basic" label="Selected Word" />
						<TextField disabled id="standard-basic" label="Selected Idiom" />
					</div>
				</form>
			</div>
			<div className="float-right">
				<div className="d-inline-block">
					<Save />
				</div>
			</div>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={8}>
					<Paper className={classes.paper}>
						{/* <LinearProgress /> */}
						<div className="editPaper text-left" dangerouslySetInnerHTML={{__html: inputText}} />
					</Paper>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Paper className={classes.paper}>
						<MeaningTable />
						<div className="float-right">
							<Setting />
						</div>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default CenteredGrid