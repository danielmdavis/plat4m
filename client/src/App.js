import React, { useState, useEffect } from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Backdrop from '@mui/material/Backdrop';
import HeaderCard from './HeaderCard';
import Proposition from './Proposition';
import Guide from './Guide';

function App() {

  let [data, setGet] = useState([])
  let [quorum, setQuorum] = useState(9)
  let [inputText, setInputText] = useState('')
  let [showClosed, setShowClosed] = useState(false)
  let [showValues, setShowValues] = useState(false)

  const getAll = () => {
    fetch('http://localhost:3001/', {
      mode: 'cors',
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
      .then(req => req.json())
      .then(resp => {
        setGet(resp)
      })
  }

  const postNew = (post) => {
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
    data.push(post)
    setGet(data)
  }

  useEffect(() => {
    getAll()
  }, [])

  function handleSubmit() {
    if (inputText) {
      const post = {
        "id": Math.max(...data.map(i => i.id)) + 1,
        "text": inputText,
        "ups": 1,
        "downs": 0,
        "addenda": []
      }
      postNew(post)

      setInputText('')
      window.scrollTo(0,document.body.scrollHeight)
      setTimeout(() => { window.scrollTo(0,document.body.scrollHeight) }, 0.01)
    }
  }

  function handleShowClosed() { setShowClosed(!showClosed) }
  function handleShowValues() { setShowValues(!showValues) }

  let openPropos = []
  let failedPropos = []
  let passedPropos = []

  data.forEach((propo) => {
    if ( propo.ups >= (quorum / 2) ) {
      passedPropos.push(propo)
    } else if (propo.downs >= (quorum / 2)) {
      failedPropos.push(propo)
    } else {
      openPropos.push(propo)
    }
  })

  const openProposMapped = openPropos.map((propo) => {
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
  const failedProposMapped = failedPropos.map((propo) => {
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
  const passedProposMapped = passedPropos.map((propo) => {
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
    <div className="App"> 
      <span style={{ marginTop: '-25px' }}></span>
      <HeaderCard handleShowClosed={handleShowClosed} setQuorum={setQuorum} style={{ zIndex: '2' }} />
      <Guide />
      <br />

      <Button onClick={handleShowValues}>Show backdrop</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showValues}
        onClick={handleShowValues}
      >
        <Card style={{ overflow: 'scroll' }} className='proposition'>
          {passedProposMapped}
        </Card>
      </Backdrop>


      {openProposMapped} 
      <span>foo</span>
      {failedProposMapped}
      
      <Card className='proposition poster' style={{ minHeight: '200px', width: '45%', padding: '20px' }}>
        <span style={{ }}>What value should we embrace?</span>
        <TextField 
          style={{ backgroundColor: 'rgb(245, 245, 245)', margin: '20px', width: '50%' }} variant="outlined"
          multiline='true' minRows='4' 
          onChange={(e) => {setInputText(e.target.value)}} value={inputText}  />
        <Button onClick={handleSubmit} variant="contained" color="primary" > Submit </ Button>
      </Card>
    </div>
  )
}

export default App;
