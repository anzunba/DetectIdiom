import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function MultilineTextFields() {
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
					/>
				</div>
			</form>
		</div>
	);
}
