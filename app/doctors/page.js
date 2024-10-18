import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import tw from "tailwind-react-native-classnames";
import * as Linking from 'expo-linking';

export default function DoctorsScreen() {
  const doctors = [
    { id: 1, name: 'Dr. John Doe', specialization: 'Cardiologist', image: 'https://randomuser.me/api/portraits/men/52.jpg' },
    { id: 2, name: 'Dr. Jane Smith', specialization: 'Dermatologist', image: 'https://randomuser.me/api/portraits/women/56.jpg' },
    { id: 3, name: 'Dr. Emily Johnson', specialization: 'Pediatrician', image: 'https://randomuser.me/api/portraits/men/51.jpg' },
  ];

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDoctor(null);
  };

  const joinGoogleMeet = () => {
    const googleMeetLink = "https://meet.google.com/tjo-mczi-ezt";  // Replace with your Google Meet link
    Linking.openURL(googleMeetLink);
  };

  return (
    <View style={tw`flex-1 bg-gray-200 mt-6`}>
         {/* Header Section */}
         <View style={tw`bg-purple-900 p-6 rounded-b-xl mb-4`}>
          <Text style={tw`text-4xl text-white font-bold mt-6`}>Doctors</Text>
          <Text style={tw`text-lg text-white mt-2`}>Choose a doctor and book or join a meeting online.</Text>
        </View>
      <ScrollView contentContainerStyle={tw`pb-6 px-4`}>
       

        {/* List of Doctors */}
        {doctors.map(doctor => (
          <TouchableOpacity 
            key={doctor.id} 
            style={tw`bg-white rounded-lg mb-4 p-4 flex-row items-center shadow-md`} 
            onPress={() => handleSelectDoctor(doctor)}
          >
            <Image source={{ uri: doctor.image }} style={tw`w-20 h-20 rounded-full bg-gray-200 mr-4`} />
            <View style={tw`flex-1`}>
              <Text style={tw`text-lg font-bold text-gray-800`}>{doctor.name}</Text>
              <Text style={tw`text-purple-700 mt-1`}>{doctor.specialization}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Modal */}
        {selectedDoctor && (
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
            onRequestClose={closeModal}
          >
            <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
              <View style={tw`bg-white rounded-lg p-6 w-4/5 shadow-lg`}>
                <Text style={tw`text-xl font-bold mb-4`}>{selectedDoctor.name}</Text>
                <Text style={tw`text-lg mb-4`}>Specialization: {selectedDoctor.specialization}</Text>

                {/* Book Now Button */}
                <TouchableOpacity 
                  style={tw`bg-purple-800 rounded-md py-3 mb-4`} 
                  onPress={() => alert('Booking functionality coming soon!')}
                >
                  <Text style={tw`text-white text-center`}>Book Him Now</Text>
                </TouchableOpacity>

                {/* Join Google Meet Button */}
                <TouchableOpacity 
                  style={tw`bg-purple-800 rounded-md py-3 mb-4`} 
                  onPress={joinGoogleMeet}
                >
                  <Text style={tw`text-white text-center`}>Join a Meet Now</Text>
                </TouchableOpacity>

                {/* Close Modal Button */}
                <TouchableOpacity style={tw`mt-2 py-2`} onPress={closeModal}>
                  <Text style={tw`text-gray-800 text-center`}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
}
