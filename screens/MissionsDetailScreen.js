import React, { useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native'
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { SharedElement } from 'react-navigation-shared-element'
import * as Animatable from 'react-native-animatable'

import { withComma, capitalize } from '../utils/helpers'

const { height } = Dimensions.get('window')
const ITEM_HEIGHT = height * 0.4

const MissionsDetailScreen = ({ navigation, route }) => {
  const { item } = route.params
  const buttonRef = React.useRef()

  const FailReason = () => {
    return !item.success ? (
      <Text
        style={{
          color: 'white',
          fontSize: 14,
          lineHeight: 18,
        }}
      >
        {`\n`}
        {`Launch failure reasons were: ${item.failures[0].reason}.`}
      </Text>
    ) : null
  }

  const MissionDetail = () => {
    return item.details ? (
      <SharedElement id={`item.${item.id}.details`}>
        <Text
          style={{
            color: 'white',
            fontSize: 14,
            lineHeight: 18,
          }}
        >
          {item.details}.
        </Text>
        <FailReason />
        <View
          style={{
            marginTop: 15,
            borderBottomColor: '#404040',
            borderBottomWidth: 0.2,
            borderBottomWidth: 1,
          }}
        />
      </SharedElement>
    ) : null
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0f0f0f' }}>
      <SharedElement id={`item.${item.id}.image`}>
        <Image
          source={{ uri: item.links.patch.small }}
          style={{
            width: '100%',
            height: ITEM_HEIGHT,
          }}
          resizeMode="cover"
        />
      </SharedElement>
      <Animatable.View
        ref={buttonRef}
        animation="fadeIn"
        duration={600}
        delay={300}
        style={[StyleSheet.absoluteFillObject]}
      >
        <MaterialCommunityIcons
          name="close"
          size={28}
          color="#fff"
          style={{
            position: 'absolute',
            top: 40,
            right: 20,
            zIndex: 2,
          }}
          onPress={() => {
            buttonRef.current.fadeOut(100).then(() => {
              navigation.goBack()
            })
          }}
        />
      </Animatable.View>
      <View
        style={{ flexDirection: 'row', marginTop: 10, paddingHorizontal: 20 }}
      >
        <View style={{ flexDirection: 'column', paddingLeft: 6 }}>
          <SharedElement id={`item.${item.id}.name`}>
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                lineHeight: 28,
                marginTop: 10,
                marginBottom: 12,
              }}
            >
              {item.name}
            </Text>
          </SharedElement>

          <MissionDetail />
        </View>
      </View>
      <ScrollView
        style={{
          flexDirection: 'column',
          flex: 1,
          marginTop: 12,
          paddingLeft: 25,
          paddingRight: 25,
          paddingBottom: 15,
          marginBottom: 5,
        }}
      ></ScrollView>
    </View>
  )
}

MissionsDetailScreen.sharedElements = (route) => {
  const { item } = route.params
  return [
    {
      id: `item.${item.id}.name`,
      animation: 'fade',
      resize: 'clip',
    },
    {
      id: `item.${item.id}.details`,
      animation: 'fade',
      resize: 'clip',
    },
  ]
}

export default MissionsDetailScreen
