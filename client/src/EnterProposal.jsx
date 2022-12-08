import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function EnterProposal(props) {

  let [inputText, setInputText] = useState('')

  return (
    <div className='proposal'>
      <TextField onChange={(e) => {setInputText(e.target.value)}} value={inputText} className='proposal-box' label="Propose a Tenet" variant="outlined" />
      <Button onClick={props.handleClick} variant="contained" color="primary" > Submit </ Button>
    </div>
  );
}
