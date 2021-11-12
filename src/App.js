import React,{useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';


const BASE_URL = process.env.REACT_APP_SERVER_URL;

function App() {
// console.log(BASE_URL);
const [currencyOptions, setCurrencyOption] = useState([])
const [fromCurrency, setFromCurrency] = useState()
const [toCurrency, setToCurrency] = useState()
const [exchangRate, setExchangeRate] = useState()
const [amount, setAmount] = useState(1)
const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
// console.log(currencyOptions);
// console.log(exchangRate);

let toAmount, fromAmount 
  if (amountInFromCurrency){
    fromAmount = amount
    toAmount = amount * exchangRate

  } else {
    toAmount = amount
    fromAmount = amount / exchangRate
  }




  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    // .then(data => console.log(data))
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]
      setCurrencyOption([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  },[])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null) {

      fetch(`${BASE_URL}?base=${fromCurrency}&symbol=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }

  }, [fromCurrency, toCurrency])





  const handleFromAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  const handleToAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }


  return (
    <div className="App App-header">
   <h1>Converter</h1>
    <CurrencyRow
    currencyOptions={currencyOptions} 
    selectCurrency={fromCurrency} 
    onChangeCurrency={e => setFromCurrency(e.target.value)}
    amount={fromAmount}
    onChangeAmount={handleFromAmountChange}
    />
    <div className="equal">=</div>
    <CurrencyRow
    currencyOptions={currencyOptions} 
    selectCurrency={toCurrency}
    onChangeCurrency={e => setToCurrency(e.target.value)}
    amount={toAmount}
    onChangeAmount={handleToAmountChange}

     />
    </div>
  );
}

export default App;
