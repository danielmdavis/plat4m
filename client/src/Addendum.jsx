import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

export default function Addendum(props) {

  return (
    <div className='addendum'>
      <div style={{ flexDirection: 'column' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: '-6px' }}
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
            2
          </Button>
        </span>
      </div>
      <Card className='addendum-inner' style={{ backgroundColor: props.predicate ? '#F5C4D5' : 'rgb(246, 246, 246)' }}>
        {props.claim}
      </Card>
      <div style={{ flexDirection: 'column' }}>
        <Button
          style={{}}
          variant="contained"
          color="primary"
          style={{ marginTop: '-6px' }}
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
            3
          </Button>
        </span>
      </div>
    </div>
  );
}
