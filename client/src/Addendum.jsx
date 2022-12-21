import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

export default function Addendum(props) {

  function stateUpdater(id, id2, dir) {
    props.allData.forEach((item) => { 
      if (item.id === id) { 
        item.addenda.forEach((addendum) => {
          if (addendum.id === id2) {
            addendum[dir] = addendum[dir] + 1
          }
        })
    } })
    props.updater([...props.allData])
  }

  const incrementYes = (id, id2) => {
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
    stateUpdater(id, id2, 'ups')
  }
  const incrementNo = (id, id2) => {
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
    stateUpdater(id, id2, 'downs')
  }

  function handleClickYes() { 
    incrementYes(props.propId, props.id) 
    if (props.predicate && props.ups > props.majority - 1) { props.incrementYes(props.propId) }
  }
  function handleClickNo() { 
    incrementNo(props.propId, props.id) 
    if (props.predicate && props.downs > props.majority - 1) { props.incrementNo(props.propId) }
  }

  let status // three style assignment
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
      <div style={{ flexDirection: 'column' }}>
        <Button className='add-button'
          variant="contained"
          color="secondary"
          style={{ marginTop: '-6px' }}
          onClick={handleClickNo}
        >
          No
        </Button>
        <br />
        <span style={{ cursor: 'not-allowed', pointerEvents: 'none' }}>
          <Button className='add-button'
            style={{ fontSize: '16px', maxHeight: '36.5px', marginTop: '2px' }}
            variant="outlined"
            color="secondary"
          >
            {props.downs}
          </Button>
        </span>
      </div>
      <Card className='addendum-inner' variant={statusVariant} 
        style={{ 
          backgroundColor: 'rgb(190, 190, 190)',
          border: (props.predicate && (props.ups < props.majority || props.down < props.majority) ) ? 'solid 1.7px rgb(246,0,87)' : 'none'
        }}>
        {props.claim}
      </Card>
      <div style={{ flexDirection: 'column' }}>
        <Button className='add-button'
          variant="contained"
          color="primary"
          style={{ marginTop: '-6px' }}
          onClick={handleClickYes}
        >
          Yes
        </Button>
        <br />
        <span style={{ cursor: 'not-allowed', pointerEvents: 'none' }}>
          <Button className='add-button'
            style={{ fontSize: '16px', maxHeight: '36.5px', marginTop: '2px' }}
            variant="outlined"
            color="primary"
          >
            {props.ups}
          </Button>
        </span>
      </div>
    </div>
  );
}
