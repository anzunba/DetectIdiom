import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginNav from './LoginNav';
import AddIcon from '@material-ui/icons/Add';
import Notification from './Notification';
import HomeIcon from '@material-ui/icons/Home';
import CreateProjectTab from './CreateProjectTab';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import PersonIcon from '@material-ui/icons/Person';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';
const App = ({ parentCallback }) => {
	const useStyles = makeStyles((theme) => ({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3)
		}
	}));

	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
		parentCallback('edit');
	};

	const handleClose = () => {
		setOpen(false);
	};
	const textProcessingDone = useSelector((state) => state.edit)
	const [loader, setLoader] = useState(false)
	const callback = (handleClose) => {
		if(handleClose){
			setOpen(false)
			setLoader(true)
		} else{
			setOpen(true);
		}
	};
	useEffect(() => {
		textProcessingDone ? setLoader(false) : ''
	}, [textProcessingDone])

	return (
		<div>
			<AppBar position="static">
				<Toolbar className="justify-content-between">
					<div className="d-flex">
						<span edge="start" color="inherit" aria-label="menu">
							<img src="/static/frontend/images/takedabishi.png" width="60" height="60" />
						</span>
						<Typography variant="h6" className="align-self-center pl-2">
							Detect-IDIOM
						</Typography>
					</div>
					<div className="d-flex">
					
					<IconButton onClick={() => parentCallback('profile')} className="text-light">
							<PersonIcon />
						</IconButton>
						<IconButton onClick={() => parentCallback('home')} className="text-light">
							<HomeIcon />
						</IconButton>
						
						<Notification />

						<div>
							<IconButton onClick={handleOpen} className="text-light">
								<AddIcon />
							</IconButton>
							<Modal
								aria-labelledby="transition-modal-title"
								aria-describedby="transition-modal-description"
								className={classes.modal}
								open={open}
								onClose={handleClose}
								closeAfterTransition
								BackdropComponent={Backdrop}
								BackdropProps={{
									timeout: 500
								}}
							>
								<Fade in={open}>
									<div>
										<CreateProjectTab handleCloseCallback={callback} />
									</div>
								</Fade>
							</Modal>
						</div>
						<LoginNav />
					</div>
				</Toolbar>
				{loader? <LinearProgress/> : ''}
			</AppBar>
			
		</div>
	);
};

export default App;
