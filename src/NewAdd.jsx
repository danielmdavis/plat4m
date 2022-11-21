import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

export default function newAdd(props) {


  return (
    <div
      style={{
        animation: 'fadein .666s !important',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        margin: '28px 8px',
        width: '100%',
        minHeight: '50px'
      }}
    >
      <Button
        style={{}}
        variant="contained"
        color="secondary"
        onClick={props.handleCancel}
        >
        ✕
      </Button>
      <TextField
        style={{
          backgroundColor: props.predicate ? '#F5C4D5' : 'GhostWhite',
          margin: '0px 5px',
          width: '55%',
          minHeight: '45px',
          textAlign: 'left',
          fontSize: '16px'
        }}
        variant='outlined'
        label='Propose an Addendum'
      />
      <Button
        style={{}}
        variant="contained"
        color="primary"
        >
        ✓
      </Button>
    </div>
  );
}
