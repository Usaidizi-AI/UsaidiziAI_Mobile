import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated, Linking } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'; // Added MaterialIcons for microphone
import * as Speech from 'expo-speech'; // Import the Speech API
import tw from "tailwind-react-native-classnames";

const firstAidTips = [
    {
      id: 1,
      title: 'CPR (Cardiopulmonary Resuscitation) for Individuals with Disabilities',
      description:
        'If the person with a disability requires CPR, check for any medical devices or mobility aids that could interfere. Perform chest compressions and rescue breaths if trained, ensuring proper technique depending on the individual’s physical limitations or conditions.',
    },
    {
      id: 2,
      title: 'First Aid for Cuts and Scrapes on Individuals with Limited Mobility',
      description:
        'Clean the wound with water and apply an antibiotic ointment. Be cautious with areas of reduced sensation (e.g., paralyzed limbs) and cover the wound with a sterile bandage. Seek assistance if the person cannot access the injured area due to mobility issues.',
    },
    {
      id: 3,
      title: 'Burns for Individuals with Sensory Impairments',
      description:
        'For individuals with reduced sensation (e.g., neuropathy or spinal cord injuries), cool the burn under running water and check surrounding areas for unnoticed burns. If the individual cannot feel pain or recognize the severity, it is essential to seek medical help even if the burn seems minor.',
    },
    {
      id: 4,
      title: 'Choking for Individuals with Physical or Cognitive Disabilities',
      description:
        'If the person is in a wheelchair or has difficulty standing, perform abdominal thrusts with them seated or positioned safely. If they are unconscious or unable to respond, perform CPR and call for emergency assistance. For individuals with communication impairments, be mindful of signs of choking, such as difficulty breathing or sudden quietness.',
    },
    {
      id: 5,
      title: 'Fractures for Individuals with Mobility Devices',
      description:
        'Immobilize the injured area, being careful with prosthetics or mobility aids that may complicate the injury. Avoid moving the person if their mobility device is damaged or entangled, and seek medical help immediately.',
    },
    {
      id: 6,
      title: 'Bleeding in Individuals with Limited Sensation',
      description:
        'Apply pressure to the wound using a clean cloth. Be mindful of areas where the person might not feel the injury (due to paralysis or reduced sensation) and check for other hidden injuries. Elevate the injured limb if possible and safe.',
    },
    {
      id: 7,
      title: 'Seizures in Individuals with Neurological Conditions',
      description:
        'Place the person on their side to keep the airway clear and prevent choking. Do not restrain the person. For individuals with epilepsy or other neurological conditions, ensure their environment is safe from objects that could cause injury. Seek medical help if the seizure lasts longer than usual or if this is a first-time event.',
    },
    {
      id: 8,
      title: 'Heat Stroke in Individuals with Limited Mobility or Cognitive Disabilities',
      description:
        'Move the person to a cooler area. If they cannot communicate clearly, check for symptoms of confusion or dizziness. Offer fluids if they are conscious and able to drink safely. For individuals using mobility aids, assist with adjustments as needed to ensure they cool down effectively. Seek medical help if symptoms persist.',
    },
    {
      id: 9,
      title: 'Hypothermia in Individuals with Disabilities',
      description:
        'Warm the person gradually using blankets, focusing on areas with limited sensation or reduced movement. Offer warm liquids if they are able to drink safely. People using assistive devices should be checked for cold-related injuries around contact areas with the devices. Seek medical assistance promptly.',
    },
  ];
  

