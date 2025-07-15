import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const FranchisorProfile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Franchise</Text>
      <View style={styles.franchiseBox}>
        {/* <Image source={require('./chatime-logo.png')} style={styles.logo} /> */}
        <Text style={styles.franchiseInfo}>FRANCHISE</Text>
        <Text>★ 4.6 | 2005</Text>
        <Text>Date Franchising Commenced: 2023</Text>
        <Text>Number of Outlets: 460</Text>
      </View>
      <Text style={styles.description}>
        Chatime is a brewed tea drinks provider that uses the best, high-quality, and halal-certified tea leaves. Available in Indonesia since 2011 under F&B ID (PT Foods Beverages Indonesia), currently Chatime has managed more than 420 stores spread across over 60 cities, with dine-in, take away, and online delivery services. With the intention to provide convenient experience when ordering through mobile phone, Chatime developed My F&B ID mobile app which can be downloaded from Google Play Store or App Store.
      </Text>
      {/* <Image source={require('./store-image.jpg')} style={styles.storeImage} /> */}
      <Text style={styles.investorText}>
        For prospective investors interested in the Chatime brand within Indonesia, it is imperative to understand our operational framework. PT Foods Beverages Indonesia maintains the sole and exclusive master license for Chatime throughout Indonesia. Consequently, all Chatime outlets within the country are directly owned and managed by F&B ID. This centralized operational model is integral to upholding our stringent quality controls, ensuring consistent brand standards, and driving continuous innovation across our expansive network. Therefore, direct individual franchising opportunities are not available in Indonesia.
      </Text>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>Edit Franchise Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  franchiseBox: { alignItems: 'center', marginVertical: 10 },
  logo: { width: 50, height: 50 },
  franchiseInfo: { fontSize: 18, fontWeight: 'bold' },
  description: { fontSize: 14, marginVertical: 10 },
  storeImage: { width: '100%', height: 200, marginVertical: 10 },
  investorText: { fontSize: 14, marginVertical: 10 },
  editButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5, alignItems: 'center' },
  editText: { color: '#fff', fontWeight: 'bold' },
});

export default FranchisorProfile;