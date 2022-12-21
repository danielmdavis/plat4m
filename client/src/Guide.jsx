import React, { useState } from 'react';
import Card from '@material-ui/core/Card';  
import { Accordion, AccordionSummary, AccordionDetails, Switch, FormControlLabel, TextField } from '@material-ui/core';



export default function Guide(props) {

    return (
        <div className='low-z' style={{ textAlign: 'left', padding: '8px', width: '61.5%', marginTop: '-20px' }}>
        <Accordion style={{ backgroundColor: 'rgb(190, 190, 190)' }}>
            <AccordionSummary>
            <span className='header-col' style={{ fontFamily: 'Raleway, sans-serif' }}>Users Guide <span style={{ color: 'rgb(150, 150, 150)', fontSize: '15px' }}>▼</span></span>
            </AccordionSummary>
            <AccordionDetails style={{ fontFamily: 'Lora, serif', fontSize: '16px' }}>
                <span className='header-col'>Plat4m is a tool built for communities of thought such as 
                    political parties and advocacy groups to democratically develop
                    their formal program. Scroll to the bottom to propose a point of shared
                    belief or purpose. <span className='blue'>YES</span> and <span className='red'>NO</span> votes indicate
                    unqualitied support or rejection of a measure respectively.</span>
                <span className='header-col'>Modify a proposition with an addendum. These too are subject to vote. 
                    Because support for a motion may or may not be predicated upon adoption of a 
                    given addendum, there are mechanisms for both. A vote of <span className='blue'>YES AND</span> gives 
                    unqualified support for the
                    measure while giving the opportunity to attach an addendum
                    that substantially interprets or expands the proposition.</span>
                <span className='header-col'><span className='red'>NO BUT</span> is 
                    the vote-contingent addendum option. It indicates that, the proposition being what it is, the voter
                    must reject it; but given the acceptance of the proposed
                    modification, they will support it. <span className='red'>NO BUT</span> addenda 
                    are more likely to attach crucial distinctions or ammendments. No
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
    )
}