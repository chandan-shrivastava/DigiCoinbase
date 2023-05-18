import React from 'react';

interface ITradeContext {
  trade: number;
  setTrade: (trade: number) => void;
}

const TradeContext = React.createContext({
  trade: 0,
  setTrade: () => undefined,
} as ITradeContext);

export default TradeContext;
