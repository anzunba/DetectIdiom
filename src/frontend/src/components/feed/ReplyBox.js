import React, { useState ,useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { postReply, getReply } from '../../actions/reply';

const ReplyBox = (props) => {
	const dispatch = useDispatch();
	const [ reply, setReply ] = useState('');
	const [ open, setOpen ] = React.useState(false);
	const handleReply = (e) => {
		setReply(e.target.value);
	};
	const submit = (e) => {
		if ((e.ctrlKey && e.key == 'Enter')) {
			const commentId = e.target.id.split('_')[1]
			setOpen(true);
			setReply('');
			const replyData = new FormData();
			replyData.append('comment', commentId);
			replyData.append('content', reply);
			dispatch(postReply(replyData))
		}
	};

	const form = (
		<form noValidate autoComplete="off">
			<div>
				<TextField
					id={`id_${props.comment.id}`}
					label="Write a reply"
					multiline
					rowsMax={4}
					value={reply}
					onChange={handleReply}
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
				<Alert severity="success">Successfully reply sent!</Alert>
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
export default ReplyBox;
