import React from 'react';
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

export default function AlignItemsList() {
	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const message1 =
		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

	return (
		<div>
			<CardContent className="py-0">
				<div className="profileImg">
					<Avatar alt="" src="/static/frontend/images/bear.png" ria-label="recipe">
						R
					</Avatar>
				</div>
				<div className="commentContent">
					<Typography component="span" variant="body2" color="textPrimary">
						{message1}
					</Typography>
					<CardActions disableSpacing>
						<IconButtons />
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
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<div className="replyBox">
							<CommentBox />
							<Reply />
						</div>
					</Collapse>
				</div>
                </CardContent>
		</div>
	);
}
