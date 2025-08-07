import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
  ScrollView, Modal, TextInput, Button
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const FranchisorDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [types, setTypes] = useState([
    {
      id: 1,
      name: 'Basic Package',
      image: require('../../assets/ChatimeLogo.png'),
      outlets: 10,
    }
  ]);

  const [form, setForm] = useState({
    name: '',
    price: '',
    area: '',
    description: '',
    image: null,
  });

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setForm({ ...form, image: result.assets[0].uri });
    }
  };

  const handleAddType = () => {
    const newType = {
      id: types.length + 1,
      name: form.name || 'New Type',
      image: form.image,
      outlets: 0,
    };
    setTypes([...types, newType]);
    setForm({ name: '', price: '', area: '', description: '', image: null });
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFCF2' }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Dashboard</Text>

        {/* Franchise Info */}
        <View style={styles.franchiseBox}>
          <Image source={require('../../assets/ChatimeLogo.png')} style={styles.logo} />
          <View style={styles.franchiseInfo}>
            <Text style={styles.franchiseLabel}>FRANCHISE</Text>
            <View style={styles.row}>
              <Text>★ 4.6</Text><Text style={styles.dot}>|</Text><Text>1945</Text>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons name="calendar" size={16} />
              <Text style={styles.infoText}> Date Franchising Commenced : 2023</Text>
            </View>
            <View style={styles.row}>
              <MaterialCommunityIcons name="store" size={16} />
              <Text style={styles.infoText}> Number of Outlets : 460</Text>
            </View>
          </View>
        </View>

        {/* Revenue Box */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Revenue from One-Time Purchased</Text>
          <View style={styles.revenueBox}>
            <Text style={styles.revenueText}>Rp65.900.363</Text>
          </View>
        </View>

        {/* Franchise Types */}
        {types.map((type) => (
          <View style={styles.card} key={type.id}>
            <View style={styles.franchiseTypeRow}>
              <Image
                source={typeof type.image === 'string' ? { uri: type.image } : type.image}
                style={styles.typeImage}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.franchiseLabel}>{type.name}</Text>
                <Text>Total outlets : {type.outlets}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Add Button */}
        <TouchableOpacity style={styles.addTypeButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addTypeText}>Add franchise type</Text>
          <Ionicons name="add-circle" size={16} color="white" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </ScrollView>

      {/* Popup Modal */}
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <ScrollView style={styles.container}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>ADD NEW FRANCHISE TYPE</Text>

          <Text>Type Name</Text>
          <TextInput
            style={styles.input}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />

          <Text>Price</Text>
          <TextInput
            style={styles.input}
            value={form.price}
            onChangeText={(text) => setForm({ ...form, price: text })}
            keyboardType="numeric"
          />

          <Text>Area</Text>
          <TextInput
            style={styles.input}
            value={form.area}
            onChangeText={(text) => setForm({ ...form, area: text })}
          />

          <Text>Description</Text>
          <TextInput
            style={styles.input}
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
            multiline
          />

          <Text>Image</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
            <Ionicons name="add-circle" size={20} color="black" />
            <Text style={{ marginLeft: 8 }}>Add Image</Text>
          </TouchableOpacity>

          {form.image && (
            <Image source={{ uri: form.image }} style={{ width: 100, height: 100, marginVertical: 10 }} />
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleAddType}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFCF2',
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingTop: 20,
  },
  franchiseBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
  franchiseInfo: {
    marginLeft: 16,
    flex: 1,
  },
  franchiseLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  dot: {
    marginHorizontal: 5,
  },
  infoText: {
    fontSize: 14,
  },
  card: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 15,
    borderColor: '#D3D3D3',
    shadowColor: '#000', // Efek bayangan
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  revenueBox: {
    height: 100,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  revenueText: {
    fontSize: 24,
    fontWeight: '800',
  },
  franchiseTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  typeImage: {
    width: 60,
    height: 60,
    borderRadius: 6,
  },
  addTypeButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#355843',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addTypeText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#355843',
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default FranchisorDashboard;
