import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MeaningTable from './MeaningTable';
import TextField from '@material-ui/core/TextField';
import Setting from './Setting';
import Save from './Save';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';
import { getPId } from '../../actions/edit2';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '500px'
	}
}));

const highlight_token = (token_id) => {
	document.getElementById(token_id).style.backgroundColor = 'yellow';
};

//RECEIVE DATA
const CenteredGrid = () => {
	const dispatch = useDispatch();
	const bgReset = () => {
		const tokens = document.getElementsByClassName('clickable_token');
		for (let i = 0; i < tokens.length; i++) {
			document.getElementById(tokens[i].id).style.backgroundColor = '';
			document.getElementById(tokens[i].id).parentElement.style.borderBottom = '';
		}
	};
	const [ token, setToken ] = useState('Selected Word');
	const getToken = () => {
		const tokens = document.getElementsByClassName('clickable_token');
		for (let i = 0; i < tokens.length; i++) {
			document.getElementById(tokens[i].id).style.backgroundColor = '';
			tokens[i].addEventListener(
				'click',
				(e) => {
					var tokenId = e.target.id;
					setToken(e.target.innerHTML);
					bgReset();
					document.getElementById(tokenId).style.backgroundColor = 'yellow';
					document.getElementById(tokenId).parentElement.style.borderBottom = '2px solid lightblue';
					dispatch(getPId(document.getElementById(tokenId).parentElement.id));
				},
				false
			);
		}
	};
	const classes = useStyles();
	const inputText = useSelector((state) => state.edit.input_html);

	useEffect(
		() => {
			getToken();
		},
		[ inputText ]
	);
	return (
		<div>
			<div className="float-left">
				<form noValidate autoComplete="off">
					<div className="selectedInputs">
						<TextField disabled id="standard-basic" label={token} />
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
						<div className="editPaper text-left" dangerouslySetInnerHTML={{ __html: inputText }} />
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
};

export default CenteredGrid;
