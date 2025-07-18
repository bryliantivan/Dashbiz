// screens/Owner/OwnerDashboard.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const OwnerDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Owner Dashboard</Text>
      <Text style={styles.subtitle}>Ini adalah halaman dashboard untuk Owner (placeholder).</Text>
      <Button title="Kembali ke Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA', // Warna latar belakang placeholder
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default OwnerDashboard;
