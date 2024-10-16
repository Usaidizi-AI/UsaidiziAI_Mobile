import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { FontAwesome5 } from '@expo/vector-icons';

export default function ShopScreen() {
  // Sample product data
  const products = [
    { id: 1, name: 'Pain Relief Medicine', price: 'KES 500', image: 'https://example.com/pain-relief.jpg' },
    { id: 2, name: 'Cough Syrup', price: 'KES 350', image: 'https://example.com/cough-syrup.jpg' },
    { id: 3, name: 'Artificial Leg', price: 'KES 150,000', image: 'https://example.com/artificial-leg.jpg' },
    { id: 4, name: 'Diabetes Medication', price: 'KES 800', image: 'https://example.com/diabetes-med.jpg' },
  ];

  const handleMeetDoctor = () => {
    alert('Redirecting to meet the doctor online...');
  };

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <ScrollView>
        <View style={tw`bg-purple-900 p-5 rounded-b-xl`}>
          <Text style={tw`text-3xl text-white font-bold mt-10`}>Health Shop</Text>
          <Text style={tw`text-lg text-white mt-2`}>Buy essential health products online and track your orders.</Text>
        </View>

        <View style={tw`p-4 mt-4`}>
          <Text style={tw`text-2xl text-gray-800 font-semibold mb-3`}>Available Products</Text>
          {products.map(product => (
            <View key={product.id} style={tw`bg-white rounded-lg shadow-md flex-row items-center p-4 mb-4`}>
              <Image source={{ uri: product.image }} style={tw`w-20 h-20 rounded-lg bg-gray-200`} />
              <View style={tw`flex-1 ml-4`}>
                <Text style={tw`text-lg text-gray-800 font-semibold`}>{product.name}</Text>
                <Text style={tw`text-md text-blue-600 mt-1`}>{product.price}</Text>
              </View>
              <TouchableOpacity style={tw`bg-blue-600 px-4 py-2 rounded-lg`}>
                <Text style={tw`text-white text-center`}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <TouchableOpacity style={tw`bg-red-500 flex-row items-center p-4 rounded-lg mx-4 mb-5 shadow-md`} onPress={handleMeetDoctor}>
          <FontAwesome5 name="user-md" size={24} color="white" />
          <Text style={tw`text-white text-xl ml-3`}>Meet a Doctor Online</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
