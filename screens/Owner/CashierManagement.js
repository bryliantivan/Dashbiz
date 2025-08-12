import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  Modal,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Tambahkan ini
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const initialCashiers = [
  { id: '1', name: 'Budi Santoso', email: 'budi.s@example.com', status: 'Active', lastLogin: '2024-07-17 10:30' },
  { id: '2', name: 'Siti Aminah', email: 'siti.a@example.com', status: 'Inactive', lastLogin: '2024-07-10 14:00' },
  { id: '3', name: 'Joko Susilo', email: 'joko.s@example.com', status: 'Active', lastLogin: '2024-07-16 09:00' },
  { id: '4', name: 'Dewi Lestari', email: 'dewi.l@example.com', status: 'Active', lastLogin: '2024-07-17 11:45' },
  { id: '5', name: 'Agus Salim', email: 'agus.s@example.com', status: 'Inactive', lastLogin: '2024-07-05 16:00' },
];

const CashierManagement = ({ navigation }) => {
  const [cashiers, setCashiers] = useState(initialCashiers);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newCashierName, setNewCashierName] = useState('');
  const [newCashierEmail, setNewCashierEmail] = useState('');

  // Fungsi untuk menerima data yang diubah dari EditCashierScreen
  const handleUpdateCashier = useCallback((updatedCashier) => {
    setCashiers((prevCashiers) =>
      prevCashiers.map((cashier) =>
        cashier.id === updatedCashier.id ? updatedCashier : cashier
      )
    );
  }, []);

  // UseFocusEffect untuk mendengarkan perubahan pada layar yang kembali
  useFocusEffect(
    useCallback(() => {
      // Tidak perlu ada logika khusus di sini, karena navigasi sudah menangani pembaruan state.
      // Kita bisa menggunakan `setOptions` untuk mendefinisikan callback
      // pembaruan, tetapi mengirimkannya sebagai parameter navigasi sudah cukup
      // untuk kasus ini.
    }, [])
  );

  const filteredCashiers = cashiers.filter((cashier) =>
    cashier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cashier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cashier.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCashier = () => {
    setModalVisible(true);
  };
  
  const handleSaveNewCashier = () => {
    if (!newCashierName.trim() || !newCashierEmail.trim()) {
      Alert.alert('Error', 'Name and email are required.');
      return;
    }

    const newId = (parseInt(cashiers[cashiers.length - 1].id) + 1).toString();
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newCashier = {
      id: newId,
      name: newCashierName,
      email: newCashierEmail,
      status: 'Active',
      lastLogin: 'Never',
    };

    setCashiers((prevCashiers) => [...prevCashiers, newCashier]);
    setModalVisible(false);
    setNewCashierName('');
    setNewCashierEmail('');
    Alert.alert('Success', 'New cashier added successfully.');
  };

  const handleEditCashier = (cashierId) => {
    const cashierToEdit = cashiers.find((c) => c.id === cashierId);
    if (cashierToEdit) {
      // Arahkan ke EditCashierScreen dan kirim data kasir
      navigation.navigate('EditCashier', { 
        cashier: cashierToEdit,
        onSave: (updatedCashier) => {
          handleUpdateCashier(updatedCashier);
        }
      });
    } else {
      Alert.alert('Error', 'Cashier not found.');
    }
  };

  const handleDeleteCashier = (cashierId) => {
    Alert.alert(
      'Delete Cashier',
      'Are you sure you want to delete this cashier?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setCashiers((prevCashiers) => prevCashiers.filter((c) => c.id !== cashierId));
            Alert.alert('Success', 'Cashier deleted successfully.');
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const renderCashierItem = ({ item }) => (
    <View style={styles.cashierCard}>
      <View style={styles.cashierInfo}>
        <Text style={styles.cashierId}>Cashier ID: {item.id}</Text>
        <Text style={styles.cashierName}>{item.name}</Text>
        <Text style={styles.cashierEmail}>{item.email}</Text>
        <Text style={styles.cashierStatus}>
          Status: <Text style={{ fontWeight: 'bold', color: item.status === 'Active' ? '#355843' : '#FF6347' }}>{item.status}</Text>
        </Text>
        <Text style={styles.cashierLastLogin}>Last Login: {item.lastLogin}</Text>
      </View>
      <View style={styles.cashierActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleEditCashier(item.id)}>
          <Image
            source={require('../../assets/editicon.png')}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { marginLeft: 10 }]} onPress={() => handleDeleteCashier(item.id)}>
          <Image
            source={require('../../assets/deleteicon.png')}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Cashier Management</Text>
        <Text style={styles.headerSubtitle}>Manage your cashier accounts and statuses.</Text>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Image
            source={require('../../assets/searchproduct.png')}
            style={[styles.searchIcon, { width: 20, height: 20 }]}
            resizeMode="contain"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Cashier..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Add Cashier Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddCashier}>
          <Image
            source={require('../../assets/addcashier.png')}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
          <Text style={styles.addButtonText}>Add New Cashier</Text>
        </TouchableOpacity>

        {/* Cashier List */}
        <FlatList
          data={filteredCashiers}
          renderItem={renderCashierItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cashierListContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => <Text style={styles.emptyListText}>No cashiers found.</Text>}
        />
      </View>

      {/* Modal untuk menambahkan kasir baru */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New Cashier</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter cashier's name"
              value={newCashierName}
              onChangeText={setNewCashierName}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter cashier's email"
              value={newCashierEmail}
              onChangeText={setNewCashierEmail}
              keyboardType="email-address"
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.buttonSave]}
                onPress={handleSaveNewCashier}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (styling tetap sama)
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFCF0',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginTop: '10%',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888',
    alignSelf: 'flex-start',
    marginBottom: 20,
    width: '90%',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#355843',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  cashierListContent: {
    paddingBottom: 20,
    width: width * 0.9,
  },
  cashierCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cashierInfo: {
    marginBottom: 10,
  },
  cashierId: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  cashierName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cashierEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cashierStatus: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  cashierLastLogin: {
    fontSize: 12,
    color: '#999',
  },
  cashierActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    paddingTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#333',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  // Style untuk Modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#FFFCF0',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: 15,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
    marginHorizontal: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: '#898989ff',
  },
  buttonSave: {
    backgroundColor: '#355843',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CashierManagement;