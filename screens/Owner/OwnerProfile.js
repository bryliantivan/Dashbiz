import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Button, TextInput, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For logout icon

const initialFranchises = [
  { id: '1', name: 'Chatime', joined: '25 May 2000', category: 'Drink', location: 'Mayor Street', image: require('../../assets/ChatimeLogo.png') },
  { id: '2', name: 'Fore', joined: '15 May 2000', category: 'Drink', location: 'Jenderal Street', image: require('../../assets/ForeLogo.png') },
  { id: '3', name: 'CFC', joined: '25 June 2000', category: 'F&B', location: 'Bryliant Street', image: require('../../assets/CFCLogo.png') },
];

const OwnerProfile = () => {
  const navigation = useNavigation();
  const [ownerName, setOwnerName] = useState('Oberon');
  const [email, setEmail] = useState('vortigernz@gmail.com');
  const [phone, setPhone] = useState('0869-6969-6969');
  const [profileImage, setProfileImage] = useState(require('../../assets/cappucino.jpg'));
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isRateModalVisible, setRateModalVisible] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [rating, setRating] = useState(0);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleEditProfile = () => {
    setEditModalVisible(true);
  };

  const saveProfileChanges = () => {
    setEditModalVisible(false);
  };

  const handleRateFranchise = (franchise) => {
    setSelectedFranchise(franchise);
    setRateModalVisible(true);
  };

  const submitRating = () => {
    setRateModalVisible(false);
    console.log(`Rated ${selectedFranchise.name} with ${rating} stars`);
  };

  const renderFranchiseItem = ({ item }) => (
    <View style={styles.franchiseBox}>
      <Image source={item.image} style={styles.franchiseImage} />
      <View style={styles.franchiseDetails}>
        <Text style={styles.franchiseText}>{item.name}</Text>
        <Text>Owned Since: {item.joined}</Text>
        <TouchableOpacity onPress={() => handleRateFranchise(item)} style={styles.rateButtonContainer}>
          <Text style={styles.rateButtonText}>Rate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderProfileHeader = () => (
    <View>
      <Text style={styles.header}>PROFILE</Text>
      <Image source={profileImage} style={styles.profileImage} />
      <Text style={styles.name}>{ownerName}</Text>
      <Text style={styles.contact}>{email}</Text>
      <Text style={styles.contact}>{phone}</Text>
      <TouchableOpacity onPress={handleEditProfile} style={styles.editProfileButton}>
        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
      </TouchableOpacity>
      <View style={styles.franchisesSection}>
        <Text style={styles.sectionTitle}>MY FRANCHISES</Text>
        <Text style={styles.franchiseCount}>Total Franchises Owned: {initialFranchises.length}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.containerAll}>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={initialFranchises.slice(0, 3)}
          renderItem={renderFranchiseItem}
          keyExtractor={item => item.id}
          style={styles.franchiseList}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ListHeaderComponent={renderProfileHeader}
        />
        <View style={styles.logoutSection}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="sign-out" size={20} color="green" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={isEditModalVisible} animationType="slide">
          <View style={styles.editModalContainer}>
            <Text style={styles.editModalHeader}>PROFILE</Text>

            <View style={styles.profilePictureContainer}>
              <View style={styles.profilePictureCircle}>
                <Text style={styles.profilePictureText}>PROFILE PICTURE</Text>
              </View>
            </View>

            <View style={styles.nameRow}>
              <Text style={styles.ownerName}>{ownerName}</Text>
              <TouchableOpacity>
                <Icon name="pencil" size={18} color="#000" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.editInput}
              placeholder="Enter your email"
            />

            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              style={styles.editInput}
              placeholder="Enter your phone number"
         />

            <TouchableOpacity style={styles.saveButton} onPress={saveProfileChanges}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </Modal>


        <Modal visible={isRateModalVisible} animationType="slide" transparent={true}>
          <View style={styles.rateModalOverlay}>
            <View style={styles.rateModalContainer}>
              <View style={styles.rateModalHeader}>
                <Text style={styles.rateModalTitle}>Rate the Franchise</Text>
                <TouchableOpacity onPress={() => setRateModalVisible(false)}>
                  <Text style={styles.closeButton}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Text style={styles.star}>{star <= rating ? '★' : '☆'}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Button title="Submit" onPress={submitRating} color="#90EE90" />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerAll: { flex: 1, backgroundColor: '#f5f5f0', marginTop: 20 },
  safeArea: { flex: 1, backgroundColor: '#f5f5f0', marginVertical: 15 },
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, textAlign: 'center', marginBottom: 10 },
  profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginVertical: 10 },
  name: { fontSize: 20, textAlign: 'center', marginVertical: 5 },
  contact: { textAlign: 'center', color: '#555' },
  editButton: { alignSelf: 'center', marginVertical: 10 }, // keep for legacy
  editProfileButton: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  editProfileButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  franchisesSection: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  franchiseCount: { marginVertical: 5 },
  franchiseList: { marginVertical: 10 },
  franchiseBox: { flexDirection: 'row', borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, alignItems: 'center' },
  franchiseImage: { width: 100, height: 100 },
  franchiseDetails: { marginLeft: 10, flex: 1 },
  franchiseText: { marginVertical: 2, fontWeight: 'bold' },
  rateButtonContainer: { marginTop: 5, alignSelf: 'flex-end' },
  rateButtonText: {
    color: '#000',
    backgroundColor: '#ade25c',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ade25c',
    borderRadius: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  logoutSection: { padding: 10, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ccc' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 },
  logoutText: { color: 'green', marginLeft: 5 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalHeader: { fontSize: 24, marginBottom: 10 },
  input: { borderWidth: 1, width: 200, marginVertical: 5, padding: 5 },
  star: { fontSize: 30, marginHorizontal: 5 },
  rateModalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  rateModalContainer: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20, elevation: 5 },
  rateModalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  rateModalTitle: { fontSize: 18, fontWeight: 'bold' },
  closeButton: { fontSize: 18 },
  starContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  editModalContainer: {
  flex: 1,
  alignItems: 'center',
  padding: 20,
  backgroundColor: '#fffdeb',
},
  editModalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profilePictureContainer: {
    marginBottom: 20,
  },
  profilePictureCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureText: {
    color: '#555',
    fontSize: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ownerName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    marginTop: 10,
    fontWeight: '500',
  },
  editInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#d6f4a9',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: '#000',
  },

});

export default OwnerProfile;