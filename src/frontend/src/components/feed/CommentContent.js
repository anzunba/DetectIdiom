import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Comment from './Comment';
import ReplyBox from './ReplyBox';
import IconButtons from './IconButtons';
import Block from './Block';
import Quiz from './Quiz';
import WordTable from './WordTable';
import Divider from '@material-ui/core/Divider';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useDispatch, useSelector } from 'react-redux';
import { startLoader } from '../../actions/startLoader';
import { getWordIdioms } from '../../actions/getWordIdiom';
import { getcomment, getAllcomment, getCustomUsercomment } from '../../actions/comment';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getProcessedText } from '../../actions/getProcessedText';
import { showPage } from '../../actions/page';
import { getCustomUserProfile } from '../../actions/profile';
import Reply from './Reply';
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

const commentContent = (props) => {
    const [expandControllerList, setExpandControllerList]= useState({})
    const classes = useStyles();
    
    useEffect(() => {
        setExpandControllerList((state) => ({ ...state, [props.comment.id]: false }));
    }, [])

	const handleExpandClick = (commentId) => {
        setExpandControllerList((state) => ({ ...state, [props.comment.id]: !expandControllerList[props.comment.id] }));
	};


	dayjs.extend(relativeTime);

	return (
		<CardContent className="py-0">
				<div className="profileImg">
					<Avatar alt="" src={props.comment.profile.profile_img} />
				</div>
				<div className="commentContent">
				<small>{props.comment.user.username}</small><br/>
					<Typography component="span" variant="body2" color="textPrimary">
						{props.comment.content}
					</Typography>
					<CardActions disableSpacing>
						<IconButtons />
						<IconButton
							className={clsx(classes.expand, {
								[classes.expandOpen]: expandControllerList[props.comment.id]
							})}
							onClick={handleExpandClick}
							aria-expanded={expandControllerList[props.comment.id]}
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</IconButton>
					</CardActions>
					<Collapse in={expandControllerList[props.comment.id]} timeout="auto" unmountOnExit>
						<div className="replyBox">
							<ReplyBox comment={props.comment}/>
							<Reply comment={props.comment}/>
						</div>
					</Collapse>
				</div>
                </CardContent>
	);
};
export default commentContent;
