import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {TradeContext, DataAPIContext} from './src/context';
import Tabs from './src/navigation/tabs';
const Stack = createStackNavigator();

function App(): JSX.Element {
  const [trade, setTrade] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [coins, setCoins] = useState([]);
  return (
    <TradeContext.Provider
      value={{
        trade,
        setTrade,
      }}>
      <DataAPIContext.Provider
        value={{
          holdings,
          setHoldings,
          coins,
          setCoins,
        }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={'MainLayout'}>
            <Stack.Screen name="MainLayout" component={Tabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </DataAPIContext.Provider>
    </TradeContext.Provider>
  );
}

export default App;
