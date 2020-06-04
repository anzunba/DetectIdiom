import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2)
	}
}));

export default function SimplePopover() {
	const classes = useStyles();
	const [ state, setState ] = React.useState({
		checkedA: true,
		checkedB: true
	});
	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
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
		<div>
			<IconButton aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
				<MoreHorizIcon />
			</IconButton>
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
					<FormGroup row>
            <ul className="list-group">
              <li className="list-group-item border-0">
              <FormControlLabel
							control={
								<Switch
									checked={state.checkedA}
									onChange={handleChange}
									name="checkedA"
									color="primary"
								/>
							}
              label="Translation"
						/>
              </li>
              <li className="list-group-item border-0">
              <FormControlLabel
							control={
								<Switch
									checked={state.checkedB}
									onChange={handleChange}
									name="checkedB"
									color="primary"
								/>
							}
							label="Custom Input"
						/>
              </li>
            </ul>
					</FormGroup>
			</Popover>
		</div>
	);
}
