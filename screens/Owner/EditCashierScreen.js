// screens/Owner/EditCashierScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EditCashierScreen = ({ navigation, route }) => {
  // Mendapatkan data kasir dan fungsi onSave dari parameter navigasi
  const { cashier, onSave } = route.params || {};

  const [name, setName] = useState(cashier?.name || '');
  const [email, setEmail] = useState(cashier?.email || '');
  const [status, setStatus] = useState(cashier?.status || 'Active'); // Contoh status

  useEffect(() => {
    if (cashier) {
      setName(cashier.name);
      setEmail(cashier.email);
      setStatus(cashier.status);
    }
  }, [cashier]);

  const handleSave = () => {
    // Logika untuk menyimpan perubahan kasir
    const updatedCashier = {
      ...cashier, // Gunakan spread operator untuk mempertahankan properti lain
      name,
      email,
      status,
    };
    
    // Panggil fungsi onSave yang dikirim dari CashierManagement.js
    if (onSave) {
      onSave(updatedCashier);
    }

    // Kembali ke halaman sebelumnya
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Tombol Back */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Edit Cashier</Text>
        <Text style={styles.subtitle}>Cashier ID: {cashier?.id || 'N/A'}</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Cashier Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nama Kasir"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Cashier Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email Kasir"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Status</Text>
          <View style={styles.statusButtons}>
            <TouchableOpacity
              style={[styles.statusButton, status === 'Active' && styles.statusButtonActive]}
              onPress={() => setStatus('Active')}
            >
              <Text style={[styles.statusButtonText, status === 'Active' && styles.statusButtonTextActive]}>Active</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusButton, status === 'Inactive' && styles.statusButtonActive]}
              onPress={() => setStatus('Inactive')}
            >
              <Text style={[styles.statusButtonText, status === 'Inactive' && styles.statusButtonTextActive]}>Inactive</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
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
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputGroup: {
    width: '90%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    fontSize: 16,
  },
  statusButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#EAEAEA',
  },
  statusButtonActive: {
    backgroundColor: '#355843',
    borderColor: '#355843',
  },
  statusButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#355843',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default EditCashierScreen;