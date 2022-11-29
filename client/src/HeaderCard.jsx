import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default function HeaderCard(props) {

    return (
        <Card className='app-title'>
            <h2>plat4m <span style={{ color: 'red' }}> [v2] </span> </h2> 
                    <h4><i>The Platform for Platforms</i></h4>
                    <div style={{ textAlign: 'left', padding: '8px' }}>
                    <span>Plat4m is a tool for communities of thought like 
                        political parties and advocacy groups to democratically develop
                        their formal program.</span>
                    <br/><br/>
                    <span>Propose a point of shared
                        belief or purpose. The default threshhold for adoption is a
                        simple majority of seven voters. YES and NO votes indicate
                        unqualitied support or rejection of a measure respectively.</span>
                    <br/><br/>
                    <span>Modify a proposition with an addendum. These too are subject to vote. 
                        Because adoption of
                        a given addendum may or may not be a necessary condition of
                        support for the motion as a whole, there are
                        mechanisms for both. </span>
                    <br/><br/>
                    <span>A vote of YES AND gives unqualified support for the
                        measure while giving the opportunity to attach an addendum
                        that substantially interprets or expands the proposition.</span>
                    <br/><br/>
                    <span>NO BUT is the vote-contingent addendum option.
                        It indicates that, the proposition being what it is, the voter
                        must reject it; but given the acceptance of the proposed
                        modification, they will support it. NO BUT addenda are more
                        likely to attach crucial distinctions or reinterpretations. No
                        vote is cast at the time of the attachment of a predicated
                        addendum, as the outcome of the vote in question overall is
                        now determined by the outcome of the addendum. This kind is
                        indicated in red. </span>
                    </div>
                    <br/>
        </Card>
    )
}