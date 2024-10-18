import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, TextInput, StatusBar } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { FontAwesome5 } from '@expo/vector-icons';

export default function ShopScreen() {
  // Sample product data
  const medicines = [
    { id: 1, name: 'Pain Relief Medicine', price: 'KES 500', image: 'https://www.drugtargetreview.com/wp-content/uploads/drugs.jpg' },
    { id: 2, name: 'Cough Syrup', price: 'KES 350', image: 'https://www.drugtargetreview.com/wp-content/uploads/drugs.jpg' },
    { id: 4, name: 'Diabetes Medication', price: 'KES 800', image: 'https://www.drugtargetreview.com/wp-content/uploads/drugs.jpg' },
    { id: 9, name: 'Antibiotics', price: 'KES 1,200', image: 'https://www.drugtargetreview.com/wp-content/uploads/drugs.jpg' },
    { id: 10, name: 'Antimalarial Drugs', price: 'KES 600', image: 'https://www.drugtargetreview.com/wp-content/uploads/drugs.jpg' },
  ];

  const medicalEquipment = [
    { id: 3, name: 'Artificial Leg', price: 'KES 150,000', image: 'https://c7.alamy.com/comp/BGNEYH/artificial-limbs-india-BGNEYH.jpg' },
    { id: 5, name: 'Blood Pressure Monitor', price: 'KES 3,500', image: 'https://c7.alamy.com/comp/BGNEYH/artificial-limbs-india-BGNEYH.jpg' },
    { id: 6, name: 'Wheelchair', price: 'KES 10,000', image: 'https://c7.alamy.com/comp/BGNEYH/artificial-limbs-india-BGNEYH.jpg' },
    { id: 7, name: 'Stethoscope', price: 'KES 1,500', image: 'https://c7.alamy.com/comp/BGNEYH/artificial-limbs-india-BGNEYH.jpg' },
    { id: 8, name: 'Thermometer', price: 'KES 500', image: 'https://c7.alamy.com/comp/BGNEYH/artificial-limbs-india-BGNEYH.jpg' },
  ];
  
  

  const handleMeetDoctor = () => {
    alert('Redirecting to meet the doctor online...');
  };

  const handleUpload = () => {
    alert('Upload functionality not implemented yet.');
  };

  return (
    <View style={tw`flex-1 bg-gray-200 mt-6`}>
                    <StatusBar barStyle="dark-content" backgroundColor="#6B21A8" />

      {/* Header Section */}
      <View style={styles.header}>
          <Text style={tw`text-4xl text-white font-bold mt-8`}>Health Shop</Text>
          <Text style={tw`text-lg text-white mt-2`}>Buy essential health products and track your orders.</Text>
        </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Upload Medical Slip Section */}
        <View style={styles.uploadSection}>
          <Text style={tw`text-2xl text-gray-800 font-semibold mb-2`}>Upload Medical Slip</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter prescription details"
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={tw`text-white text-lg`}>Upload Slip</Text>
          </TouchableOpacity>
        </View>

        {/* Available Products Section */}
        <Text style={tw`text-2xl text-gray-800 font-semibold mb-3 mt-6`}>Medicines</Text>
        {medicines.map(product => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={tw`text-white text-center`}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={tw`text-2xl text-gray-800 font-semibold mb-3 mt-6`}>Medical Equipment</Text>
        {medicalEquipment.map(product => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImageLarge} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
            <TouchableOpacity style={styles.buyButton}>
              <Text style={tw`text-white text-center`}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Meet Doctor Button */}
        <TouchableOpacity style={styles.meetDoctorButton} onPress={handleMeetDoctor}>
          <FontAwesome5 name="user-md" size={24} color="white" />
          <Text style={tw`text-white text-lg ml-3`}>Meet a Doctor Online</Text>
      
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  header: {
    backgroundColor: '#6B21A8',
    padding: 20,
    marginBottom: 16,
  },
  uploadSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    height: 100,
  },
  uploadButton: {
    backgroundColor: '#6B21A8',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#e5e5e5',
  },
  productImageLarge: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#e5e5e5',
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#6B21A8',
    marginTop: 4,
  },
  buyButton: {
    backgroundColor: '#6B21A8',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  meetDoctorButton: {
    backgroundColor: '#d9534f',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginVertical: 20,
    elevation: 2,
  },
});
