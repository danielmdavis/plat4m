import React from 'react';
import './App.css';
import Card from '@material-ui/core/Card';
import Proposition from './Proposition';

function App() {

  const data = ['foo', 'bar']

  const propositions = data.map((item) => {
    return(
      <Proposition
        // key={item.id}
        // id={item.id}
        // type='proposition'
        // claim={item.text}
        // sub={item.addenda}
        // ups={item.ups}
        // downs={item.downs}
        text={item}
        />
    )})


  return (
    <div className="App"> 
        <br />
        <br />
         
        {propositions}

     

        

    </div>
  );
}

export default App;
