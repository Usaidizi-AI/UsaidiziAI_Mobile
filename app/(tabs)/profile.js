import { View, Text, Image } from 'react-native';
import React from 'react';
import tailwind from 'tailwind-rn';

const Profile = () => {
  return (
    <View style={tailwind('flex-1 justify-center items-center bg-gray-100 p-4')}>
      <Image 
        source={{ uri: 'https://example.com/profile-pic.jpg' }} 
        style={tailwind('w-24 h-24 rounded-full mb-4')} 
      />
      <Text style={tailwind('text-2xl font-bold text-gray-800')}>John Doe</Text>
      <Text style={tailwind('text-lg text-gray-600 text-center mt-2')}>
        Software Engineer | Tech Enthusiast | Blogger
      </Text>
      <View style={tailwind('mt-4')}>
        <Text style={tailwind('text-base text-gray-700')}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
        </Text>
      </View>
    </View>
  );
}

export default Profile;