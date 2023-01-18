import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

export default function VotesAndTitle(props) {
  // titling element for propos, displaying text and vote counters

  return (
    <div className='votes-and-title-outer'>
      <span className='votes-and-title-counter-wrapper'>
        <Button
          className='votes-and-title-counter'
          variant='outlined'
          color='secondary'>
          {props.downs}
        </Button>
      </span>
      <div className='votes-and-title-inner'>
        {props.claim}
      </div>
      <span className='votes-and-title-counter-wrapper'>
        <Button
          className='votes-and-title-counter'
          variant='outlined'
          color='primary'>
          {props.ups}
        </Button>
      </span>
    </div>
  )
}
