import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

export default function VotesAndTitle(props) {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin: '8px',
      width: '100%',
      minHeight: '50px'}}>
      <span style={{ cursor: 'not-allowed', pointerEvents: 'none' }}>
        <Button
          style={{ fontSize: '20px'}}
          variant="outlined"
          color="secondary"
          >
          {props.downs}
        </Button>
      </span>
      <div style={{
        margin: '0px 5px',
        padding: '0px 10px',
        width: '55%',
        minHeight: '45px',
        fontSize: '28px'
        }}>
        {props.claim}

      </div>
      <span style={{ cursor: 'not-allowed', pointerEvents: 'none' }}>
        <Button
          style={{ fontSize: '20px'}}
          variant="outlined"
          color="primary"
          >
          {props.ups}
        </Button>
      </span>
    </div>
  );
}
