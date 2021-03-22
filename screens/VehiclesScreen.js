import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SimpleLineIcons } from '@expo/vector-icons'
import { SharedElement } from 'react-navigation-shared-element'

import { useQuery } from 'react-query'

import { fetchRockets } from '../utils/api'

const { width } = Dimensions.get('screen')

const ITEM_WIDTH = width * 0.9
const ITEM_HEIGHT = ITEM_WIDTH * 0.9

export default function VehiclesScreen({ navigation }) {
  const { data, error, isLoading, isError } = useQuery('rockets', fetchRockets)

  return (
    <View style={{ flex: 1, backgroundColor: '#0f0f0f' }}>
      <StatusBar hidden />
      {/* Header */}
      <View style={{ marginTop: 50, marginBottom: 20, paddingHorizontal: 20 }}>
        <Text style={{ color: '#888', textTransform: 'uppercase' }}>Saturday 9 January</Text>
        <Text style={{ color: '#fff', fontSize: 32, fontWeight: '600' }}>Today</Text>
      </View>
      {/* Scrollable content */}
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <ScrollView indicatorStyle='white' contentContainerStyle={{ alignItems: 'center' }}>
          {data?.map((item) => (
            <View key={item.id}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ marginBottom: 14 }}
                onPress={() => navigation.navigate('DetailScreen', { item })}
              >
                <SharedElement id={`item.${item.id}.image_url`}>
                  <Image
                    style={{
                      borderRadius: 14,
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                    }}
                    source={{ uri: item.flickr_images[0] }}
                    resizeMode='cover'
                  />
                </SharedElement>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 10,
                    backgroundColor: 'black',
                    padding: 20,
                    opacity: 0.6,
                    borderRadius: 5,
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'column', paddingLeft: 6 }}>
                      <SharedElement id={`item.${item.id}.title`}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold',
                            lineHeight: 28,
                            backgroundColor: 'black',
                          }}
                        >
                          {item.name}
                        </Text>
                      </SharedElement>
                      <SharedElement id={`item.${item.id}.description`}>
                        <Text
                          style={{
                            width: 250,
                            marginTop: 12,
                            color: 'white',
                            fontSize: 14,
                            backgroundColor: 'black',
                            lineHeight: 18,
                          }}
                        >
                          {item.description.slice(0, item.description.indexOf('.') + 1)}
                        </Text>
                      </SharedElement>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}
  