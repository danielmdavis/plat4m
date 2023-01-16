import React, { useState } from 'react';
import Card from '@material-ui/core/Card';  
import Button from '@material-ui/core/Button';
import { Switch, FormControlLabel, TextField } from '@material-ui/core';

export default function HeaderCard(props) {
    // title and header imagery, also contains show failed toggle and show results pop-up. 

    return (
        <Card className='app-title'>
            <span className='buffer-30' />
            <span className='title-header'>plat4m</span> 
                    <br />             
                    <span className='subtitle'>“ The Platform for Platforms”</span>
                    <br /><br />
                    <div className='switches'>
                        <Button size='large' className='results-button' onClick={props.handleShowValues}>Our Story So Far</Button>
                    <br /><br />
                        <FormControlLabel 
                        labelPlacement='start' 
                        label='Show failed' 
                        onClick={props.handleShowClosed} 
                        control={<Switch size='small' />}  />
                        <FormControlLabel 
                        labelPlacement='start' 
                        label='Quorum:&nbsp;' 
                        onChange={(e) => {props.setQuorum(e.target.value)}}
                            control={
                                <TextField
                                className='quorum-entry'
                                inputProps={{ inputMode: 'numeric' }}
                                hiddenLabel
                                margin='none'
                                defaultValue='9'
                                variant='outlined'
                                size='small'/>
                            }/>
                    </div>
                    <span className='byline'>plat4m was created in 2022 by github.com/danielmdavis</span>
                    <span className='buffer-3' />
        </Card>
    )
}