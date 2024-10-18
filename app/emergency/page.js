import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import tw from "tailwind-react-native-classnames";
import { useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import {  Ionicons } from '@expo/vector-icons';


const emergencyContacts = [
  { id: 1, name: 'Police', phone: '123-456-7890', icon: 'shield-alt', color: '#6A5ACD' },
  { id: 2, name: 'Ambulance', phone: '123-456-7891', icon: 'ambulance', color: '#FF4500' },
  { id: 3, name: 'Fire Department', phone: '123-456-7892', icon: 'fire', color: '#FF6347' },
  { id: 4, name: 'Local Volunteer Organization', phone: '123-456-7893', icon: 'hands-helping', color: '#32CD32' },
  { id: 5, name: 'Social Services', phone: '123-456-7894', icon: 'users', color: '#8A2BE2' },
  { id: 6, name: 'Mental Health Support', phone: 'https://shorturl.at/c99iN', icon: 'brain', color: '#FFD700' },
];

const EmergencyContactsScreen = () => {
  const router = useRouter();

  const handleCallPress = (contact) => {
    if (contact.id === 6) {
      // Redirect to WhatsApp for mental health support
      Linking.openURL(contact.phone);
    } else {
      // For other contacts, initiate a phone call
      Linking.openURL(`tel:${contact.phone}`);
    }
  };

  const handleMicrophonePress = () => {
    const speechText = emergencyContacts.map(contact => `${contact.name} can be reached at ${contact.phone}.`).join(' ') + 'Tap on any contact to call them. let me know if you need any help';
    Speech.speak(speechText, { language: 'en' });
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`bg-purple-800 p-6 pb-12`}>
        <View style={tw`flex-row items-center mt-10`}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome5 name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={[tw`text-white text-2xl ml-4`, { fontFamily: 'outfit-bold' }]}>Emergency Services</Text>
        </View>
      </View>

      {/* Emergency Contacts List */}
      <View style={tw`p-4`}>
        <ScrollView>
          {emergencyContacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={[styles.card, { backgroundColor: contact.color }]}
              onPress={() => handleCallPress(contact)}
            >
              <FontAwesome5 name={contact.icon} size={32} color="white" />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{contact.name}</Text>
                <Text style={styles.phone}>{contact.phone}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity 
      onPress={handleMicrophonePress} 
      style={tw`absolute bottom-10 right-5 p-4 bg-purple-800 rounded-full shadow-lg`}>
      <Ionicons name="mic-outline" size={30} color="white" />
      </TouchableOpacity>
      
    </View>


  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  textContainer: {
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  phone: {
    fontSize: 16,
    color: 'white',
  },
  microphoneButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6B46C1', // Revert to your purple-800
    borderRadius: 30,
    padding: 15,
    elevation: 5,
  },
});

export default EmergencyContactsScreen;
