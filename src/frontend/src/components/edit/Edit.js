import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Save from './Save';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';
import { getMeaning } from '../../actions/edit3';
import { getTokens } from '../../actions/edit7';
import { useDispatch } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '500px'
	}
}));

const getSelectedIdiomAddressList = (tokensOfIdiomList, tokensOfSentenceList) => {
	let idiomIndexList = [];
	tokensOfIdiomList.forEach(function(tokenOfIdiom) {
		idiomIndexList.push(tokensOfSentenceList.indexOf(tokenOfIdiom.toLowerCase()));
	});
	for (let i = 0; i < idiomIndexList.length - 1; i++) {
		if (idiomIndexList[i] + 1 != idiomIndexList[i + 1]) {
			let num = idiomIndexList[i] + 1;
			let temp_arr = [];
			tokensOfIdiomList.forEach(function(i) {
				temp_arr.push(tokensOfSentenceList.indexOf(i.toLowerCase(), num));
			});
			if (temp_arr.indexOf(-1) == -1) {
				idiomIndexList = [];
				idiomIndexList = temp_arr;
			}
		}
	}
	let idiomAddressList = [];
	idiomIndexList.map((i) => {
		idiomAddressList.push(sentenceId + '_' + i);
	});
	return idiomAddressList;
};

const getId = (tokenFullId) => {
	let pId = tokenFullId.split('_')[1];
	let sId = tokenFullId.split('_')[2];
	let tId = tokenFullId.split('_')[3];
	return [ pId, sId, tId ];
};

// const clickableElements = document.getElementsByClassName('clickable_token');
// const resetHighlight = () => {
// 	for (let i = 0; i < clickableElements.length; i++) {
// 		document.getElementById(clickableElements[i].id).classList.remove('bg-yellow');
// 	}
// };
// const highlightToken = (tokenFullId) => {
// 	resetHighlight();
// 	document.getElementById(tokenFullId).classList.add('bg-yellow');
// };

