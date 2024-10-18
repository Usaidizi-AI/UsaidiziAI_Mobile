import React from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Speech from 'expo-speech'; // Import Speech from expo-speech

const Maps = () => {
  // Function to read the text aloud
  const speak = () => {
    Speech.speak("What do you want to go to?", {
      language: 'en', // Specify the language if needed
      pitch: 1, // Adjust the pitch
      rate: 1, // Adjust the speech rate
    });
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://ability.or.ke/mapability/' }}
        style={styles.webview}
        javaScriptEnabled={true} // Enable JavaScript
        domStorageEnabled={true} // Enable DOM storage
        startInLoadingState={true} // Show loading indicator
        renderLoading={() => (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#0000ff"
          />
        )}
      />
      <TouchableOpacity style={styles.microphoneButton} onPress={speak}>
        <Text style={styles.microphoneText}>🎤</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make sure the container takes full height
  },
  webview: {
    flex: 1, // Allow WebView to take the full space of its parent
    marginTop: 30, // Leave some space at the top
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  microphoneButton: {
    position: 'absolute',
    bottom: 30, // Position it above the bottom of the screen
    right: 30, // Position it to the right
    backgroundColor: '#6200EE', // Change to your preferred color
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
  microphoneText: {
    fontSize: 24, // Make the microphone icon larger
    color: 'white',
  },
});

export default Maps;
