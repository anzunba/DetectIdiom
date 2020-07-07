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
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import { getProcessedText } from '../../actions/getProcessedText';
import { showPage } from '../../actions/page';
import { getCustomUserProfile } from '../../actions/profile';


export const profileImg = React.createContext();

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

const Article = () =>{
	const dispatch = useDispatch();
	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	
	const [ croppedImg, setCroppedImg ] = useState('/static/frontend/images/user.png');

	const profileData = useSelector((state) => state.profile);
	const content = useSelector((state) => state.article);
	const [articleContent, setArticleContent] = useState([])
	
	useEffect(() => {
		setArticleContent(content)
	}, [content])
	useEffect(
		() => {
			setCroppedImg(profileData.profile_img);
		},
		[ profileData ]
	);
dayjs.extend(relativeTime)

const showEdit = (fileContent, wordIdioms) =>{
	dispatch(getProcessedText(fileContent))
	dispatch(getWordIdioms(wordIdioms))
	dispatch(startLoader(Math.random()))
}

const getCustomUser = (userId)=>{
	dispatch(getCustomUserArticle(userId))
	dispatch(getCustomUserProfile(userId))
	dispatch(showPage('profile'))
}
const articleList = (
	articleContent.map((c, i) => {
		return (
			<div className="bg-light m-1" key={i}>
				<div className="d-flex flex-row pt-3 pl-3">
				<Avatar alt="" src={c.user.profile_img} className="border cursor img-55 hover-img" onClick={()=>getCustomUser(c.user.id)}/>
				<div className="pl-3"> 
				<h5 className="d-block pt-1 my-0 hover-blue cursor" onClick={()=>showEdit(c.content, [c.word, c.idiom])}>{c.title}</h5>
				<small className="d-block hover-blue cursor" onClick={()=>getCustomUser(c.user.id)}>{c.user.user.username}</small>
				<small className="d-block">{dayjs(c.updated_at).fromNow()}</small>
				</div>
				
				</div>
				<CardContent>
					<Typography variant="body1" color="textSecondary" component="span" className="pb-2">
						{c.content}
					</Typography>
					<CardActions disableSpacing className="p-0">
						<IconButtons />
					</CardActions>
					<Divider />
					<div className="d-flex">
						<span className="w-50">
						<Quiz data={[c.origin_sentence, c.translated_sentence, c.word, c.idiom]}/>
						</span>
						<span className="w-50">
							<WordTable data={[c.word, c.idiom]}/>
						</span>
					</div>
					<Divider />
					<CardActions className="px-0">
						<div className="w-95 p-0 topCommentBox">
							<profileImg.Provider value={croppedImg}>
								<CommentBox />
							</profileImg.Provider>
						</div>
						<div className="w-10 ml-0 mt-3">
							<IconButton
								className={clsx(classes.expand, {
									[classes.expandOpen]: expanded
								})}
								onClick={handleExpandClick}
								aria-expanded={expanded}
								aria-label="show more"
							>
								<ExpandMoreIcon />
							</IconButton>
						</div>
					</CardActions>
				</CardContent>
				<Collapse in={expanded} timeout="auto" unmountOnExit>
					<Comment />
				</Collapse>
			</div>
			
		);
	})
)


	return (
		<div>
			{content.length == 0 ? <div className="bg-light m-1 p-5 text-center">Not Available</div> : articleList}
		</div>
	);
}
export default Article;