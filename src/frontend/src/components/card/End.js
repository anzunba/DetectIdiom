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
	createData(1, 'word-word', 6.0),
	createData(2, 'word-word', 9.0),
	createData(3, 'word-word', 16.0),
	createData(4, 'word-word-word-word', 3.7),
	createData(5, 'word-word-word-word-word-word', 16.0)
];

export default function SimpleTable() {
	return (
		<TableContainer>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center">#</TableCell>
						<TableCell align="left">Word/Idiom</TableCell>
						<TableCell align="center">Difficulty</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.num}>
							<TableCell component="th" scope="row" align="center">
								{row.num}
							</TableCell>
							<TableCell align="left">{row.wordIdiom}</TableCell>
							<TableCell align="center">{row.difficulty}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
