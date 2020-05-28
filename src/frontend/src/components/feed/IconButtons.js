import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';

export default function CheckboxLabels() {
	const [ state, setState ] = React.useState({
		checkedA: true,
		checkedB: true
	});

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	return (
		<div>
			<FormControlLabel
				control={
					<Checkbox
						icon={<FavoriteBorder />}
						checkedIcon={<Favorite />}
						name="checkedA"
						onChange={handleChange}
						color="secondary"
					/>
				}
				label="9 Like"
			/>
			<FormControlLabel
				control={
					<Checkbox
						icon={<CommentOutlinedIcon />}
						checkedIcon={<CommentIcon />}
						name="checkedB"
						onChange={handleChange}
						color="primary"
					/>
				}
				label="1 Comment"
			/>
		</div>
	);
}
