/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
} from 'react-native';
import Layout from './Layout';
import {constants, COLORS, FONTS, SIZES, icons} from '../constants';
import {HeaderBar} from '../components';
import {DataAPIContext} from '../context';
import {LineChart} from 'react-native-chart-kit';
const marketTabs = constants.marketTabs.map(marketTab => ({
  ...marketTab,
  ref: React.createRef(),
}));

const TabIndicator = ({measureLayout, scrollX}) => {
  const inputRange = marketTabs.map((_, i) => i * SIZES.width);

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: '100%',
        width: (SIZES.width - SIZES.radius * 2) / 2,
        left: 0,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({scrollX, onMarketTabPress}) => {
  const [measureLayout, setMeasureLayout] = React.useState([]);
  const containerRef = React.useRef();

  React.useEffect(() => {
    let ml = [];

    marketTabs.forEach(marketTab => {
      marketTab.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({
            x,
            y,
            width,
            height,
          });

          if (ml.length === marketTabs.length) {
            setMeasureLayout(ml);
          }
        },
      );
    });
  }, [containerRef.current]);

  return (
    <View
      ref={containerRef}
      style={{
        flexDirection: 'row',
      }}>
      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`MarketTab-${index}`}
            style={{
              flex: 1,
            }}
            onPress={() => onMarketTabPress(index)}>
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TextButton = ({label, containerStyle, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 3,
        paddingHorizontal: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: COLORS.gray1,
        ...containerStyle,
      }}
      onPress={onPress}>
      <Text
        style={{
          marginLeft: SIZES.base,
          color: COLORS.white,
          ...FONTS.h3,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const Market = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const markketTabScrollViewRef = React.useRef();
  const onMarketTabPress = React.useCallback(marketTabIndex => {
    markketTabScrollViewRef.current.scrollToOffset({
      offset: marketTabIndex * SIZES.width,
    });
  });

  const {coins} = React.useContext(DataAPIContext);
  function renderTabBar() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray,
        }}>
        <Tabs scrollX={scrollX} onMarketTabPress={onMarketTabPress} />
      </View>
    );
  }
  function renderButtons() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
        }}>
        <TextButton label="USD" />
        <TextButton
          label="% (7d)"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
        <TextButton
          label="Top"
          containerStyle={{
            marginLeft: SIZES.base,
          }}
        />
      </View>
    );
  }
  function renderList() {
    return (
      <Animated.FlatList
        ref={markketTabScrollViewRef}
        data={marketTabs}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flex: 1,
                width: SIZES.width,
              }}>
              <FlatList
                data={coins}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
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
                        paddingHorizontal: SIZES.radius,
                        marginBottom: SIZES.base,
                      }}>
                      {/* Coin */}
                      <View
                        style={{
                          flex: 1.5,
                          flexDirection: 'row',
                          alignItems: 'center',
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
                            color: COLORS.white,
                            ...FONTS.h3,
                            marginLeft: SIZES.radius,
                          }}>
                          {item.name}
                        </Text>
                      </View>
                      {/* PriceChart */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                        }}>
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withInnerLines={false}
                          withOuterLines={false}
                          withDots={false}
                          withShadow={false}
                          withVerticalLines={false}
                          withHorizontalLines={false}
                          data={{
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price,
                              },
                            ],
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor,
                            lineWidth: 3,
                          }}
                          bezier
                          style={{
                            paddingRight: 0,
                          }}
                        />
                      </View>
                      {/* Price Figures */}
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                        }}>
                        <Text
                          style={{
                            color: COLORS.white,
                            ...FONTS.h3,
                          }}>
                          ${item.current_price}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          {item.price_change_percentage_7d_in_currency !==
                            0 && (
                            <Image
                              source={icons.upArrow}
                              style={{
                                width: 10,
                                height: 10,
                                tintColor: priceColor,
                                transform:
                                  item.price_change_percentage_7d_in_currency <
                                  0
                                    ? [{rotate: '180deg'}]
                                    : [{rotate: '0deg'}],
                              }}
                            />
                          )}
                          <Text
                            style={{
                              marginLeft: 5,
                              color: priceColor,
                              ...FONTS.body5,
                            }}>
                            {item.price_change_percentage_7d_in_currency.toFixed(
                              2,
                            )}{' '}
                            %
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    );
  }

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}>
        <HeaderBar title="Market" />
        {/* Tab Bar */}
        {renderTabBar()}
        {/* buttons */}
        {renderButtons()}
        {/* Market List */}
        {renderList()}
      </View>
    </Layout>
  );
};

export default Market;
