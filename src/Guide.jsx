import React, { useState } from 'react';
import Card from '../client/node_modules/@material-ui/core/Card';  
import { Accordion, AccordionSummary, AccordionDetails, Switch, FormControlLabel, TextField } from '../client/node_modules/@material-ui/core';



export default function Guide(props) {
    // mui accordion element containing user guide composed of static text.

    return (
        <div className='guide-outer'>
        <Accordion className='guide-background'>
            <AccordionSummary>
            <span className='guide guide-header'>Users Guide <span className='guide-header-doodad'>▼</span></span>
            </AccordionSummary>
            <AccordionDetails className='guide-inner'>
                <span className='guide'>plat4m is a tool built for communities of thought such as 
                    political parties and advocacy groups to democratically develop
                    their formal program. Scroll to the bottom and propose a point of shared
                    purpose or belief. Vote <span className='blue'>YES</span> or <span className='red'>NO</span> to indicate
                    unqualitied support or rejection of a measure respectively.</span>
                <span className='guide'>Modify a proposition with an addendum. These too are subject to vote. 
                    Because support for a motion may or may not be predicated upon adoption of a 
                    given addendum, there are mechanisms for both. A vote of <span className='blue'>YES AND</span> gives 
                    a vote of support for the measure while also attaching an addendum
                    that may substantially interpret or expand the proposition.</span>
                <span className='guide'><span className='red'>NO BUT</span> is 
                    the vote-contingent addendum option. It indicates that, the proposition being what it is, the voter
                    must reject it; but given the acceptance of the proposed
                    modification, they will support it. <span className='red'>NO BUT</span> addenda 
                    are more likely to attach crucial distinctions or ammendments. No proposition 
                    vote is cast at the time of the attachment of a predicate addendum, but rather one is cast 
                    automatically with the passage or failure of the addendum in question. This kind is indicated in red.</span>  
                <span className='guide'>Both propositions and addenda pass or fail by a 
                    simple majority vote. Once more than half of all voters (the default is 9) cast a vote for or against, 
                    voting closes for that motion. In the event of a tie after all 
                    possible votes have been cast, the motion fails. Pending addendum votes
                    may procede but any that are vote-predicate lose this status. </span>
            </AccordionDetails>
        </Accordion>
        </div>
    )
}