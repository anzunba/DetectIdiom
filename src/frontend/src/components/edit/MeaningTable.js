import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function CenteredGrid() {
	return (
		<div>
            {/* <LinearProgress/> */}
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Translate</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Not Available</td>
					</tr>
				</tbody>
			</table>
            {/* <LinearProgress/> */}
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Select Word</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Not Available</td>
					</tr>
				</tbody>
			</table>
            {/* <LinearProgress /> */}
			<table className="table table-striped">
				<thead>
					<tr>
						<th>idiom</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Not Available</td>
					</tr>
				</tbody>
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
}
