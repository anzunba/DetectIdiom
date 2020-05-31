import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import List from './List';

export default function SimplePopover() {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const [ selectedLang, setSelectedLang ] = useState('');
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
		setSelectedLang(e.currentTarget.id);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	const lang_arr = [ 'en', 'ja', 'fr' ];
	const lang_frags = [];
	const selectedLangFlag = document.getElementById(selectedLang);

	function resetLevel() {
		selectedLangFlag.classList.remove('no-circle');
		selectedLangFlag.classList.remove('circle90');
		selectedLangFlag.classList.remove('circle180');
		selectedLangFlag.classList.remove('circle270');
        selectedLangFlag.classList.remove('circle360');
        selectedLangFlag.classList.remove('circleNative');
		document.getElementById(selectedLang).children[0].classList.remove('fix-img');
	}
	const callback = (level) => {
		document.getElementById(selectedLang).classList.add('circle90');
		switch (level) {
			case 'Beginner':
				resetLevel();
				selectedLangFlag.classList.add('circle90');
				document.getElementById(selectedLang).children[0].classList.add('fix-img');
				break;
			case 'Intermediate':
				resetLevel();
				selectedLangFlag.classList.add('circle180');
				document.getElementById(selectedLang).children[0].classList.add('fix-img');
				break;
			case 'Advanced':
				resetLevel();
				selectedLangFlag.classList.add('circle270');
				document.getElementById(selectedLang).children[0].classList.add('fix-img');
				break;
			case 'Fluent':
				resetLevel();
				selectedLangFlag.classList.add('circle360');
				break;
			case 'Native':
				resetLevel();
				selectedLangFlag.classList.add('circleNative');
				break;
			default:
                resetLevel();
				selectedLangFlag.classList.add('no-circle');
				break;
		}
	};

	function lang_flag(key, lang) {
		const flag_address = `/static/frontend/images/${lang}-circle.svg`;
		return (
			<div className="w-25" key={key}>
				<div id={lang} onClick={handleClick} className="no-circle">
					<img src={flag_address} className="w-100" />
				</div>
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center'
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center'
					}}
				>
					<List parentCallback={callback} />
				</Popover>
			</div>
		);
	}
	for (const [ index, value ] of lang_arr.entries()) {
		lang_frags.push(lang_flag(index, value));
	}
	return (
		<React.Fragment>
			<div className="d-flex justify-content-between mt-3">{lang_frags}</div>
		</React.Fragment>
	);
}
