import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';

export default function EnterProposal(props) {

  // async function handleClick() {
  //   const startDate = Number(dateRange.substring(0, 4))
  //   const postLoad = {
  //     "title": name,
  //     "start": startDate,
  //     "displayDate": dateRange,
  //     "summary": summary,
  //     "eventTags": tags
  //   }
  //   setName('')
  //   setDateRange('')
  //   setSummary('')
  //   setTags([])
  //   // this.props.handlePost(postLoad)
  // }

  let [inputText, setInputText] = useState('');

  // async function handleClick() {
  //
  //   const post = {
  //     "id": 0,
  //     "text": inputText,
  //     "ups": 0,
  //     "downs": 0,
  //     "addenda": []
  //   }
  //
  // }

  return (
    <div className='proposal'>
      <TextField onChange={(e) => {setInputText(e.target.value)}} value={inputText} className='proposal-box' label="Propose a Tenet" variant="outlined" />
      <Button onClick={props.handleClick} variant="contained" color="primary" > Submit </ Button>
    </div>
  );
}
