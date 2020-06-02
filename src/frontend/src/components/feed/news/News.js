import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import FolderIcon from '@material-ui/icons/Folder';
const useStyles = makeStyles({
	root: {
		maxWidth: 345
	}
});

export default function ImgMediaCard() {
	const [ posts, setPosts ] = useState(null);

	useEffect(() => {
		axios
			.get('http://127.0.0.1:8000/feed')
			.then((res) => {
				setPosts(res.data);
			})
			//.then((res) => a(res))
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const classes = useStyles();
	const year = new Date().getFullYear();
	const month = new Date().getMonth();
	const day = new Date().getDay();
	const hour = new Date().getHours();
	const minute = new Date().getMinutes();
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const [ dt, setDt ] = useState(`${monthNames[month]} ${day} ${year} ${hour}:${minute}`);

	useEffect(() => {
		let secTimer = setInterval(() => {
			setDt(`${month} ${day} ${year} ${hour}:${minute}`);
		}, 60000);

		return () => clearInterval(secTimer);
	}, []);
	return (
		<React.Fragment>
			<Typography gutterBottom variant="h6" component="h6">
				{dt}
			</Typography>
				{posts === null ? (
					<div className="w-100 text-center">
						<CircularProgress />
					</div>
				) : (
					<div  className="shadow-sm rounded">
					{posts.map((post, i) => {
						return (
							
							<a key={i} href={post[0]}>
								<List>
									<ListItem>
										<ListItemIcon>
											<img src={post[2]} style={{ width: '50px' }} />
										</ListItemIcon>
										<ListItemText primary={post[1]} />
									</ListItem>
								</List>
							</a>
							
						);
						
					})}
					</div>
				)}
		</React.Fragment>
	);
}
