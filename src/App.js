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

const updateBasedCurrency = (option) => {
  setState({option1: option.target.value});
}


/**
 * 
 * @param {*} option 
 * @param {*} balance 
 * 
 */
  const convertCurrency = (text, operation) => {
    const amount = parseInt(text.target.value);
    if(amount <= 0) {
      return;
    }
    let rate = 0;
    if(operation === 'sub'){
       rate = state.usd_based_rates[state.option2];

      if(amount > state.wallets[state.option1]) {
        setState({ error: 'Exceeds Balance'});
        return;
      } else {
        setState({ error: ''});
      }
    } else {
       rate = state.usd_based_rates[state.option1];
      if(amount > state.wallets[state.option1]) {
        setState({ error2: 'Exceeds Balance'});
        return;
      } else {
        setState({ error2: ''});
       
      }
    }
     setState({temp_wallets: {action: operation, amount, rate } });
    
  }

  const exchange = () => {
    const { temp_wallets: {action: operation, amount, rate } } = state;
    let option1 = 0;
    let option2 = 0;

    if(operation === 'sub'){
      option1 =  state.wallets[state.option1] - amount;
      if(state.option2 === 'USD'){
        option2 =  Math.ceil(state.wallets[state.option2] + (amount * rate));
      } else {
        option2 =  Math.ceil(state.wallets[state.option2] + (amount / rate));
      }
    } else {
      option2 =  state.wallets[state.option2] + amount;

      if(state.option1 === 'USD'){
        option1 = Math.ceil(state.wallets[state.option1] - (amount * rate));
      } else {
        option1 = Math.ceil(state.wallets[state.option1] - (amount / rate));
      }
    }
    setState({wallets: {[state.option1]: option1, [state.option2]: option2 } });
    
  }

 
  return (
    <div className="container">
      <div className="row mT-20 bg">
        <div className="col-md-2 col-sm-4 col-xs-4 height pT-60">
            <select onChange={updateBasedCurrency}>
              {state.options.map((option, index) => <option value={`${option.value}`} key={index} defaultValue={option.label === state.option1.label}>{`${option.label}`}</option>
              )}
            </select>
            <br/>
            <label style={{ marginTop: 10}}>Balance: {symbol[state.option1]}{state.wallets[state.option1]} </label>
        </div>
        <div className="col-md-3 height hidden-md hidden-sm hidden-xs"></div>
        <div className="col-md-4 col-sm-4 col-xs-4 height">
          <label type="text" className="exchangeInput">{symbol[state.option1]}{state.usd_based_rates[state.option1]} = {symbol[state.option2]}{state.usd_based_rates[state.option2]} </label>
        </div>
        <div className="col-md-2 hidden-md hidden-sm hidden-xs"></div>
        <div className="col-md-1 height pT-60 col-sm-2 col-xs-2">
          <label>-</label>
          <input className="form__field" onChange={(text) => convertCurrency(text, 'sub')} />
          <br /> <br />
          <span className="text text-danger small">{state.error}</span>
        </div>
      </div>

      <div className="row lowerContainer">
        <div className="col-md-2  col-sm-6 col-xs-6 height pT-60">
        <select onChange={(option) => setState({option2: option.target.value})}>
              {state.options.map((option, index) => <option value={`${option.value}`} key={index} defaultValue={option.label === state.option2}>{`${option.label}`}</option>
              )}
            </select>
            <br />
          <label style={{ marginTop: 10}}>Balance: {symbol[state.option2]}{state.wallets[state.option2]} </label>
        </div>
        <div className="col-md-9  col-sm-2 col-xs-2"></div>
        <div className="col-md-1 height  col-sm-4 col-xs-4 pT-60">
          <label>+</label>
          <input className="form__field" onChange={(text) => convertCurrency(text, 'add')} />
          <br />
          <span className="text text-danger small">{state.error2}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mT-20  col-sm-12 col-xs-12">
          <button onClick={() => exchange()} className="btn btn-md btn-danger">{ state.on ? 'Exchange' : 'INExchange' }</button>
        </div>
      </div>
    </div>
  );
}

export default App;
