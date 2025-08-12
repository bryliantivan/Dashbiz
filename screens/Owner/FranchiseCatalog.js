// screens/Owner/FranchiseCatalog.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Data dummy untuk daftar franchise
const allFranchises = [
  { id: '1', name: 'Chatime', logo: require('../../assets/ChatimeLogo.png') },
  { id: '2', name: 'CFC', logo: require('../../assets/CFCLogo.png') }, // Placeholder
  { id: '3', name: "Fore", logo: require('../../assets/ForeLogo.png') }, // Placeholder
  { id: '4', name: 'JCO', logo: require('../../assets/JCOLogo.png') }, // Placeholder
  { id: '5', name: 'Krispy Kreme', logo: require('../../assets/KrispyKremeLogo.png') }, // Placeholder
  { id: '6', name: 'Pizza Hut', logo: require('../../assets/PizzaHutLogo.png') }, // Placeholder
  { id: '7', name: 'Red Dog', logo: require('../../assets/RedDogLogo.png') }, // Contoh tambahan
  { id: '8', name: 'Subway', logo: require('../../assets/SubwayLogo.png') }, // Contoh tambahan
];

const FranchiseCatalog = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter franchise berdasarkan query pencarian
  const filteredFranchises = allFranchises.filter(franchise =>
    franchise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <Text style={styles.headerTitle}>Franchise Catalog</Text>
        <Text style={styles.headerSubtitle}>
          Browse our full catalog and find a brand that fits your business goals.
        </Text>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Image
            source={require('../../assets/searchproduct.png')}
            style={[styles.searchIcon, { width: 20, height: 20 }]}
            resizeMode="contain"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Franchise Grid */}
        <View style={styles.franchiseGrid}>
          {filteredFranchises.map(franchise => (
            <TouchableOpacity
              key={franchise.id}
              style={styles.franchiseCard}
              onPress={() => navigation.navigate('FranchisorDetail', { name: franchise.name })} // Navigasi ke FranchisorDetail
            >
              <View style={styles.franchiseLogoContainer}>
                <Image
                  source={franchise.logo}
                  style={styles.franchiseLogo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.franchiseName}>{franchise.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFCF0', // Warna latar belakang sesuai gambar
  },
  scrollViewContent: {
    paddingTop: 20,
    paddingHorizontal: width * 0.05,
    paddingBottom: 80, // Ruang untuk bottom tab navigator
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'flex-start', // Rata kiri
    marginBottom: 5,
    marginTop: '10%',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888',
    alignSelf: 'flex-start', // Rata kiri
    marginBottom: 20,
    width: '90%', // Batasi lebar subtitle
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  franchiseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  franchiseCard: {
    width: '48%', // Untuk dua kolom
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  franchiseLogoContainer: {
    width: 100, // Ukuran container logo
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  franchiseLogo: {
    width: '100%', // Logo mengisi container
    height: '100%',
  },
  franchiseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default FranchiseCatalog;
