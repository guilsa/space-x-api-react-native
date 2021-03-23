import React, { useState } from 'react'
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'

import { useQuery } from 'react-query'

import { fetchLaunches } from '../utils/api'

const { width } = Dimensions.get('screen')

const ITEM_WIDTH = width * 0.9
const ITEM_HEIGHT = ITEM_WIDTH * 0.9

function Item({ item }) {
  return (
    <View key={item.id} style={styles.listItem}>
      <Image
        source={{ uri: item.links.patch.small }}
        style={{ width: 60, height: 60, borderRadius: 30 }}
      />
      <View style={{ alignItems: 'center', flex: 1, marginTop: 12 }}>
        <Text style={{ fontWeight: 'bold', color: '#A7A9AC' }}>
          {item.name}
        </Text>
        <Text
          style={{
            color: item.success ? 'green' : 'red',
            marginTop: 3,
          }}
        >
          {item.success ? 'SUCCESS' : 'FAIL'}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons
          style={{ marginTop: 11 }}
          name="arrow-forward"
          size={24}
          color="#4E5860"
        />
      </TouchableOpacity>
    </View>
  )
}

export default function VehiclesScreen({ navigation }) {
  const { data, error, isLoading, isError } = useQuery(
    'launches',
    fetchLaunches
  )

  return (
    <View style={{ flex: 1, backgroundColor: '#0f0f0f' }}>
      <StatusBar hidden />
      {/* Header */}
      <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
        <Text style={{ color: '#fff', fontSize: 32, fontWeight: '600' }}>
          Missions
        </Text>
      </View>
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={data}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/* Scrollable content */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    color: '#A7A9AC',
    marginTop: 60,
  },
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#181C1F',
    width: '80%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
})
