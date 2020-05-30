import React, { Fragment } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Order from './Order'
import Block from './Block'
import IconButton from '@material-ui/core/IconButton';

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
                { true ? <Order /> : <Block />}
				
			</Popover>
		</React.Fragment>
	);
}
