import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import VotesAndTitle from './VotesAndTitle';
import Addendum from './Addendum';

export default function Proposition(props) {

    let [yesMock, setYesMock] = useState(0)
    let [noMock, setNoMock] = useState(0)
    let [addenEntry, setAddenEntry] = useState()

    async function handleClickYes() {
        setYesMock(yesMock + 1)
        // postAPI({"update": props.id})
      }
      async function handleClickYesAnd() {
        setYesMock(yesMock + 1)
        // postAPI({"update": props.id})
        // setAddenEntry(<NewAdd />)
      }
    
      async function handleClickNo() {
        setNoMock(noMock + 1)
        // postAPI({"update": props.id})
      }
      async function handleClickNoBut() {
        // postAPI({"update": props.id})
        // setAddenEntry(<NewAdd predicate='yes' />)
      }

    //   let id = 0
    //   let addenda
    //   if (props.sub) {
    //     addenda = props.sub.map((addendum) => {
    //       id += 1
    //       return(
    //         <Addendum
    //           key={addendum.id}
    //           claim={addendum.text}
    //           predicate={addendum.predicate}
    //         />
    //     )})
    //   }

    const pred1 = true
    const pred2 = false

    return (
        <Card className="Proposition">
            <VotesAndTitle
                // claim={props.claim}
                // ups={props.ups + yesMock}
                // downs={props.downs + noMock}
                claim={props.text}
                ups={yesMock}
                downs={noMock}
                />
            <div style={{ flexDirection: 'row' }}>
                <ButtonGroup
                style={{ margin: '5px' }}
                orientation="vertical"
                variant="contained"
                color="secondary"
                aria-label="vertical button group"
                >
                    <Button onClick={handleClickNo}>No</Button>
                    <Button onClick={handleClickNoBut}>No But</Button>
                </ButtonGroup>

                <ButtonGroup
                style={{ margin: '5px' }}
                orientation="vertical"
                variant="contained"
                color="primary"
                aria-label="vertical primary button group"
                >
                    <Button onClick={handleClickYes}>Yes</Button>
                    <Button onClick={handleClickYesAnd}>Yes And</Button>
                </ButtonGroup>
            </div>
            <Addendum 
            claim="foo"
            predicate={pred2}
            />
            <Addendum 
            claim="foo"
            predicate={pred1}
            />
        </Card>
    )
}