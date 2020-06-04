import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

function createData(wordIdiom, wordMeaning) {
	return { wordIdiom, wordMeaning };
}

const word_rows = [
	createData('for a while', 'easy'),
	createData('take it easy', 'difficult'),
	createData('spagettii', 'neutral'),
	createData('sausage', 'easy'),
	createData('orange', 'difficult')
];

const idiom_rows = [
	createData('for a while1', 'easy'),
	createData('take it easy1', 'difficult'),
	createData('spagettii1', 'neutral'),
	createData('sausage1', 'easy'),
	createData('orange1', 'difficult')
];

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
}));

export default function TransitionsModal() {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);
	const [ rows, setRows ] = useState(word_rows);
	const [ rowName, setRowName ] = useState("Word");

	const handleTable = () => {
		rows === word_rows ? setRows(idiom_rows) : setRows(word_rows);
		rowName === "Word" ? setRowName("Idiom") : setRowName("Word");
	};

	const table = (
		<Table aria-label="simple table" className="table table-striped">
			<TableHead>
				<TableRow className="bg-blue">
					<TableCell className="text-white" align="left">
						{rowName}
					</TableCell>
					<TableCell className="text-white" align="center">
						Meaning
					</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{rows.map((row, i) => (
					<TableRow key={i}>
						<TableCell align="left">{row.wordIdiom}</TableCell>
						<TableCell align="center">{row.wordMeaning}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button size="small" onClick={handleOpen} fullWidth color="primary" className="p-2">
				Word Table
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={open}>
					<div className="bg-light w-50">
            <div className="w-25">
            <BootstrapSwitchButton
							checked={false}
							onlabel="Idiom"
							onstyle="primary"
							offlabel="Word"
							offstyle="success"
							style="w-50 m-3"
							onChange={handleTable}
						/>
            </div>
						
						<TableContainer className="p-2">{table}</TableContainer>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
