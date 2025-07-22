import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const EditProfileFranchisor = () => {
  const [logo, setLogo] = useState(null);
  const [franchiseName, setFranchiseName] = useState('');
  const [foundedDate, setFoundedDate] = useState('');
  const [franchiseDate, setFranchiseDate] = useState('');
  const [description, setDescription] = useState('');
  const [galleryImage, setGalleryImage] = useState(null);
  const [contact, setContact] = useState('');
  const navigation = useNavigation();
  
  const pickLogo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) setLogo(result.assets[0].uri);
  };

  const pickGalleryImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) setGalleryImage(result.assets[0].uri);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo with edit icon */}
      <View style={styles.logoContainer}>
        <Image
        //   source={logo ? { uri: logo } : require('../../assets/placeholder.png')}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.editIcon} onPress={pickLogo}>
          <Ionicons name="pencil" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <Text style={styles.label}>Franchise Name</Text>
      <TextInput style={styles.input} value={franchiseName} onChangeText={setFranchiseName} />

      <Text style={styles.label}>Date Business Founded</Text>
      <TextInput style={styles.input} value={foundedDate} onChangeText={setFoundedDate} />

      <Text style={styles.label}>Date Franchising Commenced</Text>
      <TextInput style={styles.input} value={franchiseDate} onChangeText={setFranchiseDate} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Image</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickGalleryImage}>
        <Ionicons name="add-circle" size={20} color="black" />
        <Text style={styles.addImageText}>Add Image</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Contact</Text>
      <TextInput style={styles.input} value={contact} onChangeText={setContact} />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('FranchisorProfileMain')}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('FranchisorProfileMain')}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFFCF2',
    flexGrow: 1,
  },
  logoContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
  },
  editIcon: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    backgroundColor: '#3E5D4D',
    borderRadius: 12,
    padding: 5,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    borderRadius: 6,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  addImageText: {
    marginLeft: 10,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelText: {
    fontWeight: 'bold',
    color: '#000',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#D3F276',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveText: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default EditProfileFranchisor;