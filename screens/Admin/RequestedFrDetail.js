import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

const RequestedFrDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, description: initialDescription, onAccept, onReject } = route.params || {};

  const [franchiseName, setFranchiseName] = useState(item?.title || '');
  const [dateFounded, setDateFounded] = useState('June 9th 2025');
  const today = new Date();
  const monthsEng = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const day = today.getDate();
  const dayWithSuffix = `${day}th`;
  const todayString = `${monthsEng[today.getMonth()]} ${dayWithSuffix} ${today.getFullYear()}`;
  const [dateCommenced, setDateCommenced] = useState(todayString);
  const [description, setDescription] = useState(initialDescription || '');
  const [contact, setContact] = useState(item?.requestedBy || '');
  const [image, setImage] = useState(null);

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
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>REQUESTED DETAILS</Text>
      </View>

      {/* Form Card */}
      <View style={styles.card}>
        {/* Top Image from item, fallback to placeholder */}
        {item?.image ? (
          <Image source={item.image} style={styles.imageTopPlaceholder} />
        ) : (
          <View style={styles.imageTopPlaceholder} />
        )}

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
              <Ionicons name="add-circle-outline" size={24} color="#000" />
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
            onPress={() => {
              if (onReject) onReject(item);
              navigation.goBack();
            }}
          >
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => {
              if (onAccept) onAccept(item);
              navigation.goBack();
            }}
          >
            <Text style={styles.acceptText}>Accept</Text>
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
  imageTopPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
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
  },
  acceptButton: {
    backgroundColor: '#B6E388',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  rejectText: {
    color: '#333',
    fontWeight: 'bold',
  },
  acceptText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default RequestedFrDetail;
