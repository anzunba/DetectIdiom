import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReplyBox from './ReplyBox';
import { useDispatch, useSelector } from 'react-redux';
import { getcomment, getAllcomment, getCustomUsercomment } from '../../actions/comment';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Reply from './Reply';
import ConfirmationDelete from './ConfirmationDelete'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import { postCommentLike, getCommentLike } from '../../actions/commentLike';
import { getReplyUser } from '../../actions/replyUser';

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
	const commentLikeData= useSelector((state) => state.commentLike);
	const [commentedByRequestUser, setCommentedByRequestUser] = useState({})
	const [ likedByRequestUser, setLikedByRequestUser ] = useState({});
	const [repliedByRequestUser, setRepliedByRequestUser] = useState({})
	const [ likeNum, setLikeNum ] = useState({});
	const commentUserData = useSelector((state) => state.commentUser);
	const profileData = useSelector((state) => state.getRequestUserProfile);
	const replyUserData = useSelector((state) => state.replyUser);
	dayjs.extend(relativeTime);
    const dispatch = useDispatch();
    
    useEffect(() => {
        setExpandControllerList((state) => ({ ...state, [props.comment.id]: false }));
        dispatch(getCommentLike(props.comment.id))
		//dispatch(getCommentUser(props.article.id))
		setLikedByRequestUser((state) => ({ ...state, [props.comment.id]: false }));
		setRepliedByRequestUser((state) => ({ ...state, [props.comment.id]: false }));
		setLikeNum((state) => ({ ...state, [props.comment.id]: 0 }));
		dispatch(getReplyUser(props.comment.id));
    }, [])
	useEffect(
		() => {
			console.log(replyUserData)
			if (replyUserData.length > 0) {
				const isRepliedByRequestUser = replyUserData[0];
				const commentId = replyUserData[1]
				setRepliedByRequestUser((state) => ({ ...state, [commentId]: isRepliedByRequestUser }));
			}
		},
		[ replyUserData ]
	);
	useEffect(
		() => {
			console.log(commentUserData)
			if (commentUserData.length > 0) {
				const isCommentedByRequestUser = commentUserData[0];
				const commentId = commentUserData[1]
				setCommentedByRequestUser((state) => ({ ...state, [commentId]: isCommentedByRequestUser }));
				
			}
		},
		[ commentUserData ]
	);
	useEffect(
		() => {
			if (commentLikeData.length > 0) {
				console.log(commentLikeData)
				const likeSum = commentLikeData[0]
				const isLikedByRequestUser = commentLikeData[1];
				const commentId = commentLikeData[2]
				setLikedByRequestUser((state) => ({ ...state, [commentId]: isLikedByRequestUser }));
				setLikeNum((state) => ({ ...state, [commentId]: likeSum }));
				console.log(likedByRequestUser)
			}
		},
		[ commentLikeData ]
	);

    const clickLike = () =>{
        const commentLikeData = new FormData()
        commentLikeData.append('comment', props.comment.id)
        dispatch(postCommentLike(commentLikeData))
    }
	const handleExpandClick = (commentId) => {
        setExpandControllerList((state) => ({ ...state, [props.comment.id]: !expandControllerList[props.comment.id] }));
	};

	return (
		<CardContent className="py-0" >
				<div className="profileImg">
					<Avatar alt="" src={props.comment.profile.profile_img} />
				</div>
                
				<div className="commentContent">
				<small>{props.comment.user.username}</small><br/>
					<Typography component="span" variant="body2" color="textPrimary">
						{props.comment.content}
					</Typography>
					<CardActions disableSpacing>
                    <FormControlLabel
				control={
					<Checkbox
						icon={<FavoriteBorder />}
						checkedIcon={<Favorite />}
						onClick={(e)=>clickLike(e)}
                        color="secondary"
                        checked={likedByRequestUser[props.comment.id]?true:false}
					/>
				}
				label={`${likeNum[props.comment.id]} Like`}
			/>
			<FormControlLabel
				control={
					<Checkbox
						icon={<CommentOutlinedIcon />}
						checkedIcon={<CommentIcon />}
                        color="primary"
						checked={repliedByRequestUser[props.comment.id]?true:false}
						style={{cursor:'default'}}
					/>
				}
				label={`${props.comment.replyNum} Reply`}
				style={{cursor:'default'}}
			/>
                        {profileData.user.id == props.comment.user.id ? <ConfirmationDelete commentId={props.comment.id}/> : ''}
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
