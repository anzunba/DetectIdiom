import React, { useState, useCallback, useRef, useEffect, Fragment } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import { updateProfile } from '../../actions/getRequestUserProfile';
import { updateLanguage } from '../../actions/language';
import { useDispatch } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import CreateIcon from '@material-ui/icons/Create';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
let nativeLangLevels = {};
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getArticle, getAllArticle } from '../../actions/article';

const useStyles = makeStyles((theme) => ({
	profileEditModal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	cropperModal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '10% auto',
		width: '600px'
	}
}));

const pixelRatio = 4;
const getResizedCanvas = (canvas, newWidth, newHeight) => {
	const tmpCanvas = document.createElement('canvas');
	tmpCanvas.width = newWidth;
	tmpCanvas.height = newHeight;

	const ctx = tmpCanvas.getContext('2d');
	ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight);

	return tmpCanvas;
};

const App = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [ profileEditOpen, setProfileEditOpen ] = useState(false);
	const [ cropperOpen, setCropperOpen ] = useState(false);
	const [ profileLang, setProfileLang ] = useState('');
	const [ profileBio, setProfileBio ] = useState('');
	const [ croppedImg, setCroppedImg ] = useState('');
	const [lang, setLang] = useState('');
	const handleProfileName = (e) => {
		setProfileName(e.target.value);
	};
	const handleProfileBio = (e) => {
		setProfileBio(e.target.value);
	};

	const handleProfileEditOpen = () => {
		setProfileEditOpen(true);
	};

	const handleProfileEditClose = () =>{
		setProfileEditOpen(false);
	}



	const handleCropperOpen = () => {
		setCropperOpen(true);
	};

	const handleProfileSave = () => {
		const formData = new FormData();
		formData.append('bio', profileBio)
		formData.append('language', lang)
		console.log('lang: ' + lang)
		formData.append('profile_img', croppedImg, 'croppedProfileImg.png')
		dispatch(updateProfile(formData))
		setProfileEditOpen(false);
	};

	// const onUpdateProfile = () => {
	// 	dispatch(updateProfile('test'));
	// };

	/*********************/
	/***Lang Edit Start**/
	/********************/
	// const [ anchorEl, setAnchorEl ] = React.useState(null);
	// const [ selectedLang, setSelectedLang ] = useState('');
	// const [ selectedLangLevel, setSelectedLangLevel ] = useState([]);
	// const handleLangListOpen = (e) => {
	// 	setAnchorEl(e.currentTarget);
	// 	setSelectedLang(e.currentTarget.id);
	// };

	// const handleLangListClose = () => {
	// 	setAnchorEl(null);
	// };
	// const open = Boolean(anchorEl);
	// const langListPopoverId = open ? 'simple-popover' : undefined;
	// const langsList = [ 'en', 'ja', 'fr' ];
	// const langFrags = [];
	// const [ fixFlag, setFixFlag ] = useState({});
	// const fragLevelStyle = {
	// 	Beginner: 'circle90',
	// 	Intermediate: 'circle180',
	// 	Advanced: 'circle270',
	// 	Fluent: 'circle360',
	// 	Native: 'circleNative',
	// 	None: 'no-circle'
	// };
	// const handleLevel = (level) => {
	// 	setSelectedLangLevel((state) => ({ ...state, [selectedLang]: fragLevelStyle[level] }));
	// 	if (level == 'Beginner' || level == 'Intermediate' || level == 'Advanced') {
	// 		setFixFlag((state) => ({ ...state, [selectedLang]: 'fix-img' }));
	// 	} else {
	// 		setFixFlag((state) => ({ ...state, [selectedLang]: '' }));
	// 	}
	// 	nativeLangLevels[selectedLang] = level;
	// };

	// let listLevelItem = [];
	// const languageLevelList = [ 'None', 'Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native' ];
	// languageLevelList.map((level, i) => {
	// 	listLevelItem.push(
	// 		<MenuItem key={i} onClick={() => handleLevel(level)}>
	// 			{level}
	// 		</MenuItem>
	// 	);
	// });

	// const createLangFlagsHtml = (i, lang) => {
	// 	const flag_address = `/static/frontend/images/${lang}-circle.svg`;
	// 	return (
	// 		<div key={i}>
	// 			<div
	// 				id={lang}
	// 				onClick={handleLangListOpen}
	// 				className={`${selectedLangLevel[lang] === undefined
	// 					? 'no-circle'
	// 					: selectedLangLevel[lang]} w-50 mx-auto`}
	// 			>
	// 				<Badge
	// 									overlap="circle"
	// 									anchorOrigin={{
	// 										vertical: 'bottom',
	// 										horizontal: 'right'
	// 									}}
	// 									badgeContent={<CreateIcon className="profileImgEdit" />}
	// 								><img src={flag_address} className={`${fixFlag[lang]} w-100 cursor`} /></Badge>
	// 			</div>
	// 			<Popover
	// 				id={langListPopoverId}
	// 				open={open}
	// 				anchorEl={anchorEl}
	// 				onClose={handleLangListClose}
	// 				anchorOrigin={{
	// 					vertical: 'bottom',
	// 					horizontal: 'center'
	// 				}}
	// 				transformOrigin={{
	// 					vertical: 'top',
	// 					horizontal: 'center'
	// 				}}
	// 			>
	// 				{listLevelItem}
	// 			</Popover>
	// 		</div>
	// 	);
	// };
	// for (const [ index, value ] of langsList.entries()) {
	// 	langFrags.push(createLangFlagsHtml(index, value));
	// }

	/*********************/
	/*Crpper Modal Start*/
	/********************/


	const handleCropImg = (previewCanvas, crop) => {
		if (!crop || !previewCanvas) {
			return;
		}
		const canvas = getResizedCanvas(previewCanvas, crop.width, crop.height);
		canvas.toBlob(
			(blob) => {
				setCroppedImg(blob);
				setPrevProfileImg(URL.createObjectURL(blob));
			},
			'image/png',
			1
		);

		setCropperOpen(false);
	};

	const [ upImg, setUpImg ] = useState();
	const imgRef = useRef(null);
	const previewCanvasRef = useRef(null);
	const [ crop, setCrop ] = useState({ unit: 'px', width: 150, aspect: 1 / 1 });
	const [ completedCrop, setCompletedCrop ] = useState(null);
	const onSelectFile = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			const reader = new FileReader();
			reader.addEventListener('load', () => setUpImg(reader.result));
			reader.readAsDataURL(e.target.files[0]);
			handleCropperOpen();
		}
	};

	const onLoad = useCallback((img) => {
		imgRef.current = img;
	}, []);

	useEffect(
		() => {
			if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
				return;
			}

			const image = imgRef.current;
			const canvas = previewCanvasRef.current;
			const crop = completedCrop;

			const scaleX = image.naturalWidth / image.width;
			const scaleY = image.naturalHeight / image.height;
			const ctx = canvas.getContext('2d');

			canvas.width = crop.width * pixelRatio;
			canvas.height = crop.height * pixelRatio;

			ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
			ctx.imageSmoothingEnabled = false;

			ctx.drawImage(
				image,
				crop.x * scaleX,
				crop.y * scaleY,
				crop.width * scaleX,
				crop.height * scaleY,
				0,
				0,
				crop.width,
				crop.height
			);
		},
		[ completedCrop ]
	);

	console.log(props.profileImg)
	const [ prevProfileImg, setPrevProfileImg ] = useState('/static/frontend/images/user.png');
	useEffect(() => {
		props.profileImg ? setPrevProfileImg(props.profileImg) : ''
	}, [props.profileImg])


  const handleLangChange = (e) => {
    setLang(e.target.value);
  };

	return (
		<div>
			<Button type="button" size="small" color="primary" onClick={handleProfileEditOpen} className="w-100">
				Edit
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.profileEditModal}
				open={profileEditOpen}
				onClose={handleProfileEditClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={profileEditOpen}>
					<div>
						<div className="bg-light text-center modalBorder">
							<div>
								<label htmlFor="profileImg">
									<Badge
										overlap="circle"
										anchorOrigin={{
											vertical: 'bottom',
											horizontal: 'right'
										}}
										badgeContent={<CreateIcon className="profileImgEdit" />}
									>
										<Avatar alt="" src={prevProfileImg} className="mt-3 cursor profileAvatar" />
									</Badge>
								</label>
								<input
									id="profileImg"
									type="file"
									accept="image/*"
									onChange={onSelectFile}
									className="d-none"
								/>
							</div>
							<Modal
								aria-labelledby="transition-modal-title"
								aria-describedby="transition-modal-description"
								className={classes.cropperModal}
								open={cropperOpen}
								closeAfterTransition
								BackdropComponent={Backdrop}
								BackdropProps={{
									timeout: 500
								}}
							>
								<Fade in={cropperOpen}>
									<div className="bg-light d-flex flex-column">
										<div className="d-flex justify-content-between px-2 pt-5">
											<ReactCrop
												src={upImg}
												onImageLoaded={onLoad}
												crop={crop}
												onChange={(c) => setCrop(c)}
												onComplete={(c) => setCompletedCrop(c)}
												className="w-50"
											/>
											<div className="text-center w-50 p-2">
												<canvas
													ref={previewCanvasRef}
													style={{
														width: '100%',
														height: '100%',
														borderRadius: '50%'
													}}
												/>
											</div>
										</div>
										<Button
											color="primary"
											type="button"
											// disabled={!completedCrop?.width || !completedCrop?.height}
											onClick={() => handleCropImg(previewCanvasRef.current, completedCrop)}
											className="w-100"
										>
											Crop!
										</Button>
									</div>
								</Fade>
							</Modal>
							<form noValidate autoComplete="off" className="px-5">
								{/* <TextField
									id="standard-basic"
									label="Name"
									className="w-100 mt-2"
									value={profileName}
									onChange={handleProfileName}
								/> */}
								<TextField
									id="standard-multiline-static"
									label="Bio"
									multiline
									rows={4}
									className="w-100 mt-2"
									value={profileBio}
									onChange={handleProfileBio}
								/>
								{/* <div className="d-flex justify-content-between my-5 px-5">{langFrags}</div> */}
								<FormControl className="w-100 mt-5">
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          You learn
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="demo-simple-select-placeholder-label"
          value={lang}
          onChange={handleLangChange}
          displayEmpty

        >
          <MenuItem value="en">
            <em>English</em>
          </MenuItem>
          <MenuItem value="ja">Japanese</MenuItem>
        </Select>
      </FormControl>
							</form>
							<Button
								className="w-100 mt-5"
								color="primary"
								size="large"
								fullWidth
								onClick={handleProfileSave}
							>
								Save
							</Button>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default App;
