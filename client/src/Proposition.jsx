import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import VotesAndTitle from './VotesAndTitle';
import Addendum from './Addendum';
import NewAddendum from './NewAddendum';

export default function Proposition(props) {

  let [addenEntry, setAddenEntry] = useState()

  function stateUpdater(id, dir) {
    props.allData.forEach((item) => { 
      if (item.id === id) { 
        item[dir] = item[dir] + 1 
    } })
    props.updater([...props.allData])
  }

  const incrementYes = (id) => {
    fetch(`http://localhost:3001/${id}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({ "vote": "up" }),
      json: true
    })
    stateUpdater(id, 'ups')
  }
  const incrementNo = (id) => {
    fetch(`http://localhost:3001/${id}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({ "vote": "down" }),
      json: true
    })
    stateUpdater(id, 'downs')
  }

  function handleCancel() { setAddenEntry() }
  function handleClickYes() { incrementYes(props.id) }
  function handleClickNo() { incrementNo(props.id) }
  function handleClickYesAnd() {
    setAddenEntry(
      <NewAddendum 
      handleCancel={handleCancel} 
      addenda={props.addenda}
      propId={props.id}
      />
    )
    incrementYes(props.id)
  }
  function handleClickNoBut() {
    setAddenEntry(
      <NewAddendum 
        predicate='yes' 
        handleCancel={handleCancel} 
        addenda={props.addenda}
        propId={props.id}
      />
    )
  }

  let openAddenda = []
  let openAddendaMapped = []
  let closedAddenda = []
  let closedAddendaMapped = []
  // unlike propos, addenda must be divvied before mapping
  props.addenda.forEach((addendum) => {
    if ( (addendum != undefined) && ((addendum.ups >= props.majority) || (addendum.downs >= props.majority)) ) {
      closedAddenda.push(addendum)
    } else if (addendum != undefined) {
      openAddenda.push(addendum)
    }
  })

  if (openAddenda) {
    openAddendaMapped = openAddenda.map((addendum) => {
      return(
        <Addendum
          key={addendum.key}
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
    closedAddendaMapped = closedAddenda.map((addendum) => {
      return(
        <Addendum
          key={addendum.key}
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

  // three way style assignment
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
          downs={props.downs}
          />
      <span style={{ height: '70px' }} ></span>
      
      {closedAddendaMapped}    
      <div className={`prop-hider ${status}`} style={{ marginTop: '-50px', flexDirection: 'row' }}>
        <ButtonGroup
          style={{ margin: '5px', border: 'none', background: 'rgba(150,150,150,0)' }}
          orientation="vertical"
          variant="contained"
          color="secondary"
          aria-label="vertical button group"
        >
          <Button onClick={handleClickNo}>No</Button>
          <Button onClick={handleClickNoBut}>No But</Button>
        </ButtonGroup>

        <ButtonGroup
          style={{ margin: '5px', border: 'none', background: 'rgba(150,150,150,0)' }}
          orientation="vertical"
          variant="contained"
          color="primary"
          aria-label="vertical primary button group"
        >
          <Button onClick={handleClickYes}>Yes</Button>
          <Button onClick={handleClickYesAnd}>Yes And</Button>
        </ButtonGroup>
      </div>
      {openAddendaMapped}
      {addenEntry}
    </Card>
  )
}