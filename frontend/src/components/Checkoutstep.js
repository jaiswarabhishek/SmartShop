import React from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

function Checkoutstep({activeStep}) {

    const steps=[
        {
            label: <Typography variant="caption">Shipping</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography variant="caption">Confirm Order</Typography>,
            icon: <DoneAllIcon />
        },
        {
            label: <Typography variant="caption">Payment</Typography>,
            icon: <AccountBalanceIcon />
        },

    ]




  return (<>
    <div className='mt-10'>
<Stepper  alternativeLabel activeStep={activeStep}   >
    {
        steps.map((item,index)=>(
            <Step key={index}
            
            active={activeStep===index ? true : false}
        completed={activeStep >= index ? true : false}


            >
                <StepLabel style={
                    {
                        color:activeStep>=index ? '#1976D2' : '#000000'

                    }
                }  icon={item.icon} >
                    {item.label}
                </StepLabel>
            </Step>
        ))
    }



</Stepper>



    
    </div>
 </>)
}

export default Checkoutstep
