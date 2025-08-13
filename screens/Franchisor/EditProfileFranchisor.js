import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
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
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EDIT FRANCHISE PROFILE</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo with edit icon */}
        <View style={styles.logoContainer}>
          <Image
            source={logo ? { uri: logo } : require('../../assets/ChatimeLogo.png')}
            style={styles.logo}
          />
          <TouchableOpacity style={styles.editIcon} onPress={pickLogo}>
            <Image
                source={require('../../assets/whitepencil.png')}
                style={styles.PencilIcon}
            />
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
          <Image
              source={require('../../assets/addimage.png')}
              style={styles.AddIcon}
          />
          <Text style={styles.addImageText}>Add Image</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Contact</Text>
        <TextInput style={styles.input} value={contact} onChangeText={setContact} />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={() => navigation.goBack()}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFCF2',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    marginTop: 20
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    padding: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  container: {
    padding: 20,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelText: {
    color: '#000',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#355843',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveText: {
    color: 'white',
  },
  PencilIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  AddIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default EditProfileFranchisor;