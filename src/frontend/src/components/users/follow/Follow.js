import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Button from '@material-ui/core/Button';
import FollowTab from './FollowTab'

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
}));

export default function InteractiveList() {
	const classes = useStyles();
	const [ secondary, setSecondary ] = React.useState(false);
	const [ open, setOpen ] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button type="button" size="small" color="primary" onClick={handleOpen}  className="w-100">
				Follow
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
                        <FollowTab />
					</div>
				</Fade>
			</Modal>
		</div>
	);
}
