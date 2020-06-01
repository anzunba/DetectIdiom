import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function createData(num, wordIdiom, difficulty) {
	return { num, wordIdiom, difficulty };
}

const rows = [
	createData(1, 'for a while', 'easy'),
	createData(2, 'take it easy', 'difficult'),
	createData(3, 'spagettii', 'neutral'),
	createData(4, 'sausage', 'easy'),
	createData(5, 'orange', 'difficult')
];


export default function SimpleTable() {
	return (
		<div>
			<div className="text-center p-4">
			<h3>Well done!</h3>
			<img src="/static/frontend/images/coffee-break.svg/" className="img-60"/>
			</div>
			
			<TableContainer className="p-2">
			<Table aria-label="simple table"className="table table-striped">
				<TableHead>
					<TableRow className="bg-blue">
						<TableCell className="text-white" align="center">#</TableCell>
						<TableCell className="text-white" align="left">Word/Idiom</TableCell>
						<TableCell className="text-white" align="center">Difficulty</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.num}>
							<TableCell component="th" scope="row" align="center">
								{row.num}
							</TableCell>
							<TableCell align="left">{row.wordIdiom}</TableCell>
							<TableCell align="center"><img src={`/static/frontend/images/${row.difficulty}.svg/`} className="img-25"/></TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
		</div>
		
	);
}
