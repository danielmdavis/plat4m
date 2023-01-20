import React, { useState, useLayoutEffect } from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Backdrop from '@mui/material/Backdrop';
import HeaderCard from './HeaderCard';
import Proposition from './Proposition';
import Guide from './Guide';

function App() {
  // top level react container. gets JSON data and maps to propo elements.
  // has one footer propo poster and three header elements: title bar, accordion, and popover. 
  // API calls for get all and post one propo handled here.

  let [data, setGet] = useState([]) // JSON of API data to display
  let [quorum, setQuorum] = useState(9) // size of voter pool
  let [inputText, setInputText] = useState('') // tracks text of new propo entry
  let [showValues, setShowValues] = useState(false) // show passed
  let [showClosed, setShowClosed] = useState(false) // show failed

  useLayoutEffect(() => { getAll() }, []) // gets all on DidMount

  const getAll = () => {
    fetch('http://localhost:3001/', { // calls express api
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
      .then(req => req.json())
      .then(res => {
        setGet(res) //res to state
      })
  }

  const postNewPropo = post => { //posts record to backend
    fetch('http://localhost:3001/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
       },
      body: JSON.stringify(post),
      json: true
    })
    data.push(post) // updates local JSON to reflect new post without API call
    setGet(data) 
  }

  function handleSubmit() { // completes and JSONifies new record, calls poster
    if (inputText) {
      const post = {
        "id": Math.max(...data.map(i => i.id)) + 1,
        "text": inputText,
        "ups": 1,
        "downs": 0,
        "addenda": []
      }
      postNewPropo(post)

      setInputText('')
    }
  }

  function handleShowClosed() { setShowClosed(!showClosed) }
  function handleShowValues() { setShowValues(!showValues) }

  if (showValues) { 
    window.onscroll = () => { window.scroll(0, 0) }
  } else if (!showValues) {
    window.onscroll = () => { window.scroll() }
  }

  // parses top level JSON objects into the three presentationally significant types- pass/fail/open
  let openPropos = []
  let failedPropos = []
  let passedPropos = []
  data.forEach(propo => {
    if ( propo.ups >= (quorum / 2) ) {
      passedPropos.push(propo)
    } else if (propo.downs >= (quorum / 2)) {
      failedPropos.push(propo)
    } else {
      openPropos.push(propo)
    }
  })

  // maps each to react
  const openProposMapped = openPropos.map(propo => {
    return(
      <Proposition
        key={propo.id}
        id={propo.id}
        type='proposition'
        majority={quorum / 2}
        claim={propo.text}
        addenda={propo.addenda}
        ups={propo.ups}
        downs={propo.downs}
        showClosed={showClosed}
        updater={setGet}
        allData={data}
      />
    )})
  const failedProposMapped = failedPropos.map(propo => {
    return(
      <Proposition
        key={propo.id}
        id={propo.id}
        type='proposition'
        majority={quorum / 2}
        claim={propo.text}
        addenda={propo.addenda}
        ups={propo.ups}
        downs={propo.downs}
        showClosed={showClosed}
        updater={setGet}
        allData={data}
      />
    )})
  const passedProposMapped = passedPropos.map(propo => {
    return(
      <Proposition
        key={propo.id}
        id={propo.id}
        type='proposition'
        majority={quorum / 2}
        claim={propo.text}
        addenda={propo.addenda}
        ups={propo.ups}
        downs={propo.downs}
        showClosed={showClosed}
        updater={setGet}
        allData={data}
      />
    )})

  return (
    <div className='App'> 
      <span className='buffer-minus25'></span>
      {/* header things: title element with various children, users guide, value statement results popout */}
      <HeaderCard 
        handleShowClosed={handleShowClosed} 
        handleShowValues={handleShowValues} 
        setQuorum={setQuorum} 
        className='app-header-outer' />
      <Guide />
      <br />
      <Backdrop
        className='results-backdrop'
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showValues}
        onClick={handleShowValues}>
        <Card className='results-outer'>
          <div className='results-inner'>
            <h2 className='results-header'>What we believe</h2>
            <br /><br />
            {passedProposMapped}
          </div>
        </Card>
      </Backdrop>
      {/* end header things */}

      {/* body */}
      {openProposMapped} 
      {failedProposMapped}

      {/* new propo entry */}
      <Card className='proposition new-propo-entry'>
        <span>What value should we embrace?</span>
        <br />
        <TextField 
          className='new-propo-textbox' variant='outlined'
          multiline={true} minRows='4' 
          onChange={(e) => {setInputText(e.target.value)}} value={inputText}  />
        <br />  
        <Button onClick={handleSubmit} variant="contained" color="primary" > Submit </ Button>
      </Card>
    </div>
  )
}

export default App;
