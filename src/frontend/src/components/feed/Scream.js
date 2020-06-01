import React from 'react';
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
import Card from '../card/Card';
import WordTable from '../wordTable/WordTable';
import Divider from '@material-ui/core/Divider';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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

	return (
		<div>
			<CardHeader
				avatar={
					<Avatar alt="" src="/static/frontend/images/bear.png" ria-label="recipe" className="border">
						R
					</Avatar>
				}
				action={
					<div className="d-flex">
						<img src="/static/frontend/images/en-circle.svg" style={{width:'20px'}}/>
						<NavigateNextIcon />
						<img src="/static/frontend/images/ja-circle.svg" style={{width:'22px'}}/>

						<IconButton aria-label="settings" className="py-0 pl-3">
							<Block />
						</IconButton>
					</div>
				}
				title="Shrimp and Chorizo Paella"
				subheader="September 14, 2016"
			/>
			<CardContent>
				<Typography variant="body1" color="textSecondary" component="span" className="pb-2">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</Typography>
				<CardActions disableSpacing className="p-0">
					<IconButtons />
				</CardActions>
				<Divider />
				<div className="d-flex">
					<span className="w-50">
						<Card />
					</span>
					<span className="w-50">
						<WordTable />
					</span>
				</div>
				<Divider />
				<CardActions className="px-0">
					<div className="w-95 p-0 topCommentBox">
						<CommentBox />
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
}
