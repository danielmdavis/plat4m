import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import VotesAndTitle from './VotesAndTitle';

export default function Proposition(props) {


    return (
        <Card className="Proposition">
            <VotesAndTitle
                // claim={props.claim}
                // ups={props.ups + yesMock}
                // downs={props.downs + noMock}
                claim={props.text}
                ups="5"
                downs="2"
                />
            <div style={{ flexDirection: 'row' }}>
                <ButtonGroup
                style={{ margin: '5px' }}
                orientation="vertical"
                variant="contained"
                color="secondary"
                aria-label="vertical button group"
                >
                {/* <Button onClick={handleClickNo}>No</Button>
                <Button onClick={handleClickNoBut}>No But</Button> */}
                <Button>Yes</Button>
                <Button>No But</Button>
                </ButtonGroup>

                <ButtonGroup
                style={{ margin: '5px' }}
                orientation="vertical"
                variant="contained"
                color="primary"
                aria-label="vertical primary button group"
                >
                {/* <Button onClick={handleClickYes}>Yes</Button>
                <Button onClick={handleClickYesAnd}>Yes And</Button> */}
                <Button>Yes</Button>
                <Button>Yes And</Button>
                </ButtonGroup>
            </div>
        </Card>
    )
}