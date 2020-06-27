import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Lang from './Lang';
import Crop from './Crop'

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

export default function TransitionsModal() {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);
	const [ flag, setFlag ] = React.useState('no-circle');
	const [ flagImg, setFlagImg ] = React.useState('');

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [ value, setValue ] = React.useState('');

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	function setLang() {
		setFlag('circle90');
		setFlagImg('fix-img');
	}

	return (
		<div>
			<Button type="button" size="small" color="primary" onClick={handleOpen} className="w-100">
				Edit
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
					<div>
					<div className="bg-light px-5 text-center">
						<Crop />
						<form noValidate autoComplete="off">
							<TextField id="standard-basic" label="Name" className="w-100 mt-2" />
							<TextField
								id="standard-multiline-static"
								label="Bio"
								multiline
								rows={4}
								value={value}
								onChange={handleChange}
								className="w-100 mt-2"
							/>
							<Lang />
						</form>
					</div>
					<div className="w-100 bg-light">
					<Button color="primary" size="large" fullWidth>
							Save
						</Button>
						</div>
						</div>
				</Fade>
			</Modal>
		</div>
	);
}
