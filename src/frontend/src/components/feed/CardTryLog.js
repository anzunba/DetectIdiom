import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function createData(date, user, title, total_q, total_t) {
	return { date, user, title, total_q, total_t };
}

const rows = [
	createData('2020/Dec/20', 'user1', 'title1', 1, 1),
	createData('2020/Dec/20', 'user2', 'title2', 20, 2),
	createData('2020/Dec/20', 'user3', 'title3', 10, 1),
	createData('2020/Dec/20', 'user4', 'title4', 5, 3),
	createData('2020/Dec/20', 'user5', 'title5', 10, 1)
];

export default function SimpleTable() {
	return (
		<div>
			<TableContainer className="p-2">
				<Table aria-label="simple table" className="table table-striped">
					<TableHead>
						<TableRow className="bg-blue">
							<TableCell className="text-white" align="center">
								Date
							</TableCell>
							<TableCell className="text-white" align="left">
								Use
							</TableCell>
							<TableCell className="text-white" align="center">
								Title
							</TableCell>
							<TableCell className="text-white" align="center">
								Total Questions
							</TableCell>
							<TableCell className="text-white" align="center">
								Total Tries
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, i) => (
							<TableRow key={i}>
								<TableCell component="th" scope="row" align="center">
									{row.date}
								</TableCell>
								<TableCell align="left">{row.user}</TableCell>
								<TableCell align="center">{row.title}</TableCell>
								<TableCell align="left">{row.total_q}</TableCell>
								<TableCell align="left">{row.total_t}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
