import React, { useState ,useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { postComment, getComment } from '../../actions/comment';

let articleId
const App = (props) => {
	const dispatch = useDispatch();
	const [ comment, setComment ] = useState('');
	const [ open, setOpen ] = React.useState(false);
	const handleComment = (e) => {
		setComment(e.target.value);
	};
	const submit = (e) => {
		if ((e.ctrlKey && e.key == 'Enter')) {
			articleId = e.target.id.split('_')[1]
			setOpen(true);
			setComment('');
			const commentData = new FormData();
			commentData.append('article', articleId);
			commentData.append('content', comment);
			dispatch(postComment(commentData))
		}
	};



	const form = (
		<form noValidate autoComplete="off">
			<div>
				<TextField
					id={`id_${props.articleId}`}
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

	const handleClose = (e, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const [ croppedImg, setCroppedImg ] = useState('/static/frontend/images/user.png');

	const profileData = useSelector((state) => state.getRequestUserProfile);

	useEffect(
		() => {
			setCroppedImg(profileData.profile_img);
		},
		[ profileData ]
	);

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
					<Avatar alt="" src={croppedImg} />
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
