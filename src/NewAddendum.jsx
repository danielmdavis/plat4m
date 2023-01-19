import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

export default function NewAddendum(props) {
  // text entry box rendered within Proposition components on YES AND, NO BUT votes.
  // displays text box, cancel or submit buttons. closes on submit.
  // API call for post one addendum is handled here.

  let [inputText, setInputText] = useState('') // tracks text of new addendum entry

  const stateUpdater = post => { // updates children in state for display without API call
    props.allData.forEach(item => { // data intensive - simplify
      if (item.id === props.propoId) { 
        item.addenda.push(post)
    } })
    props.updater([...props.allData])
  }
  const postNew = post => {
    fetch(`https://api.d21r97cyg7sguz.amplifyapp.com/${props.propoId}`, { // post child to backend
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
       },
      body: JSON.stringify(post),
      json: true
    })
    stateUpdater(post)
  }

  const handleSubmit = () => { // completes and JSONifies new child, calls poster
    if (inputText) {
      const post = {
        'id': props.addenda.length + 1,
        'text': inputText,
        'ups': 1,
        'downs': 0,
        'predicate': props.predicate
      }
      postNew(post)  
    }
    props.handleCancel()
  }

  return (
    <div className='new-addendum-entry'>
      {/* read horizontally as button-card-button */}
      <Button
        variant='contained'
        color='secondary'
        onClick={props.handleCancel}>
        ✕
      </Button>
      <TextField
        multiline={true} minRows='2'
        onChange={(e) => {setInputText(e.target.value)}} 
        value={inputText}
        className='new-addendum-textbox'
        style={{ backgroundColor: props.predicate ? 'rgb(245, 196, 213)' : 'rgb(246, 246, 246)' }}
        variant='outlined'
        label='Propose an Addendum'/>
      <Button
        variant='contained'
        color='primary'
        onClick={handleSubmit}>
        ✓
      </Button>
    </div>
  );
}
