import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MeaningTable from './MeaningTable';
import TextField from '@material-ui/core/TextField';
import Setting from './Setting';
import Save from './Save';
import LinearProgress from '@material-ui/core/LinearProgress';
const useStyles = makeStyles((theme) => ({
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '500px'
	}
}));

export default function CenteredGrid() {
	const classes = useStyles();

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
						<LinearProgress />
						<div className="editPaper" />
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
