/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

const TradeViewCustomButton = ({ label, icon, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.black,
        }}
      />
      <Text
        style={{
          color: COLORS.black,
          marginLeft: SIZES.base,
          ...FONTS.h3,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TradeViewCustomButton;
