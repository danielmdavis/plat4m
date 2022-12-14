import React, { useState } from 'react';
import Card from '@material-ui/core/Card';  
import { Accordion, AccordionSummary, AccordionDetails, Switch, FormControlLabel, TextField } from '@material-ui/core';



export default function HeaderCard(props) {

    return (
        <Card className='app-title'>
            <span style={{ height: '30px' }} />
            <span className='title-header'>plat4m <span style={{ color: 'rgb(246,0,87)' }}> [v2] </span> </span> 
                    <br />             
                    <span className='subtitle'>“ The Platform for Platforms”</span>
                    <br /><br />
                    <div className='switches'>
                        <FormControlLabel labelPlacement='start' label='Show closed' onClick={props.handleShowClosed} control={<Switch size='small' />}  />
                        <FormControlLabel labelPlacement='start' label='Quorum:&nbsp;' onChange={(e) => {props.setQuorum(e.target.value)}}
                            control={
                                <TextField
                                style = {{width: 46, marginRight: '25px'}}
                                inputProps={{ inputMode: 'numeric' }}
                                hiddenLabel
                                margin='none'
                                defaultValue="9"
                                variant="outlined"
                                size="small"
                                />
                            } 
                            />
                    </div>
                    <span className='byline'>Plat4m was created in 2022 by github.com/danielmdavis</span>
                    <span style={{ height: '14px' }} />
        </Card>
    )
}