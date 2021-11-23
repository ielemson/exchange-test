/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import { useMergedState, fetchCurrencyUsdBasedRates } from './util';

function App() {
  let [state, setState] = useMergedState({
    usd_based_rates: {},
    option1: 'USD',
    option2: 'GBP',
    options:  [
      { value : 'USD' , label : 'USD' },
      { value : 'GBP', label : 'GBP' },
      { value : 'EUR', label : 'EUR' }
    ],
    wallets:  { "USD": 200, 'GBP': 10, 'EUR': 150 },
    error: '',
    error2: '',
    on: true
  });
  
  const symbol = { "USD" : '$', "GBP": '£', "EUR": '€' };
 
  const setRates = async () => {
    const rates = await fetchCurrencyUsdBasedRates();
    setState({usd_based_rates: rates });
  }

  useEffect(() => {
    setRates();
  // eslint-disable-next-line no-use-before-define
  },[]);



 
  return (
    <div className="container">
      <div className="row mT-20 bg">
       <h1>Welcome To Exchange -1</h1>
      </div>

    </div>
  );
}

export default App;
