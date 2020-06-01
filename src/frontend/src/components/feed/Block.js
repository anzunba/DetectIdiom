import React, { Fragment } from 'react';
import Popover from '@material-ui/core/Popover';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
	}
}));

export default function SimplePopover() {
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const classes = useStyles();

	return (
		<React.Fragment>
			<MoreHorizIcon aria-describedby={id} variant="contained" color="primary" onClick={handleClick} />

			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
			>
				{/* { true ? <Order /> : <Block />} */}
				<div className={classes.root}>
					<div component="nav" className="py-3">
						<ListItem button>
							<ListItemText primary="Block" />
						</ListItem>
						<ListItem button>
							<ListItemText primary="Unfollow" />
						</ListItem>
					</div>
				</div>
			</Popover>
		</React.Fragment>
	);
}
