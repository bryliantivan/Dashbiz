import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Button, TextInput, FlatList, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // For logout icon

const initialFranchises = [
  { id: '1', name: 'Chatime', joined: '25 May 2000', category: 'Drink', location: 'Mayor Street', image: require('../../assets/ChatimeLogo.png') },
  { id: '2', name: 'Fore', joined: '15 May 2000', category: 'Drink', location: 'Jenderal Street', image: require('../../assets/ForeLogo.png') },
  { id: '3', name: 'CFC', joined: '25 June 2000', category: 'F&B', location: 'Bryliant Street', image: require('../../assets/CFCLogo.png') },
];

const OwnerProfile = () => {
  const navigation = useNavigation();
  const [ownerName, setOwnerName] = useState('OWNER\'S NAME');
  const [email, setEmail] = useState('owner@gmail.com');
  const [phone, setPhone] = useState('xxxx-xxxx-xxxx');
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
        <Text style={styles.franchiseText}>FRANCHISE: {item.name}</Text>
        <Text style={styles.franchiseText}>Owned Since: {item.joined}</Text>
        <TouchableOpacity onPress={() => handleRateFranchise(item)} style={styles.rateButtonContainer}>
          <Text style={styles.rateButtonText}>Rate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>PROFILE</Text>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.name}>{ownerName}</Text>
        <Text style={styles.contact}>{email}</Text>
        <Text style={styles.contact}>{phone}</Text>
        <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
        <View style={styles.franchisesSection}>
          <Text style={styles.sectionTitle}>MY FRANCHISES</Text>
          <Text style={styles.franchiseCount}>Total Franchises Owned: {initialFranchises.length}</Text>
          <FlatList
            data={initialFranchises.slice(0, 3)}
            renderItem={renderFranchiseItem}
            keyExtractor={item => item.id}
            style={styles.franchiseList}
          />
        </View>
      </ScrollView>
      <View style={styles.logoutSection}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="sign-out" size={20} color="green" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isEditModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>PROFILE</Text>
          <Image source={profileImage} style={styles.profileImage} />
          <TextInput value={ownerName} onChangeText={setOwnerName} style={styles.input} />
          <TextInput value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput value={phone} onChangeText={setPhone} style={styles.input} />
          <Button title="Save Changes" onPress={saveProfileChanges} />
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
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f0' },
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, textAlign: 'center', marginBottom: 10 },
  profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginVertical: 10 },
  name: { fontSize: 20, textAlign: 'center', marginVertical: 5 },
  contact: { textAlign: 'center', color: '#555' },
  editButton: { alignSelf: 'center', marginVertical: 10 },
  editText: { color: 'blue', textDecorationLine: 'underline' },
  franchisesSection: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  franchiseCount: { marginVertical: 5 },
  franchiseList: { marginVertical: 10 },
  franchiseBox: { flexDirection: 'row', borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, alignItems: 'center' },
  franchiseImage: { width: 100, height: 100 },
  franchiseDetails: { marginLeft: 10, flex: 1 },
  franchiseText: { marginVertical: 2 },
  rateButtonContainer: { marginTop: 5, alignSelf: 'flex-end' },
  rateButtonText: { color: 'green', textDecorationLine: 'underline', padding: 3, borderWidth: 1, borderColor: 'green', borderRadius: 5, fontSize: 12 },
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
});

export default OwnerProfile;