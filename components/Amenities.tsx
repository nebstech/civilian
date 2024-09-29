import { View, Text, FlatList } from 'react-native'
import React from 'react'


const Amenities = ({ posts }) => {
  return (
    <FlatList 
    data={posts}
    keyExtractor={(item) => item.$id}
    renderItem={({ item }) => (
      <Text className="text-3xl">{item.id}</Text>
    )}
    />
  )
}

export default Amenities