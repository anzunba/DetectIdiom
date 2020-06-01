import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function ImgMediaCard() {
	const [ state, setState ] = React.useState({ checkedA: true, checkedB: true, checkedC: true });

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	return (
		<div className="text-center mt-5 p-5">
			<img alt="" src="/static/frontend/images/wisdom.svg" style={{ width: '60px' }} />
			<FormGroup row className="mt-5 d-flex d-flex justify-content-around">
				<FormControlLabel
					control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
					label="Word"
				/>
				<FormControlLabel
					control={<Checkbox checked={state.checkedB} onChange={handleChange} name="checkedB" />}
					label="Idiom"
				/>
				<FormControlLabel
					control={<Checkbox checked={state.checkedC} onChange={handleChange} name="checkedC" />}
					label="Random"
				/>
			</FormGroup>
		</div>
	);
}
