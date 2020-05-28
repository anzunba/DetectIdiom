import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButtons from './IconButtons';
import CommentBox from './CommentBox';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardContent from '@material-ui/core/CardContent';
import Reply from './Reply';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper
	},
	inline: {
		display: 'inline'
	},
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
		<List className={classes.root}>
			<CommentBox />
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
				</ListItemAvatar>
				<ListItemText
					primary={message1}
					secondary={
						<React.Fragment>
							<Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
								1 minute ago
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
							<Collapse in={expanded} timeout="auto" unmountOnExit>
								<CardContent>
									<Reply />
								</CardContent>
							</Collapse>
						</React.Fragment>
					}
				/>
			</ListItem>
		</List>
	);
}
