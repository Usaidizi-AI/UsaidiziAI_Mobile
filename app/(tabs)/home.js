import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import tw from "tailwind-react-native-classnames";
import { useRouter } from 'expo-router';
import * as Speech from 'expo-speech';

export default function HomeScreen() {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  const handleVoiceInteraction = () => {
    const message = "How may I help you today? Should I start navigating with you?";
    Speech.speak(message);
  };

  return (
    <View style={tw`flex-1`}>
      {/* Main Content */}
      <ScrollView style={tw`flex-1`}>
        {/* Header */}
        <View style={tw`bg-purple-800 p-6 pb-12`}>
          <View style={tw`flex-row items-center mt-10`}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/jeph.jpg')}
                style={tw`w-16 h-16 rounded-full mr-4`}
              />
            </TouchableOpacity>
            <View>
              <Text style={[tw`text-white text-lg`, { fontFamily: 'outfit-bold' }]}>Welcome!</Text>
              <Text style={[tw`text-white text-xl`, { fontFamily: 'outfit' }]}>Caleb Jephunneh</Text>
              <Text style={[tw`text-white text-xl`, { fontFamily: 'outfit' }]}>Usaidizi.AI</Text>
            </View>
          </View>
        </View>

        <View style={[tw`bg-white -mt-7 px-4 pt-6 pb-12`, { borderRadius: 30 }]}>
          <View style={tw`p-6 rounded-2xl border border-purple-700`}>
            <View style={tw`flex-row items-center`}>
              <FontAwesome5 name="exclamation-circle" size={48} color="#6b21a8" />
              <View style={tw`ml-4`}>
                <Text style={[tw`text-black text-lg mt-1`, { fontFamily: 'outfit-bold' }]}>Emergency Services</Text>
                <Text style={[tw`text-gray-600`, { fontFamily: 'outfit' }]}>Quickly access emergency contacts and services</Text>
                <TouchableOpacity onPress={() => navigateTo('emergency/page')}>
                  <Text style={[tw`text-purple-700 mt-2`, { fontFamily: 'outfit-medium' }]}>Access Now &gt;&gt;</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={tw`flex-row flex-wrap justify-between`}>
            <FeatureCard
              icon="first-aid"
              title="Emergency Services"
              description="Get AI assistance in emergency situations"
              onPress={() => navigateTo('emergency/page')}
            />
            <FeatureCard
              icon="map-marked-alt"
              title="Building Navigation"
              description="Navigate accessible buildings easily"
              onPress={() => navigateTo('navigation/page')}
            />
            <FeatureCard
              icon="shopping-cart"
              title="Marketplace"
              description="Buy and sell essential items"
              onPress={() => navigateTo('shop')}
            />
            <FeatureCard
              icon="phone-alt"
              title="Online Doctor Calls"
              description="Consult with your doctor online"
              onPress={() => navigateTo('doctors/page')}
            />
            <FeatureCard
              icon="assistive-listening-systems"
              title="Voice Commands"
              description="Use voice to control the app"
            />
            <FeatureCard
              icon="comments"
              title="Community Forum"
              description="Connect with others for support"
              onPress={() => navigateTo('community/page')}
            />
            <FeatureCard
              icon="exclamation-triangle"
              title="Report Incident"
              description="Report any other incident"
              onPress={() => navigateTo('report-incident/page')}
            />
            <FeatureCard
              icon="medkit"
              title="First Aid Tips"
              description="Learn basic first aid"
              onPress={() => navigateTo('first-aid/page')}
            />
            <FeatureCard
              icon="heartbeat"
              title="Intergrate wearables"
              description="Connect your wearable devices"
              onPress={() => navigateTo('intergrations/page')}
            />
            <FeatureCard
              icon="hands-helping"
              title="Find a Volunteer"
              description="Request help from a volunteer"
              onPress={() => navigateTo('volunteer/page')}
            />
          </View>
        </View>
      </ScrollView>

      {/* Floating Chatbot Mic Section */}
      <TouchableOpacity 
        onPress={handleVoiceInteraction} 
        style={tw`absolute bottom-10 right-5 p-4 bg-purple-800 rounded-full shadow-lg`}>
        <Ionicons name="mic-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

function FeatureCard({ icon, title, description, onPress }) {
  return (
    <TouchableOpacity style={tw`w-1/2 p-2`} onPress={onPress}>
      <View style={tw`bg-white p-4 rounded-xl shadow-md items-center`}>
        <FontAwesome5 name={icon} size={32} color="#6b21a8" />
        <Text style={[tw`text-purple-800 font-bold mt-2 text-center`, { fontFamily: 'outfit-bold' }]}>{title}</Text>
        <Text style={[tw`text-gray-600 text-center mt-1`, { fontFamily: 'outfit' }]}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}
