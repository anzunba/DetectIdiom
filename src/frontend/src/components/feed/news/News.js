import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		maxWidth: 345
	}
});

export default function ImgMediaCard() {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Typography gutterBottom variant="h6" component="h6">
				May 28 2020
			</Typography>
			<div className={classes.root}>
				<CardActionArea>
					<CardMedia
						component="img"
						alt="Contemplative Reptile"
						height="140"
						image="/static/frontend/images/news1.jpg"
						title="Contemplative Reptile"
					/>
					<CardContent>
						<Typography gutterBottom variant="h6" component="h6">
							Trump says right-wing voices are being censored. The data says something else
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
							all continents except Antarctica
						</Typography>
					</CardContent>
				</CardActionArea>
                <CardActionArea>
					<CardMedia
						component="img"
						alt="Contemplative Reptile"
						height="140"
						image="/static/frontend/images/news2.jpg"
						title="Contemplative Reptile"
					/>
					<CardContent>
						<Typography gutterBottom variant="h6" component="h6">
                        Big chains filed for bankruptcy every week in May. Here are 6 of them
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
							all continents except Antarctica
						</Typography>
					</CardContent>
				</CardActionArea>
			</div>
		</React.Fragment>
	);
}
