import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import { getSelectedMeaning } from '../../actions/edit4';
import { useDispatch } from 'react-redux';
import { getWordTable } from '../../actions/edit5';
import { getIdiomTable } from '../../actions/edit6';

const getId = (t_id) => {
	var p = t_id.split('_')[1];
	var s = t_id.split('_')[2];
	return [ p, s ];
};
const word_table = {}

const App = () => {
	var translation = 'Not Available';
	var selectedIdioms = [];
	const tra_sentence = useSelector((state) => state.edit.aft_sentence);
	const idioms = useSelector((state) => state.edit.idioms);
	const t_id = useSelector((state) => state.edit2.t_id);
	const p = getId(t_id)[0];
	const s = getId(t_id)[1];
	const items = [];
	var idiom_table = []
	const handleIdiom = (e) =>{
		var idiom = e.target.parentElement.children[0].innerHTML
		var meaning = e.target.parentElement.children[1].innerHTML
		idiom_table = [idiom, meaning]
		dispatch(getIdiomTable(idiom_table));
	}
	if (tra_sentence.length > 0 && p && s) {
		translation = tra_sentence[p][s];
		selectedIdioms = idioms[p][s];
		for (const [ key, value ] of Object.entries(selectedIdioms)) {
			var meanings = value.split('、');
			if (meanings.length > 1) {
				meanings.map((m, i) => {
						items.push(
							<tr key={i} className="clickable_idiom" onClick={(e)=>handleIdiom(e)}>
								<td>{key}</td>
								<td className="text-left">{m}</td>
							</tr>
						);
				});
			} else {
				items.push(
					<tr key={key} className="clickable_idiom" onClick={(e)=>handleIdiom(e)}>
						<td>{key}</td>
						<td className="text-left">{value}</td>
					</tr>
				);
			}
		}
	}

	var notAvailable = (
		<tr>
			<td>Not Available</td>
		</tr>
	);
	const dispatch = useDispatch();
	const handleMeaning = (e) =>{
		//reset_pink()
		document.getElementById(e.target.id).classList.add('bg-pink');
		dispatch(getSelectedMeaning(e.target.innerHTML));
		word_table[t_id] = e.target.innerHTML
		dispatch(getWordTable(word_table));
	}

	useEffect(() => {
		reset_pink()
	}, [t_id])
	const reset_pink = () =>{
		const means = document.getElementsByClassName('clickable_mean');
		for (let i = 0; i < means.length; i++) {
			document.getElementById(means[i].id).classList.remove('bg-pink');
		}
	}
	
	const meaning = useSelector((state) => state.edit3.mean);
	var meaning_list = '';
	const m_items = [];
	const get_m_list = (meaning) => {
		meaning_list = meaning.split('/');
		meaning_list = Array.from(new Set(meaning_list));
		var count = 0
		meaning_list.map((m, i) => {
			if(word_table[t_id] == m){
				m_items.push(
					<tr key={i}>
						<td id={`${t_id}_${count}`} className="clickable_mean bg-pink" onClick={(e)=>handleMeaning(e)}>
							{m}
						</td>
					</tr>
				);
			}else{
				m_items.push(
					<tr key={i}>
						<td id={`${t_id}_${count}`} className="clickable_mean" onClick={(e)=>handleMeaning(e)}>
							{m}
						</td>
					</tr>
				);
			}
			count += 1
		});
	};
	meaning ? get_m_list(meaning) : '';

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
						<td>{translation}</td>
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
				<tbody>{m_items.length > 0 ? m_items : notAvailable}</tbody>
			</table>
			{/* <LinearProgress /> */}
			<table className="table table-striped table-scroll mb-0">
				<thead>
					<tr>
						<th>idiom</th>
					</tr>
				</thead>
				<tbody>{items.length > 0 ? items : notAvailable}</tbody>
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
