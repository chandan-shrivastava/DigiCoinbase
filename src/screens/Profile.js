/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Settings,
} from 'react-native';
import Layout from './Layout';
import {COLORS, FONTS, SIZES, icons, dummyData} from '../constants';
import {HeaderBar} from '../components';

const SectionTitle = ({title}) => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
      }}>
      <Text
        style={{
          color: COLORS.lightGray3,
          ...FONTS.h3,
        }}>
        {title}
      </Text>
    </View>
  );
};

const Setting = ({title, value, type, onPress}) => {
  if (type === 'switch') {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 60,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
        }}
        onPress={onPress}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
          }}>
          {title}
        </Text>
        <Switch
          trackColor={{false: COLORS.lightGray, true: COLORS.lightGreen}}
          thumbColor={value ? COLORS.green : COLORS.white}
          value={value}
          onValueChange={value => onPress(value)}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 60,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
        }}
        onPress={onPress}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
            width: '70%',
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: COLORS.lightGray3,
            ...FONTS.h2,
            marginRight: 0,
          }}>
          {value}
        </Text>
        <Image
          source={icons.rightArrow}
          style={{
            width: 15,
            height: 15,
            tintColor: COLORS.lightGray3,
          }}
        />
      </TouchableOpacity>
    );
  }
};

const Profile = () => {
  const [faceId, setFaceId] = React.useState(true);
  const [isEnabled, setIsEnabled] = React.useState(false);
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}>
        {/* Header */}
        <HeaderBar title="Profile" />
        {/* Details */}
        <ScrollView>
          {/* Name & Email */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.radius,
              paddingHorizontal: SIZES.padding,
            }}>
            <View
              style={{
                flex: 1,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                }}>
                {dummyData.profile.email}
              </Text>
              <Text
                style={{
                  marginTop: 3,
                  color: COLORS.lightGray3,
                  ...FONTS.body4,
                }}>
                ID {dummyData.profile.id}
              </Text>
            </View>
            {/* status */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={icons.verified}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.lightGreen,
                }}
              />
              <Text
                style={{
                  marginLeft: 5,
                  color: COLORS.lightGreen,
                  ...FONTS.body4,
                }}>
                Verified
              </Text>
            </View>
          </View>
          {/* App */}
          <SectionTitle title="APP" />
          <Setting
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log('Press')}
          />
          <Setting
            title="Theme"
            value="Dark"
            type="button"
            onPress={() => console.log('Press')}
          />

          <SectionTitle title="ACCOUNT" />
          <Setting
            title="Currency"
            value="USD"
            type="button"
            onPress={() => console.log('Press')}
          />
          <Setting
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log('Press')}
          />

          <SectionTitle title="SECURITY" />
          <Setting
            title="FaceID"
            value={faceId}
            type="switch"
            onPress={value => setFaceId(value)}
          />
          <Setting
            title="Password"
            value="********"
            type="button"
            onPress={() => console.log('Press')}
          />
          <Setting
            title="Change Password"
            value=""
            type="button"
            onPress={() => console.log('Press')}
          />
          <Setting
            title="2FA Authentication"
            value={isEnabled}
            type="switch"
            onPress={value => setIsEnabled(value)}
          />
        </ScrollView>
      </View>
    </Layout>
  );
};

export default Profile;
