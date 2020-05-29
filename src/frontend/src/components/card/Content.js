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

const questions = [
	{
		text:
			'text1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	},
	{
		text:
			'text2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
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
			console.log('activeStep+' + activeStep);
			setActiveStep((prevActiveStep) => prevActiveStep - 1);
		}
	};
	const stepper = (
		<MobileStepper
			steps={maxSteps}
			position="static"
			variant="text"
			activeStep={activeStep}
			nextButton={
				<Button size="small" onClick={handleNext}>
					{activeStep === maxSteps - 1 ? 'Finish' : 'Next'}
					{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
				</Button>
			}
			backButton={
				<Button size="small" onClick={handleBack}>
					{activeStep === maxSteps + 1 ? 'Start' : 'Back'}
					{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
				</Button>
			}
		/>
	);

	const question = (
		<div>
			<Card elevation={0}>
				<CardActionArea>
					<CardContent />
					<CardContent>
						<Typography variant="h6">
							{console.log(questions[activeStep])}
							{questions[activeStep] != undefined ? (
								questions[activeStep].text
							) : (
								console.log('text is undefined')
							)}
						</Typography>
					</CardContent>
					<CardContent />
				</CardActionArea>
			</Card>
			{stepper}
		</div>
	);

	const end = (
		<div>
			<End />
			<Button size="small" onClick={handleBack}>
				<KeyboardArrowLeft />
				Back
			</Button>
		</div>
	);

	const start = (
		<div>
			<Start />
			<Button size="small" onClick={handleNext}>
				<KeyboardArrowRight />
				Next
			</Button>
		</div>
	);
	return <div>{activeStep === maxSteps ? end : activeStep < 0 ? start : question}</div>;
}
