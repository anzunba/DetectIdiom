import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import { getSelectedMeaning } from '../../actions/edit4';
import { useDispatch } from 'react-redux';
import { getWordTable } from '../../actions/edit5';
import { getIdiomTable } from '../../actions/edit6';
import { getIdiomTableAddress } from '../../actions/edit8';

const getId = (tokenFullId) => {
	let pId = tokenFullId.split('_')[1];
	let sId = tokenFullId.split('_')[2];
	let tId = tokenFullId.split('_')[3];
	return [ pId, sId, tId ];
};
let wordTable = {};
let idiomTable = {};
let selectedTranslatedSentence = 'Not Available';
let idiomsInSentence = [];
/******************************************/
const App = () => {
	const idiomsTableRow = [];
	const wordsTableRow = [];
	const dispatch = useDispatch();
	const allTranslatedSentences = useSelector((state) => state.edit.aft_sentence);
	const allIdioms = useSelector((state) => state.edit.idioms);
	const tokenFullId = useSelector((state) => state.edit2.t_id);
	const selectedIdiomAddress = useSelector((state) => state.edit8);
	const [ idiomBg, setidiomBg ] = useState({});
	const pId = getId(tokenFullId)[0];
	const sId = getId(tokenFullId)[1];

	useEffect(
		() => {
			resetTokenMeaningBg();
		},
		[ tokenFullId ]
	);

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
	const handleMeaning = (e) => {
		document.getElementById(e.target.id).classList.add('bg-pink');
		dispatch(getSelectedMeaning(e.target.innerHTML));
		wordTable[tokenFullId] = e.target.innerHTML;
		dispatch(getWordTable(wordTable));
	};

	const resetTokenMeaningBg = () => {
		const meanings = document.getElementsByClassName('clickable_mean');
		for (let i = 0; i < meanings.length; i++) {
			document.getElementById(meanings[i].id).classList.remove('bg-pink');
		}
	};

	const meaningsString = useSelector((state) => state.edit3.mean);
	const createWordMeaningTable = (meaningsString) => {
		let meaningsList = meaningsString.split('/');
		let count = 0;
		meaningsList.map((m, i) => {
			if (wordTable[tokenFullId] == m) {
				wordsTableRow.push(
					<tr key={i}>
						<td
							id={`${tokenFullId}_${count}`}
							className="clickable_mean bg-pink"
							onClick={(e) => handleMeaning(e)}
						>
							{m}
						</td>
					</tr>
				);
			} else {
				wordsTableRow.push(
					<tr key={i}>
						<td id={`${tokenFullId}_${count}`} className="clickable_mean" onClick={(e) => handleMeaning(e)}>
							{m}
						</td>
					</tr>
				);
			}
			count += 1;
		});
	};
	meaningsString ? createWordMeaningTable(meaningsString) : '';

	//Idioms
	const handleIdiom = (e, i) => {
		let idiom = e.target.parentElement.children[0].innerHTML;
		let meaning = e.target.parentElement.children[1].innerHTML;
		let keyToken = idiom.split(' ').join('_');
		if (idiomBg[keyToken + i] == 'bg-pink') {
			setidiomBg((state) => ({ ...state, [keyToken + i]: '' }));
			idiomTable = { idiom: idiom, mean: '' };
		} else {
			setidiomBg((state) => ({ ...state, [keyToken + i]: 'bg-pink' }));
			idiomTable = { idiom: idiom, mean: meaning };
		}
		dispatch(getIdiomTable(idiomTable));
	};
	
	const createIdiomMeaningTable = () => {
		idiomsInSentence = allIdioms[pId][sId];
		for (const [ key, value ] of Object.entries(idiomsInSentence)) {
			let meaningsForOneToken = value.split('、');
			if (meaningsForOneToken.length > 1) {
				meaningsForOneToken.map((m, i) => {
					let keyToken = key.split(' ').join('_');
					idiomsTableRow.push(
						<tr key={i} className={idiomBg[keyToken + i]} onClick={(e) => handleIdiom(e, i)}>
							<td>{key}</td>
							<td className="text-left">{m}</td>
						</tr>
					);
				});
			} else {
				let keyToken = key.split(' ').join('_');
				let i = -1;
				idiomsTableRow.push(
					<tr key={key} className={idiomBg[keyToken + i]} onClick={(e) => handleIdiom(e, i)}>
						<td>{key}</td>
						<td className="text-left">{value}</td>
					</tr>
				);
			}
		}
	};

	allTranslatedSentences.length > 0 && pId && sId ? createIdiomMeaningTable() : '';

	return (
		<div className="">
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
				<tbody className="cursor">{idiomsTableRow.length > 0 ? idiomsTableRow : notAvailable}</tbody>
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
		</div>
	);
};
export default App;
