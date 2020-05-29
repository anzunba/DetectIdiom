import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MeaningTable from './MeaningTable';
import EditPaper from './EditPaper';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '500px'
	}
}));

export default function CenteredGrid() {
	const classes = useStyles();
	const [ state, setState ] = React.useState({
		checkedA: true,
		checkedB: true
	});
	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	return (
		<div className={classes.root}>
            <div className="floatLeft">
            <form className={classes.root} noValidate autoComplete="off">
                <div className="selectedInputs">
            <TextField disabled id="standard-basic" label="Selected Word" />
            <TextField disabled id="standard-basic" label="Selected Idiom" />
            </div>
    </form>
            </div>
			<div className="floatRight">
				<div className="inlineBlock">
					<FormGroup>
						<FormControlLabel
							control={
								<Switch
									checked={state.checkedB}
									onChange={handleChange}
									name="checkedB"
									color="primary"
								/>
							}
							label="Translation"
						/>
					</FormGroup>
				</div>
				<div className="inlineBlock">
					<FormGroup>
						<FormControlLabel control={
							<Switch checked={state.checkedB} onChange={handleChange} name="checkedB" color="primary" />
						}
						label="Custom Input" />
					</FormGroup>
				</div>
				<div className="inlineBlock">
					<Button
						variant="contained"
						color="primary"
						size="large"
						className={classes.button}
						startIcon={<SaveIcon />}
					>
						Save
					</Button>
				</div>
				{/* <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch checked={state.checkedB} onChange={handleChange} name="checkedB" color="primary" />
                        }
                        label="Translate"
                    />
                    <FormControlLabel
                        control={
                            <Switch checked={state.checkedB} onChange={handleChange} name="checkedB" color="primary" />
                        }
                        label="Custom Input"
                    />
                </FormGroup>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                >
                    Save
                </Button> */}
			</div>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={8}>
					<Paper className={classes.paper}>
						<EditPaper />
					</Paper>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Paper className={classes.paper}>
						<MeaningTable />
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
