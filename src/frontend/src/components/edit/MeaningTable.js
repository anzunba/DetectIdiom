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
	let p = t_id.split('_')[1];
	let s = t_id.split('_')[2];
	return [ p, s ];
};
const word_table = {}

const App = () => {
	let translation = 'Not Available';
	let selectedIdioms = [];
	const tra_sentence = useSelector((state) => state.edit.aft_sentence);
	const idioms = useSelector((state) => state.edit.idioms);
	const t_id = useSelector((state) => state.edit2.t_id);
	const idiomTableAddress = useSelector((state) => state.edit8);
	console.log("idiomTableAddress: " + idiomTableAddress)

	const p = getId(t_id)[0];
	const s = getId(t_id)[1];
	const items = [];
	let idiom_table = {}
	const [ idiomBg, setidiomBg ] = useState({});
	const handleIdiom = (e, i) =>{
		console.log("i:"  + i)
		let idiom = e.target.parentElement.children[0].innerHTML
		let meaning = e.target.parentElement.children[1].innerHTML
		let key_id = idiom.split(' ').join('_')
		console.log(idiomBg[key_id + i])
		if(idiomBg[key_id + i] == 'bg-pink'){
			setidiomBg((state) => ({ ...state, [key_id + i]: '' }));
			idiom_table = {"idiom": idiom, "mean" : ''}
		}else{
			setidiomBg((state) => ({ ...state, [key_id + i]: 'bg-pink' }));
			idiom_table = {"idiom": idiom, "mean" : meaning}
		}
		
		dispatch(getIdiomTable(idiom_table));
	}
	if (tra_sentence.length > 0 && p && s) {
		translation = tra_sentence[p][s];
		selectedIdioms = idioms[p][s];
		for (const [ key, value ] of Object.entries(selectedIdioms)) {
			let meanings = value.split('、');
			if (meanings.length > 1) {
				meanings.map((m, i) => {
						let key_id = key.split(' ').join('_')
						console.log('i: ' + i)
						items.push(
							<tr key={i} className={idiomBg[key_id + i]} onClick={(e)=>handleIdiom(e, i)}>
								<td>{key}</td>
								<td className="text-left">{m}</td>
							</tr>
						);
				});
			} else {
				let key_id = key.split(' ').join('_')
				let i = -1
				items.push(
					<tr key={key} className={idiomBg[key_id + i]} onClick={(e)=>handleIdiom(e, i)}>
						<td>{key}</td>
						<td className="text-left">{value}</td>
					</tr>
				);
			}
		}
	}

	let notAvailable = (
		<tr>
			<td>Not Available</td>
		</tr>
	);
	const dispatch = useDispatch();
	const handleMeaning = (e) =>{
		//console.log("idiomTableAddress: " + idiomTableAddress)
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
	let meaning_list = '';
	const m_items = [];
	const get_m_list = (meaning) => {
		meaning_list = meaning.split('/');
		meaning_list = Array.from(new Set(meaning_list));
		let count = 0
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
				<tbody className="cursor">{m_items.length > 0 ? m_items : notAvailable}</tbody>
			</table>
			{/* <LinearProgress /> */}
			<table className="table table-striped table-scroll mb-0">
				<thead>
					<tr>
						<th>idiom</th>
					</tr>
				</thead>
				<tbody className="cursor">{items.length > 0 ? items : notAvailable}</tbody>
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
