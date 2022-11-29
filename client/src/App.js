import React, { useState, useEffect } from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

  // const postAPI = (post) => {
  //   fetch('http://localhost:9000/props/', {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: {
  //       'Access-Control-Allow-Origin': '*',
  //       'Content-Type': 'application/json'
  //      },
  //     body: JSON.stringify(post),
  //     json: true
  //   })
  // }

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
      // postAPI(post)

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
      <Card className='app-title'>
        <h2>plat4m <span style={{ color: 'red' }}> [v2] </span> </h2> 
        <h4><i>The Platform for Platforms</i></h4>
        <div style={{ textAlign: 'left', padding: '8px' }}>
          <span>Plat4m is a tool for communities of thought like 
            political parties and advocacy groups to democratically develop
            their formal program.</span>
          <br/><br/>
          <span>Propose a point of shared
            belief or purpose. The default threshhold for adoption is a
            simple majority of seven voters. YES and NO votes indicate
            unqualitied support or rejection of a measure respectively.</span>
          <br/><br/>
          <span>Modify a proposition with an addendum. These too are subject to vote. 
            Because adoption of
            a given addendum may or may not be a necessary condition of
            support for the motion as a whole, there are
            mechanisms for both. </span>
          <br/><br/>
          <span>A vote of YES AND gives unqualified support for the
            measure while giving the opportunity to attach an addendum
            that substantially interprets or expands the proposition.</span>
          <br/><br/>
          <span>NO BUT is the vote-contingent addendum option.
            It indicates that, the proposition being what it is, the voter
            must reject it; but given the acceptance of the proposed
            modification, they will support it. NO BUT addenda are more
            likely to attach crucial distinctions or reinterpretations. No
            vote is cast at the time of the attachment of a predicated
            addendum, as the outcome of the vote in question overall is
            now determined by the outcome of the addendum. This kind is
            indicated in red. </span>
        </div>
        <br/>
      </Card>
        {propositions} 
        {/* {newOne} */}
        <Card className='proposition' style={{ minHeight: '250px' }}>
          Propose a principle
          <TextField onChange={(e) => {setInputText(e.target.value)}} value={inputText} style={{ backgroundColor: 'GhostWhite', margin: '20px' }} label="Propose a Tenet" variant="outlined" />
          <Button onClick={handleSubmit} variant="contained" color="primary" > Submit </ Button>

        </ Card>

     

        

    </div>
  );
}

export default App;
