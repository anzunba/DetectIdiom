import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MeaningTable from './MeaningTable';
import EditPaper from './EditPaper';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Setting from './Setting';
import Save from './Save'
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '500px'
	}
}));

export default function CenteredGrid() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className="float-left">
				<form className={classes.root} noValidate autoComplete="off">
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
						<EditPaper />
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
