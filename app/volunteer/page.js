import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const volunteers = [
    { id: 1, name: 'John Doe', age: 28, gender: 'Male', helped: 45, coordinate: { latitude: -1.2921, longitude: 36.8219 } },
    { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', helped: 30, coordinate: { latitude: -1.2841, longitude: 36.8233 } },
    { id: 3, name: 'Michael Johnson', age: 22, gender: 'Male', helped: 55, coordinate: { latitude: -1.2951, longitude: 36.8119 } },
    { id: 4, name: 'Emily Davis', age: 25, gender: 'Female', helped: 40, coordinate: { latitude: -1.2815, longitude: 36.8212 } },
    { id: 5, name: 'Sara Wilson', age: 29, gender: 'Female', helped: 35, coordinate: { latitude: -1.2928, longitude: 36.8290 } },
    { id: 6, name: 'James Brown', age: 40, gender: 'Male', helped: 70, coordinate: { latitude: -1.2965, longitude: 36.8156 } },
    { id: 7, name: 'Olivia Taylor', age: 26, gender: 'Female', helped: 25, coordinate: { latitude: -1.2945, longitude: 36.8210 } },
    { id: 8, name: 'Liam Anderson', age: 31, gender: 'Male', helped: 60, coordinate: { latitude: -1.2982, longitude: 36.8185 } },
    { id: 9, name: 'Sophia Moore', age: 27, gender: 'Female', helped: 48, coordinate: { latitude: -1.2863, longitude: 36.8269 } },
    { id: 10, name: 'William Martinez', age: 35, gender: 'Male', helped: 65, coordinate: { latitude: -1.2903, longitude: 36.8234 } },
    { id: 11, name: 'Ava Jackson', age: 24, gender: 'Female', helped: 22, coordinate: { latitude: -1.2938, longitude: 36.8174 } },
    { id: 12, name: 'Noah White', age: 33, gender: 'Male', helped: 55, coordinate: { latitude: -1.2884, longitude: 36.8200 } },
    { id: 13, name: 'Mia Harris', age: 21, gender: 'Female', helped: 30, coordinate: { latitude: -1.2911, longitude: 36.8195 } },
    { id: 14, name: 'Lucas Clark', age: 29, gender: 'Male', helped: 40, coordinate: { latitude: -1.2825, longitude: 36.8281 } },
    { id: 15, name: 'Charlotte Lee', age: 34, gender: 'Female', helped: 52, coordinate: { latitude: -1.2978, longitude: 36.8247 } },
    { id: 16, name: 'Henry Lewis', age: 30, gender: 'Male', helped: 38, coordinate: { latitude: -1.2907, longitude: 36.8192 } },
    { id: 17, name: 'Isabella Walker', age: 28, gender: 'Female', helped: 46, coordinate: { latitude: -1.2855, longitude: 36.8229 } },
    { id: 18, name: 'Ethan Robinson', age: 36, gender: 'Male', helped: 50, coordinate: { latitude: -1.2896, longitude: 36.8164 } },
    { id: 19, name: 'Amelia Young', age: 27, gender: 'Female', helped: 33, coordinate: { latitude: -1.2931, longitude: 36.8202 } },
    { id: 20, name: 'Alexander King', age: 37, gender: 'Male', helped: 58, coordinate: { latitude: -1.2959, longitude: 36.8191 } },
    { id: 21, name: 'Harper Scott', age: 23, gender: 'Female', helped: 29, coordinate: { latitude: -1.2915, longitude: 36.8273 } },
    { id: 22, name: 'Benjamin Green', age: 39, gender: 'Male', helped: 63, coordinate: { latitude: -1.2887, longitude: 36.8285 } },
    { id: 23, name: 'Elijah Adams', age: 31, gender: 'Male', helped: 47, coordinate: { latitude: -1.2875, longitude: 36.8221 } },
    { id: 24, name: 'Abigail Hill', age: 26, gender: 'Female', helped: 36, coordinate: { latitude: -1.2860, longitude: 36.8243 } },
    { id: 25, name: 'Jackson Baker', age: 28, gender: 'Male', helped: 54, coordinate: { latitude: -1.2912, longitude: 36.8255 } },
  ];
  

const VolunteerMapScreen = () => {
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMarkerPress = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setModalVisible(true);
  };

  const handleCall = () => {
    if (selectedVolunteer) {
      const phoneNumber = `tel:+1234567890`; // Dummy phone number
      Linking.openURL(phoneNumber);
    }
  };

  const handleHelpRequest = () => {
    alert("Help request sent to volunteer!");
  };

  return (
    <View style={tw`flex-1`}>
      {/* Map with Volunteer Markers */}
      <MapView
        style={tw`flex-1`}
        initialRegion={{
          latitude: -1.2921,
          longitude: 36.8219,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {volunteers.map((volunteer) => (
          <Marker
            key={volunteer.id}
            coordinate={volunteer.coordinate}
            title={volunteer.name}
            onPress={() => handleMarkerPress(volunteer)}
          >
            <FontAwesome5 name="user-circle" size={30} color="purple" />
          </Marker>
        ))}
      </MapView>

      {/* Modal for Volunteer Info */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedVolunteer && (
              <>
                <Text style={tw`text-2xl font-bold text-purple-800`}>{selectedVolunteer.name}</Text>
                <Text style={tw`text-lg mt-2`}>Age: {selectedVolunteer.age}</Text>
                <Text style={tw`text-lg`}>Gender: {selectedVolunteer.gender}</Text>
                <Text style={tw`text-lg`}>Helped: {selectedVolunteer.helped} people</Text>

                {/* Call to Action Buttons */}
                <View style={tw`mt-8`}>
                  <TouchableOpacity
                    style={tw`bg-red-500 p-3 rounded-lg mb-2`}
                    onPress={handleCall}
                  >
                    <View style={tw`flex-row items-center justify-center`}>
                      <FontAwesome5 name="phone" size={20} color="white" />
                      <Text style={tw`text-white ml-2 font-bold`}>Call Volunteer</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={tw`bg-blue-500 p-3 rounded-lg`}
                    onPress={handleHelpRequest}
                  >
                    <View style={tw`flex-row items-center justify-center`}>
                      <FontAwesome5 name="hands-helping" size={20} color="white" />
                      <Text style={tw`text-white ml-2 font-bold`}>Request Help</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {/* Close Modal */}
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#e5e5e5',
    borderWidth: 1,
  },
  closeButton: {
    backgroundColor: '#FF5252',
    borderRadius: 20,
    padding: 12,
    alignSelf: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VolunteerMapScreen;
