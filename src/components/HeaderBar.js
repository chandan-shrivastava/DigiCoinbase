/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';

import {COLORS, FONTS, SIZES} from '../constants';

const HeaderBar = ({title}) => {
  return (
    <View
      style={{
        height: 110,
        justifyContent: 'flex-end',
        paddingHorizontal: SIZES.padding,
      }}>
      <Text style={{color: COLORS.white, ...FONTS.largeTitle}}>{title}</Text>
    </View>
  );
};

export default HeaderBar;
