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

const { height } = Dimensions.get('window')
const ITEM_HEIGHT = height * 0.5

const DetailScreen = ({ navigation, route }) => {
  const { item } = route.params
  const buttonRef = React.useRef()

  const infoPanel = [
    // { id: 'height', label: 'Height' },
    { field: 'first_flight', label: 'First Flight' },
    { field: 'country', label: 'Country' },
  ]

  const renderInfoPanel = (payload) => {
    return infoPanel.map((info, idx) => {
      let label = ''
      let value = ''

      switch (info.field) {
        case 'height':
          
          break;
        default:
          label = info.label
          value = payload[info.field]
      }

      return (
        <View key={`${info.field}_${idx}`} style={{ flexDirection: 'column', flex: 1 }}>
          <Text
            style={{
              fontSize: 12,
              color: '#fff',
              lineHeight: 24,
              marginBottom: 2,
            }}
          >
            {label}
          </Text>
          <Text style={{ color: '#fff' }}>{value}</Text>
        </View>
      )
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0f0f0f' }}>
      <SharedElement id={`item.${item.id}.flickr_images`}>
        <Image
          source={{ uri: item.flickr_images[0] }}
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
          <SharedElement id={`item.${item.id}.title`}>
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                lineHeight: 28,
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              {item.name}
            </Text>
          </SharedElement>
          <SharedElement id={`item.${item.id}.description`}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                lineHeight: 18,
              }}
            >
              {item.description}
            </Text>
          </SharedElement>
          <View
            style={{
              marginTop: 20,
              borderBottomColor: 'grey',
              borderBottomWidth: 0.2,
            }}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row', flex: 1, padding: 25 }}>
        {renderInfoPanel(item)}
      </View>
    </View>
  )
}

DetailScreen.sharedElements = (route) => {
  const { item } = route.params
  return [
    {
      id: `item.${item.id}.image_url`,
      animation: 'move',
      resize: 'clip',
    },
    {
      id: `item.${item.id}.title`,
      animation: 'fade',
      resize: 'clip',
    },
    {
      id: `item.${item.id}.description`,
      animation: 'fade',
      resize: 'clip',
    },
  ]
}

export default DetailScreen
