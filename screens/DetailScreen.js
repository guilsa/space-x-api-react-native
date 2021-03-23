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

const DetailScreen = ({ navigation, route }) => {
  const { item } = route.params
  const buttonRef = React.useRef()

  // Add fields you'd like to render
  // Field value below must match Space X api response
  const fieldsMapping = [
    { field: 'height', label: 'Height' },
    { field: 'mass', label: 'Mass' },
    { field: 'first_flight', label: 'First Flight' },
    { field: 'cost_per_launch', label: 'Cost Per Launch' },
    { field: 'country', label: 'Country' },
    { field: 'type', label: 'Type' },
  ]

  const renderDetails = (fieldsMapping) => {
    /*
      TODO: Refactor and have less logic, not more
        1. If object is more than n level deep, ignore, except whitelisted key pairs.
        2. Blacklist items we don't want to display so we remove fieldsMapping dependency.
        3. Add support for nested data navigation
    */

    return fieldsMapping.map((info, idx) => {
      let label = info.label
      let value = ''

      switch (info.field) {
        case 'height':
          value = `${item[info.field].meters} m / ${item[info.field].feet} ft.`
          break
        case 'mass':
          value = `${withComma(item[info.field].kg)} kg / ${withComma(
            item[info.field].lb
          )} lb`
          break
        case 'cost_per_launch':
          value = `$${withComma(item[info.field])}`
          break
        default:
          value = capitalize(item[info.field])
      }

      return (
        <View
          key={`${info.field}_${idx}`}
          style={{ flexDirection: 'column', marginBottom: 10 }}
        >
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
          <Text style={{ color: 'gray' }}>{value}</Text>
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
                marginBottom: 12,
              }}
            >
              {item.name}
            </Text>
          </SharedElement>
          <SharedElement id={`item.${item.id}.description`}>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                lineHeight: 18,
              }}
            >
              {item.description}
            </Text>
          </SharedElement>
          <View
            style={{
              marginTop: 15,
              borderBottomColor: '#404040',
              borderBottomWidth: 0.2,
              borderBottomWidth: 1,
            }}
          />
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
      >
        {renderDetails(fieldsMapping)}
      </ScrollView>
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
