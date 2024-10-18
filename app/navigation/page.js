import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, Modal, TextInput, Switch, Vibration, Animated } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { FontAwesome5 } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps'; 
import * as Location from 'expo-location'; // Location services
import * as Speech from 'expo-speech';  // Speech services for voice navigation
export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [indoor, setIndoor] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null); 
  const [destination, setDestination] = useState(''); // New: user-defined destination
  const [wheelchairAccess, setWheelchairAccess] = useState(false); // Accessibility options
  const [isHighContrast, setIsHighContrast] = useState(false); // High contrast mode
  const [helpModalVisible, setHelpModalVisible] = useState(false); // Emergency assistance modal
  const [animation] = useState(new Animated.Value(0)); // For animations
  const [navigationInstructions, setNavigationInstructions] = useState(''); // For voice navigation
  // Fetch location on mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);
  // Start voice navigation and haptic feedback
  const startVoiceNavigation = (destination) => {
    if (!destination) {
      Alert.alert("Navigation Error", "Please enter a destination.");
      return;
    }
    const directions = `Navigating to ${destination}. Please follow the path shown on the map.`;
    Speech.speak(directions);
    Vibration.vibrate();
    setNavigationInstructions(directions);
    Alert.alert("Voice Navigation", directions);
  };
  // Handle building selection with animation
  const handleBuildingSelect = (building) => {
    setSelectedBuilding(building);
    setIndoor(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  // Toggle high contrast mode
  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
  };
  // Open emergency assistance modal
  const requestHelp = () => {
    setHelpModalVisible(true);
  };
  return (
    <View style={tw`flex-1 ${isHighContrast ? 'bg-black' : 'bg-white'}`}>
      {/* Modal for requesting help */}
      <Modal visible={helpModalVisible} transparent={true} animationType="slide">
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-xl p-6`}>
            <Text style={tw`text-lg text-purple-800 font-bold`}>Need Assistance?</Text>
            <Text style={tw`text-base mt-4`}>You can request help if you're lost or need assistance navigating.</Text>
            <TouchableOpacity 
              style={tw`bg-red-600 p-4 rounded-xl mt-4`} 
              onPress={() => {
                setHelpModalVisible(false);
                Alert.alert("Help Requested", "A helper is on their way.");
              }}
            >
              <Text style={tw`text-white text-center`}>Request Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw`mt-4`} onPress={() => setHelpModalVisible(false)}>
              <Text style={tw`text-purple-800 text-center`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView style={tw`flex-1 mt-8`}>
        {/* Header */}
        <View style={tw`bg-purple-900 p-6`}>
          <Text style={[tw`text-white text-2xl`, { fontFamily: 'outfit-bold' }]}>Explore & Navigate</Text>
          <Text style={[tw`text-white text-xl mt-2`, { fontFamily: 'outfit' }]}>Your guide to accessible destinations.</Text>
        </View>
        {/* High contrast and accessibility toggles */}
        <View style={tw`flex-row justify-between p-4`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-purple-800 text-lg`}>High Contrast Mode</Text>
            <Switch value={isHighContrast} onValueChange={toggleHighContrast} />
          </View>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-purple-800 text-lg`}>Wheelchair Access</Text>
            <Switch value={wheelchairAccess} onValueChange={setWheelchairAccess} />
          </View>
        </View>
        {/* Input for destination */}
        <View style={tw`p-4`}>
          <Text style={tw`text-lg text-purple-800`}>Enter your destination</Text>
          <TextInput 
            style={tw`border p-2 mt-2 rounded-xl`} 
            placeholder="Where would you like to go?" 
            onChangeText={setDestination}
            value={destination}
          />
          <TouchableOpacity 
            style={tw`bg-purple-800 p-4 rounded-xl mt-4`} 
            onPress={() => startVoiceNavigation(destination)}
          >
            <Text style={tw`text-white text-center`}>Start Navigation</Text>
          </TouchableOpacity>
        </View>
        {/* Animated Map Section */}
        <Animated.View style={[tw`p-4 mt-4`, { opacity: animation }]}>
          <Text style={[tw`text-lg text-purple-800`, { fontFamily: 'outfit-bold' }]}>Directions</Text>
          {location && (
            <MapView
              style={{ height: 300, borderRadius: 20, marginTop: 10 }}
              region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation={true}
              followsUserLocation={true}
              rotateEnabled={true}
              pitchEnabled={true}
            >
              <Marker coordinate={location.coords} title="You are here" pinColor="purple" />
              {destination && (
                <Polyline 
                  coordinates={[
                    { latitude: location.coords.latitude, longitude: location.coords.longitude },
                    { latitude: location.coords.latitude + 0.001, longitude: location.coords.longitude + 0.001 } // Simulating destination
                  ]}
                  strokeColor="red"
                  strokeWidth={3}
                  lineDashPattern={[1, 1]} // Dotted line for navigation
                />
              )}
            </MapView>
          )}
          {errorMsg ? <Text style={tw`text-red-600 mt-4`}>{errorMsg}</Text> : null}
          {navigationInstructions && <Text style={tw`mt-4 text-purple-800`}>{navigationInstructions}</Text>}
        </Animated.View>
        {/* Building selection and details */}
        <View style={tw`p-4`}>
          <Text style={[tw`text-lg text-purple-800`, { fontFamily: 'outfit-bold' }]}>Choose a Building</Text>
          
          <TouchableOpacity style={tw`bg-purple-800 p-4 rounded-xl mt-4`} onPress={() => handleBuildingSelect("Central Library")}>
            <View style={tw`flex-row items-center`}>
              <FontAwesome5 name="building" size={24} color="white" />
              <Text style={[tw`text-white ml-4`, { fontFamily: 'outfit' }]}>Central Library</Text>
              <Image source={{ uri: 'https://www.google.com/imgres?q=3d%20buiLding%20stairs&imgurl=https%3A%2F%2Fwww.3dtools.org%2Fwp-content%2Fuploads%2F2020%2F07%2FSteel-Wood-Stairs_01.jpg&imgrefurl=https%3A%2F%2Fwww.3dtools.org%2Fproduct%2Fsteel-wood-stairs-3d-model%2F&docid=368pFL2KPc93_M&tbnid=SAUYmBI7ZPwnWM&vet=12ahUKEwi1lp3vtZiJAxVDxQIHHZTMDNgQM3oECH8QAA..i&w=1200&h=675&hcb=2&ved=2ahUKEwi1lp3vtZiJAxVDxQIHHZTMDNgQM3oECH8QAA' }} style={{ width: 40, height: 40, marginLeft: 'auto' }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-purple-800 p-4 rounded-xl mt-4`} onPress={() => handleBuildingSelect("Student Center")}>
            <View style={tw`flex-row items-center`}>
              <FontAwesome5 name="building" size={24} color="white" />
              <Text style={[tw`text-white ml-4`, { fontFamily: 'outfit' }]}>Student Center</Text>
              <Image source={{ uri: 'https://www.google.com/imgres?q=3d%20buiLding%20stairs&imgurl=https%3A%2F%2Fwww.3dtools.org%2Fwp-content%2Fuploads%2F2020%2F07%2FSteel-Wood-Stairs_01.jpg&imgrefurl=https%3A%2F%2Fwww.3dtools.org%2Fproduct%2Fsteel-wood-stairs-3d-model%2F&docid=368pFL2KPc93_M&tbnid=SAUYmBI7ZPwnWM&vet=12ahUKEwi1lp3vtZiJAxVDxQIHHZTMDNgQM3oECH8QAA..i&w=1200&h=675&hcb=2&ved=2ahUKEwi1lp3vtZiJAxVDxQIHHZTMDNgQM3oECH8QAA' }} style={{ width: 40, height: 40, marginLeft: 'auto' }} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
