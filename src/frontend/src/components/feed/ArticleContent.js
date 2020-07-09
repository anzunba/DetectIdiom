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
import CommentBox from './CommentBox';
import IconButtons from './IconButtons';
import Block from './Block';
import Quiz from './Quiz';
import WordTable from './WordTable';
import Divider from '@material-ui/core/Divider';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useDispatch, useSelector } from 'react-redux';
import { startLoader } from '../../actions/startLoader';
import { getWordIdioms } from '../../actions/getWordIdiom';
import { getArticle, getAllArticle, getCustomUserArticle } from '../../actions/article';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getProcessedText } from '../../actions/getProcessedText';
import { showPage } from '../../actions/page';
import { getCustomUserProfile } from '../../actions/profile';

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

const ArticleContent = (props) => {
    const [expandControllerList, setExpandControllerList]= useState({})
	const dispatch = useDispatch();
    const classes = useStyles();
    
    useEffect(() => {
        setExpandControllerList((state) => ({ ...state, [props.article.id]: false }));
    }, [])

	const handleExpandClick = (articleId) => {
        setExpandControllerList((state) => ({ ...state, [props.article.id]: !expandControllerList[props.article.id] }));
	};

	const [ croppedImg, setCroppedImg ] = useState('/static/frontend/images/user.png');

	const profileData = useSelector((state) => state.getRequestUserProfile);

	useEffect(
		() => {
			setCroppedImg(profileData.profile_img);
		},
		[ profileData ]
	);
	dayjs.extend(relativeTime);

	const showEdit = (fileContent, wordIdioms) => {
		dispatch(getProcessedText(fileContent));
		dispatch(getWordIdioms(wordIdioms));
		dispatch(startLoader(Math.random()));
	};

	const getCustomUser = (userId) => {
		dispatch(getCustomUserArticle(userId));
		dispatch(getCustomUserProfile(userId));
		dispatch(showPage('profile'));
	};
	return (
		<div className="bg-light m-1" >
			<div className="d-flex flex-row pt-3 pl-3">
				<Avatar
					alt=""
					src={props.article.profile.profile_img}
					className="border cursor img-55 hover-img"
					onClick={() => getCustomUser(props.article.user.id)}
				/>
				<div className="pl-3">
					<h5
						className="d-block pt-1 my-0 hover-blue cursor"
						onClick={() =>
							showEdit(props.props.article.content, [ props.article.word, props.article.idiom ])}
					>
						{props.article.title}
					</h5>
					<small className="d-block hover-blue cursor" onClick={() => getCustomUser(props.article.user.id)}>
						{props.article.user.username}
					</small>
					<small className="d-block">{dayjs(props.article.updated_at).fromNow()}</small>
				</div>
			</div>
			<CardContent>
				<Typography variant="body1" color="textSecondary" component="span" className="pb-2">
					{props.article.content}
				</Typography>
				<CardActions disableSpacing className="p-0">
					<IconButtons />
				</CardActions>
				<Divider />
				<div className="d-flex">
					<span className="w-50">
						<Quiz
							data={[
								props.article.origin_sentence,
								props.article.translated_sentence,
								props.article.word,
								props.article.idiom
							]}
						/>
					</span>
					<span className="w-50">
						<WordTable data={[ props.article.word, props.article.idiom ]} />
					</span>
				</div>
				<Divider />
				<CardActions className="px-0">
					<div className="w-95 p-0 topCommentBox">
						<CommentBox profileImg={croppedImg} articleId={props.article.id} />
					</div>
					<div className="w-10 ml-0 mt-3">
						<IconButton
							className={clsx(classes.expand, {
								[classes.expandOpen]: expandControllerList[props.article.id]
							})}
							onClick={()=>handleExpandClick(props.article.id)}
							aria-expanded={expandControllerList[props.article.id]}
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</IconButton>
					</div>
				</CardActions>
			</CardContent>
			<Collapse in={expandControllerList[props.article.id]} timeout="auto" unmountOnExit>
				<Comment articleId={props.article.id} />
			</Collapse>
		</div>
	);
};
export default ArticleContent;
