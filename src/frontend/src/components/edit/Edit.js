import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { getEnMeaning, getJaMeaning } from '../../actions/getMeaning';
import { getTokens } from '../../actions/getTokens';
import { enLemmatizer, jaLemmatizer } from '../../actions/edit9';
import { lemmatizer2 } from '../../actions/edit10';
import { lemmatizer3 } from '../../actions/edit11';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { createArticle, updateArticle } from '../../actions/article';
import { updateProfile } from '../../actions/profile';
const useStyles = makeStyles((theme) => ({
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '500px'
	}
}));

const getSelectedIdiomAddressList = (tokensOfIdiomList, tokensOfSentenceList, sentenceId) => {
	let idiomIndexList = [];
	tokensOfIdiomList.forEach(function(tokenOfIdiom) {
		if (tokenOfIdiom != '') {
			idiomIndexList.push(tokensOfSentenceList.indexOf(tokenOfIdiom.toLowerCase()));
		}
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

let token = '';
let lemma = 'Selected Word';
let idiomDetail = {};
let idiomAddressConvertor = {};
let selectedTranslatedSentence = 'Not Available';
let idiomsInSentence = [];
let tokenFullId = '';

/*********************************************************************/
let iruby = {};
const App = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const originSentencesList = useSelector((state) => state.getProcessedText.pre_sentence);
	const sentenceTokensList = useSelector((state) => state.getProcessedText.sentenceTokensList);
	const text_lang = useSelector((state) => state.getProcessedText.text_lang);
	const inputTextTokens = useSelector((state) => state.getProcessedText.words);
	const [ tokenRuby, setTokenRuby ] = useState({});
	const idiomsTableRow = [];
	const wordsTableRow = [];
	const allTranslatedSentences = useSelector((state) => state.getProcessedText.aft_sentence);
	const allIdioms = useSelector((state) => state.getProcessedText.idioms);
	const [ meaningRowBg, setMeaningRowBg ] = useState({});
	const [ tokenBg, setTokenBg ] = useState({});
	const [ idiomList, setIdiomList ] = useState({});
	const [ wordList, setWordList ] = useState({});
	const [pId, setPId] = useState();
	const [ sId, setSId] = useState();
	const wordIdioms = useSelector((state) => state.getWordIdiom);
	const meaningsString = useSelector((state) => state.getMeaning.mean);
	lemma = useSelector((state) => state.edit9);
	let wordListFromDb = {};
	let idiomListFromDb = {};
	if (wordIdioms ) {
		wordListFromDb = JSON.parse(wordIdioms[0]);
		idiomListFromDb = JSON.parse(wordIdioms[1]);
	}
	useEffect(() => {
		for (let key in wordListFromDb) {
			for (let i in wordListFromDb[key]) {
				let tokenHash = {};
				tokenHash[i] = wordListFromDb[key][i];
				setTokenRuby((state) => ({ ...state, [key]: wordListFromDb[key][i] }));
				setWordList((state) => ({ ...state, [tokenFullId]: tokenHash }));
			}
		}
	}, []);

	useEffect(
		() => {
			if (originSentencesList.length != 0) {
				for (let idiomId in idiomListFromDb) {
					for (let idiom in idiomListFromDb[idiomId]) {
						const mean = idiomListFromDb[idiomId][idiom];
						//dispatch(lemmatizer2(originSentencesList[idiomId.split('_')[0]][idiomId.split('_')[1]]));
						let tokenHash = {};
						tokenHash[idiom] = idiomListFromDb[idiomId][idiom];
						getIdiomDetail({
							idiom: idiom,
							mean: mean,
							idiomMeaningId: idiomId,
							sentenceId: 't_' + idiomId.split('_').slice(0, 2).join('_')
						});
						setIdiomList((state) => ({ ...state, [idiomId]: mean }));
					}
				}
			}
		},
		[ originSentencesList ]
	);

	const handleToken = (e) => {
		setTokenBg({});
		tokenFullId = e.target.id;
		setPId(tokenFullId.split('_')[1])
		setSId(tokenFullId.split('_')[2])
		token = e.target.innerHTML;
		text_lang == 'en' ? dispatch(getEnMeaning(token)):dispatch(getJaMeaning(token));
		text_lang == 'en' ? dispatch(enLemmatizer(token)):dispatch(jaLemmatizer(token))
		setTokenBg((state) => ({ ...state, [tokenFullId]: 'bg-yellow' }));
	};

	//Words
	let selectedMeaning = '';
	const handleMeaning = (e, i) => {
		let hash = {};
		let tokenHash = {};
		selectedMeaning = e.target.innerHTML;
		setMeaningRowBg((state) => ({ ...state, [tokenFullId]: {} }));
		if (
			(meaningRowBg[tokenFullId] && meaningRowBg[tokenFullId][i] == 'bg-pink') ||
			e.target.className.split(' ').indexOf('bg-pink') != -1
		) {
			hash[i] = '';
			setTokenRuby((state) => ({ ...state, [tokenFullId]: '' }));
			setWordList((state) => ({ ...state, [tokenFullId]: '' }));
		} else {
			hash[i] = 'bg-pink';
			tokenHash[token] = selectedMeaning;
			setTokenRuby((state) => ({ ...state, [tokenFullId]: selectedMeaning }));
			setWordList((state) => ({ ...state, [tokenFullId]: tokenHash }));
		}
		setMeaningRowBg((state) => ({ ...state, [tokenFullId]: hash }));
	};

	const createWordMeaningTable = (meaningsString) => {
		let meaningsList = meaningsString.split('/');
		meaningsList.map((m, i) => {
			let bool = '';
			if (tokenFullId in wordListFromDb) {
				for (let key in wordListFromDb[tokenFullId]) {
					if (wordListFromDb[tokenFullId][key] == m) {
						bool = 'bg-pink';
						delete wordListFromDb[tokenFullId];
					}
				}
			}
			wordsTableRow.push(
				<tr key={i}>
					<td
						id={`${tokenFullId}_${i}`}
						className={
							meaningRowBg[tokenFullId] !== undefined ? (
								`clickable_mean ${meaningRowBg[tokenFullId][i]}`
							) : (
								`clickable_mean ${bool}`
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
	const getIsDuplicate = (arr1, arr2) => {
		return [ ...arr1, ...arr2 ].filter((item) => arr1.includes(item) && arr2.includes(item)).length > 0;
	};
	const getIdiomDetail = (selectedIdiom) => {
		const keySelectedIdiom = selectedIdiom.idiom.replace('A', '');
		const idiomFullAddress = getSelectedIdiomAddressList(
			keySelectedIdiom.split(' '),
			sentenceTokensList[selectedIdiom.sentenceId.split('_')[1]][selectedIdiom.sentenceId.split('_')[2]].split(
				' '
			),
			selectedIdiom.sentenceId
		);
		for (let key in idiomDetail) {
			let duplicate = getIsDuplicate(idiomDetail[key].fullAddress, idiomFullAddress);
			let hash = {};
			if (duplicate) {
				iruby[key] = '';
				hash[idiomDetail[key].rowId] = '';
				const a = idiomDetail[key].meaningId;
				setMeaningRowBg((state) => ({ ...state, [a]: hash }));
				idiomDetail[key].fullAddress.map((address) => {
					delete idiomAddressConvertor[address];
				});
				delete idiomDetail[key];
			}
		}
		if (idiomFullAddress.length != 0) {
			iruby[idiomFullAddress[0]] = selectedIdiom.mean;
			idiomFullAddress.map((address) => {
				idiomAddressConvertor[address] = idiomFullAddress[0];
			});
			idiomDetail[idiomFullAddress[0]] = {
				fullAddress: idiomFullAddress,
				start_id: idiomFullAddress[0],
				end_id: idiomFullAddress[idiomFullAddress.length - 1],
				idiom: selectedIdiom.idiom,
				mean: selectedIdiom.mean,
				meaningId: selectedIdiom.meaningId,
				rowId: selectedIdiom.rowId
			};
		}
	};
	const handleIdiom = (e, idiomId) => {
		let rowId = e.target.parentElement.id;
		let idiom = e.target.parentElement.children[0].innerHTML;
		let meaning = e.target.parentElement.children[1].innerHTML;
		console.log("debug")
		let hash = {};
		let idiomHash = {};
		if (meaningRowBg[idiomId] && meaningRowBg[idiomId][rowId] == 'bg-pink' || e.target.parentElement.className.split(' ').indexOf('bg-pink') != -1) {
			getIdiomDetail({
				idiom: idiom,
				mean: '',
				idiomMeaningId: idiomId,
				sentenceId: tokenFullId.split('_').slice(0, 3).join('_')
			});
			hash[rowId] = '';
			setMeaningRowBg((state) => ({ ...state, [idiomId]: hash }));
			setIdiomList((state) => ({ ...state, [idiomId]: '' }));
		} else {
			hash[rowId] = 'bg-pink';
			idiomHash[idiom] = meaning;
			setMeaningRowBg((state) => ({ ...state, [idiomId]: hash }));
			setIdiomList((state) => ({ ...state, [idiomId]: idiomHash }));
			getIdiomDetail({
				idiom: idiom,
				mean: meaning,
				meaningId: idiomId,
				rowId: rowId,
				sentenceId: tokenFullId.split('_').slice(0, 3).join('_')
			});
		}
	};

	let rowId = 0;
	let idiomId = 0;
	const createIdiomMeaningTable = () => {
		idiomsInSentence = allIdioms[pId][sId];
		for (const [ key, value ] of Object.entries(idiomsInSentence)) {
			let meaningsForOneToken = value.split('、');
			let idiomKey = `${pId}_${sId}_${idiomId}`;

			if (meaningsForOneToken.length > 1) {
				meaningsForOneToken.map((m) => {
		
					if (key && m) {
						for (let idiomMeaningFromDB in idiomListFromDb) {
							for (let i in idiomListFromDb[idiomMeaningFromDB]) {
								if (key == i && m == idiomListFromDb[idiomMeaningFromDB][i]) {
								
									delete idiomListFromDb[idiomMeaningFromDB];
								}
							}
						}
						idiomsTableRow.push(
							<tr
								key={rowId}
								id={rowId}
								className={`${meaningRowBg[idiomKey] !== undefined ? meaningRowBg[idiomKey][rowId] : ''}`}
								onClick={(e) => handleIdiom(e, idiomKey)}
							>
								<td>{key}</td>
								<td className="text-left">{m}</td>
							</tr>
						);
						rowId += 1;
					}
				});
				idiomId += 1;
			} else {
				if (key && value) {
					
					for (let idiomMeaningFromDB in idiomListFromDb) {
						for (let i in idiomListFromDb[idiomMeaningFromDB]) {
							if (key == i && value == idiomListFromDb[idiomMeaningFromDB][i]) {
							
								delete idiomListFromDb[idiomMeaningFromDB];
							}
						}
					}

					idiomsTableRow.push(
						<tr
							key={rowId}
							id={rowId}
							className={`${meaningRowBg[idiomKey] !== undefined
								? meaningRowBg[idiomKey][rowId]
								: ''}`}
							onClick={(e) => handleIdiom(e, idiomKey)}
						>
							<td>{key}</td>
							<td className="text-left">{value}</td>
						</tr>
					);
					rowId += 1;
					idiomId += 1;
				}
			}
		}
	};

	allTranslatedSentences.length > 0 && pId && sId ? createIdiomMeaningTable() : '';

	const [ open, setOpen ] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const [ title, setTitle ] = useState('');

	const handleSaveProject = () => {
		const formData = new FormData();
		formData.append('title', title);
		formData.append('content', inputText);
		formData.append('language', text_lang)
		formData.append('origin_sentence', JSON.stringify(originSentencesList));
		formData.append('translated_sentence', JSON.stringify(allTranslatedSentences));
		formData.append('word', JSON.stringify(wordList));
		formData.append('idiom', JSON.stringify(idiomList));
		dispatch(createArticle(formData));
		setOpen(false);
	};

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};
	const inputText = useSelector((state) => state.getUnprocessedText);


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
					className={`clickable_token ${tokenBg['t_' + t.id]}`}
					id={'t_' + t.id}
					onClick={(e) => handleToken(e)}
				>
					{t.token}
				</span>
				<rt key={t_idx + t + 'rt'}>{tokenRuby['t_' + t.id]}</rt>
			</ruby>
		);

		if (
			idiomDetail[idiomAddressConvertor['t_' + t.id]] &&
			't_' + t.id == idiomDetail[idiomAddressConvertor['t_' + t.id]].end_id
		) {
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
	return (
		<div>
			<div className="float-left">
				<form noValidate autoComplete="off">
					<div className="selectedInputs">
						<TextField disabled id="standard-basic" label={`${lemma}`} />
					</div>
				</form>
			</div>
			<div className="float-right">
				<div className="d-inline-block">
					<Button variant="outlined" color="primary" onClick={handleClickOpen}>
						Save
					</Button>
					<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
						<DialogTitle id="form-dialog-title">Good Work!</DialogTitle>
						<DialogContent>
							<span className="save-img d-flex justify-content-center pb-3">
								<img src="/static/frontend/images/pig.png" />
							</span>
							<TextField
								autoFocus
								margin="dense"
								id="name"
								label="Project Name"
								type="text"
								fullWidth
								value={title}
								onChange={handleTitle}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button onClick={handleSaveProject} color="primary">
								Save
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={8}>
					<Paper className={classes.paper}>
						<div className="editPaper text-left">
							{Object.entries(inputTextTokens).map(([ idx, input ]) =>
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
																{idiomDetail[idiomAddressConvertor['t_' + t.id]] &&
																idiomDetail[idiomAddressConvertor['t_' + t.id]]
																	.end_id ==
																	't_' + t.id ? (
																	tokenRubyResultHtml[
																		idiomAddressConvertor['t_' + t.id]
																	]
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
					</Paper>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Paper className={classes.paper}>
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
						<table className="table table-striped table-scroll mb-0">
							<thead>
								<tr>
									<th>Word</th>
								</tr>
							</thead>
							<tbody className="cursor">{wordsTableRow.length > 0 ? wordsTableRow : notAvailable}</tbody>
						</table>
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
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
};

export default App;
