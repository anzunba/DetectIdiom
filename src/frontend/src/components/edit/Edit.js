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
import { getTokens } from '../../actions/edit7';
import { useDispatch } from 'react-redux';
import { getIdiomTableAddress } from '../../actions/edit8';

const useStyles = makeStyles((theme) => ({
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '500px'
	}
}));

const get_idiom_address_arr = (idiom_token_arr, sentence_token_arr) => {
	var address_arr = [];
	idiom_token_arr.forEach(function(i) {
		address_arr.push(sentence_token_arr.indexOf(i.toLowerCase()));
	});
	for (let i = 0; i < address_arr.length - 1; i++) {
		if (address_arr[i] + 1 != address_arr[i + 1]) {
			var num = address_arr[i] + 1;
			var temp_arr = [];
			idiom_token_arr.forEach(function(i) {
				temp_arr.push(sentence_token_arr.indexOf(i.toLowerCase(), num));
			});
			if (temp_arr.indexOf(-1) == -1) {
				address_arr = [];
				address_arr = temp_arr;
			}
		}
	}
	var idiom_address_arr = [];
	address_arr.map((i) => {
		idiom_address_arr.push(sentenceId + '_' + i);
	});
	return idiom_address_arr;
};

const highlight_token = () => {
	hightlight_reset();
	document.getElementById(tokenId).classList.add('bg-yellow');
};

const clickable_elements = document.getElementsByClassName('clickable_token');
const hightlight_reset = () => {
	for (let i = 0; i < clickable_elements.length; i++) {
		document.getElementById(clickable_elements[i].id).classList.remove('bg-yellow');
	}
};
var token = 'Selected Word';
var tokenId = '';
var sentenceId = '';
var idiom_table_dic = {};
var idiom_map = {};
/*********************************************************************/
const App = () => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const sentence = useSelector((state) => state.edit.pre_sentence);
	const selected_meaning = useSelector((state) => state.edit4.selected_meaning);
	const idiomTable = useSelector((state) => state.edit6);
	const sentence_tokens_arr = useSelector((state) => state.edit7);
	const inputText = useSelector((state) => state.edit.words);

	var idiom_address = [];

	useEffect(
		() => {
			idiomTable
				? (idiom_address = get_idiom_address_arr(idiomTable.idiom.split(' '), sentence_tokens_arr))
				: console.log('idiomTable is empty.');
			if (idiom_address.length != 0) {
				setIRuby((state) => ({ ...state, [idiom_address[0]]: idiomTable.mean }));
				idiom_address.map((address) => {
					idiom_map[address] = idiom_address[0];
				});
				idiom_table_dic[idiom_address[0]] = {
					start_id: idiom_address[0],
					end_id: idiom_address[idiom_address.length - 1],
					idiom: idiomTable.idiom,
					mean: idiomTable.mean
				};
			}
			dispatch(getIdiomTableAddress(idiom_table_dic));
			console.log('idiom_address: ' + idiom_address);
			console.log('idiom_table_dic: ' + idiom_table_dic);
			console.log('updated idiomTable');
		},
		[ idiomTable ]
	);

	const [ wruby, setWRuby ] = useState({});
	const [ iruby, setIRuby ] = useState({});
	useEffect(
		() => {
			setWRuby((state) => ({ ...state, [tokenId]: selected_meaning }));
		},
		[ selected_meaning ]
	);

	const get_token = (e) => {
		tokenId = e.target.id;
		sentenceId = tokenId.split('_').slice(0, 3).join('_');
		token = e.target.innerHTML;
		dispatch(getMeaning(token));
		dispatch(getTId(tokenId));
		highlight_token();
		dispatch(getTokens(sentence[tokenId.split('_')[1]][tokenId.split('_')[2]]));
	};

	const ruby_html = (t_idx, t) => {
		return (
			<ruby key={t_idx + t} className={t.class}>
				<span key={t_idx + t + "span"} className="clickable_token" id={'t_' + t.id} onClick={(e) => get_token(e)}>
					{t.token}
				</span>
				<rt key={t_idx + t + "rt"}>{wruby['t_' + t.id]}</rt>
			</ruby>
		);
	};
	var result = { '': [] };
	const ruby_html_from_dic = (t_idx, t) => {
		if ([ idiom_map['t_' + t.id] ] == 't_' + t.id) {
			result[idiom_map['t_' + t.id]] = [];
		}
		result[idiom_map['t_' + t.id]].push(
			<ruby key={t_idx + t} className={t.class}>
				<span key={t_idx + t + "span"} className="clickable_token" id={'t_' + t.id} onClick={(e) => get_token(e)}>
					{t.token}
				</span>
				<rt key={t_idx + t + "rt"}>{wruby['t_' + t.id]}</rt>
			</ruby>
		);

		if ('t_' + t.id == idiom_table_dic[idiom_map['t_' + t.id]].end_id) {
			result[idiom_map['t_' + t.id]].push(<rt key={t_idx + t + t}>{iruby[idiom_map['t_' + t.id]]}</rt>);
		}
		
	};

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
												{Object.entries(s).map(
													([ t_idx, t ]) =>
														Object.keys(idiom_map).indexOf('t_' + t.id) != -1 ? (
															<ruby key={t_idx + t}>
																{ruby_html_from_dic(t_idx, t)}
																{idiom_table_dic[idiom_map['t_' + t.id]].end_id ==
																't_' + t.id ? (
																	result[idiom_map['t_' + t.id]]
																) : (
																	''
																)}
															</ruby>
														) : (
															ruby_html(t_idx, t)
														)
												)}
											</p>
										))}
									</div>
								))
							)}
						</div>
						{/* <LinearProgress /> */}
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

export default App;
