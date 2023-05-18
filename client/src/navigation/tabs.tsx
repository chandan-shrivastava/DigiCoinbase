/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback} from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Portfolio, Market, Profile} from '../screens';
import {COLORS, icons, FONTS} from '../constants';
// import {CustomizedButton} from '../components';
import TradeContext from '../context/TradeContex';
const Tab = createBottomTabNavigator();

const CustomizedButton = ({children, onPress}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: COLORS.white,
        }}
        onPress={onPress}>
        {children}
      </TouchableOpacity>
    </View>
  );
};
const TabIcon = ({focused, name, icon, isTrade, trade}) => {
  return isTrade ? (
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.black,
      }}>
      <Image
        source={icon}
        style={
          trade
            ? {
                width: 15,
                height: 15,
                tintColor: COLORS.white,
              }
            : {
                width: 30,
                height: 30,
                tintColor: COLORS.white,
              }
        }
      />
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.h4,
        }}>
        {name}
      </Text>
    </View>
  ) : (
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={icon}
        style={{
          width: 30,
          height: 30,
          tintColor: focused ? COLORS.white : COLORS.secondary,
        }}
      />
      <Text
        style={{
          color: focused ? COLORS.white : COLORS.secondary,
          ...FONTS.h4,
        }}>
        {name}
      </Text>
    </View>
  );
};
function Tabs(): JSX.Element {
  const {trade, setTrade} = React.useContext(TradeContext);
  const handleTradeButtonPress = useCallback(() => {
    setTrade(1 - trade);
  }, [trade, setTrade]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 100,
          borderTopColor: 'transparent',
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) =>
            !trade && (
              <TabIcon
                focused={focused}
                icon={icons.home}
                name="Home"
                isTrade={undefined}
                trade={undefined}
              />
            ),
        }}
        listeners={() => ({
          tabPress: event => {
            trade ? event.preventDefault() : null;
          },
        })}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({focused}) =>
            !trade && (
              <TabIcon
                focused={focused}
                icon={icons.briefcase}
                name="Portfolio"
                isTrade={undefined}
                trade={undefined}
              />
            ),
        }}
        listeners={() => ({
          tabPress: event => {
            trade ? event.preventDefault() : null;
          },
        })}
      />
      <Tab.Screen
        name="Trade"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              icon={trade ? icons.close : icons.trade}
              trade={trade}
              isTrade={true}
              name="Trade"
            />
          ),
          tabBarButton: props => (
            <CustomizedButton {...props} onPress={handleTradeButtonPress} />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({focused}) =>
            !trade && (
              <TabIcon
                focused={focused}
                icon={icons.market}
                name="Market"
                isTrade={undefined}
                trade={undefined}
              />
            ),
        }}
        listeners={() => ({
          tabPress: event => {
            trade ? event.preventDefault() : null;
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) =>
            !trade && (
              <TabIcon
                focused={focused}
                icon={icons.profile}
                name="Profile"
                isTrade={undefined}
                trade={undefined}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabs;
