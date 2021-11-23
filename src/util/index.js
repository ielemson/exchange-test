import {useState} from 'react';
import axios from 'axios';

export function useMergedState(initialState) {
    const [state, setState] = useState(initialState);
    const setMergedState = newState =>
      setState(prevState => Object.assign({}, prevState, newState));
    return [state, setMergedState];
  }


export const fetchCurrencyUsdBasedRates = async () => {
    const api = 'https://api.exchangerate.host/latest';
    const { data } = await axios.get(`${api}?base=USD`);
   return data.rates;
  }