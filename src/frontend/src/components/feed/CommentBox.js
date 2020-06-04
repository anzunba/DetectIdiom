import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
export default function MultilineTextFields() {
  const form = (<form noValidate autoComplete="off">
  <div>
    <TextField
      id="outlined-multiline-flexible"
      label="Write Comment"
      multiline
      rowsMax={4}
      // value={value}
      // onChange={handleChange}
      variant="outlined"
      fullWidth
    />
  </div>
</form>)

  return (
          <React.Fragment>
             <CardContent>
				<div className="profileImg">
					<Avatar alt="" src="/static/frontend/images/bear.png" ria-label="recipe">
						R
					</Avatar>
				</div>
				<div className="commentContent">
					{form}
				</div>
			</CardContent>
          </React.Fragment>
  );
}
