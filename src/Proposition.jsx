import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import VotesAndTitle from './VotesAndTitle';
import Addendum from './Addendum';
import NewAddendum from './NewAddendum';

export default function Proposition(props) {
  // highest level iterative child component of App, rendering the top level JSON data. 
  // displays proposition text, vote counters, and vote buttons. 
  // also contains iterative child component Addendum, which essentially reproduces this structure.
  // API calls for propo votes are handled here.

  let [addenaEntry, setAddenaEntry] = useState() // stores text entry for new addendum until post

  const stateUpdater = (id, dir) => { // updates vote total in state for display without API call
    props.allData.forEach((item) => { // data intensive - simplify
      if (item.id === id) { 
        item[dir] = item[dir] + 1 
    } })
    props.updater([...props.allData]) // passes new vote total up to parent state using callback sent down as props
  }

  const incrementYes = id => { // posts vote to API RESTfully
    fetch(`https://localhost:3001/${id}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({ "vote": "up" }),
      json: true
    })
    stateUpdater(id, 'ups') // also sends to parent
  }
  const incrementNo = id => { // posts vote to API RESTfully
    fetch(`https://localhost:3001/${id}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({ "vote": "down" }),
      json: true
    })
    stateUpdater(id, 'downs') // also sends to parent
  }

  function handleCancel() { setAddenaEntry() }
  function handleClickYes() { incrementYes(props.id) }
  function handleClickNo() { incrementNo(props.id) }
  function handleClickYesAnd() { // opens new addendum entry box
    setAddenaEntry(
      <NewAddendum 
      predicate={false}
      handleCancel={handleCancel}
      addenda={props.addenda}
      propoId={props.id}
      updater={props.updater}
      allData={props.allData}
      />
    )
    incrementYes(props.id)
  }
  function handleClickNoBut() { // opens new addendum entry box
    setAddenaEntry(
      <NewAddendum 
        predicate={true}
        handleCancel={handleCancel}
        addenda={props.addenda}
        propoId={props.id}
        updater={props.updater}
        allData={props.allData}
      />
    )
  }

  let openAddenda = []
  let openAddendaMapped = []
  let closedAddenda = []
  let closedAddendaMapped = []
// parses addenda level JSON objects into open/closed
  props.addenda.forEach((addendum) => {
    if ( (addendum != undefined) && ((addendum.ups >= props.majority) || (addendum.downs >= props.majority)) ) {
      closedAddenda.push(addendum)
    } else if (addendum != undefined) {
      openAddenda.push(addendum)
    }
  })

  // maps each to react
  if (openAddenda) {
    openAddendaMapped = openAddenda.map(addendum => {
      return(
        <Addendum
          key={props.id + addendum.id}
          id={addendum.id}
          propId={props.id}
          claim={addendum.text}
          predicate={addendum.predicate}
          ups={addendum.ups}
          downs={addendum.downs}
          majority={props.majority}
          incrementYes={incrementYes}
          incrementNo={incrementNo}
          updater={props.updater}
          allData={props.allData}
        />
    )})
  }
  if (closedAddenda) {
    closedAddendaMapped = closedAddenda.map(addendum => {
      return(
        <Addendum
          key={props.id + addendum.id}
          id={addendum.id}
          propId={props.id}
          claim={addendum.text}
          predicate={addendum.predicate}
          ups={addendum.ups}
          downs={addendum.downs}
          majority={props.majority}
          showClosed={props.showClosed}
          incrementYes={incrementYes}
          incrementNo={incrementNo}
          updater={props.updater}
          allData={props.allData}
        />
    )})
  }

  // three way style assignment - pass/fail/open
  let status
  if (props.ups > props.majority) {
    status = 'passed'
  } else if (props.downs > props.majority) {
    status = 'failed'
  } else {
    status = 'open'
  }
  // show/hide closed propos
  let closedVisibility
  if (!props.showClosed) {
    closedVisibility = status === 'failed' ? 'closed-hidden' : 'closed-visible'
  } else { closedVisibility = 'closed-visible' }
  // mui specific assignment
  let statusVariant
  statusVariant = (props.ups > props.majority) ? 'outlined' : 'contained'
  
  return (
    <Card variant={statusVariant} className={`proposition ${status} ${closedVisibility}`}>
      <VotesAndTitle
        claim={props.claim}
        ups={props.ups}
        downs={props.downs} />
      <span className='buffer-70'></span>
      
      {/* closed are rendered as a bulleted list with title, seperate from voting elements */}
      {closedAddendaMapped}    
      <div className={`propo-buttongroup-outer propo-hider ${status}`}>
        <ButtonGroup
          className='propo-buttongroup-inner-red'
          orientation='vertical'
          variant='outlined'
          color='secondary'
          aria-label='vertical button group'>
          <Button className='propo-button' onClick={handleClickNo}>No</Button>
          <Button className='propo-button' onClick={handleClickNoBut}>No But</Button>
        </ButtonGroup>

        <ButtonGroup
          className='propo-buttongroup-inner-blue'
          orientation='vertical'
          variant='outlined'
          color='primary'
          aria-label='vertical primary button group'>
          <Button className='propo-button' onClick={handleClickYes}>Yes</Button>
          <Button className='propo-button' onClick={handleClickYesAnd}>Yes And</Button>
        </ButtonGroup>
      </div>
      {/* list of pending addenda votes, and entry box if open */}
      {openAddendaMapped}
      {addenaEntry}
    </Card>
  )
}