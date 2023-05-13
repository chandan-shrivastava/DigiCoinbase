/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  monotoneCubicInterpolation,
  ChartYLabel,
  ChartXLabel,
} from '@rainbow-me/animated-charts';
// import {LineChart} from 'react-native-chart-kit';
import moment from 'moment';

const Chart = ({containerStyle, chartPrices}) => {
  // points

  let startUnixTimeStamp = moment().subtract(7, 'days').unix();

  let data = chartPrices
    ? chartPrices?.map((item, index) => {
        return {
          x: startUnixTimeStamp + (index + 1) * 3600,
          y: item,
        };
      })
    : [];
  const points = monotoneCubicInterpolation({data, range: 40});

  const formatUSD = value => {
    'worklet';

    if (value === '') {
      return '';
    }

    return `$${value.toLocaleString('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })}`;
  };
  const formatDateTime = value => {
    'worklet';

    if (value === '') {
      return '';
    }
    var selectedDate = new Date(value * 1000);
    let date = `0${selectedDate.getDate()}`.slice(-2);
    let month = `0${selectedDate.getMonth() + 1}`.slice(-2);
    let year = selectedDate.getFullYear();
    let hours = `0${selectedDate.getHours()}`.slice(-2);
    let minutes = `0${selectedDate.getMinutes()}`.slice(-2);
    let seconds = `0${selectedDate.getSeconds()}`.slice(-2);

    return `${date}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const formatNumber = value => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(2)}K`;
    } else {
      return `${value.toFixed(2)}`;
    }
  };

  const getYlabelValues = () => {
    if (data.length > 0) {
      let minValue = Math.min(...data.map(item => item.y));
      let maxValue = Math.max(...data.map(item => item.y));
      let midValue = (minValue + maxValue) / 2;
      let higherMidValue = (midValue + maxValue) / 2;
      let lowerMidValue = (midValue + minValue) / 2;

      return [
        formatNumber(maxValue),
        formatNumber(higherMidValue),
        formatNumber(midValue),
        formatNumber(lowerMidValue),
        formatNumber(minValue),
      ];
    } else {
      return [];
    }
  };

  return (
    <View
      style={{
        ...containerStyle,
      }}>
      {/* Y axis label */}
      <View
        style={{
          position: 'absolute',
          left: SIZES.padding,
          top: 0,
          bottom: 0,
          justifyContent: 'space-between',
        }}>
        {getYlabelValues().map((item, index) => {
          return (
            <Text
              key={`YLabel-${index}`}
              style={{color: COLORS.lightGray3, ...FONTS.body4}}>
              {item}
            </Text>
          );
        })}
      </View>
      {/* Chart */}
      {data.length > 0 && (
        <ChartPathProvider data={{points, smoothingStrategy: 'bezier'}}>
          <ChartPath
            height={220}
            width={SIZES.width}
            stroke={COLORS.lightGreen}
            strokeWidth={2}
          />
          <ChartDot>
            <View
              style={{
                position: 'absolute',
                left: -35,
                width: 80,
                alignItems: 'center',
                backgroundColor: COLORS.transparentBlack1,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  backgroundColor: COLORS.white,
                }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: COLORS.lightGreen,
                  }}
                />
              </View>

              {/* Y label */}
              <ChartYLabel
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                }}
                format={formatUSD}
              />

              {/* X label */}
              <ChartXLabel
                format={formatDateTime}
                style={{
                  marginTop: 3,
                  color: COLORS.lightGray3,
                  ...FONTS.body5,
                  lineHeight: 15,
                }}
              />
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
};

export default Chart;
