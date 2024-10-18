import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ReportIncidentScreen = () => {
  const [incident, setIncident] = useState('');
  const [details, setDetails] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!incident || !details) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Handle form submission logic here
    Alert.alert('Success', 'Your incident report has been submitted');
    // Optionally, navigate back or clear the form
    router.back();
  };

  const handleVoiceInput = () => {
    Alert.alert('Info', 'Voice input feature is under development');
  };

  const handleAIInput = () => {
    Alert.alert('Info', 'AI input feature is under development');
  };

  const incidentTypes = [
    'Emergency',
    'Abuse',
    'Theft',
    'Vandalism',
    'Accident',
  ];

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      <View style={tw`bg-purple-800 p-6 pb-12`}>
        <View style={tw`flex-row items-center mt-10`}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome5 name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={[tw`text-white text-2xl ml-4`, { fontFamily: 'outfit-bold' }]}>Report an Incident</Text>
        </View>
      </View>

      {/* Incident Form */}
      <ScrollView contentContainerStyle={tw`p-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Select Incident Type</Text>
        <View style={tw`flex-row flex-wrap mb-4`}>
          {incidentTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.card, incident === type && styles.selectedCard]}
              onPress={() => setIncident(type)}
            >
              <Text style={tw`text-center`}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={tw`mb-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>Incident Type</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the type of incident"
            value={incident}
            onChangeText={setIncident}
          />
        </View>

        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-bold mb-2`}>Details</Text>
          <TextInput
            style={[styles.input, tw`h-40`]}
            placeholder="Provide detailed description of the incident"
            multiline
            value={details}
            onChangeText={setDetails}
          />
        </View>

        <View style={tw`flex-row justify-between mb-6`}>
          <TouchableOpacity style={styles.iconButton} onPress={handleVoiceInput}>
            <FontAwesome5 name="microphone" size={24} color="white" />
            <Text style={styles.iconButtonText}>Voice Input</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleAIInput}>
            <FontAwesome5 name="robot" size={24} color="white" />
            <Text style={styles.iconButtonText}>Use AI</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    margin: 4,
    minWidth: '30%',
    alignItems: 'center',
  },
  selectedCard: {
    backgroundColor: '#6b21a8',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  iconButton: {
    backgroundColor: '#6b21a8',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  submitButton: {
    backgroundColor: '#6b21a8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportIncidentScreen;