import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		flexGrow: 1
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		backgroundColor: theme.palette.background.default
	}
}));

export default function TextMobileStepper() {
	const classes = useStyles();
	const theme = useTheme();
	const [ activeStep, setActiveStep ] = React.useState(0);
	const maxSteps = questions.length;
	const handleNext = () => {
        if(maxSteps  > activeStep){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
	};

	const handleBack = () => {
        if(activeStep <= maxSteps){
            console.log('activeStep+' + activeStep)
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
	};
	const aaa = (
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
			<Card elevation={0} className={classes.header}>
				<CardActionArea>
					<CardContent />
					<CardContent>
						<Typography variant="h6">
                            {console.log(questions[activeStep])}
                            {questions[activeStep] != undefined ? questions[activeStep].text : console.log("text is undefined")}
                        </Typography>
					</CardContent>
					<CardContent />
				</CardActionArea>
			</Card>
			{aaa}
		</div>
    );
    
	const end = (
		<div>
			<h1>This is end</h1>
            <Button size="small" onClick={handleBack}>
                <KeyboardArrowLeft />
                Back
            </Button>
		</div>
    );
    
    const start = (
		<div>
			<h1>This is start</h1>
            <Button size="small" onClick={handleNext}>
					<KeyboardArrowRight />
                    Next
			</Button>
		</div>
	);
	return (
		<div className={classes.root}>
            {activeStep === maxSteps ? end
            : activeStep < 0 ? start 
            : question}
		</div>
	);
}
