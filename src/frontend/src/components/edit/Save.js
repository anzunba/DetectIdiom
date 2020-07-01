import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { createArticle, updateArticle } from '../../actions/edit4';

export default function FormDialog() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [title, setTitle] = useState('')

  const handleSaveProject = () =>{
    const formData = new FormData();
		formData.append('title', title)
		formData.append('content', inputText)
		dispatch(createArticle(formData))
    setOpen(false);
  }

  const handleTitle = (e) =>{
    setTitle(e.target.value);
  }
	const inputText = useSelector((state) => state.edit2);
	
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Save
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Good Work!</DialogTitle>
        <DialogContent>
            <span className="save-img d-flex justify-content-center pb-3"><img src="/static/frontend/images/pig.png" /></span>
          {/* <DialogContentText>
            Please input the title.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            value={title}
						onChange={handleTitle}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveProject} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
