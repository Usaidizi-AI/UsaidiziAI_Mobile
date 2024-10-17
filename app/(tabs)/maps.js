import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';

// Map Screen (with 3D perspective and speech)
const MapScreen = ({ navigation }) => {
  const [coordinates] = useState([
    { latitude: -1.2921, longitude: 36.8219 },
    { latitude: -1.28333, longitude: 36.81667 },
    { latitude: -1.275, longitude: 36.8133 },
  ]);

  useEffect(() => {
    // Request permissions for voice recognition
    const getPermissions = async () => {
      await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    };
    getPermissions();
  }, []);

  const speakDirection = (direction) => {
    const options = {
      language: 'en',
    };
    Speech.speak(direction, options);
  };

  return (
    <View style={tw`flex-1`}>
      {/* Map Header */}
      <View style={tw`bg-blue-600 p-4 flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center`}>
          <View style={tw`bg-white rounded-full w-8 h-8 items-center justify-center`}>
            <Text style={tw`text-blue-600 text-lg font-bold`}>4</Text>
          </View>
          <Text style={tw`text-white ml-3 text-lg font-semibold`}>Turn Left</Text>
        </View>
        <TouchableOpacity style={tw`flex-row items-center`} onPress={() => speakDirection('Turn Left')}>
          <FontAwesome5 name="volume-up" size={20} color="white" />
          <Text style={tw`text-white ml-2`}>Speak Directions</Text>
        </TouchableOpacity>
      </View>

      {/* Map View with 3D Effect */}
      <MapView
        style={tw`flex-1`}
        initialRegion={{
          latitude: -1.2921,
          longitude: 36.8219,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        camera={{
          center: { latitude: -1.2921, longitude: 36.8219 },
          pitch: 45, // Tilt for 3D effect
          heading: 90, // Orientation of the map
          altitude: 2000,
          zoom: 15,
        }}
      >
        {/* Markers and Polyline */}
        <Polyline
          coordinates={coordinates}
          strokeColor="#FF0000" // red
          strokeWidth={6}
        />
        {coordinates.map((coordinate, index) => (
          <Marker key={index} coordinate={coordinate} />
        ))}
      </MapView>

      {/* Action Buttons */}
      <TouchableOpacity style={styles.speechButton} onPress={() => speakDirection('You have reached your destination')}>
        <FontAwesome5 name="volume-up" size={24} color="white" />
        <Text style={styles.speechButtonText}>Speak: Reached Destination</Text>
      </TouchableOpacity>
    </View>
  );
};

// Profile Screen (with added speech and features)
const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('John Doe');
  const [age, setAge] = useState(30);

  const speakProfile = () => {
    Speech.speak(`Hello, your name is ${name} and you are ${age} years old.`);
  };

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-2xl font-bold text-center`}>Profile</Text>

      <View style={tw`bg-gray-200 p-4 rounded-lg mt-4`}>
        <Text style={tw`text-lg`}>Name: {name}</Text>
        <Text style={tw`text-lg mt-2`}>Age: {age}</Text>
      </View>

      {/* Speech Interaction */}
      <TouchableOpacity style={styles.speechButton} onPress={speakProfile}>
        <FontAwesome5 name="volume-up" size={24} color="white" />
        <Text style={styles.speechButtonText}>Speak Profile</Text>
      </TouchableOpacity>

      {/* Update Profile */}
      <View style={tw`mt-4`}>
        <TextInput
          style={tw`bg-gray-100 p-2 rounded-lg mb-4`}
          placeholder="Update Name"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={tw`bg-gray-100 p-2 rounded-lg mb-4`}
          placeholder="Update Age"
          keyboardType="numeric"
          onChangeText={(text) => setAge(Number(text))}
        />
        <Button title="Update Profile" onPress={() => Alert.alert('Profile Updated')} />
      </View>
    </View>
  );
};

// Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MapScreen">
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  speechButton: {
    backgroundColor: '#FF5B5B',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    margin: 20,
    elevation: 2,
  },
  speechButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});
