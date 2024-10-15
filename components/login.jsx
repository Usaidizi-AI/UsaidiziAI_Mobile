import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import PrivadoSecure from '../assets/images/Logo.png'; // Adjust the path as necessary

const { width } = Dimensions.get('window');

export default function App() {
  const router = useRouter();
  return (
    <LinearGradient
      colors={['#4CAF50', '#2E7D32']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        {/* <Image
          source={require('../assets/images/image copy 2.png')}
          style={styles.logo}
          resizeMode="contain"
        /> */}
        <Text style={styles.title}>Usaidizi AI</Text>

        <Text style={styles.securedText}>Powered by Microsoft</Text>

        {/* Privado Secure Logo */}
        <Image
          source={PrivadoSecure}
          style={styles.privadoSecureLogo}
          resizeMode="contain"
        />

        {/* Spacing */}
        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/auth/sign-in')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: '100%',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    color: Colors.WHITE,
    fontSize: width * 0.08, // Responsive font size
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  privadoSecureLogo: {
    marginTop: 10,
    width: 110,
    height: 30,
  },
  securedText: {
    color: Colors.WHITE,
    fontSize: width * 0.045, // Smaller font size for the secured text
    textAlign: 'center',
    marginTop: 5,
  },
  spacer: {
    height: 40, // Space between secured text and button
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: Colors.BLUE, // Ensure this is defined in your Colors module
    borderRadius: 25,
    marginTop: 20,
    width: '85%', // Adjusted for better responsiveness
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: width * 0.05,
    fontFamily: 'outfit', // Ensure you have this font loaded or choose an alternative
    textAlign: 'center',
    color: Colors.WHITE,
    fontWeight: 'bold', // Make the text bold
  },
});