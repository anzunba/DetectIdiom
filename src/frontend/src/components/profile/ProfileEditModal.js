import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	},
	large: {
		width: theme.spacing(25),
		height: theme.spacing(25),
		margin: '.5rem auto'
    },
    textField:{
        width: '100%'
    }
}));

export default function TransitionsModal() {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);

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

	return (
		<div>
			<Button type="button" size="small" color="primary" onClick={handleOpen}>
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
					<div className={classes.paper}>
						<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
						<form noValidate autoComplete="off">
							<TextField id="standard-basic" label="Name" className={classes.textField}/>
							<TextField
								id="standard-multiline-static"
								label="Bio"
								multiline
								rows={4}
								value={value}
                                onChange={handleChange}
                                className={classes.textField}
							/>
						</form>
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
