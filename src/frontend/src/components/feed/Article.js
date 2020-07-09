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
import ArticleContent from './ArticleContent';
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


const Article = () => {
	const content = useSelector((state) => state.article);
	const [ articleContent, setArticleContent ] = useState([]);

	useEffect(
		() => {
			setArticleContent(content);
		},
		[ content ]
	);

	return (
		<div>
			{articleContent.length == 0 ? (
				<div className="bg-light m-1 p-5 text-center">Not Available</div>
			) : (
				articleContent.map((article, i) => {
					return(
					<ArticleContent article={article} key={i}/>);
				})
			)}
		</div>
	);
};
export default Article;
