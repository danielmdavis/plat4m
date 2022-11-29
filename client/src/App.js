import React, { useState, useEffect } from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HeaderCard from './HeaderCard';
import Proposition from './Proposition';

function App() {

  let [data, setGet] = useState([])
  let [quorum] = useState(9)
  let [inputText, setInputText] = useState('')
  // let [newOne, setNewOne] = useState('')

  const callAPI = () => {
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
    callAPI()
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

      // setNewOne(() =>  {
      //   return(
      //     <Proposition
      //       type='new-one'
      //       claim={inputText}
      //       ups={1}
      //       downs={0}
      //       />
      // )})

      setInputText('')
      window.scrollTo(0,document.body.scrollHeight)
      setTimeout(() => { window.scrollTo(0,document.body.scrollHeight) }, 0.01)
    }
  }

  // function handleAddendum(id, text) {
  //   let update = data.find((item, i) => {
  //     if (item.id === id) {
  //         data[i] = { 
  //           id: data[i].id, 
  //           text: data[i].text,
  //           ups: data[i].ups,
  //           downs: data[i].downs,
  //           addenda: [{ "claim": text, "key": data[i].addenda.length }]
  //         }
  //         setDummy(dummyData)
  //         return true
  //     }
  //   })
    
  // }

  

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
        // handleAddendum={handleAddendum}
        />
    )})


  return (
    <div className="App"> 
      <br />
      <br />
      <HeaderCard />
      {propositions} 
      {/* {newOne} */}
      <Card className='proposition' style={{ minHeight: '250px' }}>
        Propose a principle
        <TextField onChange={(e) => {setInputText(e.target.value)}} value={inputText} style={{ backgroundColor: 'GhostWhite', margin: '20px' }} label="Propose a Tenet" variant="outlined" />
        <Button onClick={handleSubmit} variant="contained" color="primary" > Submit </ Button>
      </ Card>
    </div>
  )
}

export default App;
