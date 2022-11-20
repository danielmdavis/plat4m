import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

export default function Addendum(props) {

  return (
    <div style={{
        display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin: '8px',
      width: '100%',
      minHeight: '50px'}}>
      <Button
        style={{}}
        variant="contained"
        color="secondary"
        >
        No
      </Button>
      <Card style={{
        backgroundColor: props.predicate ? '#F5C4D5' : 'GhostWhite',
        margin: '0px 5px',
        padding: '7px 10px',
        width: '55%',
        minHeight: '45px',
        textAlign: 'left',
        fontSize: '16px'
        }}>
        {props.claim}

      </Card>
      <Button
        style={{}}
        variant="contained"
        color="primary"
        >
        Yes
      </Button>
    </div>
  );
}
