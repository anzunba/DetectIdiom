import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButtons from './IconButtons';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardContent from '@material-ui/core/CardContent';
import Reply from './Reply';
import CommentBox from './CommentBox';
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from '../../actions/comment';
import CommentContent from './CommentContent';
const useStyles = makeStyles((theme) => ({
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	}
}));

const Comment = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getComment(props.articleId))
	}, [])
	const classes = useStyles();


	const comments= useSelector((state) => state.comment);

	return (
		<div>
			{comments.length>0? comments.map((comment, i)=>{
				return(
				<CommentContent comment={comment} key={i}/>
			)}):''}
			
		</div>
	);
}
export default Comment;