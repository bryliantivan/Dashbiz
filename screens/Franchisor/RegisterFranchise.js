import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const RegisterFranchise = () => {
  const navigation = useNavigation();

  const [logo, setLogo] = useState(null);
  const [franchiseName, setFranchiseName] = useState('');
  const [dateFounded, setDateFounded] = useState('');
  const [dateCommenced, setDateCommenced] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [contact, setContact] = useState('');

  const pickLogo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>REGISTER FRANCHISE</Text>
      </View>

      {/* Form Card */}
      <View style={styles.card}>
        {/* Logo */}
        <TouchableOpacity style={styles.logoPlaceholder} onPress={pickLogo}>
          {logo ? (
            <Image source={{ uri: logo }} style={styles.logoImage} />
          ) : (
            <>
              <Image
                source={require('../../assets/plusbtn.png')}
                style={styles.plusIcon}
              />
              <Text style={styles.addImageText}>Add Logo</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Franchise Name</Text>
        <TextInput style={styles.input} value={franchiseName} onChangeText={setFranchiseName} />

        <Text style={styles.label}>Date Business Founded</Text>
        <TextInput style={styles.input} value={dateFounded} onChangeText={setDateFounded} />

        <Text style={styles.label}>Date Franchising Commenced</Text>
        <TextInput style={styles.input} value={dateCommenced} onChangeText={setDateCommenced} />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <>
              <Image
                source={require('../../assets/plusbtn.png')}
                style={styles.plusIcon}
              />
              <Text style={styles.addImageText}>Add Image</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Contact</Text>
        <TextInput style={styles.input} value={contact} onChangeText={setContact} />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.rejectButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.rejectText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => navigation.navigate('FranchisorMainTabs')}
          >
            <Text style={styles.acceptText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFCF0',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#EAF6E9',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 50
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    fontSize: 14,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#DFF0D8',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    backgroundColor: '#DFF0D8',
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  addImageText: {
    fontSize: 14,
    color: '#000',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  rejectButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    elevation: 2,
  },
  acceptButton: {
    backgroundColor: '#355843',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    elevation: 2,
  },
  rejectText: {
    color: '#333',
    fontWeight: 'bold',
  },
  acceptText: {
    color: 'white',
    fontWeight: 'bold',
  },
  plusIcon: {
    width: 20,
    height: 20
  },
});

export default RegisterFranchise;
