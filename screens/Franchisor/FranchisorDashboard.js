import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const FranchisorDashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [franchiseTypes, setFranchiseTypes] = useState([]);
  const [form, setForm] = useState({
    name: '',
    founded: '',
    commenced: '',
    description: '',
    contact: '',
  });

  const handleAddType = () => {
    if (form.name && form.founded && form.commenced && form.description && form.contact) {
      setFranchiseTypes([...franchiseTypes, form]);
      setForm({ name: '', founded: '', commenced: '', description: '', contact: '' });
      setModalVisible(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>Dashboard</Text>

      {/* Franchise Info Box */}
      <View style={styles.franchiseBox}>
        <Image source={require('../../assets/ChatimeLogo.png')} style={styles.logo} />
        <View style={styles.franchiseInfo}>
          <Text style={styles.franchiseLabel}>FRANCHISE</Text>
          <View style={styles.row}>
            <Text>★ 4.6</Text>
            <Text style={styles.dot}>|</Text>
            <Text>1945</Text>
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
          <Text style={styles.revenueText}>RpXXXXXXX</Text>
        </View>
      </View>

      {/* Franchise Types */}
      <View style={styles.card}>
        {franchiseTypes.map((type, index) => (
          <View key={index} style={styles.franchiseTypeRow}>
            <Image source={require('../../assets/ChatimeLogo.png')} style={styles.typeImage} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.franchiseLabel}>{type.name}</Text>
              <Text>Date Business Founded: {type.founded}</Text>
              <Text>Date Franchising Commenced: {type.commenced}</Text>
              <Text>Description: {type.description}</Text>
              <Text>Contact: {type.contact}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addTypeButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addTypeText}>Add franchise type</Text>
        <Ionicons name="add-circle" size={16} color="#000" style={{ marginLeft: 5 }} />
      </TouchableOpacity>

      {/* Modal Popup */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>EDIT FRANCHISE PROFILE</Text>
          <View style={styles.imageBox}>
            <View style={styles.imagePlaceholder} />
            <TouchableOpacity style={styles.penIcon}>
              <Ionicons name="pencil" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Franchise Name"
            style={styles.input}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <TextInput
            placeholder="Date Business Founded"
            style={styles.input}
            value={form.founded}
            onChangeText={(text) => setForm({ ...form, founded: text })}
          />
          <TextInput
            placeholder="Date Franchising Commenced"
            style={styles.input}
            value={form.commenced}
            onChangeText={(text) => setForm({ ...form, commenced: text })}
          />
          <TextInput
            placeholder="Description"
            style={[styles.input, { height: 100 }]}
            multiline
            value={form.description}
            onChangeText={(text) => setForm({ ...form, description: text })}
          />
          <Text style={{ marginTop: 10 }}>Image</Text>
          <TouchableOpacity style={styles.imageUploadBox}>
            <Ionicons name="add-circle" size={18} />
            <Text style={{ marginLeft: 6 }}>Add Image</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Contact"
            style={styles.input}
            value={form.contact}
            onChangeText={(text) => setForm({ ...form, contact: text })}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleAddType}>
              <Text style={{ color: 'white' }}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFCF2',
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 28,
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
    borderColor: '#000',
    borderWidth: 1,
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
    borderColor: '#000',
    borderRadius: 6,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  revenueBox: {
    backgroundColor: '#D9D9D9',
    height: 100,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  revenueText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  franchiseTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  typeImage: {
    width: 60,
    height: 60,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 6,
  },
  addTypeButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  addTypeText: {
    fontSize: 14,
  },
  modalContainer: {
    backgroundColor: '#FFFCF2',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
  },
  penIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'green',
    borderRadius: 12,
    padding: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  imageUploadBox: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  saveBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#B5E48C',
  },
});

export default FranchisorDashboard;