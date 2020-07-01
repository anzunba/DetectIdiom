import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Card from '@material-ui/core/Card';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		margin: '0 auto'
	},
}));

const questions = [
	{
		text:
			'text1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		textRuby:
			'ruby - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		word: 'ruby',
		wordRuby: 'wordRuby'
	},
	{
		text:
			'text1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		textRuby:
			'ruby - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		word: 'ruby',
		wordRuby: 'wordRuby'
	}
];

const difficultList = [ 'easy', 'neutral', 'difficult' ];

function createData(num, wordIdiom, difficulty) {
	return { num, wordIdiom, difficulty };
}

const rows = [
	createData(1, 'for a while', 'easy'),
	createData(2, 'take it easy', 'difficult'),
	createData(3, 'spagettii', 'neutral'),
	createData(4, 'sausage', 'easy'),
	createData(5, 'orange', 'difficult')
];
const App = (props) => {
	if(props.data[0] && props.data[0] != "[object Object]" && props.data[1] && props.data[1] != '[object Object]'){
		const wordList = JSON.parse(props.data[0])
		const idiomList = JSON.parse(props.data[1])
		for (let key in wordList){
			for(let i in wordList[key]){
				let one_question = {}
				one_question['text'] = 'text'
				one_question['textRuby'] = 'textRuby'
				one_question['word'] = i
				one_question['wordRuby'] = wordList[key][i]
				console.log(one_question)
				questions.push(one_question)
			}
		}
		for (let key in idiomList){
			for(let i in idiomList[key]){
				let one_question = {}
				one_question['text'] = 'text'
				one_question['textRuby'] = 'textRuby'
				one_question['word'] = i
				one_question['wordRuby'] = idiomList[key][i]
				console.log(one_question)
				questions.push(one_question)
			}
		}
	}
	
	const classes = useStyles();
	const [ cardOpen, setCardOpen ] = useState(false);

	const handleCardOpen = () => {
		setCardOpen(true);
	};

	const handleCardClose = () => {
		setCardOpen(false);
	};

	/****Card Content****/
	const theme = useTheme();
	const [ activeStep, setActiveStep ] = React.useState(-1);
	const maxSteps = questions.length;
	const handleNext = () => {
		if (maxSteps > activeStep) {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
	};

	const handleBack = () => {
		if (activeStep <= maxSteps) {
			setActiveStep((prevActiveStep) => prevActiveStep - 1);
		}
	};

	const stepperBack = (
		<Button size="small" onClick={handleBack} color="primary" className="w-50 p-3 mt-3">
			{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			{activeStep === 0 ? 'Settings' : 'Back'}
		</Button>
	);

	const stepperForward = (
		<Button size="small" onClick={handleNext} color="primary" className="w-50 p-3 mt-3">
			{activeStep === maxSteps - 1 ? 'Finish' : 'Next'}
			{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
		</Button>
	);
	const [ difficulty, setDifficulty ] = useState('easy');
	const handleDifficulty = (e) => {
		setDifficulty(e.target.value);
	};
	
	const radioButtons = (
		<form id="smileys" className="bg-light pt-4">
			<span className="d-flex justify-content-center pb-3">
				This question is<span className="difficultyText">{difficulty}</span>..
			</span>
			<div className="w-50 mx-auto text-center">
				{difficultList.map((d, i) => {
          return (
          <input
						key={i}
						type="radio"
						name="smiley"
						value={d}
						className={d}
						onClick={handleDifficulty}
						defaultChecked
					/>)
        })}
			</div>
		</form>
	);
	const questionCard = (
		<div>
			<span className="d-flex justify-content-center p-3 bg-light">
				{' '}
				{activeStep + 1} / {maxSteps}
			</span>
			<Card elevation={0}>
				<div className="p-5">
					{questions[activeStep] != undefined ? (
						<div className="my-0">
							<small className="mb-0">{questions[activeStep].textRuby}</small>
							<h5>{questions[activeStep].text}</h5>
							<div className="text-center">
								<small className="mb-0">{questions[activeStep].wordRuby}</small>
								<h1>{questions[activeStep].word}</h1>
							</div>
						</div>
					) : (
						''
					)}
				</div>
				{radioButtons}
			</Card>
			{stepperBack}
			{stepperForward}
		</div>
	);

	/****Start****/
	const [ cardCheckBox, setCardCheckBox ] = useState({ chkWord: true, chkIdiom: true, chkRandom: true });

	const handleChange = (e) => {
		setCardCheckBox({ ...state, [e.target.name]: e.target.checked });
	};
	const startCard = (
		<div className="text-center p-5 mt-70px">
			<img alt="" src="/static/frontend/images/wisdom.svg" style={{ width: '60px' }} />
			<FormGroup row className="mt-5 px-5 d-flex d-flex justify-content-around">
				<FormControlLabel
					control={<Checkbox checked={cardCheckBox.chkWord} onChange={handleChange} name="chkWord" />}
					label="Word"
				/>
				<FormControlLabel
					control={<Checkbox checked={cardCheckBox.chkIdiom} onChange={handleChange} name="chkIdiom" />}
					label="Idiom"
				/>
				<FormControlLabel
					control={<Checkbox checked={cardCheckBox.chkRandom} onChange={handleChange} name="chkRandom" />}
					label="Random"
				/>
			</FormGroup>
			<Button size="small" onClick={handleNext} fullWidth color="primary" className="fixed-bottom p-3">
				Start
			</Button>
		</div>
	);

	const endCard = (
		<div>
			<div className="text-center p-4">
				<h3>Well done!</h3>
				<img src="/static/frontend/images/coffee-break.svg/" className="img-60" />
			</div>

			<TableContainer className="p-2">
				<Table aria-label="simple table" className="table table-striped">
					<TableHead>
						<TableRow className="bg-blue">
							<TableCell className="text-white" align="center">
								#
							</TableCell>
							<TableCell className="text-white" align="left">
								Word/Idiom
							</TableCell>
							<TableCell className="text-white" align="center">
								Difficulty
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.num}>
								<TableCell component="th" scope="row" align="center">
									{row.num}
								</TableCell>
								<TableCell align="left">{row.wordIdiom}</TableCell>
								<TableCell align="center">
									<img src={`/static/frontend/images/${row.difficulty}.svg/`} className="img-25" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Button size="small" onClick={handleBack} color="primary" className="w-50 p-3">
				Back to questions
			</Button>
			<Button size="small" onClick={handleBack} fullWidth color="primary" className="w-50 p-3">
				Close
			</Button>
		</div>
	);

	return (
		<React.Fragment>
			<Button size="small" onClick={handleCardOpen} fullWidth color="primary" className="p-2">
				Try Card
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={cardOpen}
				onClose={handleCardClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
			>
				<Fade in={cardOpen}>
					<div className="w-100 bg-light shadow modalBorder">{activeStep === maxSteps ? endCard : activeStep < 0 ? startCard : questionCard}</div>
				</Fade>
			</Modal>
		</React.Fragment>
	);
};
export default App;
