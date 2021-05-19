import React, { Component } from "react";
import "./Checkout.css";
import Tabs from "../../screens/checkout/Tabs";
import Header from "../../common/header/Header";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

function getSteps() {
    return ['Delivery', 'Payment'];
}
function getStepContent(step) {
    switch (step) {
        case 0:
            return 'Delivery';
        case 1:
            return 'Payment';
        default:
            return 'Unknown step';
    }
}

export default function StepperDemo() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    // const isStepOptional = step => {
    //     return step === 1;
    // };

    const isStepSkipped = step => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    // const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //     throw new Error("You can't skip a step that isn't optional.");
    // }

    //     setActiveStep(prevActiveStep => prevActiveStep + 1);
    //     setSkipped(prevSkipped => {
    //         const newSkipped = new Set(prevSkipped.values());
    //         newSkipped.add(activeStep);
    //         return newSkipped;
    //     });
    // };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <Header />
            <div>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        // if (isStepOptional(index)) {
                        //     labelProps.optional = <Typography variant="caption">Optional</Typography>;
                        // }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {activeStep === steps.length ? (
                        <div>
                            <Typography >
                                All steps completed - you're finished
              </Typography>
                            <Button onClick={handleReset} >
                                Reset
              </Button>
                        </div>
                    ) : (
                            <div>
                                {/* <Typography >{getStepContent(activeStep)}</Typography> */}
                                <Tabs/>
                                <div>
                                    <Button disabled={activeStep === 0} onClick={handleBack} >
                                        Back
                </Button>
                                    {/* {isStepOptional(activeStep) && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSkip}

                                        >
                                            Skip
                                        </Button>
                                    )} */}

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}

                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </>
    );
}

