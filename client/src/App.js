import React, { useState, useEffect } from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HeaderCard from './HeaderCard';
import Proposition from './Proposition';

function App() {

  let [data, setGet] = useState([])
  let [quorum, setQuorum] = useState(9)
  let [inputText, setInputText] = useState('')
  let [showClosed, setShowClosed] = useState(false)

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
  }

  useEffect(() => {
    getAll()
  }, [])

  function handleSubmit() {
    if (inputText) {
      const post = {
        "id": propositions.length+1,
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
    setTimeout(() => { getAll() }, 0.05)
  }

  function handleShowClosed() {
    setShowClosed(!showClosed)
  }

  const propositions = data.map((item) => {
    return(
      <Proposition
        key={item.id}
        id={item.id}
        type='proposition'
        majority={quorum / 2}
        claim={item.text}
        addenda={item.addenda}
        ups={item.ups}
        downs={item.downs}
        showClosed={showClosed}
        // handleAddendum={handleAddendum}
        />
    )})

  console.log(quorum)
  return (
    <div className="App"> 
      <br />
      <HeaderCard handleShowClosed={handleShowClosed} setQuorum={setQuorum} />
      {propositions} 
      <Card className='proposition' style={{ minHeight: '200px' }}>
        <span style={{ }}>What value should we embrace?</span>
        <TextField onChange={(e) => {setInputText(e.target.value)}} value={inputText} style={{ backgroundColor: 'rgb(245, 245, 245)', margin: '20px' }} label="Propose a Tenet" variant="outlined" />
        <Button onClick={handleSubmit} variant="contained" color="primary" > Submit </ Button>
      </Card>
    </div>
  )
}

export default App;
