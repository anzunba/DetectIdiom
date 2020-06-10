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

const get_idiom_address_arr = (idiom_token_arr, sentence_token_arr) => {
	var idiom_address_arr = [];
	idiom_token_arr.forEach(function(i) {
		idiom_address_arr.push(sentence_token_arr.indexOf(i.toLowerCase()));
	});
	for (let i = 0; i < idiom_address_arr.length - 1; i++) {
		if (idiom_address_arr[i] + 1 != idiom_address_arr[i + 1]) {
			var num = idiom_address_arr[i] + 1;
			var temp_arr = [];
			idiom_token_arr.forEach(function(i) {
				temp_arr.push(sentence_token_arr.indexOf(i.toLowerCase(), num));
			});
			if (temp_arr.indexOf(-1) == -1) {
				idiom_address_arr = [];
				idiom_address_arr = temp_arr;
			}
		}
	}
	return idiom_address_arr;
};
var token = 'Selected Word';
var tokenId = '';
const ruby = {};
//RECEIVE DATA
const CenteredGrid = () => {
	const dispatch = useDispatch();

	// const getToken = () => {
	// 	const tokens = document.getElementsByClassName('clickable_token');
	// 	for (let i = 0; i < tokens.length; i++) {
	// 		document.getElementById(tokens[i].id).style.backgroundColor = '';
	// 		tokens[i].addEventListener(
	// 			'click',
	// 			(e) => {
	// 				setTokenId(e.target.id);
	// 				setToken(e.target.innerHTML);
	// 				bgReset();
	// 				//highlight_token(e.target.id)
	// 				if(document.getElementById(e.target.id).parentElement.tagName == 'RUBY'){
	// 					document.getElementById(e.target.id).parentElement.parentElement.style.borderBottom = '2px solid lightblue';
	// 				}else{
	// 					document.getElementById(e.target.id).parentElement.style.borderBottom = '2px solid lightblue';
	// 				}

	// 				dispatch(getMeaning(e.target.innerHTML));
	// 				dispatch(getTId(document.getElementById(e.target.id).id));
	// 			},
	// 			false
	// 		);
	// 	}
	// };
	const classes = useStyles();

	// if(idiomTable.length != 0){
	// 	var idiom_address_arr = get_idiom_address_arr(idiomTable[0].split(' '), sentence[tokenId.split('_')[1]][tokenId.split('_')[2]].split(' '))
	// 	console.log(idiom_address_arr)
	// }

	// console.log(idiom_address_arr)
	// const get_selected = () =>{
	// 	if(tokenId){
	// 		if(document.getElementById(tokenId).parentElement.tagName == 'RUBY'){
	// 			document.getElementById(tokenId).parentElement.children[1].innerHTML = selected_meaning
	// 		}else{
	// 			document.getElementById(tokenId).outerHTML = `<ruby>${document.getElementById(tokenId).outerHTML}<rt>${selected_meaning}</rt></ruby>`
	// 		}
	// 	}
	// 	getToken()
	// }
	// useEffect(
	// 	() => {
	// 		get_selected();

	// 	},
	// 	[ selected_meaning ]
	// );
	// useEffect(
	// 	() => {
	// 		getToken();

	// 	},
	// 	[ inputText ]
	// );
	const sentence = useSelector((state) => state.edit.pre_sentence);
	const selected_meaning = useSelector((state) => state.edit4.selected_meaning);
	const idiomTable = useSelector((state) => state.edit6);
	ruby[tokenId + '_r'] = selected_meaning;
	console.log(ruby['t_0_0_0_r']);
	const clickable_elements = document.getElementsByClassName('clickable_token');
	const get_token = (e) => {
		tokenId = e.target.id;
		token = e.target.innerHTML;
		dispatch(getMeaning(token));
		dispatch(getTId(tokenId));
		highlight_token();
	};

	const highlight_token = () => {
		hightlight_reset();
		document.getElementById(tokenId).classList.add('bg-yellow');
	};

	const hightlight_reset = () => {
		for (let i = 0; i < clickable_elements.length; i++) {
			document.getElementById(clickable_elements[i].id).classList.remove('bg-yellow');
			document.getElementById(clickable_elements[i].id).parentElement.parentElement.style.borderBottom = '';
		}
	};

	const inputText = useSelector((state) => state.edit.words);
	console.log(inputText);
	const html_item = [];


	// for (var i in inputText) {
	// 	for (var j in inputText[i]) {
	// 		for (var k in inputText[i][j]) {
	// 			for (var l in inputText[i][j][k]) {
	// 				console.log(inputText[i][j][k][l].token);
	// 			}
	// 		}
	// 	}
	// }
	// const html_item = [];
	// if (inputText != '') {
	// 	var html_item_paragraphs = [];
	// 	for (let i = 0; i < inputText.length; i++) {
	// 		var html_item_sentences = [];
	// 		for (let j = 0; j < inputText[i].length; j++) {
	// 			var html_item_tokens = [];
	// 			for (let k = 0; k < inputText[i][j].length; k++) {
	// 				var t = inputText[i][j][k][0];
	// 				var cname = inputText[i][j][k][2];
	// 				ruby[`t_${i}_${j}_${k}_r`] = ''; //is this can be a proble? initialize?
	// 				html_item_tokens.push(
	// 					<ruby key={`${i}${j}${k}`} className={cname}>
	// 						<span id={`t_${i}_${j}_${k}`} className="clickable_token" onClick={(e) => get_token(e)}>
	// 							{t}
	// 						</span>
	// 						<rt>{ruby[`t_${i}_${j}_${k}_r`]}</rt>
	// 					</ruby>
	// 				);
	// 			}
	// 			html_item_sentences.push(
	// 				<p key={`${i}${j}`} id={`s_${i}_${j}`} className="mb-0">
	// 					{html_item_tokens}
	// 				</p>
	// 			);
	// 		}
	// 		html_item_paragraphs.push(
	// 			<div key={i} id={`p_${i}`} className="">
	// 				{html_item_sentences}
	// 			</div>
	// 		);
	// 	}
	// 	html_item.push(html_item_paragraphs);
	// }
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
						<div className="editPaper text-left">
							{Object.entries(inputText).map(([ idx, input ]) =>
								Object.entries(input).map(([ p_idx, p ]) => (
									<div key={p_idx}>
										{Object.entries(p).map(([ s_idx, s ]) => (
											<p key={s_idx}>
												{Object.entries(s).map(([ t_idx, t ]) => (
													<ruby key={t_idx} className={t.class}>
														<span className="clickable_token" id={'t_' + t.id} onClick={(e) => get_token(e)}>{t.token}</span>
														<rt>{ruby[t.id + '_r']}</rt>
													</ruby>
												))}
											</p>
										))}
									</div>
								))
							)}
						</div>
						{/* <LinearProgress /> */}
						{/* <div className="editPaper text-left" dangerouslySetInnerHTML={{ __html: inputText }} /> */}
						{/* <div className="editPaper text-left">{inputText}</div>  */}
						{/* <div className="editPaper text-left">
							{inputText.map((i) => {
								<div key={i} id={`p_${i}`} className="">
									{i.map((j) =>
									{
										<p key={`${i}${j}`} id={`s_${i}_${j}`} className="mb-0">
											{j.map((k) =>
											{
												<ruby key={`${i}${j}${k}`} className={cname}>
													<span
														id={`t_${i}_${j}_${k}`}
														className="clickable_token"
														onClick={(e) => get_token(e)}
													>
														{k[0]}
													</span>
													<rt>{ruby[`t_${i}_${j}_${k}_r`]}</rt>
												</ruby>
											})}
										</p>
									})}
								</div>;
							})}
						</div> */}

						{/* I think you need a map statement here to map over the inputText var instead of using the html_item html_item needs to be deleted and you need to do everything in jsx ok*/}
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
