import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Start from './Start';
import End from './End';
import Radio from './Radio';

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

export default function TextMobileStepper() {
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

	const end = (
		<div>
			<End />
			<Button size="small" onClick={handleBack} color="primary" className="w-50 p-3">
				Back to questions
			</Button>
			<Button size="small" onClick={handleBack} fullWidth color="primary" className="w-50 p-3">
				Close
			</Button>
		</div>
	);

	const start = (
		<div>
			<Start />
			<Button size="small" onClick={handleNext} fullWidth color="primary" className="p-3">
				Start
			</Button>
		</div>
	);

	const question = (
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
						console.log('text is undefined')
					)}
				</div>
				<Radio />
			</Card>
			{stepperBack}
			{stepperForward}
		</div>
	);
	
	return <div>{activeStep === maxSteps ? end : activeStep < 0 ? start : question}</div>;
}
