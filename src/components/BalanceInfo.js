/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';
import {COLORS, FONTS, SIZES, icons} from '../constants';
const BalanceInfo = ({title, displayAmount, changePct, containerStyle}) => {
  return (
    <View style={{...containerStyle}}>
      <Text
        style={{
          ...FONTS.h3,
          color: COLORS.lightGray3,
        }}>
        {title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.lightGray3,
          }}>
          $
        </Text>
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS.white,
            marginLeft: SIZES.base,
          }}>
          {displayAmount.toLocaleString()}
        </Text>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.lightGray3,
            marginLeft: SIZES.base,
          }}>
          USD
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={icons.upArrow}
          style={{
            width: 10,
            height: 10,
            tintColor: changePct < 0 ? COLORS.red : COLORS.lightGreen,
            transform:
              changePct > 0 ? [{rotate: '45deg'}] : [{rotate: '125deg'}],
          }}
        />
        <Text
          style={{
            ...FONTS.h3,
            color: changePct < 0 ? COLORS.red : COLORS.lightGreen,
            marginLeft: SIZES.base,
          }}>
          {changePct} %
        </Text>
        <Text
          style={{
            ...FONTS.h5,
            color: COLORS.lightGray3,
            marginLeft: SIZES.base,
          }}>
          7d change
        </Text>
      </View>
    </View>
  );
};

export default BalanceInfo;