let token = 'Selected Word';
let sentenceId = '';
let idiomDetail = {};
let idiomAddressConvertor = {};
let wordTable = {};
let selectedIdiom = {};
let selectedTranslatedSentence = 'Not Available';
let idiomsInSentence = [];
let tokenFullId = '';
/*********************************************************************/
let iruby = {};
const App = () => {
	const classes = useStyles();
	const originSentencesList = useSelector((state) => state.edit.pre_sentence);
	const sentenceTokensList = useSelector((state) => state.edit7);
	const inputText = useSelector((state) => state.edit.words);
	let idiomFullAddress = [];
	const [ tokenRuby, setTokenRuby ] = useState({});
	const idiomsTableRow = [];
	const wordsTableRow = [];
	const dispatch = useDispatch();
	const allTranslatedSentences = useSelector((state) => state.edit.aft_sentence);
	const allIdioms = useSelector((state) => state.edit.idioms);
	const [ meaningRowBg, setMeaningRowBg ] = useState({});
	const [ tokenBg, setTokenBg ] = useState({});

	const pId = getId(tokenFullId)[0];
	const sId = getId(tokenFullId)[1];
	const handleToken = (e) => {
		setTokenBg({})
		tokenFullId = e.target.id;
		sentenceId = tokenFullId.split('_').slice(0, 3).join('_');
		token = e.target.innerHTML;
		dispatch(getMeaning(token));
		dispatch(getTokens(originSentencesList[tokenFullId.split('_')[1]][tokenFullId.split('_')[2]]));
		setTokenBg((state) => ({ ...state, [tokenFullId]: 'bg-yellow' }));
	};

	const createEmptyTokenRubyHtml = (t_idx, t) => {
		return (
			<ruby key={t_idx + t} className={t.class}>
				<span
					key={t_idx + t + 'span'}
					className={`clickable_token ${tokenBg['t_' + t.id]}`}
					id={'t_' + t.id}
					onClick={(e) => handleToken(e)}
				>
					{t.token}
				</span>
				<rt key={t_idx + t + 'rt'}>{tokenRuby['t_' + t.id]}</rt>
			</ruby>
		);
	};
	let tokenRubyResultHtml = { '': [] };
	const createTokenRubyWithMeaning = (t_idx, t) => {
		if ([ idiomAddressConvertor['t_' + t.id] ] == 't_' + t.id) {
			tokenRubyResultHtml[idiomAddressConvertor['t_' + t.id]] = [];
		}
		tokenRubyResultHtml[idiomAddressConvertor['t_' + t.id]].push(
			<ruby key={t_idx + t} className={t.class}>
				<span
					key={t_idx + t + 'span'}
					className="clickable_token"
					id={'t_' + t.id}
					onClick={(e) => handleToken(e)}
				>
					{t.token}
				</span>
				<rt key={t_idx + t + 'rt'}>{tokenRuby['t_' + t.id]}</rt>
			</ruby>
		);

		if ('t_' + t.id == idiomDetail[idiomAddressConvertor['t_' + t.id]].end_id) {
			tokenRubyResultHtml[idiomAddressConvertor['t_' + t.id]].push(
				<rt key={t_idx + t + t}>{iruby[idiomAddressConvertor['t_' + t.id]]}</rt>
			);
		}
	};

	//Translated Sentence
	if (allTranslatedSentences.length > 0 && pId && sId) {
		selectedTranslatedSentence = allTranslatedSentences[pId][sId];
	}
	const notAvailable = (
		<tr>
			<td>Not Available</td>
		</tr>
	);

	//Words
	let selectedMeaning = '';
	const handleMeaning = (e, i) => {
		let hash = {}
		selectedMeaning = e.target.innerHTML;
		setMeaningRowBg((state) => ({ ...state, [tokenFullId]: {} }));
		if (meaningRowBg[tokenFullId] && meaningRowBg[tokenFullId][i] == 'bg-pink') {
			hash[i] = ''
			setTokenRuby((state) => ({ ...state, [tokenFullId]: '' }));
		} else {
			hash[i] = 'bg-pink'
			setTokenRuby((state) => ({ ...state, [tokenFullId]: selectedMeaning }));
		}
		setMeaningRowBg((state) => ({...state, [tokenFullId]: hash}));
	};

	const meaningsString = useSelector((state) => state.edit3.mean);
	const createWordMeaningTable = (meaningsString) => {
		let meaningsList = meaningsString.split('/');
		meaningsList.map((m, i) => {
			wordsTableRow.push(
				<tr key={i}>
					<td
						id={`${tokenFullId}_${i}`}
						className={
							meaningRowBg[tokenFullId] !== undefined ? (
								`clickable_mean ${meaningRowBg[tokenFullId][i]}`
							) : (
								`clickable_mean`
							)
						}
						onClick={(e) => handleMeaning(e, i)}
					>
						{m}
					</td>
				</tr>
			);
		});
	};
	meaningsString ? createWordMeaningTable(meaningsString) : '';

	//Idioms
	const getIdiomDetail = (selectedIdiom) => {
		const idiomFullAddress = getSelectedIdiomAddressList(selectedIdiom.idiom.split(' '), sentenceTokensList);
		if (idiomFullAddress.length != 0) {
			iruby[idiomFullAddress[0]] = selectedIdiom.mean;
			idiomFullAddress.map((address) => {
				idiomAddressConvertor[address] = idiomFullAddress[0];
			});
			idiomDetail[idiomFullAddress[0]] = {
				start_id: idiomFullAddress[0],
				end_id: idiomFullAddress[idiomFullAddress.length - 1],
				idiom: selectedIdiom.idiom,
				mean: selectedIdiom.mean
			};
		}
	};
	const handleIdiom = (e, idiomId) => {
		let idiom = e.target.parentElement.children[0].innerHTML;
		let meaning = e.target.parentElement.children[1].innerHTML;
		if (meaningRowBg[idiomId] == 'bg-pink') {
			getIdiomDetail({ idiom: idiom, mean: '' });
			setMeaningRowBg((state) => ({ ...state, [idiomId]: '' }));
		} else {
			setMeaningRowBg((state) => ({ ...state, [idiomId]: 'bg-pink' }));
			getIdiomDetail({ idiom: idiom, mean: meaning });
		}
		console.log('debug')
	};

	let i = 0;
	const createIdiomMeaningTable = () => {
		idiomsInSentence = allIdioms[pId][sId];
		for (const [ key, value ] of Object.entries(idiomsInSentence)) {
			let meaningsForOneToken = value.split('、');
			let idiomId = `${pId}_${sId}_${i}`
			if (meaningsForOneToken.length > 1) {
				meaningsForOneToken.map((m) => {
					idiomsTableRow.push(
						<tr key={i} id={idiomId} className={meaningRowBg[idiomId]} onClick={(e) => handleIdiom(e, idiomId)}>
							<td>{key}</td>
							<td className="text-left">{m}</td>
						</tr>
					); 
					i += 1;
				});
			} else {
				idiomsTableRow.push(
					<tr key={key} id={idiomId} className={meaningRowBg[idiomId]} onClick={(e) => handleIdiom(e, idiomId)}>
						<td>{key}</td>
						<td className="text-left">{value}</td>
					</tr>
				);
				i += 1
			}
		}
	};

	allTranslatedSentences.length > 0 && pId && sId ? createIdiomMeaningTable() : '';

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
														Object.keys(idiomAddressConvertor).indexOf('t_' + t.id) !=
														-1 ? (
															<ruby key={t_idx + t}>
																{createTokenRubyWithMeaning(t_idx, t)}
																{idiomDetail[idiomAddressConvertor['t_' + t.id]]
																	.end_id ==
																't_' + t.id ? (
																	tokenRubyResultHtml[idiomAddressConvertor['t_' + t.id]]
																) : (
																	''
																)}
															</ruby>
														) : (
															createEmptyTokenRubyHtml(t_idx, t)
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
						{/* <LinearProgress/> */}
						<table className="table table-striped table-scroll mb-0">
							<thead>
								<tr>
									<th>Translate</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{selectedTranslatedSentence}</td>
								</tr>
							</tbody>
						</table>
						{/* <LinearProgress/> */}
						<table className="table table-striped table-scroll mb-0">
							<thead>
								<tr>
									<th>Word</th>
								</tr>
							</thead>
							<tbody className="cursor">{wordsTableRow.length > 0 ? wordsTableRow : notAvailable}</tbody>
						</table>
						{/* <LinearProgress /> */}
						<table className="table table-striped table-scroll mb-0">
							<thead>
								<tr>
									<th>idiom</th>
								</tr>
							</thead>
							<tbody className="cursor">
								{idiomsTableRow.length > 0 ? idiomsTableRow : notAvailable}
							</tbody>
						</table>
						<table className="table table-striped  table-scroll mb-0">
							<thead>
								<tr>
									<th>Custom Input</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<form noValidate autoComplete="off">
											<InputBase
												id="standard-basic"
												fullWidth
												placeholder="custom input here"
												inputProps={{ 'aria-label': 'naked' }}
											/>
										</form>
									</td>
								</tr>
							</tbody>
						</table>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default App;
