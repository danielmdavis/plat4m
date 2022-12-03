import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

export default function Addendum(props) {

  return (
    <div className='addendum'>
      <Button
        variant="contained"
        color="secondary"
        >
        No
      </Button>
      <Card className='addendum-inner' style={{ backgroundColor: props.predicate ? '#F5C4D5' : 'rgb(246, 246, 246)' }}>
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
