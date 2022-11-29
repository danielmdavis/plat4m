import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

export default function NewAddendum(props) {

  let [inputText, setInputText] = useState('')

  function handleClick() {
    props.handleSubmit(props.propId, inputText)
    props.handleRerender()
  }

  return (
    <div className='new-addendum'>
      <Button
        style={{}}
        variant="contained"
        color="secondary"
        onClick={props.handleCancel}
        >
        ✕
      </Button>
      <TextField
        onChange={(e) => {setInputText(e.target.value)}} 
        value={inputText}
        className='new-addendum-box'
        style={{ backgroundColor: props.predicate ? '#F5C4D5' : 'GhostWhite' }}
        variant='outlined'
        label='Propose an Addendum'
      />
      <Button
        style={{}}
        variant="contained"
        color="primary"
        onClick={handleClick}
        
        >
        ✓
      </Button>
    </div>
  );
}