const FirstAidScreen = () => {
  const [selectedTip, setSelectedTip] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerHeight] = useState(new Animated.Value(0));

  const handleTipPress = (tip) => {
    setSelectedTip(tip);
    setDrawerVisible(true);
    Animated.spring(drawerHeight, {
      toValue: 400,
      useNativeDriver: false,
    }).start();
    
    // Speak the title and description when a tip is pressed
    Speech.speak(`${tip.title}. ${tip.description}`, {
      language: 'en',
      pitch: 1,
      rate: 1,
    });
  };

  const handleCloseDrawer = () => {
    Animated.spring(drawerHeight, {
      toValue: 0,
      useNativeDriver: false,
    }).start(() => setDrawerVisible(false));
  };

  const handleCallAmbulance = () => {
    Linking.openURL('tel:1234567890'); // Replace with actual emergency number
  };

  const handleFindHospital = () => {
    Linking.openURL('https://maps.google.com/?q=hospitals+near+me');
  };

  const handleIceVolunteerCall = () => {
    Linking.openURL('tel:0987654321'); // Replace with actual volunteer emergency contact number
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`p-4 bg-purple-800`}>
        <Text style={[tw`text-white text-lg font-bold`, { fontFamily: 'outfit-bold' }]}>First Aid Tips</Text>
      </View>

      <ScrollView style={tw`flex-1`}>
        {firstAidTips.map((tip) => (
          <TouchableOpacity
            key={tip.id}
            style={tw`m-4 p-4 bg-white rounded-xl shadow-md`}
            onPress={() => handleTipPress(tip)}
          >
            <View style={tw`flex-row items-center`}>
              <FontAwesome5 name="plus-circle" size={24} color="#6b21a8" />
              <View style={tw`ml-4`}>
                <Text style={[tw`text-lg font-bold`, { fontFamily: 'outfit-bold' }]}>{tip.title}</Text>
                <Text style={[tw`text-gray-600 mt-2`, { fontFamily: 'outfit' }]}>{tip.description}</Text>
              </View>
              <MaterialIcons name="mic" size={20} color="#6b21a8" style={tw`ml-4`} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Drawer */}
      {drawerVisible && (
        <Animated.View style={[styles.drawer, { height: drawerHeight }]}>
          <View style={tw`p-4 bg-white flex-1`}>
            {selectedTip && (
              <>
                <Text style={[tw`text-xl font-bold text-purple-800`, { fontFamily: 'outfit-bold' }]}>{selectedTip.title}</Text>
                <Text style={[tw`text-gray-600 mt-2`, { fontFamily: 'outfit' }]}>{selectedTip.description}</Text>
                <View style={tw`mt-4`}>
                  <TouchableOpacity
                    style={[tw`bg-red-500 p-3 rounded-lg mb-2`, styles.button]}
                    onPress={handleCallAmbulance}
                  >
                    <View style={tw`flex-row items-center justify-center`}>
                      <FontAwesome5 name="ambulance" size={20} color="white" />
                      <Text style={[tw`text-white ml-2 font-bold`, { fontFamily: 'outfit-medium' }]}>Call Ambulance</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[tw`bg-blue-500 p-3 rounded-lg mb-2`, styles.button]}
                    onPress={handleFindHospital}
                  >
                    <View style={tw`flex-row items-center justify-center`}>
                      <FontAwesome5 name="hospital" size={20} color="white" />
                      <Text style={[tw`text-white ml-2 font-bold`, { fontFamily: 'outfit-medium' }]}>Find Hospital</Text>
                    </View>
                  </TouchableOpacity>

                  {/* ICE Volunteer Call */}
                  <TouchableOpacity
                    style={[tw`bg-green-500 p-3 rounded-lg`, styles.button]}
                    onPress={handleIceVolunteerCall}
                  >
                    <View style={tw`flex-row items-center justify-center`}>
                      <FontAwesome5 name="hands-helping" size={20} color="white" />
                      <Text style={[tw`text-white ml-2 font-bold`, { fontFamily: 'outfit-medium' }]}>ICE Volunteer Call</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseDrawer}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#e5e5e5',
    borderWidth: 1,
    overflow: 'hidden',
    paddingBottom: 20, // Added padding for a better look
  },
  closeButton: {
    backgroundColor: '#FF5252',
    borderRadius: 20,
    padding: 12,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default FirstAidScreen;
