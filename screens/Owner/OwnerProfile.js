import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, FlatList, StyleSheet, SafeAreaView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const initialFranchises = [
  { id: '1', name: 'Chatime', joined: '25 May 2000', category: 'Drink', location: 'Mayor Street', image: require('../../assets/ChatimeLogo.png') },
  { id: '2', name: 'Fore', joined: '15 May 2000', category: 'Drink', location: 'Jenderal Street', image: require('../../assets/ForeLogo.png') },
  { id: '3', name: 'CFC', joined: '25 June 2000', category: 'F&B', location: 'Bryliant Street', image: require('../../assets/CFCLogo.png') },
];

const OwnerProfile = () => {
  const navigation = useNavigation();
  const [ownerName, setOwnerName] = useState('Oberon');
  const [editableName, setEditableName] = useState(ownerName);
  const [isEditingName, setIsEditingName] = useState(false);
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
    setEditableName(ownerName); // reset temp name before editing
    setEditModalVisible(true);
  };

  const saveProfileChanges = () => {
    setOwnerName(editableName);
    setIsEditingName(false);
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
        <Text style={styles.franchiseText}>{item.name.toUpperCase()}</Text>
        <Text style={styles.franchiseOwned}>▪ Owned Since : {item.joined}</Text>
        <TouchableOpacity onPress={() => handleRateFranchise(item)} style={styles.rateButtonContainer}>
          <Text style={styles.rateButtonText}>Rate Franchise</Text>
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
        <Text style={styles.franchiseCount}>Total Franchises Owned : {initialFranchises.length}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.containerAll}>
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          data={initialFranchises}
          renderItem={renderFranchiseItem}
          keyExtractor={item => item.id}
          style={styles.franchiseList}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ListHeaderComponent={renderProfileHeader}
        />

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="sign-out" size={20} color="green" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Edit Profile Modal */}
        <Modal visible={isEditModalVisible} animationType="slide">
          <View style={styles.editModalContainer}>
            <Text style={styles.editModalHeader}>PROFILE</Text>
            <View style={styles.profilePictureContainer}>
              <View style={styles.profilePictureCircle}>
                <Text style={styles.profilePictureText}>PROFILE PICTURE</Text>
              </View>
            </View>

            <View style={styles.nameRow}>
              {isEditingName ? (
                <TextInput
                  style={[styles.editInput, { flex: 1 }]}
                  value={editableName}
                  onChangeText={setEditableName}
                  placeholder="Enter name"
                />
              ) : (
                <>
                  <Text style={styles.ownerName}>{ownerName}</Text>
                  <TouchableOpacity onPress={() => setIsEditingName(true)}>
                    <Icon name="pencil" size={18} color="#000" style={{ marginLeft: 8 }} />
                  </TouchableOpacity>
                </>
              )}
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

        {/* Rate Modal */}
        <Modal visible={isRateModalVisible} animationType="slide" transparent={true}>
          <View style={styles.rateModalOverlay}>
            <View style={styles.rateModalContainer}>
              <TouchableOpacity onPress={() => setRateModalVisible(false)} style={styles.closeButtonContainer}>
                <Text style={styles.closeButton}>X</Text>
              </TouchableOpacity>
              <View style={styles.rateModalHeader}>
                <Text style={styles.rateModalTitle}>Rate the Franchise</Text>
              </View>
              <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)}>
                    <Text style={styles.star}>{star <= rating ? '★' : '☆'}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity onPress={submitRating} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerAll: { flex: 1, backgroundColor: '#FFFCF0', marginTop: 20 },
  safeArea: { flex: 1, marginVertical: 15 },
  header: { fontSize: 24, textAlign: 'center', marginBottom: 10 },
  profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginVertical: 10 },
  name: { fontSize: 20, textAlign: 'center', marginVertical: 5 },
  contact: { textAlign: 'center', color: '#555' },
  editProfileButton: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#355843',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editProfileButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  franchisesSection: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  franchiseCount: { marginVertical: 5 },
  franchiseList: { marginVertical: 10 },

  franchiseBox: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  franchiseImage: { width: 70, height: 70, resizeMode: 'contain' },
  franchiseDetails: { marginLeft: 12, flex: 1 },
  franchiseText: { fontWeight: 'bold', fontSize: 16 },
  franchiseOwned: { marginTop: 4, marginBottom: 10, fontSize: 13 },
  rateButtonContainer: {
    alignSelf: 'flex-end',
  },
  rateButtonText: {
    color: 'white',
    backgroundColor: '#355843',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 5,
    fontSize: 13,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  logoutText: { color: 'green', marginLeft: 5 },

  rateModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  rateModalContainer: {
    width: '80%',
    backgroundColor: '#FFFCF0',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  rateModalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  rateModalTitle: { fontSize: 18, fontWeight: 'bold' },
  closeButton: { fontSize: 18 },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#FFFCF0'
  },
  star: { fontSize: 30, marginHorizontal: 5 },

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
    width: '100%',
    justifyContent: 'center'
  },
  ownerName: {
    fontSize: 20,
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
    backgroundColor: '#355843',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#355843',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center', // ✅ Center horizontally
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default OwnerProfile;
