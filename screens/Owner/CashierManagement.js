// screens/Owner/CashierManagement.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert, // For simulating confirmation pop-ups
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Dummy data for cashier list
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

  // Filter cashiers based on search query
  const filteredCashiers = cashiers.filter(cashier =>
    cashier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cashier.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cashier.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCashier = () => {
    Alert.alert('Add Cashier', 'Add cashier functionality will be implemented here.');
    // TODO: Navigate to AddCashierScreen or show a modal
  };

  // Function to update cashier data in the list
  const handleUpdateCashier = (updatedCashier) => {
    setCashiers(prevCashiers =>
      prevCashiers.map(cashier =>
        cashier.id === updatedCashier.id ? updatedCashier : cashier
      )
    );
    Alert.alert('Success', 'Cashier changes saved successfully.');
  };

  const handleEditCashier = (cashierId) => {
    const cashierToEdit = cashiers.find(c => c.id === cashierId);
    if (cashierToEdit) {
      // Pass the cashier object and the handleUpdateCashier callback function
      navigation.navigate('EditCashier', { cashier: cashierToEdit, onSave: handleUpdateCashier });
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
            setCashiers(prevCashiers => prevCashiers.filter(c => c.id !== cashierId));
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
        <Text style={styles.cashierStatus}>Status: <Text style={{ fontWeight: 'bold', color: item.status === 'Active' ? '#355843' : '#FF6347' }}>{item.status}</Text></Text>
        <Text style={styles.cashierLastLogin}>Last Login: {item.lastLogin}</Text>
      </View>
      <View style={styles.cashierActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleEditCashier(item.id)}>
          <Ionicons name="create-outline" size={20} color="#355843" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { marginLeft: 10 }]} onPress={() => handleDeleteCashier(item.id)}>
          <Ionicons name="trash-outline" size={20} color="#FF6347" />
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
          <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Cashier..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Add Cashier Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddCashier}>
          <Ionicons name="add-circle-outline" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add New Cashier</Text>
        </TouchableOpacity>

        {/* Cashier List */}
        <FlatList
          data={filteredCashiers}
          renderItem={renderCashierItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.cashierListContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>No cashiers found.</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFCF0', // Consistent background color
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
    backgroundColor: '#355843', // Primary button color
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
    paddingBottom: 20, // Space below the list
    width: width * 0.9, // Adjust width to match container padding
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
  cashierId: { // Style for Cashier ID
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
    justifyContent: 'flex-end', // Align action buttons to the right
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
    // backgroundColor: '#F0F0F0', // Optional: action button background
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
});

export default CashierManagement;
