import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import VotesAndTitle from './VotesAndTitle';
import Addendum from './Addendum';
import NewAddendum from './NewAddendum';

export default function Proposition(props) {

    let [addenEntry, setAddenEntry] = useState()

    const incrementYes = (id) => {
      fetch(`http://localhost:3001/${id}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
         },
        body: JSON.stringify({ "vote": "up" }),
        json: true
      })
    }
    const incrementNo = (id) => {
      fetch(`http://localhost:3001/${id}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
         },
        body: JSON.stringify({ "vote": "down" }),
        json: true
      })
    }

    const handleCancel = () => {
      setAddenEntry()
    }
 
    function update() {
      props.cheesyUpdate()
    }

    async function handleClickYes() { incrementYes(props.id) }
    async function handleClickNo() { incrementNo(props.id) }

      async function handleClickYesAnd() {
        setAddenEntry(
          <NewAddendum 
          handleCancel={handleCancel} 
          handleRerender={update}
          addenda={addenda}
          propId={props.id}
          />
        )
      }
      async function handleClickNoBut() {
        setAddenEntry(
          <NewAddendum 
            predicate='yes' 
            handleCancel={handleCancel} 
            handleRerender={update}
            addenda={addenda}
            propId={props.id}
          />
        )
      }

      let id = -1
      let addenda
      if (props.addenda) {
        addenda = props.addenda.map((addendum) => {
          id += 1
          return(
            <Addendum
              key={addendum.key}
              id={id}
              propId={props.id}
              claim={addendum.text}
              predicate={addendum.predicate}
              ups={addendum.ups}
              downs={addendum.downs}
              majority={props.majority}
            />
        )})

      }

    let status
    if (props.ups > props.majority) {
        status = 'passed'
    } else if (props.downs > props.majority) {
        status = 'failed'
    } else {
        status = 'open'
    }

    let closedVisibility = 'closed-visible'
    if (!props.showClosed) {
      if (status !== 'open') {
        closedVisibility = 'closed-hidden'
      }
    } else {
      closedVisibility = 'closed-visible'
    }
    
  
    return (
        <Card className={`proposition ${status} ${closedVisibility}`}>
            <VotesAndTitle
                claim={props.claim}
                // ups={props.ups}
                // downs={props.downs}
                ups={props.ups}
                downs={props.downs}
                />
            <div className={status} style={{ flexDirection: 'row' }}>
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
            {addenda}
            {addenEntry}
        </Card>
    )
}