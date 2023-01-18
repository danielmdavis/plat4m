import React, { useState, useEffect } from 'react';
import Button from '../client/node_modules/@material-ui/core/Button';
import Card from '../client/node_modules/@material-ui/core/Card';

export default function Addendum(props) {
  // iterative child of Proposition component, to which it's attached as an array of object values in the JSON.
  // displays addendum text, vote counters, and vote buttons.
  // API calls for addendum votes are handled here.

  function stateUpdater(id, id2, dir) { // updates vote total in state for display without API call
    props.allData.forEach((item) => { // data intensive - simplify
      if (item.id === id) { 
        item.addenda.forEach((addendum) => {
          if (addendum.id === id2) {
            addendum[dir] = addendum[dir] + 1
          }
        })
    } })
    props.updater([...props.allData]) // passes new vote total up to parent state using callback sent down as props
  }

  const incrementYes = (id, id2) => { // posts vote to API RESTfully
    fetch(`http://localhost:3001/${id}/${id2}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
       },
      body: JSON.stringify({ 'vote': 'up' }),
      json: true
    })
    stateUpdater(id, id2, 'ups') // also sends to parent
  }
  const incrementNo = (id, id2) => { // posts vote to API RESTfully
    fetch(`http://localhost:3001/${id}/${id2}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
       },
      body: JSON.stringify({ 'vote': 'down' }),
      json: true
    })
    stateUpdater(id, id2, 'downs') // also sends to parent
  }

  function handleClickYes() { 
    incrementYes(props.propId, props.id) 
    if (props.predicate && props.ups > props.majority - 1) { props.incrementYes(props.propId) } // predication handling
  }
  function handleClickNo() { 
    incrementNo(props.propId, props.id) 
    if (props.predicate && props.downs > props.majority - 1) { props.incrementNo(props.propId) } // predication handling
  }

  let status // three-way style assignment for vote status - pass/fail/open
  if (props.ups > props.majority) {
    status = 'passed-addendum'
  } else if (props.downs > props.majority) {
    if (!props.showClosed) {
      status = 'hidden-failed-addendum'
    } else {
      status = 'failed-addendum'
    }
  } else {
    status = 'open-addendum'
  }
  let statusVariant // mui specific assignment
  statusVariant = (props.ups > props.majority || props.downs > props.majority) ? 'outlined' : 'contained'

  return (
    <div className={`addendum ${status}`}>
      {/* read horizontally as buttons-card-buttons */}
      <div classname='button-wrapper'> 
        <Button 
          className='addendum-button'
          variant='contained'
          color='secondary'
          onClick={handleClickNo}>
          No
        </Button>
        <br />
          <Button className='addendum-button votes-and-title-counter-wrapper'
            variant='outlined'
            color='secondary'>
            {props.downs}
          </Button>
      </div>

      <Card className='addendum-inner' variant={statusVariant} 
        // predication handling
        style={{ border: (props.predicate && (props.ups < props.majority || props.down < props.majority) ) ? 'solid 2px rgb(246,0,87)' : 'none' }}>
        {props.claim}
      </Card>

      <div classname='button-wrapper'>
        <Button 
          className='addendum-button'
          variant='contained'
          color='primary'
          onClick={handleClickYes}>
          Yes
        </Button>
        <br />
          <Button 
            className='addendum-button votes-and-title-counter-wrapper'
            variant='outlined'
            color='primary'>
            {props.ups}
          </Button>
      </div>
    </div>
  );
}
