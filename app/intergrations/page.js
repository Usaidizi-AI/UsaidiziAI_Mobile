import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { FontAwesome5 } from '@expo/vector-icons';

export default function WearableDevicesScreen() {
  // Dummy data for vitals
  const [vitals, setVitals] = useState({
    heartRate: 72, // bpm
    bloodPressure: '120/80', // mmHg
    oxygenLevel: '98%', // SpO2
    stepCount: 8420, // steps
  });

  // State to manage wearable connection
  const [isConnected, setIsConnected] = useState(false);

  // Function to simulate device connection
  const connectDevice = () => {
    setIsConnected(true);
    alert('Wearable device connected successfully!');
  };

  return (
    <View style={tw`flex-1 bg-gray-200 mt-6`}>
              <StatusBar barStyle="dark-content" backgroundColor="#6B21A8" />

        {/* Header Section */}
        <View style={tw`bg-purple-800 p-6  mb-5`}>
          <Text style={tw`text-3xl text-white font-bold mt-4`}>Wearable Devices</Text>
          <Text style={tw`text-lg text-white mt-2`}>Connect your wearable devices to monitor your vitals in real-time.</Text>
        </View>
      <ScrollView contentContainerStyle={tw`pb-6 px-4`}>
        

        {/* Connect Wearable Section */}
        {!isConnected ? (
          <View style={tw`bg-white p-6 rounded-lg mb-4 shadow-md items-center`}>
            {/* <FontAwesome5 name="watch" size={60} color="#4A90E2" /> */}
            <Image source={require('../../assets/images/image.png')} style={tw`w-32 h-32`} />
            <Text style={tw`text-xl font-bold mt-4 mb-2 text-gray-800`}>No Device Connected</Text>
            <Text style={tw`text-gray-600 mb-4`}>Connect a wearable device to start tracking your vitals.</Text>
            <TouchableOpacity 
              style={tw`bg-blue-700 rounded-md py-3 px-6`}
              onPress={connectDevice}
            >
              <Text style={tw`text-white text-center`}>Connect Device</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tw`bg-white p-6 rounded-lg mb-4 shadow-md`}>
            <Text style={tw`text-xl font-bold mb-4 text-gray-800`}>Connected Device</Text>
            <View style={tw`flex-row items-center`}>
              <Image source={require('../../assets/images/image.png')} style={tw`w-16 h-16`} />
              <Text style={tw`text-lg text-gray-800`}>Smart Watch</Text>
            </View>
          </View>
        )}

        {/* Vitals Section */}
        {isConnected && (
          <View>
            <Text style={tw`text-xl font-bold text-purple-800 mb-4`}>Your Vitals</Text>

            <View style={tw`bg-white p-4 rounded-lg mb-4 shadow-md`}>
              <Text style={tw`text-lg font-semibold text-gray-700`}>Heart Rate</Text>
              <Text style={tw`text-2xl text-purple-800 mt-2`}>{vitals.heartRate} bpm</Text>
            </View>

            <View style={tw`bg-white p-4 rounded-lg mb-4 shadow-md`}>
              <Text style={tw`text-lg font-semibold text-gray-700`}>Blood Pressure</Text>
              <Text style={tw`text-2xl text-purple-800 mt-2`}>{vitals.bloodPressure}</Text>
            </View>

            <View style={tw`bg-white p-4 rounded-lg mb-4 shadow-md`}>
              <Text style={tw`text-lg font-semibold text-gray-700`}>Oxygen Level</Text>
              <Text style={tw`text-2xl text-purple-800 mt-2`}>{vitals.oxygenLevel}</Text>
            </View>

            <View style={tw`bg-white p-4 rounded-lg mb-4 shadow-md`}>
              <Text style={tw`text-lg font-semibold text-gray-700`}>Step Count</Text>
              <Text style={tw`text-2xl text-purple-800 mt-2`}>{vitals.stepCount} steps</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
