import React,{useEffect} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';


const BASE_URL = process.env.REACT_APP_SERVER_URL;

function App() {
// console.log(BASE_URL);


  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => console.log(data))
  },[])



  return (
    <div className="App App-header">
   <h1>Converter</h1>
    <CurrencyRow />
    <div className="equal">=</div>
    <CurrencyRow />
    </div>
  );
}

export default App;
