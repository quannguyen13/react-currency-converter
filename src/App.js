import React,{useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';


const BASE_URL = process.env.REACT_APP_SERVER_URL;

function App() {
// console.log(BASE_URL);
const [currencyOptions, setCurrencyOption] = useState([])
const [fromCurrency, setFromCurrency] = useState()
const [toCurrency, setToCurrency] = useState()
const [amount, setAmount] = useState(1)
// console.log(currencyOptions);


  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    // .then(data => console.log(data))
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]
      setCurrencyOption([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)

    })
  },[])



  return (
    <div className="App App-header">
   <h1>Converter</h1>
    <CurrencyRow
    currencyOptions={currencyOptions} 
    selectCurrency={fromCurrency} 
    onChangeCurrency={e => setFromCurrency(e.target.value)}

    />
    <div className="equal">=</div>
    <CurrencyRow
    currencyOptions={currencyOptions} 
    selectCurrency={toCurrency}
    onChangeCurrency={e => setToCurrency(e.target.value)}
     />
    </div>
  );
}

export default App;
