import React from 'react';
import TextField from '@material-ui/core/TextField';

const App = ({getFileContentCallback}) => {
	return (
		<div className="p-5">
			<form noValidate autoComplete="off">
				<div>
					<TextField
						id="outlined-multiline-static"
						label="Input your text"
						multiline
						rows={15}
                        variant="outlined"
						fullWidth
						onChange={(e)=>getFileContentCallback(e.target.value)}
					/>
				</div>
			</form>
		</div>
	);
}

export default App;
