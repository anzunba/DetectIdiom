import React, { useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';

const getId = (p_id) => {
	var p = p_id.split('_')[1];
	var s = p_id.split('_')[2];
	return [ p, s ];
};

const App = () => {
	var translation = 'Not Available';
	var selectedIdioms = [];
	const tra_sentence = useSelector((state) => state.edit.aft_sentence);
	const idioms = useSelector((state) => state.edit.idioms);
	const p_id = useSelector((state) => state.edit2.p_id);
	const p = getId(p_id)[0];
	const s = getId(p_id)[1];
	const items = [];
	if (tra_sentence.length > 0 && p && s) {
		translation = tra_sentence[p][s];
		selectedIdioms = idioms[p][s];
		console.log(selectedIdioms);

		for (const [ key, value ] of Object.entries(selectedIdioms)) {
			var meanings = value.split('、');
			if (meanings.length > 1) {
				meanings.map((m, i) => {
					items.push(
						<tr key={i}>
							<td>{key}</td>
							<td className="text-left">{m}</td>
						</tr>
					);
				});
			} else {
				items.push(
					<tr key={key}>
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
						<th>Select Word</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Not Available</td>
					</tr>
					<tr>
						<td>Not Available</td>
					</tr>
				</tbody>
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
			{/* <table className="table table-striped">
				<thead>
					<tr>
						<th>Custom Input</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>input</td>
					</tr>
				</tbody>
			</table> */}
		</div>
	);
};
export default App;
