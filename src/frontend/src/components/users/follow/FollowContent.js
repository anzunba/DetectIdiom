import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import ConfirmationDelete from './ConfirmationDelete';

export default function InteractiveList() {
	return (
		<div>
			<div>
				<List>
					<ListItem>
						<ListItemAvatar>
							<Avatar className="mr-5">
								<FolderIcon />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Single-line item" secondary={'language'} />
						<ListItemSecondaryAction>
							<ConfirmationDelete />
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</div>
		</div>
	);
}
