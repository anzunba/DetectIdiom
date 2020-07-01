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
import Card from './Card';
import WordTable from './WordTable';
import Divider from '@material-ui/core/Divider';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../actions/profile';
import { getArticle } from '../../actions/edit4';
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"


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

export default function RecipeReviewCard() {
	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const dispatch = useDispatch();
	const [ croppedImg, setCroppedImg ] = useState('/static/frontend/images/user.png');
	useEffect(() => {
		dispatch(getProfile());
		dispatch(getArticle());
	}, []);
	const p = useSelector((state) => state.profile);
	const content = useSelector((state) => state.edit4);
	useEffect(
		() => {
			setCroppedImg(p.profile_img);
		},
		[ p ]
	);
dayjs.extend(relativeTime)
	return (
		<div>
			{content.map((c, i) => {
			
				return (
					<div className="bg-light m-1" key={i}>
						<CardHeader
							avatar={<Avatar alt="" src={croppedImg} ria-label="recipe" className="border" />}
							action={
								<div className="d-flex">
									<img src="/static/frontend/images/en-circle.svg" style={{ width: '20px' }} />
									<NavigateNextIcon />
									<img src="/static/frontend/images/ja-circle.svg" style={{ width: '22px' }} />

									<IconButton aria-label="settings" className="py-0 pl-3">
										<Block />
									</IconButton>
								</div>
							}
							title={c.title}
							subheader={dayjs(c.updated_at).fromNow()}
						/>
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
								<Card data={[c.word, c.idiom]}/>
								</span>
								<span className="w-50">
									<WordTable />
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
			})}
		</div>
	);
}
