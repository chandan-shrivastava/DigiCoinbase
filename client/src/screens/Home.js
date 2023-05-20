/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Layout from './Layout';
import { DataAPIContext } from '../context';
import { useFocusEffect } from '@react-navigation/native';
import { dummyData, SIZES, COLORS, icons, FONTS } from '../constants';
import axios from 'axios';
import { TradeViewCustomButton, BalanceInfo, Chart } from '../components';

const Home = () => {
  const [selectedCoin, setSelectedCoin] = React.useState(null);
  const ids = dummyData.holdings.map(item => item.id).join(',');
  const { setHoldings, coins, setCoins } = React.useContext(DataAPIContext);
  const fetchHoldings = React.useCallback(
    (
      currency = 'usd',
      orderBy = 'market_cap_desc',
      sparkline = true,
      priceChangePerc = '7d',
      perPage = 10,
      page = 1,
    ) => {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;
      axios({
        method: 'GET',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'max-age=300',
        },
      })
        .then(res => {
          if (res.status === 200) {
            let myHoldings = res.data.map(item => {
              let coin = dummyData.holdings.find(it => it.id === item.id);
              let price7d =
                item.current_price /
                (1 + item.price_change_percentage_7d_in_currency * 0.01);
              return {
                id: item.id,
                symbol: item.symbol,
                name: item.name,
                image: item.image,
                current_price: item.current_price,
                qty: coin.qty,
                total: coin.qty * item.current_price,
                price_change_percentage_7d_in_currency:
                  item.price_change_percentage_7d_in_currency,
                holding_value_change_7d:
                  (item.current_price - price7d) * coin.qty,
                sparkline_in_7d: {
                  value: item.sparkline_in_7d.price.map(prize => {
                    return prize * coin.qty;
                  }),
                },
              };
            });
            setHoldings(myHoldings);
          } else {
            console.error('error');
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    [ids, setHoldings],
  );
  const fetchCoins = React.useCallback(
    (
      currency = 'usd',
      orderBy = 'market_cap_desc',
      sparkline = true,
      priceChangePerc = '7d',
      perPage = 10,
      page = 1,
    ) => {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;
      axios({
        method: 'GET',
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'max-age=300',
        },
      })
        .then(res => {
          if (res.status === 200) {
            setCoins(res.data);
          } else {
            console.error('error');
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    [setCoins],
  );
  const totalWallet = React.useContext(DataAPIContext).holdings.reduce(
    (a, b) => a + (b.total || 0),
    0,
  );
  const valueChange = React.useContext(DataAPIContext).holdings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );
  const percChange = (valueChange / (totalWallet - valueChange)) * 100;
  const renderWalletInfo = () => {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        {/* Info section */}
        <BalanceInfo
          title="Your Wallet"
          displayAmount={parseFloat(totalWallet.toFixed(2))}
          changePct={percChange.toFixed(2)}
          containerStyle={{
            marginTop: 30,
          }}
        />
        {/* buttons */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}>
          <TradeViewCustomButton
            label="Transfer"
            icon={icons.send}
            onPress={null}
            containerStyle={{
              width: SIZES.width / 2 - 42,
              height: 40,
              marginRight: SIZES.radius,
            }}
          />
          <TradeViewCustomButton
            label="Withdraw"
            icon={icons.withdraw}
            onPress={null}
            containerStyle={{
              width: SIZES.width / 2 - 42,
              height: 40,
            }}
          />
        </View>
      </View>
    );
  };

  const renderTopCurrency = () => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}>
        <Text
          style={{
            marginBottom: 10,
            color: COLORS.white,
            ...FONTS.h2,
          }}>
          Top Currency
        </Text>
        <FlatList
          data={coins}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  height: 55,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setSelectedCoin(item);
                }}>
                <View
                  style={{
                    width: 35,
                  }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}>
                    {item.name}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}>
                    ${item.current_price}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    {item.price_change_percentage_7d_in_currency !== 0 && (
                      <Image
                        source={
                          item.price_change_percentage_7d_in_currency > 0
                            ? icons.upArrow
                            : icons.down_arrow
                        }
                        style={{
                          width: 10,
                          height: 10,
                          tintColor:
                            item.price_change_percentage_7d_in_currency > 0
                              ? COLORS.lightGreen
                              : COLORS.red,
                        }}
                      />
                    )}
                    <Text
                      style={{
                        marginLeft: 5,
                        color:
                          item.price_change_percentage_7d_in_currency > 0
                            ? COLORS.lightGreen
                            : COLORS.red,
                        ...FONTS.body5,
                      }}>
                      {item.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={
            <View
              style={{
                marginBottom: 50,
              }}
            />
          }
        />
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchHoldings();
      fetchCoins();
      return () => {
        return null;
      };
    }, [fetchCoins, fetchHoldings]),
  );

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}>
        {/* wallet info */}
        {renderWalletInfo()}

        <View>
          {/* wallet graph */}
          <Chart
            containerStyle={{
              marginTop: SIZES.padding * 2,
            }}
            chartPrices={
              selectedCoin
                ? selectedCoin?.sparkline_in_7d?.price
                : coins[0]?.sparkline_in_7d?.price
            }
          // chartPrices={coins[0]?.sparkline_in_7d?.price}
          />
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
              textAlign: 'center',
            }}>
            {selectedCoin ? selectedCoin?.name : coins[0]?.name}
          </Text>
        </View>

        {/* top currency */}
        {renderTopCurrency()}
      </View>
    </Layout>
  );
};

export default Home;
