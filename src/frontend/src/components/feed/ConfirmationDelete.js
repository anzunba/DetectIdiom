import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../actions/comment';

const DeleteCommentConfirmation = (props) =>{
    useEffect(() => {
        console.log('yo')
    }, [])
    const dispatch = useDispatch();
	const [ open, setOpen ] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
    };
    
    const handleClose = () =>{
        setOpen(false)
    }

	const handleDeleteComment = () => {
        console.log('called deleteComment')
        dispatch(deleteComment(props.commentId))
		setOpen(false);
	};

	return (
		<div>
			<IconButton edge="end" aria-label="delete" onClick={handleClickOpen} className="mb-3" >
				<DeleteIcon />
			</IconButton>

			<Dialog
				open={open}
				onClose={()=>handleClose()}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Something to delete'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">Are you sure?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={()=>handleClose()} color="primary">
						No
					</Button>
					<Button onClick={()=>handleDeleteComment()} color="primary" autoFocus>
						Delete!
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
export default DeleteCommentConfirmation;