import React from 'react';

interface IDataAPIContext {
  holdings: [];
  setHoldings: (holdings: []) => void;
  coins: [];
  setCoins: (coins: []) => void;
}

const DataAPIContext = React.createContext({
  holdings: [],
  setHoldings: () => undefined,
  coins: [],
  setCoins: () => undefined,
} as IDataAPIContext);

export default DataAPIContext;
