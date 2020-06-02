import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoginNav from './LoginNav';
import AddIcon from '@material-ui/icons/Add';
import CreateProject from './CreateProject';
import Notification from './Notification'

export default function ButtonAppBar() {
	return (
		<div>
			<AppBar position="static">
				<Toolbar className="justify-content-between">
					<div className="d-flex"> 
						<span edge="start" color="inherit" aria-label="menu">
							<img src="/static/frontend/images/takedabishi.png" width="60" height="60" />
						</span>
						<Typography variant="h6" className="align-self-center pl-2">Detect-IDIOM</Typography>
					</div>
					<div className="d-flex">
						<Notification />
						<CreateProject />
						<LoginNav/>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
