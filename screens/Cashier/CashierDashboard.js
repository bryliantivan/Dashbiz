import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const initialFranchises = [
  { id: '1', name: 'Red Dog', since: '25 May 2000', image: require('../../assets/RedDogLogo.png') },
  { id: '2', name: 'Pizza Hut', since: '15 May 2000', image: require('../../assets/PizzaHutLogo.png') },
  { id: '3', name: 'JCO', since: '25 June 2000', image: require('../../assets/JCOLogo.png') },
];

export default function CashierDashboard() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('Cashier’s Name');
  const [email, setEmail] = useState('cashier@gmail.com');
  const [phone, setPhone] = useState('08xx xxxx xxxx');

  const navigation = useNavigation();

  const handleFranchisePress = (franchise) => {
    navigation.navigate('AssignedFranchise', { franchise });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTextCentered}>
            <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.headerText}>CASHIER</Text>
            <Ionicons name="chevron-down" size={16} />
            </TouchableOpacity>
        </Text>
        {dropdownVisible && (
            <TouchableOpacity
            style={styles.logoutDropdown}
            onPress={() => alert('Logged out')}
            >
            <Ionicons name="log-out-outline" size={16} color="white" style={{ marginRight: 6 }} />
            <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        )}
        </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image source={require('../../assets/Chatime1.jpg')} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{name}</Text>
          <Text>{email}</Text>
          <Text>{phone}</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
          <Text style={{ color: 'white' }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Franchise List */}
      <Text style={styles.workplaceTitle}>My Workplaces</Text>
      <FlatList
        data={initialFranchises}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.franchiseCard} onPress={() => handleFranchisePress(item)}>
            <Image source={item.image} style={styles.franchiseImage} />
            <View>
              <Text style={styles.franchiseName}>FRANCHISE</Text>
              <Text style={styles.franchiseText}>Work since: {item.since}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Edit Profile Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>EDIT PROFILE</Text>
            <Image source={require('../../assets/Chatime1.jpg')} style={styles.modalProfileImage} />
            <Text style={styles.editNameLabel}>
              {name} <Ionicons name="pencil" />
            </Text>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
            />

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.saveButton}
            >
              <Text>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbea',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    alignItems: 'center',
  },
  logoutDropdown: {
    backgroundColor: '#f88',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileCard: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#a8e060',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  workplaceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  franchiseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
  },
  franchiseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  franchiseName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  franchiseText: {
    fontSize: 13,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fffbea',
    padding: 20,
    borderRadius: 12,
    width: '85%',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  editNameLabel: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  saveButton: {
    alignSelf: 'center',
    backgroundColor: '#e1e1e1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
});
