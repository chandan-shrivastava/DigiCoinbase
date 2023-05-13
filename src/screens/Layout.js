/* eslint-disable react-native/no-inline-styles */
import React, {memo, useContext} from 'react';
import {View} from 'react-native';
import {COLORS, SIZES} from '../constants';
import TradeContext from '../context/TradeContex';
import {TradeViewCustomButton} from '../components';
import {icons} from '../constants';

const Layout = ({children}) => {
  const {trade} = useContext(TradeContext);
  return (
    <View
      style={{
        flex: 1,
      }}>
      {children}

      {trade ? (
        <View
          style={{
            position: 'absolute',
            top: SIZES.height - 270,
            left: 0,
            width: '100%',
            justifyContent: 'center',
            backgroundColor: COLORS.primary,
            padding: SIZES.padding,
          }}>
          <TradeViewCustomButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{
              margin: SIZES.base,
              backgroundColor: COLORS.white,
            }}
            onPress={null}
          />
          <TradeViewCustomButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{
              margin: SIZES.base,
              backgroundColor: COLORS.white,
            }}
            onPress={null}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default memo(Layout);
