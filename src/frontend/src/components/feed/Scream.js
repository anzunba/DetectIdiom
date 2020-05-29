import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Comment from './Comment';
import CommentBox from './CommentBox';
import IconButtons from './IconButtons';
import SettingPopover from './SettingPopover';

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
	},
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
					<Avatar alt="" src="/static/frontend/images/bear.png" ria-label="recipe">
						R
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
                        <SettingPopover/>
					</IconButton>
				}
				title="Shrimp and Chorizo Paella"
				subheader="September 14, 2016"
			/>
			<CardContent>
				<Typography variant="body1" color="textSecondary" component="span">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
					cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.
				</Typography>
                <CardActions disableSpacing>
				<span className={classes.iconButtons}>
					<IconButtons />
				</span>

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
			</CardActions>
			</CardContent>
			
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
                    <CommentBox />
					<Comment />
				</CardContent>
			</Collapse>
		</div>
	);
}
