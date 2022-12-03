import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Accordion, AccordionSummary, AccordionDetails, Switch, FormControlLabel } from '@material-ui/core';



export default function HeaderCard(props) {

    return (
        <Card className='app-title'>
            
            <span className='title-header'>plat4m <span style={{ color: 'rgb(246,0,87)' }}> [v2] </span> </span> 
                    <br />             
                    <span className='subtitle'>“ The Platform for Platforms”</span>
                    <br /><br />
                    <div style={{ textAlign: 'left', padding: '8px' }}>
                    <Accordion style={{ backgroundColor: 'rgb(246, 246, 246)' }}>
                        <AccordionSummary>
                        <span className='header-col' style={{ fontFamily: 'Raleway, sans-serif' }}>Users Guide <span style={{ color: 'rgb(175, 175, 175)', fontSize: '15px' }}>▼</span></span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <span className='header-col'>Plat4m is a tool built for communities of thought such as 
                                political parties and advocacy groups to democratically develop
                                their formal program.</span>
                            <span className='header-col'>Propose a point of shared
                                belief or purpose. The default threshhold for adoption is a
                                simple majority of seven voters. <b>YES</b> and <b>NO</b> votes indicate
                                unqualitied support or rejection of a measure respectively.</span>
                            <span className='header-col'>Modify a proposition with an addendum. These too are subject to vote. 
                                Because support for a motion may or may not be predicated upon adoption of a 
                                given addendum, there are mechanisms for both. </span>
                            <span className='header-col'>A vote of <b>YES AND</b> gives unqualified support for the
                                measure while giving the opportunity to attach an addendum
                                that substantially interprets or expands the proposition.</span>
                            <span className='header-col'><b>NO BUT</b> is the vote-contingent addendum option.
                                It indicates that, the proposition being what it is, the voter
                                must reject it; but given the acceptance of the proposed
                                modification, they will support it. <b>NO BUT</b> addenda are more
                                likely to attach crucial distinctions or ammendments. No
                                vote is cast at the time of the attachment of a predicate
                                addendum, as the outcome of the vote in question overall is
                                now determined by the outcome of the addendum. This kind is
                                indicated in red.</span>  
                            <span className='header-col'>Both propositions and addenda pass or fail by a first-past-the-post
                                simple majority vote. Once more than half of a variable quorum vote either 
                                up or down, voting closes for that motion. In the event of a tie after all 
                                possible votes have been cast, the motion fails. Pending addendum votes
                                may procede but any that are vote-predicate lose this status. </span>
                        </AccordionDetails>
                    </Accordion>
                    </div>
                    <div className='switches'>
                        <FormControlLabel onClick={props.handleShowClosed} control={<Switch size='small' />} label="show closed" />
                    </div>
                    <span className='byline'>Plat4m was created in 2022 by github.com/danielmdavis</span>
        </Card>
    )
}