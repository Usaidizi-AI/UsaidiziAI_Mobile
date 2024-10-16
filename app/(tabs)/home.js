import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import tw from "tailwind-react-native-classnames";
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  
  const navigateTo = (path) => {
    router.push(path);
  };

  return (
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
            <Text style={[tw`text-white text-xl`, { fontFamily: 'outfit' }]}>HakiSpeaks</Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={[tw`bg-white -mt-7 px-4 pt-6 pb-12`, { borderRadius: 30 }]}>
        
        {/* Feature Cards */}
        <Text style={[tw`text-gray-900 text-2xl mb-6`, { fontFamily: 'outfit-bold' }]}>Explore Features</Text>
        <View style={tw`flex-row flex-wrap justify-between`}>
          <FeatureCard
            icon="first-aid"
            title="Emergency Services"
            description="Get AI assistance in emergency situations"
            onPress={() => navigateTo('emergencyServices')}
          />
          <FeatureCard
            icon="map-marked-alt"
            title="Building Navigation"
            description="Navigate accessible buildings easily"
            onPress={() => navigateTo('navigation')}
          />
          <FeatureCard
            icon="shopping-cart"
            title="Marketplace"
            description="Buy and sell essential items"
            onPress={() => navigateTo('marketplace')}
          />
          <FeatureCard
            icon="phone-alt"
            title="Online Doctor Calls"
            description="Consult with your doctor online"
            onPress={() => navigateTo('doctorCalls')}
          />
          <FeatureCard
            icon="assistive-listening-systems"
            title="Voice Commands"
            description="Use voice to control the app"
            onPress={() => navigateTo('voiceCommands')}
          />
          <FeatureCard
            icon="comments"
            title="Community Forum"
            description="Connect with others for support"
            onPress={() => navigateTo('communityForum')}
          />
        </View>

        {/* Advertise Your Business Section */}
        <View style={tw`p-6 mt-4 bg-gray-100 rounded-2xl border border-gray-300 mb-4`}>
          <Text style={[tw`text-black text-lg`, { fontFamily: 'outfit-bold' }]}>Advertise Your Business With Us</Text>
          <Text style={[tw`text-gray-600 mt-2`, { fontFamily: 'outfit' }]}>
            Reach thousands of potential customers by advertising your business on our platform.
          </Text>
          <TouchableOpacity onPress={() => navigateTo('advertiseWithUs')}>
            <Text style={[tw`text-purple-700 mt-2`, { fontFamily: 'outfit-medium' }]}>Learn More &gt;&gt;</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
