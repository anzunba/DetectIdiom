import React, { useState ,useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { profileImg } from './Scream'
const App = () => {
	const profileImgUrl = useContext(profileImg)
	const [ comment, setComment ] = useState('');
	const [ open, setOpen ] = React.useState(false);
	const handleComment = (e) => {
		setComment(e.target.value);
	};
	const submit = (e) => {
		if ((e.ctrlKey && e.key == 'Enter')) {
			console.log(comment);
			setOpen(true);
			setComment('');
		}
	};

	const form = (
		<form noValidate autoComplete="off">
			<div>
				<TextField
					label="Write a comment"
					multiline
					rowsMax={4}
					value={comment}
					onChange={handleComment}
					variant="outlined"
					fullWidth
					onKeyUp={submit}
				/>
			</div>
		</form>
	);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				open={open}
				autoHideDuration={2500}
				onClose={handleClose}
			>
				<Alert severity="success">Successfully comment sent!</Alert>
			</Snackbar>
			<CardContent>
				<div className="profileImg">
					<Avatar alt="" src={profileImgUrl} ria-label="recipe">
						R
					</Avatar>
				</div>
				<div className="commentContent">
					<Tooltip title="TO SUBMIT : [Ctrl + Enter]" aria-label="add">
						{form}
					</Tooltip>
				</div>
			</CardContent>
		</React.Fragment>
	);
};
export default App;
