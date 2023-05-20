/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import Layout from './Layout';
import {BalanceInfo, Chart} from '../components';
import {COLORS, SIZES, FONTS, icons} from '../constants';
import {DataAPIContext} from '../context';
const Portfolio = () => {
  const {holdings} = React.useContext(DataAPIContext);
  let totalWallet = holdings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = holdings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );
  const percChange = (valueChange / (totalWallet - valueChange)) * 100;
  let sparkline = holdings[0]?.sparkline_in_7d?.value;
  holdings.map((item, index) => {
    if (index !== 0) {
      sparkline = sparkline.map((price, it) => {
        return price + item.sparkline_in_7d.value[it];
      });
    }
  });
  console.log(sparkline);
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}>
        {/* header */}
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            backgroundColor: COLORS.gray,
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.largeTitle,
              marginTop: 30,
            }}>
            Portfolio
          </Text>
          <BalanceInfo
            title="Current Balance"
            displayAmount={parseFloat(totalWallet.toFixed(2))}
            changePct={percChange.toFixed(2)}
            containerStyle={{
              marginTop: 10,
              marginBottom: 20,
            }}
          />
        </View>
        {/* wallet graph */}
        <View>
          <Chart
            containerStyle={{
              marginTop: SIZES.padding * 2,
            }}
            chartPrices={sparkline}
            // chartPrices={coins[0]?.sparkline_in_7d?.price}
          />
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
              textAlign: 'center',
            }}>
            Portfolio
          </Text>
        </View>
        {/* your assets */}
        <View
          style={{
            flex: 1,
            marginTop: SIZES.padding,
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
              paddingHorizontal: SIZES.padding,
            }}>
            Your Assets
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: SIZES.radius,
              marginBottom: -SIZES.padding,
            }}>
            <Text
              style={{
                color: COLORS.lightGray3,
                ...FONTS.h4,
                paddingHorizontal: SIZES.padding,
                marginLeft: 20,
                width: 190,
              }}>
              Assets
            </Text>
            <Text
              style={{
                color: COLORS.lightGray3,
                ...FONTS.h4,
                paddingHorizontal: SIZES.padding,
                width: 110,
              }}>
              Price
            </Text>
            <Text
              style={{
                color: COLORS.lightGray3,
                ...FONTS.h4,
                paddingHorizontal: SIZES.padding,
              }}>
              Holdings
            </Text>
          </View>
          <FlatList
            data={holdings}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding,
            }}
            renderItem={({item}) => {
              let priceColor =
                item.price_change_percentage_7d_in_currency === 0
                  ? COLORS.lightGray3
                  : item.price_change_percentage_7d_in_currency > 0
                  ? COLORS.lightGreen
                  : COLORS.red;
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    height: 55,
                    alignItems: 'center',
                  }}>
                  {/* image and name */}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 180,
                    }}>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    <Text
                      style={{
                        marginLeft: SIZES.radius,
                        color: COLORS.white,
                        ...FONTS.h3,
                      }}>
                      {item.name}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      width: 100,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          marginLeft: SIZES.radius,
                          color: COLORS.white,
                          ...FONTS.h3,
                        }}>
                        ${' '}
                        {parseFloat(
                          item.current_price.toFixed(2),
                        ).toLocaleString()}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={
                            item.price_change_percentage_7d_in_currency > 0
                              ? icons.upArrow
                              : icons.down_arrow
                          }
                          style={{
                            width: 10,
                            height: 10,
                            marginLeft: SIZES.base,
                            tintColor: priceColor,
                          }}
                        />
                        <Text
                          style={{
                            // marginLeft: SIZES.radius,
                            color: priceColor,
                            ...FONTS.h3,
                          }}>
                          {' '}
                          {item.price_change_percentage_7d_in_currency.toFixed(
                            2,
                          )}{' '}
                          %
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* holdings */}
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          marginLeft: SIZES.radius,
                          color: COLORS.white,
                          ...FONTS.h4,
                        }}>
                        $ {parseFloat(item.total.toFixed(2)).toLocaleString()}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            marginLeft: SIZES.radius,
                            color: COLORS.lightGray3,
                            ...FONTS.h5,
                          }}>
                          {item.qty}
                        </Text>
                        <Text
                          style={{
                            marginLeft: SIZES.radius / 3,
                            color: COLORS.lightGray3,
                            ...FONTS.h5,
                          }}>
                          {item.symbol.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default Portfolio;
