import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MeaningTable from './MeaningTable';
import TextField from '@material-ui/core/TextField';
import Save from './Save';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';
import { getTId } from '../../actions/edit2';
import { getMeaning } from '../../actions/edit3';

import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '500px'
	}
}));

const highlight_token = (token_id) => {
	document.getElementById(token_id).classList.add("bg-yellow");
};


//RECEIVE DATA
const CenteredGrid = () => {
	const dispatch = useDispatch();
	const bgReset = () => {
		const tokens = document.getElementsByClassName('clickable_token');
		for (let i = 0; i < tokens.length; i++) {
			document.getElementById(tokens[i].id).classList.remove("bg-yellow");
			document.getElementById(tokens[i].id).parentElement.style.borderBottom = '';
		}
	};
	const [ token, setToken ] = useState('Selected Word');
	const [ tokenId, setTokenId ] = useState('')

	const getToken = () => {
		const tokens = document.getElementsByClassName('clickable_token');
		for (let i = 0; i < tokens.length; i++) {
			document.getElementById(tokens[i].id).style.backgroundColor = '';
			tokens[i].addEventListener(
				'click',
				(e) => {
					setTokenId(e.target.id);
					setToken(e.target.innerHTML);
					bgReset();
					highlight_token(e.target.id)
					if(document.getElementById(e.target.id).parentElement.tagName == 'RUBY'){
						document.getElementById(e.target.id).parentElement.parentElement.style.borderBottom = '2px solid lightblue';
					}else{
						document.getElementById(e.target.id).parentElement.style.borderBottom = '2px solid lightblue';
					}
					
					dispatch(getMeaning(e.target.innerHTML));
					dispatch(getTId(document.getElementById(e.target.id).id));
				},
				false
			);
		}
	};
	const classes = useStyles();
	const inputText = useSelector((state) => state.edit.input_html);
	const selected_meaning = useSelector((state) => state.edit4.selected_meaning);
	const idiomTable = useSelector((state) => state.edit6);

	const get_selected = () =>{
		if(tokenId){
			if(document.getElementById(tokenId).parentElement.tagName == 'RUBY'){
				document.getElementById(tokenId).parentElement.children[1].innerHTML = selected_meaning
			}else{
				document.getElementById(tokenId).outerHTML = `<ruby>${document.getElementById(tokenId).outerHTML}<rt>${selected_meaning}</rt></ruby>`
			}
		}
		getToken()
	}
	useEffect(
		() => {
			get_selected();
			
		},
		[ selected_meaning ]
	);
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
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default CenteredGrid;
