import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

export default function Addendum(props) {

  const incrementYes = (id, id2) => {
    fetch(`http://localhost:3001/${id}/${id2}`, {
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
  const incrementNo = (id, id2) => {
    fetch(`http://localhost:3001/${id}/${id2}`, {
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

  async function handleClickYes() { incrementYes(props.propId, props.id) }
  async function handleClickNo() { incrementNo(props.propId, props.id) }

  return (
    <div className='addendum'>
      <div style={{ flexDirection: 'column' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: '-6px' }}
          onClick={handleClickNo}
        >
          No
        </Button>
        <br />
        <span style={{ cursor: 'not-allowed', pointerEvents: 'none' }}>
          <Button
            style={{ fontSize: '16px', maxHeight: '36.5px', marginTop: '2px' }}
            variant="outlined"
            color="secondary"
          >
            {props.downs}
          </Button>
        </span>
      </div>
      <Card className='addendum-inner' style={{ backgroundColor: props.predicate ? '#F5C4D5' : 'rgb(246, 246, 246)' }}>
        {props.claim}
      </Card>
      <div style={{ flexDirection: 'column' }}>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '-6px' }}
          onClick={handleClickYes}
        >
          Yes
        </Button>
        <br />
        <span style={{ cursor: 'not-allowed', pointerEvents: 'none' }}>
          <Button
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
