import React, {Fragment} from 'react';
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
import CardContent from '@material-ui/core/CardContent';

export default function AlignItemsList() {
	const message1 =
		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

	return (
		<React.Fragment>
			<div className="profileImg">
				<Avatar alt="" src="/static/frontend/images/bear.png" ria-label="recipe">
					R
				</Avatar>
			</div>
			<div className="commentContent">
				<Typography component="span" variant="body2" color="textPrimary">
					{message1}
				</Typography>
				<IconButtons />
			</div>
		</React.Fragment>
	);
}
