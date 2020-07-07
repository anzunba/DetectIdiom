import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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
import {showPage} from '../../actions/page';
import { useDispatch} from 'react-redux';
import Auth from './Auth';


const Nav = () => {
	const dispatch = useDispatch();
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

	
	const [ open, setOpen ] = useState(false);

	const handleOpen = () => {
		setOpen(true);
		dispatch(showPage('edit'))
	};

	const handleClose = () => {
		setOpen(false);
	};

	const textProcessingDone = useSelector((state) => state.edit)
	useEffect(() => {
		textProcessingDone ? setLoader(false) : ''
	}, [textProcessingDone])

	const isEdit = useSelector((state) => state.startLoader);
	useEffect(() => {
	if(isEdit){
		setLoader(true) ;
		dispatch(showPage('edit'))
	} 
	}, [isEdit])

	const [loader, setLoader] = useState(false)
	const callback = (handleClose) => {
		if(handleClose){
			setOpen(false)
			setLoader(true)
		} else{
			setOpen(true);
		}
	};
	const getMyProfile = () =>{
		dispatch(showPage('profile'))
	}
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
					
					<IconButton onClick={() => getMyProfile()} className="text-light">
							<PersonIcon />
						</IconButton>
						<IconButton onClick={() => dispatch(showPage('home'))} className="text-light">
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
						<Auth />
					</div>
				</Toolbar>
				{loader? <LinearProgress/> : ''}
			</AppBar>
			
		</div>
	);
};

export default Nav;
