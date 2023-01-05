import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

export default function NewAddendum(props) {

  let [inputText, setInputText] = useState('')

  const stateUpdater = (post) => {
    props.allData.forEach((item) => { 
      if (item.id === props.propoId) { 
        console.log(item.id)
        console.log(post.id)
        console.log(item.addenda)
        item.addenda.push(post)
    } })
    props.updater([...props.allData])
  }

  const postNew = (post) => {
    fetch(`http://localhost:3001/${props.propoId}`, {
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

  const handleSubmit = () => {
    let predication
    if (props.predicate === 'yes') {
      predication = true
    } else {
      predication = false
    }
    if (inputText) {
      const post = {
        'id': props.addenda.length + 1,
        'text': inputText,
        'ups': 1,
        'downs': 0,
        'predicate': predication
      }
      postNew(post)  
    }
    props.handleCancel()
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
        multiline='true' minRows='2'
        onChange={(e) => {setInputText(e.target.value)}} 
        value={inputText}
        className='new-addendum-box'
        style={{ backgroundColor: props.predicate ? '#F5C4D5' : 'rgb(246, 246, 246)' }}
        variant='outlined'
        label='Propose an Addendum'
      />
      <Button
        style={{}}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        ✓
      </Button>
    </div>
  );
}
