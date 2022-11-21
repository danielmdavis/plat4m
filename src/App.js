import React, { useState } from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Proposition from './Proposition';

function App() {

  // let [data, setGet] = useState([])
  let [quorum] = useState(9)
  let [dummyData, setDummy] = useState(new Array())
  let [inputText, setInputText] = useState('')
  // let [newOne, setNewOne] = useState('')

  function handleClick() {
    if (inputText) {
      const post = {
        "id": propositions.length+1,
        "text": inputText,
        "ups": 1,
        "downs": 0,
        "addenda": []
      }
      // postAPI(post)
      setDummy(dummyData => [...dummyData, post])
      console.log(dummyData)

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

  const propositions = dummyData.map((item) => {
    return(
      <Proposition
        key={item.id}
        id={item.id}
        type='proposition'
        majority={quorum / 2}
        claim={item.text}
        sub={item.addenda}
        ups={item.ups}
        downs={item.downs}

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
        <Card className='proposition'>
          Propose a principle
          <TextField onChange={(e) => {setInputText(e.target.value)}} value={inputText} style={{ backgroundColor: 'GhostWhite', margin: '20px' }} label="Propose a Tenet" variant="outlined" />
          <Button onClick={handleClick} variant="contained" color="primary" > Submit </ Button>

        </ Card>

     

        

    </div>
  );
}

export default App;
