import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ProfileEdit from './ProfileEdit';
import Follow from './Follow';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid';
import ProfileTab from './ProfileTab';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile} from '../../actions/profile';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		border: '1px solid #eee'
	},
	large: {
		width: theme.spacing(20),
		height: theme.spacing(20),
		margin: '.5rem auto',
		border: '1px solid #eee'
	}
}));

export default function ImgMediaCard() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [ profileBio, setProfileBio ] = useState('');
	const [ croppedImg, setCroppedImg ] = useState("/static/frontend/images/user.png");
	useEffect(() => {
		dispatch(getProfile());
	}, []);
	const p = useSelector((state) => state.profile);

	useEffect(
		() => {
			setProfileBio(p.bio);
			setCroppedImg(p.profile_img);
		},
		[ p ]
	);

	return (
		<Grid container spacing={3}>
			<Grid item xs={8}>
				<ProfileTab />
			</Grid>
			<Grid item xs={4}>
				<div>
					<Avatar alt="" src={croppedImg} className={classes.large} />

					<CardContent>
						<div className="d-flex justify-content-between">
							<Typography gutterBottom variant="h5" component="h2">
								Anna Nakatsuji
							</Typography>
							<div className="d-flex pb-2 pr-2">
								<img src="/static/frontend/images/en-circle.svg" style={{ width: '20px' }} />
								<span className="align-self-center">
									<NavigateNextIcon />
								</span>
								<img src="/static/frontend/images/ja-circle.svg" style={{ width: '22px' }} />
							</div>
						</div>
						<Typography variant="body2" color="textSecondary" component="p">
							{profileBio}
						</Typography>
					</CardContent>
				</div>
				<CardActions>
					<div className="w-50">
						<ProfileEdit />
					</div>
					<div className="w-50">
						<Follow />
					</div>
				</CardActions>
			</Grid>
		</Grid>
	);
}